'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stages = [
  { number: '01', title: 'Research', desc: 'Deep dive into your market, audience, and competition to uncover strategic opportunities.', icon: '🔍' },
  { number: '02', title: 'Strategy', desc: 'Data-driven roadmap that aligns business goals with user needs and technical feasibility.', icon: '🎯' },
  { number: '03', title: 'Design', desc: 'Visual systems and interactions crafted to communicate your brand with precision and impact.', icon: '✨' },
  { number: '04', title: 'Development', desc: 'Clean, modular code engineered for performance, scalability, and maintainability.', icon: '⚡' },
  { number: '05', title: 'Testing', desc: 'Rigorous quality assurance across devices, browsers, and edge cases for flawless execution.', icon: '🛡️' },
  { number: '06', title: 'Launch', desc: 'Coordinated deployment with monitoring, optimization, and real-time performance tracking.', icon: '🚀' },
  { number: '07', title: 'Growth', desc: 'Continuous iteration based on data, feedback, and evolving market conditions.', icon: '📈' },
]

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stagesRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: pinRef.current,
        anticipatePin: 1,
        scrub: 1,
      })

      const totalScroll = (stages.length - 1) / stages.length
      const stageItems = stagesRef.current?.querySelectorAll('.stage-item')

      if (stageItems) {
        stageItems.forEach((item, i) => {
          const start = i / stages.length
          const end = (i + 1) / stages.length

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${start * 100}% top`,
            end: `top+=${end * 100}% top`,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress
              const itemEl = item as HTMLElement
              const opacity = progress > 0.1 && progress < 0.9 ? 1 : 0.3
              const scale = progress > 0.1 && progress < 0.9 ? 1 : 0.95
              gsap.to(itemEl, { opacity, scale, duration: 0.3 })
            },
          })
        })
      }

      if (progressRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(progressRef.current, {
              scaleY: self.progress,
              duration: 0.1,
            })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-subtle">
      <div ref={pinRef} className="min-h-screen flex items-center">
        <div className="max-w-content mx-auto px-6 md:px-10 w-full grid md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
          <div ref={headingRef} className="flex flex-col justify-center">
            <span className="scene-eyebrow mb-6">How We Build</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-[1.05] mb-6">
              Every project follows
              <br />
              <span className="text-accent">a proven path.</span>
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed max-w-sm">
              Seven stages. One purpose — deliver exceptional digital experiences 
              that drive real business outcomes.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <div className="w-10 h-[1px] bg-accent/50" />
              <span className="text-xs text-muted tracking-[0.2em] uppercase">7 Stages</span>
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="w-full bg-accent rounded-full origin-top"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>

            <div ref={stagesRef} className="pl-10 space-y-12 md:space-y-16 w-full">
              {stages.map((stage) => (
                <div
                  key={stage.number}
                  className="stage-item"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-sm font-mono text-accent font-bold pt-1 shrink-0">
                      {stage.number}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-muted text-sm md:text-base leading-relaxed max-w-md">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
