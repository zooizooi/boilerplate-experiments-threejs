import { FolderApi, Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { KeyboardHandler } from '@zooizooi/utils';
import { KEY_DOWN, KeyDirection } from '@zooizooi/utils/modules/KeyboardHandler';

const pane = new Pane();
pane.registerPlugin(EssentialsPlugin);

new KeyboardHandler({
    keymap: {
        '`': (direction: KeyDirection) => {
            if (direction === KEY_DOWN) {
                pane.hidden = !pane.hidden;
            }
        },
    },
});

declare module 'tweakpane' {
    interface FolderApi {
        addSaveButton(settingsName: string, settings: () => object): void;
    }
}

FolderApi.prototype.addSaveButton = function(settingsName: string, settings: () => object) {
    setTimeout(() => {
        this.addButton({ title: 'Save' }).on('click', async() => {
            const data = {
                name: settingsName,
                settings: settings(),
            };

            await fetch('http://localhost:3001/api/save-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(() => {
                console.log(`💾 Settings saved for: %c${settingsName}`, 'font-weight: bold; color: #fffdbc;');
            });
        });
    }, 0);
};

export type DebuggerFolder = FolderApi;
export default pane.addFolder({ title: '' });