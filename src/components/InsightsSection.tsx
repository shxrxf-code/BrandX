'use client'

import Link from 'next/link'
import { useCursor } from '@/components/providers/CursorProvider'
import MagneticButton from '@/components/ui/MagneticButton'

const articles = [
  {
    title: 'The Future of Digital Experience Design',
    category: 'Design',
    readTime: '8 min read',
    gradient: 'from-blue-500/20 via-purple-500/10 to-transparent',
  },
  {
    title: 'AI-Driven Development: What Works in 2026',
    category: 'Technology',
    readTime: '12 min read',
    gradient: 'from-violet-500/20 via-indigo-500/10 to-transparent',
  },
  {
    title: 'Measuring ROI of Great Design',
    category: 'Strategy',
    readTime: '6 min read',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
]

export default function InsightsSection() {
  const { setCursor } = useCursor()

  return (
    <section className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="scene-eyebrow">Insights</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
              Knowledge we
              <br />
              <span className="text-accent">want to share.</span>
            </h2>
          </div>
          <MagneticButton
            cursorText="Read More"
            as="a"
            href="/insights"
            className="text-sm text-muted hover:text-foreground transition-colors duration-400 flex items-center gap-2 group"
          >
            View all articles
            <span className="group-hover:translate-x-1 transition-transform duration-400">→</span>
          </MagneticButton>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, i) => (
            <Link
              key={article.title}
              href="/insights"
              className="group relative rounded-2xl overflow-hidden border border-border bg-subtle aspect-[4/3] md:aspect-auto md:min-h-[400px]"
              onMouseEnter={() => { setCursor('Read', 'expand') }}
              onMouseLeave={() => { setCursor(null, 'default') }}
            >
              <div
                className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                style={{ background: `radial-gradient(ellipse at center, ${article.gradient})` }}
              />

              <div className="absolute inset-0 dot-grid opacity-20" />

              <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-accent tracking-[0.2em] uppercase font-medium">
                    {article.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-dark" />
                  <span className="text-[10px] text-muted tracking-wide">
                    {article.readTime}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight leading-tight group-hover:text-accent transition-colors duration-400">
                    {article.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 text-sm text-muted group-hover:text-foreground transition-colors duration-400">
                    <span>Read more</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-400">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
