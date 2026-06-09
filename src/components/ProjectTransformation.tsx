'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const phases = [
  {
    number: '01',
    title: 'Research',
    subtitle: 'Understand before you build',
    deliverables: [
      { label: 'Market Analysis', icon: '📊' },
      { label: 'User Interviews', icon: '🎙️' },
      { label: 'Competitor Audit', icon: '🔍' },
      { label: 'Strategy Document', icon: '📄' },
    ],
    detail: 'Every project starts with deep discovery — market positioning, user behavior analysis, technical audit, and stakeholder alignment. We dont write a single line of code until we know exactly what success looks like.',
    accent: '#5B5BFF',
    gradient: 'from-blue-500/15 via-indigo-500/5 to-transparent',
    preview: 'Strategy Deck',
  },
  {
    number: '02',
    title: 'Strategy',
    subtitle: 'Architecture before aesthetics',
    deliverables: [
      { label: 'Information Architecture', icon: '🏗️' },
      { label: 'User Flows', icon: '🔄' },
      { label: 'Content Strategy', icon: '📝' },
      { label: 'Technical Roadmap', icon: '🗺️' },
    ],
    detail: 'We map every user journey, every content hierarchy, every technical dependency. The strategy phase produces a blueprint that eliminates guesswork and aligns every stakeholder before design begins.',
    accent: '#22D3EE',
    gradient: 'from-cyan-500/15 via-blue-500/5 to-transparent',
    preview: 'Blueprint Document',
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Systems, not screens',
    deliverables: [
      { label: 'Wireframes', icon: '📐' },
      { label: 'Design System', icon: '🎨' },
      { label: 'Interactive Prototypes', icon: '⚡' },
      { label: 'Motion Library', icon: '✨' },
    ],
    detail: 'We design in systems — component libraries, tokenized design languages, interactive prototypes with real motion. Every screen is built from a reusable system that scales across the entire product.',
    accent: '#34D399',
    gradient: 'from-emerald-500/15 via-teal-500/5 to-transparent',
    preview: 'Live Prototype',
  },
  {
    number: '04',
    title: 'Development',
    subtitle: 'Production quality from day one',
    deliverables: [
      { label: 'Component Library', icon: '🧩' },
      { label: 'API Integration', icon: '🔗' },
      { label: 'Performance Tuning', icon: '⚡' },
      { label: 'CI/CD Pipeline', icon: '🔄' },
    ],
    detail: 'Engineering starts with architecture — headless CMS, optimized data fetching, edge-rendered pages. Every component is built for performance, accessibility, and maintainability from the first commit.',
    accent: '#F97316',
    gradient: 'from-orange-500/15 via-amber-500/5 to-transparent',
    preview: 'Production Build',
  },
  {
    number: '05',
    title: 'Launch',
    subtitle: 'Ship, monitor, optimize, repeat',
    deliverables: [
      { label: 'QA & Testing', icon: '🛡️' },
      { label: 'Analytics Setup', icon: '📈' },
      { label: 'Deployment Scripts', icon: '🚀' },
      { label: 'Growth Dashboard', icon: '📊' },
    ],
    detail: 'Launch isnt the finish line — its the starting point. We deploy with full monitoring, real-time analytics, performance budgets, and a post-launch optimization roadmap that continues delivering results.',
    accent: '#A855F7',
    gradient: 'from-violet-500/15 via-purple-500/5 to-transparent',
    preview: 'Live Dashboard',
  },
]

export default function ProjectTransformation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=500%',
        pin: pinRef.current,
        anticipatePin: 1,
        scrub: 1,
      })

      const phaseEls = sectionRef.current?.querySelectorAll('.phase-item')

      if (phaseEls) {
        phaseEls.forEach((item, i) => {
          const start = i / phases.length
          const end = (i + 1) / phases.length

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${start * 100}% top`,
            end: `top+=${end * 100}% top`,
            scrub: 1,
            onUpdate: (self) => {
              const p = self.progress
              const itemEl = item as HTMLElement
              const isActive = p > 0.15 && p < 0.85
              gsap.to(itemEl, {
                opacity: isActive ? 1 : 0.25,
                scale: isActive ? 1 : 0.92,
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
                duration: 0.3,
              })
              if (isActive) {
                setActivePhase(i)
              }
            },
          })
        })
      }

      if (progressRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(progressRef.current, { scaleY: self.progress, duration: 0.1 })
          },
        })
      }

      const deliverableEls = sectionRef.current?.querySelectorAll('.deliverable-chip')
      if (deliverableEls) {
        deliverableEls.forEach((chip) => {
          gsap.fromTo(
            chip,
            { y: 15, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: chip.closest('.phase-item'),
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const currentPhase = phases[activePhase]

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden">
      <div ref={pinRef} className="min-h-screen flex items-center">
        <div className="max-w-content mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 lg:gap-28">
            <div className="relative">
              <div className="mb-10">
                <span className="scene-eyebrow">Project Transformation</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
                  From concept to
                  <br />
                  <span className="text-accent">production reality.</span>
                </h2>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border rounded-full overflow-hidden">
                  <div
                    ref={progressRef}
                    className="w-full bg-accent rounded-full origin-top"
                    style={{ transform: 'scaleY(0)' }}
                  />
                </div>

                <div className="space-y-14 md:space-y-20">
                  {phases.map((phase) => (
                    <div
                      key={phase.number}
                      className="phase-item"
                    >
                      <div className="flex items-start gap-5">
                        <span className="text-sm font-mono text-accent font-bold pt-1 shrink-0">
                          {phase.number}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight mb-1">
                            {phase.title}
                          </h3>
                          <p className="text-xs text-muted tracking-[0.15em] uppercase mb-3">
                            {phase.subtitle}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {phase.deliverables.map((d) => (
                              <span
                                key={d.label}
                                className="deliverable-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border-light bg-subtle text-[10px] text-muted font-mono"
                                style={{ borderColor: `${phase.accent}20` }}
                              >
                                <span>{d.icon}</span>
                                <span>{d.label}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col justify-center">
              <div className="sticky top-[20vh]">
                <div
                  className="relative rounded-2xl border overflow-hidden p-8 md:p-10 lg:p-12 min-h-[320px] lg:min-h-[400px] transition-all duration-700"
                  style={{
                    borderColor: `${currentPhase.accent}30`,
                    background: `radial-gradient(ellipse at 50% 0%, ${currentPhase.gradient})`,
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: currentPhase.accent }}
                      />
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase font-medium"
                        style={{ color: currentPhase.accent }}
                      >
                        {currentPhase.preview}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-display font-bold tracking-tight mb-4">
                      {currentPhase.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed mb-8">
                      {currentPhase.detail}
                    </p>

                    <div className="space-y-3">
                      <span className="text-[10px] text-muted tracking-[0.15em] uppercase font-mono">
                        Key Deliverables
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentPhase.deliverables.map((d) => (
                          <span
                            key={d.label}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs"
                            style={{
                              borderColor: `${currentPhase.accent}25`,
                              background: `${currentPhase.accent}08`,
                              color: currentPhase.accent,
                            }}
                          >
                            <span>{d.icon}</span>
                            <span>{d.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${currentPhase.accent} 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
