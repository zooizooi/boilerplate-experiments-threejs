// Vendor
import AssetLoader, { ImageLoader, GltfLoader, TextureLoader } from '@zooizooi/asset-loader';

// Loaders
AssetLoader.addLoader('gltf', GltfLoader, { decoderPath: '/draco/' });
AssetLoader.addLoader('image', ImageLoader);
AssetLoader.addLoader('texture', TextureLoader);