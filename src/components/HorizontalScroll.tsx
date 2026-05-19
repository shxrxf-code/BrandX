'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Palette, Megaphone, Smartphone, Layers, TrendingUp } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { icon: Palette, title: 'Brand Strategy', desc: 'Identity, positioning, and visual systems that define your market presence.' },
  { icon: Code, title: 'Web Development', desc: 'Performant, scalable applications built with modern frameworks and best practices.' },
  { icon: Megaphone, title: 'Digital Marketing', desc: 'Data-driven campaigns that amplify reach and drive measurable conversions.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Native and cross-platform experiences that engage users on every device.' },
  { icon: Layers, title: 'UI/UX Design', desc: 'Human-centered interfaces that balance beauty with intuitive functionality.' },
  { icon: TrendingUp, title: 'Growth Engineering', desc: 'Continuous optimization through testing, analytics, and iterative improvement.' },
]

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const trigger = triggerRef.current
    const horizontal = horizontalRef.current

    if (!section || !trigger || !horizontal) return

    const panels = gsap.utils.toArray<HTMLElement>('.panel')
    const totalWidth = panels.length * window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(horizontal, {
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: trigger,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      <div ref={triggerRef} className="overflow-hidden">
        <div ref={horizontalRef} className="flex w-fit">
          {/* Intro Panel */}
          <div className="panel w-screen h-screen flex items-center justify-center bg-background relative">
            <div className="section-container text-center">
              <ScrollReveal>
                <span className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block">
                  Our Expertise
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-section font-bold text-gradient mb-6">
                  What We Do Best
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-text-secondary text-body-lg max-w-xl mx-auto">
                  Scroll to explore our core capabilities →
                </p>
              </ScrollReveal>
            </div>
            {/* Gradient fade on right */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          {/* Item Panels */}
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="panel w-screen h-screen flex items-center justify-center bg-background relative border-l border-white/5"
              >
                <div className="section-container flex items-center justify-center gap-12 lg:gap-24">
                  {/* Icon */}
                  <div className="hidden md:flex w-48 h-48 rounded-3xl bg-accent-blue/10 items-center justify-center">
                    <Icon size={64} className="text-accent-blue" />
                  </div>

                  {/* Content */}
                  <div className="max-w-lg">
                    <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block">
                      0{i + 1} — Capability
                    </span>
                    <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {/* Gradient fade on right */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
