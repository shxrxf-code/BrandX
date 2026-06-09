'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FeaturedCaseStudySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.stat-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8, delay: i * 0.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })

      const meta = sectionRef.current?.querySelectorAll('.meta-row')
      meta?.forEach((row, i) => {
        gsap.fromTo(row,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.6, delay: 0.3 + i * 0.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-subtle py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-10">
          <span className="scene-eyebrow">Featured Case Study</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            SolarTech Energy
            <br />
            <span className="text-accent">+340% inbound leads.</span>
          </h2>
        </div>

        <div className="relative rounded-3xl border border-border bg-background overflow-hidden">
          <div className="relative aspect-[2/1] md:aspect-[3/1] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-transparent" />
            <div className="absolute inset-0 dot-grid opacity-[0.04]" />

            <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-accent/15 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[clamp(4rem,18vw,18rem)] font-display font-bold text-foreground/[0.03] tracking-tight select-none whitespace-nowrap pointer-events-none">
                SolarTech
              </span>
            </div>

            <div className="stat-card absolute top-[18%] right-[8%] px-5 py-3 rounded-xl border border-border/80 bg-subtle/90 backdrop-blur-md">
              <span className="text-2xl md:text-3xl font-display font-bold text-accent">+340%</span>
              <span className="text-[9px] text-muted-dark font-mono block mt-1">Inbound Leads</span>
            </div>

            <div className="stat-card absolute bottom-[22%] left-[6%] px-5 py-3 rounded-xl border border-border/80 bg-subtle/90 backdrop-blur-md">
              <span className="text-2xl md:text-3xl font-display font-bold text-accent">14</span>
              <span className="text-[9px] text-muted-dark font-mono block mt-1">Markets Unified</span>
            </div>

            <div className="stat-card absolute bottom-[12%] right-[18%] px-5 py-3 rounded-xl border border-border/80 bg-subtle/90 backdrop-blur-md">
              <span className="text-2xl md:text-3xl font-display font-bold text-accent">3x</span>
              <span className="text-[9px] text-muted-dark font-mono block mt-1">Engagement</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="meta-row p-8 md:p-10">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-3 block">Challenge</span>
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                Fragmented brand identity across 14 markets with a dated web platform that failed to inspire investor confidence.
              </p>
            </div>
            <div className="meta-row p-8 md:p-10">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-3 block">Solution</span>
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                Unified brand narrative with a premium visual system and modular web platform engineered for global scale.
              </p>
            </div>
            <div className="meta-row p-8 md:p-10 flex flex-col justify-center">
              <Link
                href="/work/solartech-energy"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4 transition-all"
              >
                Read full case study →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
