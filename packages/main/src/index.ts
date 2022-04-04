import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { join } from 'path';
import { URL } from 'url';
const download = require('download-git-repo');
const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git');

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

// Install "Vue.js devtools"
if (import.meta.env.MODE === 'development') {
  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, VUEJS3_DEVTOOLS }) => installExtension(VUEJS3_DEVTOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    }))
    .catch(e => console.error('Failed install extension:', e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hiddenInset',
    transparent: true,
    vibrancy: 'hud',
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    if (import.meta.env.MODE === 'development') {
      mainWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', `file://${__dirname}`).toString();


  await mainWindow.loadURL(pageUrl);
};


app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('openDialog', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  return result;
});

ipcMain.handle('writeFile', async (event, path) => {
  console.log('path', path);
  fs.writeFileSync(`${path}/text.txt`, 'something');
});

ipcMain.handle('showInFinder', async (event, path) => {
  shell.showItemInFolder(path);
});

ipcMain.handle('getGitInfo', async (event, path) => {
  console.log('path', path);
  const git = simpleGit(path, { binary: 'git' });
  // const config = git.getConfig('user.name', 'global');
  // const branches = git.branchLocal();
  const config = git.listConfig('local');
  // const url = config['values']['.git/config']['remote.origin.url'];
  return config;
});

const url = 'https://git.woa.com/tengyu/fe-mono.git';
// const targetDir = path.resolve(process.cwd(), '');

ipcMain.handle('download', async (event, path) => {
  console.log('path', path);
  const targetDir = `${path.dirPath}/${path.projectName}`;
  fs.mkdir(targetDir, { recursive: true }, (err: any) => {
    if (err) throw err;
    download(
      `direct:${url}`,  // 模版地址
      targetDir,  // 目标文件夹
      { clone: true }, // 启用clone
      (err:any) => { // 回调函数
        if (err) {
          console.log('失败', err);
        } else {
          console.log('成功');
        }
      },
    );
  });
});


app.whenReady()
  .then(createWindow)
  .catch(e => console.error('Failed create window:', e));


// Auto-updates
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch(e => console.error('Failed check updates:', e));
}

