// Vendor
import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { ButtonGridApi } from '@tweakpane/plugin-essentials';
import { KeyboardHandler, LocalStorage } from '@zooizooi/utils';
import { KEY_DOWN, KeyDirection } from '@zooizooi/utils/modules/KeyboardHandler';

// Modules
import Tune, { TuneFolder } from '@/modules/Tune';
import Globals from '@/modules/Globals';

// Hooks
import onWindowResize from '@/hooks/onWindowResize';
import onUpdate from '@/hooks/onUpdate';

// Settings
import settings from '@/settings/camera.json';

// Constants
const DEFAULT_CAMERA_POSITION = new Vector3(0, 0, 5);
const LOCAL_STORAGE_CAMERA_SETTINGS = `${Globals.projectName}-camera-settings`;

export default class Camera {
    public camera: PerspectiveCamera;
    public controls: OrbitControls | undefined;
    private tune: TuneFolder;

    constructor() {
        this.createKeyboardHandler();
        this.tune = this.createTune();
        this.camera = this.createCamera();
        this.controls = this.createControls();
        this.loadCameraPosition();

        // Hooks
        onUpdate(this, this.update);
        onWindowResize(this, this.resize);
    }

    private createKeyboardHandler() {
        const keymap = {
            'Ctrl+s': this.keyCtrlSHandler,
        };

        return new KeyboardHandler({
            scope: this,
            keymap,
        });
    }

    private createTune() {
        const tune = Tune.addFolder({ title: 'Camera' });
        tune.addSaveButton('camera', () => {
            return {
                fov: this.camera.fov,
            };
        });

        const positionButtonGrid = tune.addBlade({
            view: 'buttongrid',
            size: [2, 1],
            cells: (x: number, y: number) => ({
                title: [
                    ['Store', 'Reset'],
                ][y][x],
            }),
            label: 'position',
        }) as ButtonGridApi;
        positionButtonGrid.on('click', (event) => {
            if (event.cell.title === 'Store') this.storeCameraPosition();
            if (event.cell.title === 'Reset') this.resetCameraPosition();
        });
        return tune;
    }

    private createCamera() {
        const camera = new PerspectiveCamera(settings.fov, 1);
        camera.position.copy(DEFAULT_CAMERA_POSITION);
        this.tune.addBinding(camera, 'fov', { min: 1, max: 180 }).on('change', () => camera.updateProjectionMatrix());
        return camera;
    }

    private createControls() {
        if (Globals.renderer) {
            return new OrbitControls(this.camera, Globals.renderer.domElement);
        }
        return undefined;
    }

    private storeCameraPosition() {
        LocalStorage.set(LOCAL_STORAGE_CAMERA_SETTINGS, {
            position: this.camera.position,
            target: this.controls?.target,
        });
        this.tune.refresh();
        console.log('📷 Camera position stored');
    }

    private loadCameraPosition() {
        const data: any = LocalStorage.get(LOCAL_STORAGE_CAMERA_SETTINGS);
        if (!data) return;
        this.camera.position.set(data.position.x, data.position.y, data.position.z);
        this.controls?.target.set(data.target.x, data.target.y, data.target.z);
        this.tune.refresh();
        console.log('📷 Camera position loaded');
    }

    private resetCameraPosition() {
        this.camera.position.copy(DEFAULT_CAMERA_POSITION);
        this.controls?.target.set(0, 0, 0);
        LocalStorage.remove(LOCAL_STORAGE_CAMERA_SETTINGS);
        this.tune.refresh();
        console.log('📷 Camera position was reset');
    }

    private update() {
        this.controls?.update();
    }

    private resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    private keyCtrlSHandler(direction: KeyDirection, event: KeyboardEvent) {
        if (direction === KEY_DOWN) {
            event.preventDefault();
            this.storeCameraPosition();
        }
    }
}