const {Tray, app, BrowserWindow, Menu} = require('electron');
const {distPath, srcPath} = require('../../dev/path');

var mainWindow = null;
var forceQuit = false;
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Quit',
    click: () => {
      forceQuit = true;
      app.quit();
    }
  },
])

app.on('will-quit', function () {
  console.log("will-quit");
  mainWindow = null;
});

app.on('before-quit', function (e) {
    console.log("before-quit");
});

app.on('ready', () => {
  var tray = new Tray(srcPath.images('/menuicon.png').toString());

  tray.setContextMenu(contextMenu);
  tray.setToolTip('Electron-template-menubar');

  tray.on('click', () => {
　　if(mainWindow != null){
      console.log('hoge')
      mainWindow.show();
    }
  });

  mainWindow = new BrowserWindow({
    width: 640,
    height: 480,
    resizable: false,
    movable: true,
  });
  mainWindow.loadURL('file://' + distPath.views('/index/index.html'));
  mainWindow.on('close', (e) => {
    console.log('close');
    if(forceQuit){
      mainWindow = null;
      app.quit();
    }else{
      console.log('hide');
      e.preventDefault();
      mainWindow.hide();
    }
  });
});
