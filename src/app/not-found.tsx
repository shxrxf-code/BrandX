import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-text">
        <p className="text-eyebrow uppercase text-muted mb-6">404</p>
        <h1 className="text-section font-semibold text-foreground">
          Page not found.
        </h1>
        <p className="mt-6 text-muted">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-12">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-foreground transition-colors duration-400"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
