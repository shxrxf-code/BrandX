'use client'

import Link from 'next/link'
import MagneticButton from '@/components/ui/MagneticButton'

const footerLinks: Record<string, { href: string; label: string; external?: boolean }[]> = {
  Navigation: [
    { href: '/work', label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'Studio' },
    { href: '/contact', label: 'Contact' },
  ],
  Services: [
    { href: '/services#web', label: 'Web Design' },
    { href: '/services#brand', label: 'Brand Identity' },
    { href: '/services#ux', label: 'UI/UX Design' },
    { href: '/services#seo', label: 'SEO & Growth' },
  ],
  Connect: [
    { href: 'mailto:hello@brandexdigital.in', label: 'hello@brandexdigital.in', external: true },
    { href: 'https://twitter.com/brandex', label: 'Twitter / X', external: true },
    { href: 'https://linkedin.com/company/brandex', label: 'LinkedIn', external: true },
    { href: 'https://instagram.com/brandex', label: 'Instagram', external: true },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-subtle border-t border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-24">
          <div className="lg:col-span-1">
          <Link
            href="/"
            className="inline-block"
          >
              <span className="text-2xl font-display font-bold tracking-tight text-foreground">
                Brandex
                <span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted mt-4 leading-relaxed max-w-xs">
              A digital experience studio engineering premium digital products 
              that drive business growth.
            </p>

            <div className="mt-8 flex items-center gap-4">
              {['TW', 'LI', 'IG'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-xs text-muted hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-400"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs text-muted tracking-[0.2em] uppercase font-medium mb-6">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 group inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && (
                        <span className="text-[10px] text-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                          ↗
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Brandex Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted hover:text-foreground transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted hover:text-foreground transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
