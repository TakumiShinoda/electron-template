import { BrowserWindow, dialog } from "electron"

export async function openFileDialog(ev: Electron.IpcMainInvokeEvent, filters: Electron.FileFilter[]): Promise<string[] | undefined>{
  let window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(ev.sender)

  if(window == null) throw new Error('Window is null.')

  return await dialog.showOpenDialogSync(window, { filters: filters, properties: ['openFile'] })
}

export async function openDialog(ev: Electron.IpcMainEvent, options: Electron.MessageBoxOptions){
  let window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(ev.sender)

  if(window == null) throw new Error('Window is null.')
  
  await dialog.showMessageBox(window, options)
}