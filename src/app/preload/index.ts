import {contextBridge, FileFilter, ipcRenderer} from 'electron'
import * as _shikijs_types from '@shikijs/types'
import {BundledLanguage, BundledTheme} from "shiki"

contextBridge.exposeInMainWorld('electronApi', {
  openFileDialog: (filters: FileFilter[]) => ipcRenderer.invoke('openFileDialog', filters),
  shikiCodeToHtml: (code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>) => ipcRenderer.invoke('shikiCodeToHtml', code, options),
  openDialog: (options: Electron.MessageBoxOptions) => ipcRenderer.send('openDialog', options),
  minimizeWindow: () => ipcRenderer.send('minimizeWindow'),
  maximizeWindow: () => ipcRenderer.send('maximizeWindow'),
  closeWindow: () => ipcRenderer.send('closeWindow')
})
