import {BrowserWindow, Tray} from 'electron'

declare global {
  var MainWindow: BrowserWindow | undefined
  var MainTray: Tray | undefined
}

globalThis.MainWindow = undefined
globalThis.MainTray = undefined