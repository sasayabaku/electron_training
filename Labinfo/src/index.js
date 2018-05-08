// Electronの読み込み
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

// mainWindow変数の初期化
var mainWindow = null;

// 画面を表示
// index.htmlを読み込む
app.on('ready', function() {
  // 画面表示
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Developer Tool の起動
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
