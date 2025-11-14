// Source https://threepipe.org/examples/#vignette-plugin/

// Modules
import Tune from '@/modules/Tune';

// Types
import type { Chunck } from './Chunck';

interface VignetteProps {
    power: number;
}

export default class VignetteV2 implements Chunck {
    public uniforms = {
        uVignettePower: { value: 0.5 },
    };

    public shaderPreChunck = `
        uniform float uVignettePower;

        vec3 vignetteV2(vec3 color, vec2 uv, float power) {
            uv = uv * (1.0 - uv);
            float vignette = uv.x * uv.y * 16.0;
            vignette = pow(vignette, power);
            return vec3(mix(color.rgb, vec3(0.0), 1.0 - vignette));
        }
    `;

    public shaderMainChunck = `
        gl_FragColor.rgb = vignetteV2(gl_FragColor.rgb, uv, uVignettePower);
    `;

    constructor(props: VignetteProps) {
        this.uniforms.uVignettePower.value = props.power;
        this.createTune();
    }

    private createTune() {
        const folder = Tune.folders.get('Post-processing');
        if (folder) {
            const tune = folder.addFolder({ title: 'Vignette v2' });
            tune.addBinding(this.uniforms.uVignettePower, 'value', { label: 'power', min: 0, max: 4 });
        }
    }
}