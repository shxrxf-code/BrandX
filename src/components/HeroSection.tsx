'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from '@/components/providers/CursorProvider'
import MagneticButton from '@/components/ui/MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const { setCursor } = useCursor()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      tl.to(gradientRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 1,
      })

      gsap.to(bgRef.current, {
        scale: 1.1,
        opacity: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(
      line1Ref.current,
      { y: 120, opacity: 0, rotateX: -25 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo(
      line2Ref.current,
      { y: 120, opacity: 0, rotateX: -25 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power4.out' },
      '-=0.8'
    )
    .fromTo(
      line3Ref.current,
      { y: 120, opacity: 0, rotateX: -25 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power4.out' },
      '-=0.8'
    )
    .fromTo(
      ctaRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
      '-=0.6'
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setCursor(null, 'explore')}
      onMouseLeave={() => setCursor(null, 'default')}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(91, 91, 255, 0.15) 0%, transparent 70%)',
        }}
      />

      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(91, 91, 255, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(91, 91, 255, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="dot-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 text-center px-6 max-w-[90vw]">
        <h1
          ref={textRef}
          className="font-display font-bold text-hero leading-[0.85] tracking-[-0.04em]"
        >
          <div className="overflow-hidden mb-2">
            <span
              ref={line1Ref}
              className="inline-block gradient-mask-b"
              style={{ display: 'block' }}
            >
              WE CREATE
            </span>
          </div>
          <div className="overflow-hidden mb-2">
            <span
              ref={line2Ref}
              className="inline-block text-accent"
              style={{ display: 'block' }}
            >
              DIGITAL
            </span>
          </div>
          <div className="overflow-hidden mb-2">
            <span
              ref={line3Ref}
              className="inline-block"
              style={{ display: 'block' }}
            >
              EXPERIENCES
            </span>
          </div>
          <div className="overflow-hidden mt-4">
            <span
              className="inline-block text-lg md:text-xl font-sans font-light tracking-[0.2em] uppercase text-muted"
            >
              That People Remember
            </span>
          </div>
        </h1>

        <div ref={ctaRef} className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <MagneticButton
            cursorText="Explore"
            as="a"
            href="/work"
            className="group relative px-8 py-4 rounded-full border border-border-light text-foreground text-sm tracking-wider uppercase overflow-hidden transition-all duration-500 hover:border-accent"
          >
            <span className="relative z-10">Explore Our Work</span>
            <span className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </MagneticButton>

          <MagneticButton
            cursorText="Contact"
            as="a"
            href="/contact"
            className="group relative px-8 py-4 rounded-full bg-accent/10 border border-accent/30 text-foreground text-sm tracking-wider uppercase overflow-hidden transition-all duration-500 hover:bg-accent/20 hover:border-accent"
          >
            <span className="relative z-10">Start a Project</span>
            <span className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-muted tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>
    </section>
  )
}
