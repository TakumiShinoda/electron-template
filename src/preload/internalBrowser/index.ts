import {contextBridge, ipcRenderer} from 'electron'
import { insertScript } from '../buildin/utils'

contextBridge.exposeInMainWorld('electronApi', {
})

document.addEventListener('DOMContentLoaded', async (_) => {
  let jsSrc: string = await ipcRenderer.invoke('getSrcFromDist', '/internalBrowser.js')

  insertScript(jsSrc)

  console.log('Preload loaded.')
})