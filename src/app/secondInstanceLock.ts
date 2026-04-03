import {app} from 'electron'

import './globals'

export function setupSecondInstanceLock(){
  app.on('second-instance', async () => {
    if(MainWindow != undefined){
      if(MainWindow.isMinimized()) MainWindow.restore()
      
      MainWindow.focus()
    }
  })

  if(!app.requestSingleInstanceLock()){
    app.quit()
    process.exit(0)
  }
}