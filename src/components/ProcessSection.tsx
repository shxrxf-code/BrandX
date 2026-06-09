'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stages = [
  { number: '01', title: 'Research', desc: 'Deep discovery — market analysis, user research, technical audit, competitive landscape. We learn before we build.', accent: '#5B5BFF' },
  { number: '02', title: 'Strategy', desc: 'Data-driven roadmap — information architecture, user flows, content strategy, technical specification.', accent: '#22D3EE' },
  { number: '03', title: 'Design', desc: 'Systematic design — wireframes, design systems, interactive prototypes, motion libraries.', accent: '#A855F7' },
  { number: '04', title: 'Development', desc: 'Production engineering — component architecture, API integration, performance tuning, CI/CD.', accent: '#34D399' },
  { number: '05', title: 'Launch', desc: 'Coordinated deployment — QA testing, analytics setup, deployment scripts, monitoring.', accent: '#F97316' },
  { number: '06', title: 'Growth', desc: 'Continuous optimization — performance monitoring, A/B testing, iterative improvements, scale planning.', accent: '#EC4899' },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

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

      const items = sectionRef.current?.querySelectorAll('.process-stage')
      if (items) {
        items.forEach((item, i) => {
          const start = i / stages.length
          const end = (i + 1) / stages.length
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${start * 100}% top`,
            end: `top+=${end * 100}% top`,
            scrub: 1,
            onUpdate: (self) => {
              const p = self.progress
              const el = item as HTMLElement
              const active = p > 0.1 && p < 0.9
              gsap.to(el, {
                opacity: active ? 1 : 0.25,
                scale: active ? 1 : 0.95,
                filter: active ? 'blur(0px)' : 'blur(2px)',
                duration: 0.3,
              })
              if (active) setActiveIdx(i)
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const active = stages[activeIdx]

  return (
    <section ref={sectionRef} className="relative bg-subtle overflow-hidden">
      <div ref={pinRef} className="min-h-screen flex items-center">
        <div className="max-w-content mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 lg:gap-28">
            <div>
              <div className="mb-10">
                <span className="scene-eyebrow">Our Process</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
                  From idea to
                  <br />
                  <span className="text-accent">impact.</span>
                </h2>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border rounded-full overflow-hidden">
                  <div ref={progressRef} className="w-full bg-accent rounded-full origin-top" style={{ transform: 'scaleY(0)' }} />
                </div>

                <div className="space-y-12 md:space-y-16">
                  {stages.map((stage) => (
                    <div key={stage.number} className="process-stage">
                      <div className="flex items-start gap-5">
                        <span className="text-sm font-mono font-bold pt-1 shrink-0" style={{ color: stage.accent }}>
                          {stage.number}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight mb-2">
                            {stage.title}
                          </h3>
                          <p className="text-sm text-muted leading-relaxed">
                            {stage.desc}
                          </p>
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
                  className="relative rounded-2xl border overflow-hidden p-8 md:p-10 lg:p-12 min-h-[280px] transition-all duration-700"
                  style={{
                    borderColor: `${active.accent}30`,
                    background: `radial-gradient(ellipse at 50% 0%, ${stages[activeIdx].accent}10, transparent)`,
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-2 h-2 rounded-full" style={{ background: active.accent }} />
                      <span className="text-xs font-mono font-bold" style={{ color: active.accent }}>
                        Stage {active.number}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-display font-bold tracking-tight mb-4" style={{ color: active.accent }}>
                      {active.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {active.desc}
                    </p>
                    <div className="mt-6 flex gap-2">
                      {Array.from({ length: stages.length }).map((_, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full transition-all duration-500"
                          style={{
                            width: i === activeIdx ? 24 : 8,
                            background: i <= activeIdx ? active.accent : 'rgba(255,255,255,0.1)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${active.accent} 1px, transparent 1px)`,
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
