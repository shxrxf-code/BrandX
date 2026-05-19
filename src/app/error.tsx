'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h2 className="font-display text-6xl md:text-8xl font-bold text-primary mb-4">
          Something went wrong
        </h2>
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn-primary px-8 py-3 text-sm font-medium tracking-wide"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
