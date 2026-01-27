import {app, BrowserWindow, ipcMain, dialog, FileFilter} from 'electron'
import path from 'path'

import {distPath} from '../../dev/devPath'

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
    }
    // transparent: true,
    // titleBarStyle: 'hidden',
    // frame: false,
  })
  mainWindow.loadURL(`${distPath.views('/index/index.html')}`)

  ipcMain.on('openDialog', async () => {
    if(mainWindow == undefined) return

    dialog.showMessageBox(mainWindow, {message: 'Dialog by main process.'})
  })

  ipcMain.handle('openFileDialog', async (_, filters: FileFilter[]) => {
    if(mainWindow == undefined) return

    return await dialog.showOpenDialogSync(mainWindow, { filters: filters, properties: ['openFile'] })
  })

  mainWindow.on('closed', () => {
    mainWindow = undefined
    
    console.log('exitApp')
    process.exit(0)
  })
})
