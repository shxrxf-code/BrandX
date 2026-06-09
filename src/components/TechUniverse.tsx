'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const technologyGroups = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
  },
  {
    category: 'Backend & Infra',
    items: ['Node.js', 'PostgreSQL', 'Docker', 'Redis'],
  },
  {
    category: 'AI & Intelligence',
    items: ['Python', 'AI', 'GraphQL'],
  },
  {
    category: 'Mobile & 3D',
    items: ['Flutter', 'Three.js', 'GSAP', 'Cloud'],
  },
]

export default function TechUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.tech-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8, delay: i * 0.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })

      const items = sectionRef.current?.querySelectorAll('.tech-item')
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { x: -20, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.6, delay: 0.3 + i * 0.05,
            ease: 'power4.out',
            scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="scene-eyebrow">Technology Stack</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            Engineered with
            <br />
            <span className="text-accent">precision.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {technologyGroups.map((group, gi) => (
            <div
              key={group.category}
              className="tech-card group relative rounded-2xl border border-border bg-subtle p-8 md:p-10 transition-all duration-700 hover:border-accent/30 hover:shadow-[0_20px_60px_-10px_rgba(59,130,246,0.15)]"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center group-hover:bg-accent/25 transition-colors duration-500">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-accent">
                  {group.category}
                </span>
              </div>

              <div className="space-y-3">
                {group.items.map((item, ii) => (
                  <div
                    key={item}
                    className="tech-item flex items-center gap-4 px-4 py-3 rounded-xl bg-background/50 border border-border/50 group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-500"
                  >
                    <span className="text-sm md:text-base font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
