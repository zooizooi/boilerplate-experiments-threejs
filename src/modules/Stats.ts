// Vendor
import StatsGL from 'stats-gl';
import type { WebGLRenderer } from 'three';
import KeyboardHandler, { KEY_DOWN, type KeyDirection } from '@zooizooi/utils/modules/KeyboardHandler';

interface StatsProps {
    visible?: boolean;
    renderer?: WebGLRenderer;
}

export default class Stats {
    private stats = new StatsGL({ trackGPU: true, trackHz: true, minimal: false });
    private isVisible: boolean;
    private keyboardHandler: KeyboardHandler;

    constructor({ visible = true, renderer }: StatsProps = {}) {
        this.isVisible = visible;
        if (visible) this.show();
        if (renderer) this.stats.init(renderer);
        this.keyboardHandler = this.setupKeyboardHandler();
    }

    public destroy() {
        this.removeFromDOM();
        this.keyboardHandler.destroy();
    }

    public begin() {
        this.stats.begin();
    }

    public end() {
        this.stats.end();
    }

    public update() {
        this.stats.update();
    }

    private setupKeyboardHandler() {
        return new KeyboardHandler({
            keymap: {
                'Backquote': (direction: KeyDirection) => {
                    if (direction === KEY_DOWN) {
                        this.toggle();
                    }
                },
            },
        });
    }

    private toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    private show() {
        this.addToDOM();
        this.isVisible = true;
    }

    private hide() {
        this.removeFromDOM();
        this.isVisible = false;
    }

    private addToDOM() {
        document.body.appendChild(this.stats.dom);
    }

    private removeFromDOM() {
        document.body.removeChild(this.stats.dom);
    }
}