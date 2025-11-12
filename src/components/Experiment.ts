// Vendor
import { Object3D } from 'three';

// Modules
import Tune from '@/modules/Tune';

// Hooks
import onUpdate from '@/hooks/onUpdate';

export default class Experiment extends Object3D {
    constructor() {
        super();

        this.createTune();

        // Hooks
        onUpdate(this, this.update);
    }

    private createTune() {
        const tune = Tune.addFolder({ title: 'Experiment' });
        return tune;
    }

    private update() {
    }
}