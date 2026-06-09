'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: '⬡',
    title: 'Web Development',
    tagline: 'High-performance platforms',
    description: 'Custom web applications, headless CMS architectures, and scalable frontends built with modern frameworks. Performance-optimized, accessibility-first, and engineered for growth.',
    accent: '#5B5BFF',
    gradient: 'from-blue-500/15 via-indigo-500/5 to-transparent',
  },
  {
    icon: '◇',
    title: 'UI/UX Design',
    tagline: 'Human-centered interfaces',
    description: 'Research-driven design systems, interactive prototypes, and intuitive user flows. Every interaction is crafted to feel natural, responsive, and delightful.',
    accent: '#22D3EE',
    gradient: 'from-cyan-500/15 via-blue-500/5 to-transparent',
  },
  {
    icon: '○',
    title: 'Brand Identity',
    tagline: 'Distinct visual language',
    description: 'Strategic brand systems including visual identity, typography, color systems, and guidelines that communicate your unique value across every touchpoint.',
    accent: '#A855F7',
    gradient: 'from-purple-500/15 via-pink-500/5 to-transparent',
  },
  {
    icon: '△',
    title: 'SEO & Performance',
    tagline: 'Visibility meets velocity',
    description: 'Technical SEO audits, content strategy, performance optimization, and Lighthouse 90+ compliance engineered to drive organic growth and search dominance.',
    accent: '#34D399',
    gradient: 'from-emerald-500/15 via-teal-500/5 to-transparent',
  },
  {
    icon: '▽',
    title: 'Digital Marketing',
    tagline: 'Conversion-driven strategy',
    description: 'Integrated marketing campaigns, conversion optimization, analytics infrastructure, and growth strategies that turn visitors into loyal customers.',
    accent: '#F97316',
    gradient: 'from-orange-500/15 via-amber-500/5 to-transparent',
  },
  {
    icon: '▣',
    title: 'AI Solutions',
    tagline: 'Intelligent automation',
    description: 'Custom AI agents, LLM-powered features, intelligent search, content generation pipelines, and automation systems that transform business operations.',
    accent: '#EC4899',
    gradient: 'from-pink-500/15 via-rose-500/5 to-transparent',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.service-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.7, delay: i * 0.08,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
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
          <span className="scene-eyebrow">What We Do</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            Full-service digital
            <br />
            <span className="text-accent">excellence.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card group relative rounded-2xl border border-border bg-subtle p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-accent/30"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.gradient})` }}
              />

              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <span
                  className="text-2xl font-display mb-6 block transition-colors duration-500"
                  style={{ color: s.accent }}
                >
                  {s.icon}
                </span>

                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: s.accent }}>
                    {s.tagline}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight mb-3 group-hover:text-accent transition-colors duration-400">
                  {s.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {s.description}
                </p>

                <div className="mt-6 flex items-center gap-1 text-xs text-muted group-hover:text-accent transition-colors duration-400">
                  <span>Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
