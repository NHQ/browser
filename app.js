var app = require('app')
var bowser = require('browser-window')
var Menu = require('menu')
var MenuItem = require('menu-item')

app.on('ready', function(){
  var window = new bowser({
    width: 640,
    height: 480
  })
  window.loadUrl('file://' + __dirname + '/public/index.html')
  window.openDevTools()
  var menu = Menu.buildFromTemplate([{
    label: 'options',
    submenu: [{
      label: 'close',
      click: function(){
        app.quit()
      }
    }]
  }])
  console.log(Object.keys(app))
  Menu.setApplicationMenu(menu)
})

