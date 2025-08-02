"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={this.state.error!} retry={this.retry} />;
      }

      return <DefaultErrorFallback error={this.state.error!} retry={this.retry} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="mb-6">
          <AlertTriangleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-4">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV === "development" && (
            <details className="text-left bg-red-950/20 border border-red-900/30 rounded-lg p-4 mb-4">
              <summary className="cursor-pointer text-red-400 font-medium">Error Details</summary>
              <pre className="text-sm text-red-300 mt-2 overflow-auto">
                {error.message}
                {error.stack && `\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
        <button
          onClick={retry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:from-blue-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Try Again
        </button>
      </motion.div>
    </div>
  );
}

export default ErrorBoundary;