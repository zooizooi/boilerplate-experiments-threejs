import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Debugger, { DebuggerFolder } from '@/Debugger';
import onWindowResize from '@/hooks/onWindowResize';
import onUpdate from '@/hooks/onUpdate';
import Globals from '@/Globals';

export default class PortalCamera {
    public camera: PerspectiveCamera;
    public controls: OrbitControls | undefined;
    private debugger: DebuggerFolder;

    constructor() {
        this.debugger = this.createDebugger();
        this.camera = this.createCamera();
        this.controls = this.createControls();

        // Hooks
        onUpdate(this, this.update);
        onWindowResize(this, this.resize);
    }

    private createDebugger() {
        const debug = Debugger.addFolder({ title: 'Camera' });
        return debug;
    }

    private createCamera() {
        const camera = new PerspectiveCamera(50, 1);
        camera.position.set(0, 0, 5);
        this.debugger.addBinding(camera, 'fov', { min: 1, max: 180 }).on('change', () => camera.updateProjectionMatrix());
        this.debugger.addBinding(camera, 'position');
        return camera;
    }

    private createControls() {
        if (Globals.renderer) {
            return new OrbitControls(this.camera, Globals.renderer.domElement);
        }
        return undefined;
    }

    private update() {
        this.controls?.update();
    }

    private resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}