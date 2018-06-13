const {Tray, app, BrowserWindow, Menu} = require('electron');
const {distPath, srcPath} = require('../dev/path');

var mainWindow = null;

app.on('ready', () => {
  var tray = new Tray(srcPath.images('/menuicon.png').toString());
  const contextMenu = Menu.buildFromTemplate([
    {label: 'ウィンドウの表示', click: (e) => {showWindow()}},
  ])

  tray.setToolTip('Electron-template-menubar');
  tray.setContextMenu(contextMenu);
});

function showWindow(){
  if(mainWindow == null){
    mainWindow = new BrowserWindow({
      width: 640,
      height: 480,
      resizable: false,
      movable: true,
    });
    mainWindow.loadURL('file://' + distPath.views('/index/index.html'));

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
}
