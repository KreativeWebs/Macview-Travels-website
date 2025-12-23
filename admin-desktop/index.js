const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev"); // optional, for dev vs production

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
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

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
