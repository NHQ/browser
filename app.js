#!/usr/bin/env electron 

var fs = require('fs')
var path = require('path')
var url = require('url')
var mime = require('mime')
var net = require('net')
var argv = require('minimist')(process.argv.slice(2))
let port = 11010

fs.exists(__dirname + '/ecstatus', boo => {
  if(boo){
    let cwd = process.cwd()
    if(argv._[0]){
      let loc = cwd + '!' + argv._[0]
      let socket = new net.Socket({
        readable: true,
        writeable: false
      })
      socket.connect(port).write(loc)
      socket.end(() => process.exit())
    }
  }
  else{ // init 
    var electron = require('electron')
    var app = electron.app
    var bowser = electron.BrowserWindow 
    var Menu = electron.Menu
    var MenuItem = electron.MenuItem
    var ipc = electron.ipcMain 
    var ses = electron.session
    var session, windows = {}, screen, screenSize = []
    var lock
    fs.createWriteStream(lock = __dirname + '/ecstatus')
    process.on('exit', () => fs.unlinkSync(lock))
    let server = new net.Server
    server.listen(port, e => e && console.log(e))
    server.on('connection', socket => {
      socket.on('data', loc => {
        // is it a url or file?
// TODO: electron seems to be cacheing files from localhost >:^(
        loc = loc.toString()
        loc = loc.split('!')
        let cwd = loc[0]
        loc = loc.slice(1).join('!')
        let p = url.parse(loc)
        console.log(p, loc)
        if(p.protocol){
          screen.loadURL(loc)
          screen.show()
          windows[loc] = screen
          screen.openDevTools()

          // replace this redundant screen ready device with react reduccs native aboriginal art
          screen = new bowser({
            show: false,
            backgroundColor: 'transparent'
          })
          screen.hide()
        }
        else {
          let rpath = path.resolve(cwd, loc)
          let ext = path.extname(rpath).slice(1) 
          let type = mime.getType(ext)
          // TODO: handle file types and write html container
          fs.stat(rpath, function(err, fi){
            if(err) process.stderr.write(err)
            else{
              screen.loadURL(loc = 'file://' + rpath)
              
              
              screen.show()
              
                //proof that disappearing fullscreen windows are still there (but invisible)
              //  for(w in windows) windows[w].show()
              
              windows[loc] = screen
              
              //set next screen, whoopee!
              screen = new bowser({
                show: false,
                backgroundColor: 'transparent'
              })
              //screen.setFullScreen(true)
              screen.hide()
              /*
              let window = new bowser({
                width: screenSize[0],
                height: screenSize[1]
              })
              window.loadURL('file://' + file)
              window.openDevTools()
              console.log(loc, file, fi)
              */
            }
          }) 
        }
      })  
    })
    ipc.on('screenxy', (evt, val) => {
      screenSize = val
      screen.setFullScreen(false)
      console.log(val)
    }) 

    app.on('ready', function(){
      session = ses.defaultSession//fromPartition('')
      session.clearCache(e => e && console.log(e))
      screen = new bowser({
        show: false,
        backgroundColor: 'transparent'
      })
      //screen.webContents.session.clearCache(e => e && console.log(e))
      screen.setFullScreen(true)
      screen.hide()
      screen.loadURL('file://'+__dirname +'/public/screenxy.html')

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
  }
})
