'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const metrics = [
  { value: '200+', label: 'Projects Delivered', highlight: '200' },
  { value: '50+', label: 'Team Members', highlight: '50' },
  { value: '98%', label: 'Client Satisfaction', highlight: '98' },
  { value: '8+', label: 'Years Active', highlight: '8' },
]

const stats = [
  { value: '350%', label: 'Average ROI', desc: 'Measured across all campaigns and projects delivered in the last 24 months', bar: 100 },
  { value: '3.2x', label: 'Faster Time-to-Market', desc: 'Through optimized agile workflows and parallelized delivery streams', bar: 92 },
  { value: '94%', label: 'Repeat Client Rate', desc: 'Trust built through consistent delivery and measurable business impact', bar: 94 },
]

export default function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll('.metric-value')
      counters?.forEach((counter) => {
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(counter,
              { scale: 0.5, opacity: 0, y: 40 },
              { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
            )
          },
          once: true,
        })
      })

      const statEntries = sectionRef.current?.querySelectorAll('.stat-entry')
      statEntries?.forEach((entry, i) => {
        gsap.fromTo(entry,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7, delay: i * 0.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: entry, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })

      const bars = sectionRef.current?.querySelectorAll('.stat-fill')
      bars?.forEach((bar, i) => {
        const el = bar as HTMLElement
        const target = el.dataset.width || '100'
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: `${target}%`,
            duration: 1.2, delay: 0.4 + i * 0.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: bar, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-subtle py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="scene-eyebrow">Client Results</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            Measurable
            <br />
            <span className="text-accent">impact.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-24 md:mb-40">
          {metrics.map((m) => (
            <div key={m.label} className="text-center md:text-left">
              <span className="metric-value inline-block text-5xl md:text-7xl lg:text-8xl font-display font-bold text-accent tracking-tight">
                {m.value}
              </span>
              <p className="text-sm text-muted mt-3 tracking-wide">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-entry relative p-8 md:p-10 rounded-3xl border border-border bg-background transition-all duration-500 hover:border-accent/30 hover:shadow-[0_20px_60px_-10px_rgba(59,130,246,0.10)]"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl md:text-5xl font-display font-bold text-accent tracking-tight">
                  {s.value}
                </span>
                <h4 className="text-sm font-display font-semibold text-foreground">{s.label}</h4>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-6">{s.desc}</p>
              <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="stat-fill h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
                  data-width={s.bar}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
