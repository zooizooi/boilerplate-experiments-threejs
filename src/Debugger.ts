import { FolderApi, Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

const pane = new Pane();
pane.registerPlugin(EssentialsPlugin);
export type DebuggerFolder = FolderApi;
export default pane;