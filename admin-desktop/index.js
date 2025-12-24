const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");

// MUST be set early for Windows notifications
app.setName("Macview Admin Dashboard");
app.setAppUserModelId("com.macviewtravels.admin");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173/#/adminlogin");
    mainWindow.webContents.openDevTools();
  } else {
    const possiblePaths = [
      path.join(process.resourcesPath, "frontend", "dist", "index.html"),
      path.join(app.getAppPath(), "frontend", "dist", "index.html"),
      path.join(__dirname, "frontend", "dist", "index.html"),
    ];

    let foundPath = null;

    for (const p of possiblePaths) {
      console.log("🔍 Checking:", p);
      if (fs.existsSync(p)) {
        foundPath = p;
        console.log("✅ Found index.html at:", p);
        break;
      }
    }

    if (!foundPath) {
      console.error("❌ index.html NOT FOUND in any expected location");
      console.error("❌ process.resourcesPath:", process.resourcesPath);
      console.error("❌ app.getAppPath():", app.getAppPath());
      console.error("❌ __dirname:", __dirname);
      return;
    }

    // Load the file and navigate to admin login route
    mainWindow.loadFile(foundPath).then(() => {
      mainWindow.webContents.executeJavaScript(`
        if (window.location.hash !== '#/adminlogin') {
          window.location.hash = '#/adminlogin';
        }
      `);
    }).catch((err) => {
      console.error("❌ Failed to load file:", err);
    });
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.on("did-fail-load", (_, code, desc) => {
    console.error("❌ Failed to load:", code, desc);
  });

  mainWindow.webContents.on("console-message", (_, level, message) => {
    console.log("🖥 Renderer:", message);
  });
}

// 🔔 System notifications
ipcMain.on("notify", (_, { title, body }) => {
  new Notification({
    title,
    body,
    icon: path.join(process.resourcesPath, "icon.ico"),
  }).show();
});

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
