// Vendor
import { Camera, Scene } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { type FolderApi } from 'tweakpane';

// Modules
import type Renderer from '@/modules/Renderer';
import Tune from '@/modules/Tune';

// Hooks
import onWindowResize from '@/hooks/onWindowResize';

// Passes
import OutputPass from './passes/output/OutputPass';

export default class PostProcessing {
    private tune: FolderApi;
    private composer: EffectComposer;
    private renderPass: RenderPass;

    constructor(renderer: Renderer) {
        this.tune = this.createTune();
        this.composer = this.createComposer(renderer);
        this.renderPass = this.createRendererPass();
        this.createOutputPass();

        // Hooks
        onWindowResize(this, this.resize);
    }

    public destroy() {
        this.tune.dispose();
    }

    private createTune() {
        const tune = Tune.addFolder({ title: 'Post-processing' });
        return tune;
    }

    private createComposer(renderer: Renderer) {
        const composer = new EffectComposer(renderer.renderer);
        return composer;
    }

    private createRendererPass() {
        const renderPass = new RenderPass(new Scene(), new Camera());
        this.composer.addPass(renderPass);
        return renderPass;
    }

    private createOutputPass() {
        const pass = new OutputPass();
        this.composer.addPass(pass);
        return pass;
    }

    public render(scene: Scene, camera: Camera) {
        this.renderPass.scene = scene;
        this.renderPass.camera = camera;
        this.composer.render();
    }

    private resize() {
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }
}