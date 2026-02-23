import dedent from 'ts-dedent'

export namespace IpcCommunicationPageExapleCodes{
  export namespace OnewayIpc{
    export const main: string = dedent`
      ipcMain.on('openDialog', openDialog)

      // openDialog
      export async function openDialog(ev: Electron.IpcMainEvent, options: Electron.MessageBoxOptions){
        let window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(ev.sender)
      
        if(window == null) throw new Error('Window is null.')
        
        await dialog.showMessageBox(window, options)
      }
    `
    export const renderer: string = dedent`
      window.electronApiIndex.buildin.openDialog({message: 'Dialog by preload process.'})
    `
    export const preloadImplement: string = dedent`
      import {contextBridge, ipcRenderer} from 'electron'

      const ElectronApi: ElectronApiIndex = {
        custom: {
          shikiCodeToHtml: (code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>) => ipcRenderer.invoke('shikiCodeToHtml', code, options)
        },
        buildin: ElectronApiBuildin_
      }

      contextBridge.exposeInMainWorld('electronApiIndex', ElectronApi)
    `
    export const preloadDeclaration = dedent`
      import * as _shikijs_types from '@shikijs/types'
      import {BundledLanguage, BundledTheme} from "shiki"

      import { ElectronApiBuildin } from './buildin'

      export interface ElectronApiIndexCustom{
        shikiCodeToHtml: (code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>) => Promise<string>,
      }

      export interface ElectronApiIndex{
        custom: ElectronApiIndexCustom,
        buildin: ElectronApiBuildin
      }

      declare global{
        interface Window{
          electronApiIndex: ElectronApiIndex
        }
      }
    `
  }

  export namespace WithRespIpc{
    export const main: string = dedent`
      ipcMain.handle('openFileDialog', openFileDialog)

      // openFileDialog
      export async function openFileDialog(ev: Electron.IpcMainInvokeEvent, filters: Electron.FileFilter[]): Promise<string[] | undefined>{
        let window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(ev.sender)
      
        if(window == null) throw new Error('Window is null.')
      
        return await dialog.showOpenDialogSync(window, { filters: filters, properties: ['openFile'] })
      }
    `
    export const renderer: string = dedent`
      let dialogFilter: Electron.FileFilter[] = [
        {
          extensions: ['*jpg'], 
          name: 'JPEG'
        }
      ]

      paths = await window.electronApiIndex.buildin.openFileDialog(dialogFilter)
    `
    export const preloadImplement: string = dedent`
      import {contextBridge, ipcRenderer} from 'electron'

      const ElectronApi: ElectronApiIndex = {
        custom: {
          shikiCodeToHtml: (code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>) => ipcRenderer.invoke('shikiCodeToHtml', code, options)
        },
        buildin: ElectronApiBuildin_
      }

      contextBridge.exposeInMainWorld('electronApiIndex', ElectronApi)
    `
    export const preloadDeclaration: string = dedent`
      import * as _shikijs_types from '@shikijs/types'
      import {BundledLanguage, BundledTheme} from "shiki"

      import { ElectronApiBuildin } from './buildin'

      export interface ElectronApiIndexCustom{
        shikiCodeToHtml: (code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>) => Promise<string>,
      }

      export interface ElectronApiIndex{
        custom: ElectronApiIndexCustom,
        buildin: ElectronApiBuildin
      }

      declare global{
        interface Window{
          electronApiIndex: ElectronApiIndex
        }
      }
    `
  }
}