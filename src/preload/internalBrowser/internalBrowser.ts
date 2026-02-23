import {contextBridge, ipcRenderer} from 'electron'

import { insertScript } from '../buildin/utils'
import { ElectronApiBuildin_ } from '../buildin/buildin'
import { ElectronApiInternalBrowser } from '../@types/internalBrowser'

const ElectronApi: ElectronApiInternalBrowser = {
  buildin: ElectronApiBuildin_
}

contextBridge.exposeInMainWorld('electronApi', ElectronApi)

document.addEventListener('DOMContentLoaded', async (_) => {
  let jsSrc: string = await ipcRenderer.invoke('getSrcFromDist', '/internalBrowser.js')

  insertScript(jsSrc)

  console.log('Preload loaded.')
})