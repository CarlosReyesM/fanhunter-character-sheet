const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(
  path.join(__dirname, '../../FHDB.db'),
  (err) => {
    if (err) console.error('Database opening error: ', err);
  },
);

ipcMain.on('asynchronous-message', (event, arg) => {
  if (arg) {
    db.all(arg, (err, rows) => {
      event.reply('asynchronous-reply', (err && err.message) || rows);
    });
  }
});
