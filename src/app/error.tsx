'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-text">
        <p className="text-xs text-accent font-semibold tracking-wider uppercase mb-4">Error</p>
        <h1 className="text-heading-1 font-bold tracking-tight">
          Something went wrong.
        </h1>
        <p className="mt-4 text-muted">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 text-sm font-medium text-foreground border border-border rounded-lg hover:border-accent transition-colors duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
