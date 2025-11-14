// Vendor
import { Texture } from 'three';

export interface Chunck {
    uniforms?: Record<string, { value: string | number | Texture }>;
    shaderMainChunck?: string;
    shaderPreChunck?: string;
    defines?: Record<string, string>;
}