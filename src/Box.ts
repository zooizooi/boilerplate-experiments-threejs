import { BoxGeometry, Mesh, MeshStandardMaterial, Object3D } from 'three';
import onUpdate from '@/hooks/onUpdate';

export default class Box extends Object3D {
    private box: Mesh;

    constructor() {
        super();
        this.box = this.createBox();

        // Hooks
        onUpdate(this, this.update);
    }

    private createBox() {
        const geometry = new BoxGeometry();
        const material = new MeshStandardMaterial();
        const mesh = new Mesh(geometry, material);
        this.add(mesh);
        return mesh;
    }

    private update() {
        this.box.rotation.x += 0.01;
        this.box.rotation.y += 0.01;
        this.box.rotation.z += 0.01;
    }
}