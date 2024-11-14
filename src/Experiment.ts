import { Object3D } from 'three';
import Debugger, { DebuggerFolder } from '@/Debugger';
import onUpdate from '@/hooks/onUpdate';

export default class Experiment extends Object3D {
    private debugger: DebuggerFolder;

    constructor() {
        super();
        this.debugger = this.createDebugger();

        // Hooks
        onUpdate(this, this.update);
    }

    private createDebugger() {
        const debug = Debugger.addFolder({ title: 'Experiment' });
        return debug;
    }

    private update() {
    }
}