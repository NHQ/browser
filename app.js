var fs = require('fs')
var electron = require('electron')
var app = electron.app
var bowser = electron.BrowserWindow 
var Menu = electron.Menu
var MenuItem = electron.MenuItem
var ipc = electron.ipcMain 
var window, screenSize = []

ipc.on('screenxy', (evt, val) => {
  screenSize = val
  console.log(val)  
}) 

app.on('ready', function(){
  let screen = new bowser({
    show: false,
    backgroundColor: 'transparent'
  })
  screen.setFullScreen(true)
  screen.hide()
  screen.loadURL('file://'+__dirname +'/public/screenxy.html')

  window = new bowser({
    width: 1080,
    height: 720,
    x: 0,
    y: 0,
    //fullscreen: true,
    show: false,
    frame: false
  })
  window.loadURL('file://' + __dirname + '/public/index.html')
  window.openDevTools()
  window.show()
  var menu = Menu.buildFromTemplate([{
    label: 'options',
    submenu: [{
      label: 'close',
      click: function(){
        app.quit()
      }
    }]
  }])
  Menu.setApplicationMenu(menu)
})

