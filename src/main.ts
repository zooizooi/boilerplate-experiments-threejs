// Style
import './style.css';

// Modules
import Assets from '@/modules/Assets';
import Renderer from '@/modules/Renderer';
import Globals from '@/modules/Globals';
import World from '@/modules/World';
import Camera from '@/modules/Camera';
import Stats from '@/modules/Stats';

// Hooks
import onUpdate from '@/hooks/onUpdate';

// Configs
import assets from '@/configs/assets';

// Asset loaders
import '@/modules/Loaders';

Assets.loadList(assets).then(() => {
    // Renderer
    const renderer = new Renderer();
    document.body.appendChild(renderer.domElement);
    Globals.renderer = renderer;

    // World
    const world = new World();
    Globals.world = world;

    // Camera
    const camera = new Camera();
    Globals.camera = camera;

    // Stats
    const stats = new Stats({
        renderer: renderer.renderer,
    });

    onUpdate(() => {
        renderer.render(world.scene, camera.camera);
        stats.update();
    });
});