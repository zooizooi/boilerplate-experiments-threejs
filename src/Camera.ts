import { PerspectiveCamera } from 'three';
import onWindowResize from '@/hooks/onWindowResize';

export default class PortalCamera {
    public camera = new PerspectiveCamera(50, 1);

    constructor() {
        this.camera.position.set(0, 0, 5);

        // Hooks
        onWindowResize(this, this.resize);
    }

    private resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}