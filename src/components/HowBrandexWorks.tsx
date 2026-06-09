'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from '@/components/providers/CursorProvider'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const pillars = [
  {
    title: 'Deep Research',
    tagline: 'We start with questions, not answers',
    deliverable: 'Strategy Document',
    detail: 'Market analysis, competitor audit, user interviews, technical discovery — every project begins with a complete picture of the landscape.',
    accent: '#5B5BFF',
    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
  },
  {
    title: 'Design With Data',
    tagline: 'Every pixel has a purpose',
    deliverable: 'Design System',
    detail: 'Component libraries, interactive prototypes, accessibility-first UI — a systematic approach that ensures consistency at scale.',
    accent: '#22D3EE',
    gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
  },
  {
    title: 'Engineer For Scale',
    tagline: 'Production-ready from the first commit',
    deliverable: 'Platform Architecture',
    detail: 'Modular codebases, headless architectures, performance budgets — engineered to handle growth without technical debt.',
    accent: '#34D399',
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
  },
  {
    title: 'Ship With Confidence',
    tagline: 'Launch is just the beginning',
    deliverable: 'Performance Dashboard',
    detail: 'CI/CD pipelines, automated testing, real-time monitoring, post-launch optimization — we own the outcome beyond go-live.',
    accent: '#F97316',
    gradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
  },
]

export default function HowBrandexWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { setCursor } = useCursor()

  useEffect(() => {
    const ctx = gsap.context(() => {
      pillars.forEach((_, i) => {
        const card = sectionRef.current?.querySelector(`[data-pillar="${i}"]`)
        if (!card) return

        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )

        const line = card.querySelector('.pillar-line')
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              delay: i * 0.12 + 0.4,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-16 md:mb-24">
          <span className="scene-eyebrow">How Brandex Works</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            A repeatable system
            <br />
            <span className="text-accent">for predictable outcomes.</span>
          </h2>
        </div>

        <div className="space-y-6 md:space-y-8">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              data-pillar={i}
              className="group relative overflow-hidden rounded-2xl border border-border bg-subtle hover:bg-subtle-light transition-all duration-700"
              onMouseEnter={() => { setCursor('Explore', 'expand') }}
              onMouseLeave={() => { setCursor(null, 'default') }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 50%, ${pillar.gradient})` }}
              />

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: pillar.accent }}
                      />
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase font-medium"
                        style={{ color: pillar.accent }}
                      >
                        {pillar.tagline}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>

                  <div className="lg:w-96 xl:w-[420px] shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="pillar-line h-[2px] flex-1 origin-left"
                        style={{ background: pillar.accent }}
                      />
                      <span
                        className="text-xs font-mono font-medium tracking-wide whitespace-nowrap"
                        style={{ color: pillar.accent }}
                      >
                        {pillar.deliverable}
                      </span>
                    </div>
                    <p className="text-muted text-sm md:text-base leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
