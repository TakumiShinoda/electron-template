import {contextBridge, ipcRenderer} from 'electron'
import * as _shikijs_types from '@shikijs/types'
import {BundledLanguage, BundledTheme} from "shiki"
import { ElectronApiIndex } from '../@types'
import { ElectronApiBuildin_ } from '../buildin/buildin'

const ElectronApi: ElectronApiIndex = {
  custom: {
    shikiCodeToHtml: (code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>) => ipcRenderer.invoke('shikiCodeToHtml', code, options)
  },
  buildin: ElectronApiBuildin_
}

contextBridge.exposeInMainWorld('electronApiIndex', ElectronApi)
