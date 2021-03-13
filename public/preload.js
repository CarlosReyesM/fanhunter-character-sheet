const {
  contextBridge,
  ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
      send: (data) => {
          return new Promise((resolve) => {
            ipcRenderer.once('asynchronous-reply', (_, arg) => {
              resolve(arg);
            });
            ipcRenderer.send('asynchronous-message', data);
          });
      },
  }
);