import {Menu, Tray} from 'electron'

import './globals'
import { distPath } from '../../dev/devPath'

export function setupTray(){
  MainTray = new Tray(distPath.buildIcons('/default.ico'))

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