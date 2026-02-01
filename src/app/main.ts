import {app, BrowserWindow, ipcMain} from 'electron'

import {distPath} from '../../dev/devPath'
import { openDialog, openFileDialog } from './ipcMain/dialogs'

let mainWindow: BrowserWindow | undefined = undefined

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 770,
    resizable: true,
    movable: true,
    webPreferences: {
      webviewTag: true,
      preload: distPath.preload('/index.js'),
    },
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
  ipcMain.on('openDialog', openDialog)

  mainWindow.on('closed', () => {
    mainWindow = undefined
    
    console.log('exitApp')
    process.exit(0)
  })
})
