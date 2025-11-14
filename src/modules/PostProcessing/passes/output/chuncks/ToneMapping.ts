// Vendor
import { LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping, AgXToneMapping, NeutralToneMapping, CustomToneMapping } from 'three';

// Modules
import Globals from '@/modules/Globals';

// Types
import type { Chunck } from './Chunck';

export default class ToneMapping implements Chunck {
    public shaderMainChunck = `
        #ifdef LINEAR_TONE_MAPPING
            gl_FragColor.rgb = LinearToneMapping(gl_FragColor.rgb);
        #elif defined(REINHARD_TONE_MAPPING)
            gl_FragColor.rgb = ReinhardToneMapping(gl_FragColor.rgb);
        #elif defined(CINEON_TONE_MAPPING)
            gl_FragColor.rgb = CineonToneMapping(gl_FragColor.rgb);
        #elif defined(ACES_FILMIC_TONE_MAPPING)
            gl_FragColor.rgb = ACESFilmicToneMapping(gl_FragColor.rgb);
        #elif defined(AGX_TONE_MAPPING)
            gl_FragColor.rgb = AgXToneMapping(gl_FragColor.rgb);
        #elif defined(NEUTRAL_TONE_MAPPING)
            gl_FragColor.rgb = NeutralToneMapping(gl_FragColor.rgb);
        #elif defined(CUSTOM_TONE_MAPPING)
            gl_FragColor.rgb = CustomToneMapping(gl_FragColor.rgb);
        #endif
    `;

    get defines() {
        const defines = new Map();
        const toneMapping = Globals.renderer?.renderer.toneMapping;
        switch (toneMapping) {
            case LinearToneMapping:
                defines.set('LINEAR_TONE_MAPPING', '');
                break;
            case ReinhardToneMapping:
                defines.set('REINHARD_TONE_MAPPING', '');
                break;
            case CineonToneMapping:
                defines.set('CINEON_TONE_MAPPING', '');
                break;
            case ACESFilmicToneMapping:
                defines.set('ACES_FILMIC_TONE_MAPPING', '');
                break;
            case AgXToneMapping:
                defines.set('AGX_TONE_MAPPING', '');
                break;
            case NeutralToneMapping:
                defines.set('NEUTRAL_TONE_MAPPING', '');
                break;
            case CustomToneMapping:
                defines.set('CUSTOM_TONE_MAPPING', '');
                break;
        }
        return Object.fromEntries(defines);
    }
}