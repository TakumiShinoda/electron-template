import dedent from 'ts-dedent'

export namespace ElectronFeaturesPageExampleCodes{
  export namespace Tray{
    export const main = dedent`
      import {Tray} from 'electron'

      let mainTray: Tray = new Tray('./build/icons/default.ico')
    
      mainTray.setToolTip('Electron Template')

      mainTray.setContextMenu(Menu.buildFromTemplate([
        {label: 'Open window', click: () => mainWindow?.show()},
        {label: 'Maximize window', click: () => mainWindow?.maximize()},
        {label: 'Minimize window', click: () => mainWindow?.minimize()},
        {type: 'separator'},
        {label: 'Exit', click: () => mainWindow?.close()}
      ]))
        
      mainTray.on('click', () => {
        mainWindow?.show()
      })
    `
  }
}