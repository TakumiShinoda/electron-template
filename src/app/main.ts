import {app, BrowserWindow, ipcMain, Menu, Tray} from 'electron'

import './globals'
import {distPath} from '../../dev/devPath'
import {openDialog, openFileDialog} from './ipcMain/dialogs'
import {closeWindow, getSrcFromDist, maximizeWindow, minimizeWindow} from './ipcMain/builtin/system'
import { codeToHtmlWrap } from './ipcMain/builtin/shikiWraper'
import { setupSecondInstanceLock } from './secondInstanceLock'

function setupTray(){
  MainTray = new Tray('./build/icons/default.ico')

  MainTray.setToolTip('Electron Template')
  MainTray.setContextMenu(Menu.buildFromTemplate([
    {label: 'Open window', click: () => MainWindow?.show()},
    {label: 'Maximize window', click: () => MainWindow?.maximize()},
    {label: 'Minimize window', click: () => MainWindow?.minimize()},
    {type: 'separator'},
    {label: 'Exit', click: () => MainWindow?.close()}
  ]))
  MainTray.on('click', () => {
    MainWindow?.show()
  })
}

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
