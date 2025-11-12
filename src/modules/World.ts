// Vendor
import { PointLight, Scene } from 'three';

// Components
import Box from '@/components/Box';
import Experiment from '@/components/Experiment';

export default class World {
    public scene = new Scene();

    constructor() {
        this.createLights();
        this.createBox();
        this.createExperiment();
    }

    private createLights() {
        const pointLight = new PointLight(0xff0000, 10, 0);
        pointLight.position.set(5, 5, 0);
        this.scene.add(pointLight);
    }

    private createBox() {
        const box = new Box();
        this.scene.add(box);
        return box;
    }

    private createExperiment() {
        const experiment = new Experiment();
        this.scene.add(experiment);
        return experiment;
    }
}