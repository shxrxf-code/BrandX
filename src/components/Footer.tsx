'use client'

import Link from 'next/link'

const footerLinks: Record<string, { href: string; label: string; external?: boolean }[]> = {
  Services: [
    { href: '/services', label: 'Web Development' },
    { href: '/services', label: 'UI/UX Design' },
    { href: '/services', label: 'Brand Identity' },
    { href: '/services', label: 'AI Solutions' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Our Work' },
    { href: '/contact', label: 'Contact' },
  ],
  Connect: [
    { href: 'mailto:hello@brandexdigital.in', label: 'hello@brandexdigital.in', external: true },
    { href: 'https://twitter.com/brandex', label: 'Twitter / X', external: true },
    { href: 'https://linkedin.com/company/brandex', label: 'LinkedIn', external: true },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-secondary border-t border-border">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-display font-bold tracking-tight text-foreground">
                Brandex<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted mt-3 leading-relaxed max-w-sm">
              We build digital products that drive real growth.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs text-muted uppercase font-semibold tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-muted hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && (
                        <span className="text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} Brandex Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
