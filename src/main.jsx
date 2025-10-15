import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { SpeedInsights } from "@vercel/speed-insights/next";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SpeedInsights>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </SpeedInsights>
    </BrowserRouter>
  </StrictMode>
);
