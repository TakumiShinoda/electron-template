import fs from 'fs'
import { BrowserWindow } from "electron"

import { distPath } from "../../../../dev/devPath"

export function getSrcFromDist(_: Electron.IpcMainInvokeEvent, pathFromDist: string){
  return new Promise((res, rej) => {
    try{
      res(fs.readFileSync(`${distPath.bundle(pathFromDist)}`).toString())
    }catch(err){
      rej(err)
    }
  })
}

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