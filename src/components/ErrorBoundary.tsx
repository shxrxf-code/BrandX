'use client'

import { useState, useEffect } from 'react'

export default function ErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Caught error:', event.error)
      setHasError(true)
    }
    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      console.error('Caught rejection:', event.reason)
      setHasError(true)
    }

    window.addEventListener('error', errorHandler)
    window.addEventListener('unhandledrejection', unhandledRejectionHandler)

    return () => {
      window.removeEventListener('error', errorHandler)
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler)
    }
  }, [])

  if (hasError) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary px-8 py-3 text-sm font-medium tracking-wide"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
