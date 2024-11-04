import { BoxGeometry, Mesh, MeshStandardMaterial, PointLight, Scene } from 'three';
import Debugger, { DebuggerFolder } from '@/Debugger';
import onUpdate from '@/hooks/onUpdate';

export default class World {
    public scene = new Scene();
    private debugger: DebuggerFolder;
    private box: Mesh;

    constructor() {
        this.debugger = this.createDebugger();
        this.createLights();
        this.box = this.createBox();

        // Hooks
        onUpdate(this, this.update);
    }

    private createDebugger() {
        const debug = Debugger.addFolder({ title: 'World' });
        return debug;
    }

    private createLights() {
        const pointLight = new PointLight(0xff0000, 10, 0);
        pointLight.position.set(5, 5, 0);
        this.scene.add(pointLight);
    }

    private createBox() {
        const geometry = new BoxGeometry();
        const material = new MeshStandardMaterial();
        const mesh = new Mesh(geometry, material);
        this.scene.add(mesh);
        return mesh;
    }

    private update() {
        this.box.rotation.x += 0.01;
        this.box.rotation.y += 0.01;
        this.box.rotation.z += 0.01;
    }
}