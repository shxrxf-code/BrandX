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
        <p className="text-eyebrow uppercase text-muted mb-6">Error</p>
        <h1 className="text-section font-semibold text-foreground">
          Something went wrong.
        </h1>
        <p className="mt-6 text-muted">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-12 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-foreground transition-colors duration-400"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 text-sm font-medium text-foreground border border-border hover:border-foreground transition-colors duration-400"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
