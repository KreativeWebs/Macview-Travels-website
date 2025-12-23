// Disable console logs in production
if (import.meta.env.PROD) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";

// Import both routers
import { BrowserRouter, HashRouter } from "react-router-dom";

// Detect if running inside Electron
const isElectron = navigator.userAgent.toLowerCase().includes("electron");

// Choose router based on environment
const Router = isElectron ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  </StrictMode>
);
