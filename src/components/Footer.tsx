import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <Link href="/" className="text-foreground text-lg font-semibold">
          Brandex
        </Link>

        <ul className="flex flex-wrap items-center gap-8 text-sm text-muted">
          <li>
            <Link href="/work" className="hover:text-foreground transition-colors duration-400">
              Work
            </Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-foreground transition-colors duration-400">
              Services
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-foreground transition-colors duration-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-foreground transition-colors duration-400">
              Contact
            </Link>
          </li>
        </ul>

        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Brandex Digital
        </p>
      </div>
    </footer>
  )
}
