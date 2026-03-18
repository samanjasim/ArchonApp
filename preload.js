const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('archon', {
  app: {
    getVersion: () => ipcRenderer.invoke('app:version'),
    getPlatform: () => ipcRenderer.invoke('app:platform'),
    getHomePath: () => ipcRenderer.invoke('app:home-path'),
  },
  shell: {
    openInBrowser: (url) => ipcRenderer.invoke('shell:open-external', url),
    revealInExplorer: (path) => ipcRenderer.invoke('shell:show-item', path),
  },
})
