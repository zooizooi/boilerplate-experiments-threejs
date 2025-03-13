import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    plugins: [
        glsl({
            compress: true,
        }),
    ],
});