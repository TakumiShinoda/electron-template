const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFileDialog: (filters) => ipcRenderer.invoke('openFileDialog', filters),
  openDialog: () => ipcRenderer.send('openDialog')
})