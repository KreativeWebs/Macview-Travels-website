import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when a component crashes
      return (
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h2>Something went wrong 😕</h2>
          <p>We’re working to fix it. Please try again later.</p>
        </div>
      );
    }

    // Otherwise, render child components normally
    return this.props.children;
  }
}

export default ErrorBoundary;
