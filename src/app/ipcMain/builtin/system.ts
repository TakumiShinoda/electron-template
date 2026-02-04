import { BrowserWindow } from "electron"

export function minimizeWindow(ev: Electron.IpcMainInvokeEvent) {
  let window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(ev.sender)
  
  if(window == null) throw new Error('Window is null.')
  
  window.minimize()
}

export function maximizeWindow(ev: Electron.IpcMainInvokeEvent) {
  let window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(ev.sender)
  
  if(window == null) throw new Error('Window is null.')
  
  window.maximize()
}

export function closeWindow(ev: Electron.IpcMainInvokeEvent) {
  let window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(ev.sender)
  
  if(window == null) throw new Error('Window is null.')
  
  window.close()
}