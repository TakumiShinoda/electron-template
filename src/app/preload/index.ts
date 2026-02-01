import {contextBridge, FileFilter, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('electronApi', {
  openFileDialog: (filters: FileFilter[]) => ipcRenderer.invoke('openFileDialog', filters),
  openDialog: (options: Electron.MessageBoxOptions) => ipcRenderer.send('openDialog', options)
})
