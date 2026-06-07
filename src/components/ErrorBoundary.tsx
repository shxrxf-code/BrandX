'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center px-6">
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                Error
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
                Something went wrong
              </h2>
              <p className="text-white/55 mb-8 max-w-md mx-auto">
                A render error occurred. Please refresh to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3.5 bg-white text-black rounded-full font-medium text-sm uppercase tracking-wider hover:bg-accent hover:text-white transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
