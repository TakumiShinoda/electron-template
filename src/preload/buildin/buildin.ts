import {FileFilter, ipcRenderer} from 'electron'
import { ElectronApiBuildin } from "../@types/buildin";

export const ElectronApiBuildin_: ElectronApiBuildin = {
  openFileDialog: (filters: FileFilter[]) => ipcRenderer.invoke('openFileDialog', filters),
  openDialog: (options: Electron.MessageBoxOptions) => ipcRenderer.send('openDialog', options),
  minimizeWindow: () => ipcRenderer.send('minimizeWindow'),
  maximizeWindow: () => ipcRenderer.send('maximizeWindow'),
  closeWindow: () => ipcRenderer.send('closeWindow')
}