import {contextBridge, FileFilter, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openFileDialog: (filters: FileFilter[]) => ipcRenderer.invoke('openFileDialog', filters),
  openDialog: () => ipcRenderer.send('openDialog')
})