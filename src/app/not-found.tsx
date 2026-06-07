import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(91,91,255,0.3) 0%, transparent 50%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="text-center px-6 relative z-10">
        <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-6">
          404
        </div>
        <h1 className="font-display text-7xl md:text-9xl font-semibold text-white tracking-[-0.04em] leading-[0.95] mb-6">
          Lost in
          <br />
          <span className="text-gradient-shine">the void</span>
        </h1>
        <p className="text-white/55 text-lg mb-2 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <p className="text-white/30 text-sm mb-10 max-w-md mx-auto">
          It happens to the best of us.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full font-medium text-sm uppercase tracking-wider hover:bg-accent hover:text-white transition-colors"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  )
}
