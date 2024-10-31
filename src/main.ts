// Style
import './style.css';

// Vendor
import AssetLoader, { ImageLoader, GltfLoader, TextureLoader } from '@zooizooi/asset-loader';

// Modules
import Assets from '@/Assets';
import Renderer from '@/Renderer';
import Globals from '@/Globals';
import World from '@/World';

// Hooks
import onUpdate from '@/hooks/onUpdate';

// Configs
import assets from '@/configs/assets';
import Camera from '@/Camera';

// AssetLoader
AssetLoader.addLoader('gltf', GltfLoader, { decoderPath: '/draco/' });
AssetLoader.addLoader('image', ImageLoader);
AssetLoader.addLoader('texture', TextureLoader);

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

    onUpdate(() => {
        renderer.render(world.scene, camera.camera);
    });
});