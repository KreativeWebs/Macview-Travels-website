import React from "react";

// Example logger function for frontend (replace with Sentry or backend API)
const logError = (error, errorInfo) => {
  // You can send this to your backend for persistent logging
  fetch("/api/log-client-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error: error.toString(), errorInfo })
  }).catch(() => {
    // fallback logging if API fails
    console.error("Failed to send error to server:", error, errorInfo);
  });
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Replace console.error with logger
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h2>Something went wrong</h2>
          <p>We’re working to fix it. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
