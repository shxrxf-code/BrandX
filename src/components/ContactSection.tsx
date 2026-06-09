'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '@/components/ui/MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const contactNodes = [
  { x: 15, y: 20, label: 'Start' },
  { x: 35, y: 12, label: 'Discover' },
  { x: 65, y: 18, label: 'Design' },
  { x: 85, y: 25, label: 'Build' },
  { x: 22, y: 75, label: 'Launch' },
  { x: 55, y: 85, label: 'Scale' },
  { x: 78, y: 72, label: 'Grow' },
  { x: 50, y: 50, label: 'YOU' },
]

const contactLines: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [4, 5], [5, 6],
  [0, 4], [1, 5], [2, 6], [3, 7], [4, 7], [6, 7],
  [0, 7], [3, 7],
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll('.cta-line')
      if (!lines || lines.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(lines,
        { y: 120, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
      ).fromTo(
        btnRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
        '-=0.4'
      )

      gsap.to(bgRef.current, {
        scale: 1.1, opacity: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      const netLines = networkRef.current?.querySelectorAll('.contact-net-line')
      netLines?.forEach((line) => {
        const el = line as SVGLineElement
        const length = el.getTotalLength()
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })

      const netDots = networkRef.current?.querySelectorAll('.contact-net-dot')
      netDots?.forEach((dot, i) => {
        gsap.fromTo(dot, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1,
          duration: 0.5, delay: 0.5 + i * 0.06,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
        gsap.to(dot, {
          y: -4,
          duration: 2 + (i % 3) * 1.5,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-subtle">
      <div ref={bgRef} className="absolute inset-0 opacity-10"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)' }}
      />
      <div className="dot-grid absolute inset-0 opacity-20" />

      <div ref={networkRef} className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          {contactLines.map(([from, to], i) => {
            const f = contactNodes[from]
            const t = contactNodes[to]
            return (
              <line
                key={i}
                x1={f.x} y1={f.y}
                x2={t.x} y2={t.y}
                stroke="#00E5FF"
                strokeWidth={0.3}
                strokeOpacity={0.4}
                className="contact-net-line"
              />
            )
          })}
          {contactNodes.map((n, i) => (
            <g key={i} className="contact-net-dot">
              <circle
                cx={n.x} cy={n.y} r={i === 7 ? 4 : 2}
                fill={i === 7 ? '#00E5FF' : '#7C3AED'}
                opacity={i === 7 ? 0.6 : 0.4}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-[90vw]">
        <h1 ref={textRef} className="font-display font-bold text-hero leading-[0.85] tracking-[-0.04em]">
          <div className="overflow-hidden mb-4">
            <span className="cta-line inline-block" style={{ display: 'block' }}>READY TO BUILD</span>
          </div>
          <div className="overflow-hidden mb-4">
            <span className="cta-line inline-block text-accent" style={{ display: 'block' }}>SOMETHING</span>
          </div>
          <div className="overflow-hidden mb-4">
            <span className="cta-line inline-block" style={{ display: 'block' }}>EXTRAORDINARY?</span>
          </div>
        </h1>

        <div ref={btnRef} className="mt-12 flex flex-col items-center gap-6">
          <MagneticButton
            as="a"
            href="/contact"
            className="group relative inline-flex px-10 py-5 rounded-full bg-accent text-background text-sm font-medium tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)]"
          >
            <span className="relative z-10">Start Your Project</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </MagneticButton>
          <p className="text-xs text-muted tracking-[0.2em] uppercase max-w-md mx-auto">
            One conversation can change everything
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-accent/30 to-transparent" />
    </section>
  )
}
