const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev"); // optional, for dev vs production

// CRITICAL FOR WINDOWS NOTIFICATIONS - Set AppUserModelID
app.setAppUserModelId("com.macviewtravels.admin");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    // In development, load from Vite dev server
    win.loadURL("http://localhost:5173/#/adminlogin");
    win.webContents.openDevTools();
  } else {
    // In production, load from the packaged build
    win.loadFile(path.join(__dirname, "resources", "frontend", "dist", "index.html"));
  }
}

// System notification listener
ipcMain.on("notify", (event, { title, body }) => {
  const notification = new Notification({
    title, // this WILL now show correctly
    body,
  });

  notification.show();
});

app.whenReady().then(() => {
  // Set app name after app is ready
  app.setName("Macview Admin Dashboard");
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
