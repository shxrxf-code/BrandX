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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-6">
          Error
        </div>
        <h2 className="font-display text-5xl md:text-7xl font-semibold text-white mb-4 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-white/55 text-lg mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-8 py-3.5 bg-white text-black rounded-full font-medium text-sm uppercase tracking-wider hover:bg-accent hover:text-white transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3.5 border border-white/15 text-white rounded-full font-medium text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
