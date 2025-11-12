// Vendor
import { Camera } from 'three';

// Modules
import Renderer from '@/modules/Renderer';
import World from '@/modules/World';

interface Globals {
    projectName: string;
    renderer?: Renderer;
    world?: World;
    camera?: Camera;
}

const Globals: Globals = {
    projectName: 'boilerplate-experiments-threejs',
    renderer: undefined,
    world: undefined,
    camera: undefined,
};

export default Globals;