const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../FHDB.db',
    debug: true
  },
});

/*
  this way we can set dynamically the database for dev or production 
const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: process.env.SQLITE_FILENAME
  })
});
 */

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const mainMenuTemplate = [
  {
    label: 'Field',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createNewWindow();
        },
      },
      {
        label: 'Clear Item',
        click() {
          mainWindow.webContents.send('Item:clear');
        },
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Dev Tools',
    submenu: [
      { role: 'reload' },
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}

let mainWindow;
let newWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('close', () => {
    mainWindow = null;
  });

  // Open the DevTools.
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools();
  }

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);
};

const createNewWindow = () => {
  if (newWindow) {
    return;
  }
  // Create the browser window.
  newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
    parent: mainWindow,
    modal: true,
  });

  // and load the index.html of the app.
  newWindow.loadFile(path.join(__dirname, 'secondWindow.html'));

  newWindow.on('close', () => {
    newWindow = null;
  });

  // Open the DevTools.
  if (process.ENV !== 'production') {
    newWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
app.on('browser-window-blur', async ()  => {
  const firstUser = await knex
    .select()
    .table('users')
    .catch(e => console.log(e));
  console.log(firstUser);
});

ipcMain.on('Item:sender', (_e, item) => console.log(item));
