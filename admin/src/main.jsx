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
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import ErrorBoundary from "../pages/ErrorBoundary.jsx";

// Import both routers
import { BrowserRouter, HashRouter } from "react-router-dom";

// Detect if running inside Electron
const isElectron = navigator.userAgent.toLowerCase().includes("electron");

// Determine router basename: allow Vite's BASE_URL or detect '/admin' path when proxied
const baseFromEnv = import.meta.env.BASE_URL || "/";
const routerBasename =
  baseFromEnv && baseFromEnv !== "/"
    ? baseFromEnv.replace(/\/$/, "")
    : (typeof window !== 'undefined' && window.location.pathname.startsWith("/admin") ? "/admin" : "/");

// Choose router based on environment
const Router = isElectron ? HashRouter : BrowserRouter;

// Handle legacy direct URL: /adminlogin -> /admin/login
if (typeof window !== 'undefined') {
  const p = window.location.pathname.replace(/\/+$|^\/+/g, "");
  if (p === 'adminlogin' || p === 'adminlogin/') {
    const newPath = '/admin/login';
    window.history.replaceState({}, '', newPath + window.location.search + window.location.hash);
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename={routerBasename}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  </StrictMode>
);
