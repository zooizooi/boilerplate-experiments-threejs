import Renderer from '@/Renderer';
import World from '@/World';

interface Globals {
    renderer: Renderer | undefined;
    world: World | undefined;
}

const Globals: Globals = {
    renderer: undefined,
    world: undefined,
};

export default Globals;