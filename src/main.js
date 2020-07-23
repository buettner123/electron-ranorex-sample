const electron = require('electron'),
    path = require('path'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadURL('file://' + path.join(__dirname, './index.html'));
}

app.commandLine.appendSwitch('remote-debugging-port', '8315');

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
