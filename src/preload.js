const electron = require('electron'),
    path = require('path'),
    BrowserView = electron.remote.BrowserView;

createBrowserView();

function createBrowserView() {
    const mainWindow = electron.remote.getCurrentWindow();
    const currentView = new BrowserView({
        webPreferences: {
            preload: path.join(__dirname, './renderer.js'),
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            enableRemoteModule: true
        }
    });
    mainWindow.addBrowserView(currentView);

    handleViewSizeChange(mainWindow, currentView);

    currentView.webContents.loadURL('file://' + path.join(path.resolve(__dirname), './view.html'));

    mainWindow.setBrowserView(currentView);
}

function handleViewSizeChange(mainWindow, viewToHandle) {
    const windowBounds = mainWindow.getContentBounds();

    setTimeout(() => {
        viewToHandle.setBounds({
            x: 0,
            y: 0,
            width: windowBounds.width,
            height: windowBounds.height
        });

        viewToHandle.setAutoResize({width: true, height: true});
    });
}
