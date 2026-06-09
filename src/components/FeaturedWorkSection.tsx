'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const featuredProjects = [
  {
    slug: 'solartech-energy',
    title: 'SolarTech Energy',
    tagline: 'Unified brand & platform across 14 markets',
    metrics: { label: 'Inbound Leads', value: '+340%' },
    image: '/work/solartech-hero.jpg',
    accent: '#3B82F6',
  },
  {
    slug: 'drifto',
    title: 'Drifto',
    tagline: 'Headless commerce with creator-led velocity',
    metrics: { label: 'Conversion Rate', value: '+260%' },
    image: '/work/drifto-hero.jpg',
    accent: '#60A5FA',
  },
]

export default function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.featured-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1, delay: 0.2 + i * 0.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
      })

      const images = sectionRef.current?.querySelectorAll('.featured-image')
      images?.forEach((img, i) => {
        gsap.fromTo(img,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 1.4, delay: 0.4 + i * 0.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: img, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })

      const metrics = sectionRef.current?.querySelectorAll('.metric-value')
      metrics?.forEach((metric) => {
        ScrollTrigger.create({
          trigger: metric,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(metric,
              { scale: 0.5, opacity: 0, y: 30 },
              { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }
            )
          },
          once: true,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="scene-eyebrow">Featured Work</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            Projects that
            <br />
            <span className="text-accent">define categories.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {featuredProjects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="featured-card group relative rounded-3xl border border-border bg-subtle overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden">
                <div className="absolute inset-0 featured-image">
                  <div className="w-full h-full bg-gradient-to-br from-accent/10 via-subtle to-transparent" />
                  <div className="absolute inset-0 dot-grid opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-8">
                      <span className="text-5xl md:text-7xl font-display font-bold text-foreground/10">
                        {p.title}
                      </span>
                      <p className="text-muted mt-2 text-sm md:text-base">{p.tagline}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-accent">{p.metrics.label}</span>
                  </div>
                  <div className="metric-value text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground">
                    {p.metrics.value}
                  </div>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-xl bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent transition-all duration-500">
                    <span className="text-2xl group-hover:translate-x-1 transition-transform duration-500">→</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted mb-1 block">Case Study</span>
                  <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight group-hover:text-accent transition-colors duration-400">
                    {p.title}
                  </h3>
                </div>
                <span className="text-lg font-mono text-accent group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
