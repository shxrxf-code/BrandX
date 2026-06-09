'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '@/components/ui/MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ctaLines = textRef.current?.querySelectorAll('.cta-line')
      if (!ctaLines || ctaLines.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(
        ctaLines,
        { y: 120, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
        }
      )
      .fromTo(
        btnRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
        '-=0.4'
      )

      gsap.to(bgRef.current, {
        scale: 1.1,
        opacity: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(91, 91, 255, 0.2) 0%, transparent 60%)',
        }}
      />

      <div className="dot-grid absolute inset-0 opacity-30" />

      <div className="relative z-10 text-center px-6 max-w-[90vw]">
        <h1
          ref={textRef}
          className="font-display font-bold text-hero leading-[0.85] tracking-[-0.04em]"
        >
          <div className="overflow-hidden mb-4">
            <span className="cta-line inline-block" style={{ display: 'block' }}>
              READY TO BUILD
            </span>
          </div>
          <div className="overflow-hidden mb-4">
            <span className="cta-line inline-block text-accent" style={{ display: 'block' }}>
              SOMETHING
            </span>
          </div>
          <div className="overflow-hidden mb-4">
            <span className="cta-line inline-block" style={{ display: 'block' }}>
              EXTRAORDINARY?
            </span>
          </div>
        </h1>

        <div ref={btnRef} className="mt-16">
          <MagneticButton
            cursorText="Contact"
            as="a"
            href="/contact"
            className="group relative inline-flex px-10 py-5 rounded-full border border-border-light text-foreground text-sm tracking-wider uppercase overflow-hidden transition-all duration-500 hover:border-accent"
          >
            <span className="relative z-10">Start Your Journey</span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </MagneticButton>
        </div>

        <p className="mt-8 text-xs text-muted tracking-[0.2em] uppercase max-w-md mx-auto">
          One conversation can change everything
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-accent/30 to-transparent" />
    </section>
  )
}
