
"use strict";

var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 640,
    height: 500
  });

  mainWindow.loadURL("file://" + __dirname + "/index.html");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});
