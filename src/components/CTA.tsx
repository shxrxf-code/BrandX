import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-40 md:py-56 px-6 md:px-12 border-t border-border">
      <div className="max-w-content mx-auto text-center">
        <h2 className="text-section font-semibold text-foreground max-w-text mx-auto">
          Let&apos;s build something great.
        </h2>
        <p className="mt-6 text-muted max-w-text mx-auto">
          We take on a small number of new projects each quarter. If you are working on something ambitious, we would love to hear from you.
        </p>
        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-foreground transition-colors duration-400"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </section>
  )
}
