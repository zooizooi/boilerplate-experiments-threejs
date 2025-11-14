// Modules
import Tune from '@/modules/Tune';

// Types
import type { Chunck } from './Chunck';

interface VignetteProps {
    offset: number;
    darkness: number;
}

export default class VignetteV1 implements Chunck {
    public uniforms = {
        uVignetteOffset: { value: 0.25 },
        uVignetteDarkness: { value: 0.5 },
    };

    public shaderPreChunck = `
        uniform float uVignetteOffset;
        uniform float uVignetteDarkness;

        vec3 vignetteV1(vec3 color, vec2 uv, float offset, float darkness) {
            const vec2 center = vec2(0.5);
            float dist = distance(vUv, center);
            return color *= smoothstep(0.8, offset * 0.799, dist * (darkness + offset));
        }
    `;

    public shaderMainChunck = `
        gl_FragColor.rgb = vignetteV1(gl_FragColor.rgb, uv, uVignetteOffset, uVignetteDarkness);
    `;

    constructor(props: VignetteProps) {
        this.uniforms.uVignetteOffset.value = props.offset;
        this.uniforms.uVignetteDarkness.value = props.darkness;
        this.createTune();
    }

    private createTune() {
        const folder = Tune.folders.get('Post-processing');
        if (folder) {
            const tune = folder.addFolder({ title: 'Vignette v1' });
            tune.addBinding(this.uniforms.uVignetteOffset, 'value', { label: 'offset', min: 0, max: 1 });
            tune.addBinding(this.uniforms.uVignetteDarkness, 'value', { label: 'darkness', min: 0, max: 1 });
        }
    }
}