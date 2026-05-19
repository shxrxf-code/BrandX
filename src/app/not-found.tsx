import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h2 className="font-display text-8xl md:text-9xl font-bold text-gradient-blue mb-4">
          404
        </h2>
        <p className="text-text-secondary text-lg mb-2">
          Page not found
        </p>
        <p className="text-text-muted text-sm mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-primary inline-block px-8 py-3 text-sm font-medium tracking-wide"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
