'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stages = [
  {
    title: 'Idea',
    subtitle: 'Every great product starts with a single question.',
    desc: 'We explore your vision, market landscape, and the problem worth solving. No assumptions — just curiosity and deep listening.',
    visual: '◈',
    accent: '#00E5FF',
  },
  {
    title: 'Research',
    subtitle: 'Insights that separate opinion from truth.',
    desc: 'User interviews, competitive audits, data analysis. We build a foundation of knowledge that every decision stands on.',
    visual: '◇',
    accent: '#00E5FF',
  },
  {
    title: 'Strategy',
    subtitle: 'A plan that turns ambiguity into direction.',
    desc: 'Information architecture, technical specification, user journeys. Every detail mapped before a single line of code.',
    visual: '▣',
    accent: '#4F46E5',
  },
  {
    title: 'Design',
    subtitle: 'Where structure becomes experience.',
    desc: 'Systems thinking meets craft. Component libraries, interactive prototypes, motion design — built to scale and evolve.',
    visual: '○',
    accent: '#00E5FF',
  },
  {
    title: 'Development',
    subtitle: 'Engineering that ships with confidence.',
    desc: 'Production-grade code, performance budgets, CI/CD pipelines. We build for speed, reliability, and the long tail.',
    visual: '△',
    accent: '#4F46E5',
  },
  {
    title: 'Growth',
    subtitle: 'Launch is just the beginning.',
    desc: 'Analytics instrumentation, A/B testing infrastructure, iterative optimization. We stay until the metrics move.',
    visual: '⬡',
    accent: '#00E5FF',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${stages.length * 100}vh`,
        pin: pinRef.current,
        anticipatePin: 1,
        scrub: 1,
      })

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${stages.length * 100}vh`,
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * stages.length), stages.length - 1)
            setActiveIdx(idx)
          },
        },
      })

      master.to(wrapperRef.current, {
        y: () => -(stages.length - 1) * window.innerHeight,
        ease: 'none',
      }, 0)

      stages.forEach((_, i) => {
        const panel = panelsRef.current[i]
        if (!panel) return
        const start = i / stages.length
        const end = (i + 1) / stages.length

        const title = panel.querySelector('.stage-title')
        const subtitle = panel.querySelector('.stage-subtitle')
        const desc = panel.querySelector('.stage-desc')
        const visual = panel.querySelector('.stage-visual')
        const bar = panel.querySelector('.stage-bar')

        if (title) master.fromTo(title, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.04, ease: 'power4.out' }, start)
        if (bar) master.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.05, ease: 'power4.out' }, start + 0.01)
        if (subtitle) master.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.03, ease: 'power4.out' }, start + 0.015)
        if (desc) master.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.03, ease: 'power4.out' }, start + 0.025)
        if (visual) master.fromTo(visual, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.04, ease: 'elastic.out(1,0.6)' }, start + 0.01)
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const active = stages[activeIdx]

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ height: `${stages.length * 100}vh` }}>
      {/* Minimal stage indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 pointer-events-none">
        {stages.map((s, i) => (
          <div
            key={s.title}
            className="h-[2px] rounded-full transition-all duration-700"
            style={{
              width: i === activeIdx ? 32 : i < activeIdx ? 16 : 8,
              background: i <= activeIdx ? active.accent : 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>

      {/* Stage name badge */}
      <div className="fixed top-24 right-6 md:right-10 z-50 pointer-events-none hidden md:block">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase transition-colors duration-700"
          style={{ color: active.accent }}
        >
          {active.title}
        </span>
      </div>

      <div ref={pinRef} className="h-screen w-full overflow-hidden fixed top-0 left-0 bg-background">
        <div ref={wrapperRef} className="will-change-transform" style={{ height: `${stages.length * 100}vh` }}>
          {stages.map((stage, i) => (
            <div
              key={stage.title}
              ref={(el) => { panelsRef.current[i] = el }}
              className="h-screen w-full flex-shrink-0 relative overflow-hidden flex items-center"
            >
              <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${stage.accent}08, transparent)`,
                  opacity: i === activeIdx ? 1 : 0.3,
                }}
              />

              <div className="relative z-10 w-full max-w-content mx-auto px-6 md:px-10 lg:px-16">
                <div className="max-w-3xl">
                  <span
                    className="stage-bar block h-[3px] w-16 rounded-full origin-left mb-6"
                    style={{ background: stage.accent, transform: 'scaleX(0)' }}
                  />
                  <h2
                    className="stage-title text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.9] text-foreground"
                    style={{ opacity: 0 }}
                  >
                    {stage.title}
                  </h2>
                  <p
                    className="stage-subtitle text-lg md:text-xl lg:text-2xl mt-4 text-foreground/80 font-display"
                    style={{ opacity: 0 }}
                  >
                    {stage.subtitle}
                  </p>
                  <p
                    className="stage-desc text-sm md:text-base mt-4 max-w-lg leading-relaxed text-muted"
                    style={{ opacity: 0 }}
                  >
                    {stage.desc}
                  </p>
                </div>

                <div
                  className="stage-visual absolute right-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 text-[clamp(8rem,30vw,30rem)] font-display font-bold leading-none pointer-events-none select-none transition-colors duration-700"
                  style={{ color: `${stage.accent}08`, opacity: 0 }}
                >
                  {stage.visual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
