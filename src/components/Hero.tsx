import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
      <div className="max-w-text text-center">
        <h1 className="text-hero font-display font-semibold text-foreground">
          We build brands that grow online.
        </h1>

        <p className="mt-8 text-lg text-muted leading-relaxed">
          A digital studio for ambitious companies. We design brands, ship websites, and run growth programs that move the metrics that matter.
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-foreground transition-colors duration-400"
          >
            Start a Project
          </Link>
          <Link
            href="#work"
            className="px-6 py-3 text-sm font-medium text-foreground border border-border hover:border-foreground transition-colors duration-400"
          >
            View Work
          </Link>
        </div>
      </div>
    </section>
  )
}
