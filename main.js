const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')

const isDev = process.argv.includes('--dev') || process.env.NODE_ENV === 'development'

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: '#1a1510',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, 'dist/renderer/index.html'))
  }
}

// IPC handlers
ipcMain.handle('app:version', () => app.getVersion())
ipcMain.handle('app:platform', () => process.platform)
ipcMain.handle('app:home-path', () => app.getPath('home'))
ipcMain.handle('shell:open-external', (_event, url) => shell.openExternal(url))
ipcMain.handle('shell:show-item', (_event, filePath) => shell.showItemInFolder(filePath))

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
