// Vendor
import { ShaderMaterial } from 'three';
import { ShaderPass } from 'three/examples/jsm/Addons.js';

// Shaders
import vertexShader from './shaders/vertex.glsl';

// Chuncks
import VignetteV2 from './chuncks/VignetteV2';
import ToneMapping from './chuncks/ToneMapping';
import ColorSpace from './chuncks/ColorSpace';

// Types
import type { Chunck } from './chuncks/Chunck';

export default class OutputPass extends ShaderPass {
    private chuncks = [
        new VignetteV2({ power: 0.5 }),
        new ToneMapping(),
        new ColorSpace(),
    ];

    constructor() {
        super(new ShaderMaterial({
            uniforms: {
                tDiffuse: { value: null },
            },
            vertexShader,
        }));

        this.material.fragmentShader = this.createFragmentShader();
        this.combineUniforms();
        this.combineDefines();
    }

    private createFragmentShader() {
        return `
            varying vec2 vUv;
            uniform sampler2D tDiffuse;

            ${this.getPreChuncks()}

            void main() {
                vec2 uv = vUv;

                gl_FragColor = texture2D(tDiffuse, uv);

                ${this.getMainChuncks()}
            }
        `;
    }

    private getPreChuncks() {
        return this.chuncks
            .map((chunck: Chunck) => chunck.shaderPreChunck)
            .filter(chunck => chunck)
            .join('');
    }

    private getMainChuncks() {
        return this.chuncks
            .map((chunck: Chunck) => chunck.shaderMainChunck)
            .filter(chunck => chunck)
            .join('');
    }

    private combineUniforms() {
        this.chuncks.forEach((chunck: Chunck) => {
            if (chunck.uniforms) {
                Object.assign(this.material.uniforms, chunck.uniforms);
            }
        });
    }

    private combineDefines() {
        this.chuncks.forEach((chunck: Chunck) => {
            if (chunck.defines) {
                Object.assign(this.material.defines, chunck.defines);
            }
        });
    }
}