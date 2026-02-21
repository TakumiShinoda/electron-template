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
      window.electronApi.openDialog({message: 'Dialog by preload process.'})
    `
    export const preload: string = dedent`
      import {contextBridge, ipcRenderer} from 'electron'

      contextBridge.exposeInMainWorld('electronApi', {
        openDialog: (options: Electron.MessageBoxOptions) => ipcRenderer.send('openDialog', options),
      })
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

      await window.electronApi.openFileDialog(dialogFilter)
    `
    export const preload: string = dedent`
      import {contextBridge, FileFilter, ipcRenderer} from 'electron'
      
      contextBridge.exposeInMainWorld('electronApi', {
        openFileDialog: (filters: FileFilter[]) => ipcRenderer.invoke('openFileDialog', filters)
      })
    `
  }
}