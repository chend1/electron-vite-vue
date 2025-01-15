const { app, BrowserWindow } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    // width: 1000,
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
  })
  if(process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5000')
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
})