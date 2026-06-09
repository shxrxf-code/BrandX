'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const metrics = [
  { value: '200+', label: 'Projects Delivered', suffix: '' },
  { value: '50+', label: 'Team Members', suffix: '' },
  { value: '98%', label: 'Client Satisfaction', suffix: '' },
  { value: '8+', label: 'Years of Excellence', suffix: 'Years' },
]

const stats = [
  { value: '350%', label: 'Avg. ROI for clients', desc: 'Measured across all campaigns and projects' },
  { value: '3.2x', label: 'Faster time-to-market', desc: 'Through optimized agile workflows' },
  { value: '94%', label: 'Repeat client rate', desc: 'Trust built through consistent delivery' },
]

export default function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll('.metric-value')

      if (counters) {
        counters.forEach((counter) => {
          ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                counter,
                { scale: 0.5, opacity: 0, y: 40 },
                {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  duration: 1.2,
                  ease: 'elastic.out(1, 0.5)',
                }
              )
            },
            once: true,
          })
        })
      }

      const bars = sectionRef.current?.querySelectorAll('.stat-bar')
      if (bars) {
        bars.forEach((bar, i) => {
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: '100%',
              duration: 1.5,
              delay: i * 0.2,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: bar,
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
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-20">
          <span className="scene-eyebrow">By the Numbers</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            We don&apos;t just create.
            <br />
            <span className="text-accent">We deliver.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-32">
          {metrics.map((metric, i) => (
            <div key={metric.label} className="text-center md:text-left">
              <span
                ref={(el) => { counterRefs.current[i] = el }}
                className="metric-value inline-block text-5xl md:text-7xl font-display font-bold text-accent tracking-tight"
              >
                {metric.value}
              </span>
              <p className="text-sm text-muted mt-2 tracking-wide">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative p-8 rounded-2xl border border-border bg-subtle">
              <div className="stat-bar absolute top-0 left-0 h-[2px] bg-accent rounded-full" style={{ width: '0%' }} />
              <span className="text-3xl md:text-4xl font-display font-bold text-accent block mb-3">
                {stat.value}
              </span>
              <h4 className="text-base font-display font-semibold tracking-tight mb-2">
                {stat.label}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
