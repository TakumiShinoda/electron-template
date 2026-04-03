import {app, BrowserWindow, ipcMain} from 'electron'

import './globals'
import { distPath } from '../../dev/devPath'
import { openDialog, openFileDialog } from './ipcMain/dialogs'
import { closeWindow, getSrcFromDist, maximizeWindow, minimizeWindow } from './ipcMain/builtin/system'
import { codeToHtmlWrap } from './ipcMain/builtin/shikiWraper'
import { setupSecondInstanceLock } from './secondInstanceLock'
import { setupTray } from './tray'

setupSecondInstanceLock()

app.on('ready', () => {
  MainWindow = new BrowserWindow({
    width: 720,
    height: 480,
    minWidth: 720,
    minHeight: 480,
    resizable: true,
    movable: true,
    webPreferences: {
      webviewTag: true,
      preload: distPath.preload('/index.js'),
    },
    frame: false,
    show: false
  })

  MainWindow.loadURL(`${distPath.views('/index/index.html')}`)

  MainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      if(MainWindow == undefined) return

      MainWindow.show()
    }, 1000)
  })

  ipcMain.handle('openFileDialog', openFileDialog)
  ipcMain.handle('shikiCodeToHtml', codeToHtmlWrap)
  ipcMain.handle('getSrcFromDist', getSrcFromDist)
  ipcMain.on('openDialog', openDialog)
  ipcMain.on('maximizeWindow', maximizeWindow)
  ipcMain.on('minimizeWindow', minimizeWindow)
  ipcMain.on('closeWindow', closeWindow)

  MainWindow.on('closed', () => {
    MainWindow = undefined

    MainTray?.destroy()
    MainTray = undefined
    
    console.log('exitApp')
    process.exit(0)
  })

  setupTray()
})
