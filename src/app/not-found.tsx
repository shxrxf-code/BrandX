import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-text">
        <p className="text-xs text-accent font-semibold tracking-wider uppercase mb-4">404</p>
        <h1 className="text-heading-1 font-bold tracking-tight">
          Page not found.
        </h1>
        <p className="mt-4 text-muted">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
