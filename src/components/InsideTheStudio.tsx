'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const studioItems = [
  {
    title: 'Strategy Lab',
    subtitle: 'Whiteboards, frameworks, battle-tested methods',
    gradient: 'from-blue-500/15 via-indigo-500/5 to-transparent',
    border: 'border-blue-500/20',
    accent: '#5B5BFF',
  },
  {
    title: 'Design Studio',
    subtitle: 'Figma, prototyping, design tokens at scale',
    gradient: 'from-cyan-500/15 via-blue-500/5 to-transparent',
    border: 'border-cyan-500/20',
    accent: '#22D3EE',
  },
  {
    title: 'Engineering Hub',
    subtitle: 'TypeScript, Next.js, headless architectures',
    gradient: 'from-emerald-500/15 via-teal-500/5 to-transparent',
    border: 'border-emerald-500/20',
    accent: '#34D399',
  },
  {
    title: 'QA & Performance',
    subtitle: 'Automated testing, Lighthouse 90+, CI/CD',
    gradient: 'from-orange-500/15 via-amber-500/5 to-transparent',
    border: 'border-orange-500/20',
    accent: '#F97316',
  },
]

const tools = [
  'Figma', 'Next.js', 'TypeScript', 'GSAP', 'Framer Motion',
  'Tailwind CSS', 'Lenis', 'Three.js', 'Node.js', 'Vercel',
  'Storybook', 'Playwright', 'Lighthouse', 'Sentry', 'Datadog',
]

export default function InsideTheStudio() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.studio-item')
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { y: 60, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }

      const toolEls = toolsRef.current?.querySelectorAll('.tool-chip')
      if (toolEls) {
        toolEls.forEach((tool, i) => {
          gsap.fromTo(
            tool,
            { y: 20, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: i * 0.04 + 0.3,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: toolsRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-subtle py-24 md:py-32 overflow-hidden">
      <div className="dot-grid-sm absolute inset-0 opacity-30 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 relative z-10">
        <div className="mb-16">
          <span className="scene-eyebrow">Inside The Studio</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            Where ideas become
            <br />
            <span className="text-accent">production reality.</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-24">
          {studioItems.map((item) => (
            <div
              key={item.title}
              className="studio-item group relative rounded-2xl border border-border bg-background overflow-hidden min-h-[200px] md:min-h-[240px] cursor-pointer"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.gradient})` }}
              />

              <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: item.accent }}
                  />
                  <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: item.accent }}>
                    Discipline
                  </span>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={toolsRef}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] text-muted tracking-[0.2em] uppercase font-mono">Toolchain</span>
            <div className="h-[1px] flex-1 bg-border" />
          </div>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="tool-chip inline-flex px-4 py-2 rounded-full border border-border-light text-xs text-muted bg-background/50 hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all duration-400"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
