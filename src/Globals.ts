import Renderer from '@/Renderer';
import World from '@/World';

interface Globals {
    projectName: string;
    renderer: Renderer | undefined;
    world: World | undefined;
}

const Globals: Globals = {
    projectName: 'boilerplate-experiments-threejs',
    renderer: undefined,
    world: undefined,
};

export default Globals;