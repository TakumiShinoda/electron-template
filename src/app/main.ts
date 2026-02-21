import {app, BrowserWindow, ipcMain} from 'electron'

import {distPath} from '../../dev/devPath'
import {openDialog, openFileDialog} from './ipcMain/dialogs'
import {closeWindow, getSrcFromDist, maximizeWindow, minimizeWindow} from './ipcMain/builtin/system'
import { codeToHtmlWrap } from './ipcMain/builtin/shikiWraper'

let mainWindow: BrowserWindow | undefined = undefined

app.on('ready', () => {
  mainWindow = new BrowserWindow({
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
  mainWindow.loadURL(`${distPath.views('/index/index.html')}`)

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      if(mainWindow == undefined) return

      mainWindow.show()
    }, 1000)
  })

  ipcMain.handle('openFileDialog', openFileDialog)
  ipcMain.handle('shikiCodeToHtml', codeToHtmlWrap)
  ipcMain.handle('getSrcFromDist', getSrcFromDist)
  ipcMain.on('openDialog', openDialog)
  ipcMain.on('maximizeWindow', maximizeWindow)
  ipcMain.on('minimizeWindow', minimizeWindow)
  ipcMain.on('closeWindow', closeWindow)

  mainWindow.on('closed', () => {
    mainWindow = undefined
    
    console.log('exitApp')
    process.exit(0)
  })
})
