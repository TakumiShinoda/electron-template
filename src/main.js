const electron = require('electron');
const {distPath} = require('../dev/path');

electron.app.on('ready', () => {
  mainWindow = new electron.BrowserWindow({
    width: 640,
    height: 480,
    resizable: false,
    movable: true,
  });
  mainWindow.loadURL('file://' + distPath.views('/index/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
