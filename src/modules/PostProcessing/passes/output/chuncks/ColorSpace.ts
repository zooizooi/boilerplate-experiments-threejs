// Vendor
import { ColorManagement, SRGBTransfer } from 'three';

// Modules
import Globals from '@/modules/Globals';

// Types
import type { Chunck } from './Chunck';

export default class ColorSpace implements Chunck {
    public shaderMainChunck = `
        #ifdef SRGB_TRANSFER
            gl_FragColor = sRGBTransferOETF(gl_FragColor);
        #endif
    `;

    get defines() {
        const defines = new Map();
        const outputColorSpace = Globals.renderer?.renderer.outputColorSpace;
        if (outputColorSpace && ColorManagement.getTransfer(outputColorSpace) === SRGBTransfer) {
            defines.set('SRGB_TRANSFER', '');
        }
        return Object.fromEntries(defines);
    }
}