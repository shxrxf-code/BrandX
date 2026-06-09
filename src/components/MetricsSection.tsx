'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const metrics = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Team Members' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '8+', label: 'Years Active' },
]

const stats = [
  { value: '350%', label: 'Average ROI', desc: 'Measured across all campaigns and projects delivered in the last 24 months' },
  { value: '3.2x', label: 'Faster Time-to-Market', desc: 'Through optimized agile workflows and parallelized delivery streams' },
  { value: '94%', label: 'Repeat Client Rate', desc: 'Trust built through consistent delivery and measurable business impact' },
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

      const bars = sectionRef.current?.querySelectorAll('.stat-bar')
      bars?.forEach((bar, i) => {
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: '100%',
            duration: 1.5, delay: i * 0.2,
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
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="scene-eyebrow">Client Results</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            Numbers that
            <br />
            <span className="text-accent">tell the story.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-32">
          {metrics.map((m, i) => (
            <div key={m.label} className="text-center md:text-left">
              <span className="metric-value inline-block text-5xl md:text-7xl font-display font-bold text-accent tracking-tight">
                {m.value}
              </span>
              <p className="text-sm text-muted mt-2 tracking-wide">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="relative p-8 rounded-2xl border border-border bg-background">
              <div className="stat-bar absolute top-0 left-0 h-[2px] bg-accent rounded-full" style={{ width: '0%' }} />
              <span className="text-3xl md:text-4xl font-display font-bold text-accent block mb-3">
                {s.value}
              </span>
              <h4 className="text-base font-display font-semibold tracking-tight mb-2">{s.label}</h4>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
