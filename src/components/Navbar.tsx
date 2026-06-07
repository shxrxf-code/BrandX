import Link from 'next/link'

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="max-w-content mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-foreground text-lg font-semibold tracking-tight"
        >
          Brandex
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted hover:text-foreground transition-colors duration-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-block text-sm px-4 py-2 border border-border text-foreground hover:bg-foreground hover:text-background transition-colors duration-400"
        >
          Start a Project
        </Link>
      </nav>
    </header>
  )
}
