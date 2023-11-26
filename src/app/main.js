const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const electronReload = require('electron-reload')('./dist/');

const {distPath} = require('../../dev/path');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 770,
    resizable: true,
    movable: true,
    webPreferences: {
      webviewTag: true,
      preload: `${__dirname}/preload.js`
    }
    // transparent: true,
    // titleBarStyle: 'hidden',
    // frame: false,
  });
  mainWindow.loadURL('file://' + distPath.views('/index/index.html'));

  ipcMain.on('openDialog', async () => {
    dialog.showMessageBox(mainWindow, {message: 'Dialog by main process.'})
  })

  ipcMain.handle('openFileDialog', async (_, filters) => {
    return await dialog.showOpenDialogSync(mainWindow, { filters: filters ,properties: ['openFile'] });
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
