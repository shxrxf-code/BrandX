'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    number: '01',
    title: 'Web Development',
    desc: 'Custom web applications, headless CMS architectures, and scalable frontends built with modern frameworks.',
    metric: '100+',
    metricLabel: 'sites shipped',
  },
  {
    number: '02',
    title: 'UI/UX Design',
    desc: 'Research-driven design systems, interactive prototypes, and intuitive user flows crafted for conversion.',
    metric: '3x',
    metricLabel: 'avg. engagement lift',
  },
  {
    number: '03',
    title: 'Brand Identity',
    desc: 'Strategic brand systems including visual identity, typography, and guidelines that communicate unique value.',
    metric: '14',
    metricLabel: 'markets unified',
  },
  {
    number: '04',
    title: 'SEO & Performance',
    desc: 'Technical SEO audits, content strategy, and performance engineering for Lighthouse 90+ compliance.',
    metric: '90+',
    metricLabel: 'Lighthouse score',
  },
  {
    number: '05',
    title: 'AI Solutions',
    desc: 'Custom AI agents, LLM-powered features, and intelligent automation that transform business operations.',
    metric: '40%',
    metricLabel: 'efficiency gain',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll('.service-row')
      rows?.forEach((row, i) => {
        gsap.fromTo(row,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7, delay: i * 0.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })

      const orbs = sectionRef.current?.querySelectorAll('.svc-orb')
      orbs?.forEach((orb) => {
        gsap.to(orb, {
          y: -10,
          duration: 3 + Math.random() * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-subtle py-24 md:py-32 overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <div className="svc-orb absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/[0.04] blur-[80px]" />
        <div className="svc-orb absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/[0.03] blur-[60px]" style={{ animationDelay: '1.5s' }} />
        <span className="absolute right-10 top-1/4 text-[clamp(12rem,20vw,24rem)] font-display font-bold text-foreground/[0.015] select-none pointer-events-none leading-none">
          05
        </span>
      </div>
      <div className="max-w-content mx-auto px-6 md:px-10 relative z-10">
        <div className="mb-16">
          <span className="scene-eyebrow">Services</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            What we
            <br />
            <span className="text-accent">deliver.</span>
          </h2>
        </div>

        <div className="divide-y divide-border">
          {services.map((s) => (
            <div
              key={s.title}
              className="service-row group py-8 md:py-10 lg:py-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 lg:gap-16 cursor-pointer transition-all duration-500 hover:pl-4"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] text-muted-dark md:w-12 shrink-0">
                {s.number}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-400">
                  {s.title}
                </h3>
                <p className="text-sm text-muted mt-2 max-w-lg leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="flex items-baseline gap-3 shrink-0">
                <span className="text-3xl md:text-4xl font-display font-bold text-accent/80 group-hover:text-accent transition-colors duration-400">
                  {s.metric}
                </span>
                <span className="text-[10px] text-muted-dark font-mono tracking-wide">{s.metricLabel}</span>
              </div>
              <span className="text-lg text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 hidden md:block">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
