'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '@/components/ui/MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroLines = textRef.current?.querySelectorAll('.hero-line')
      if (heroLines && heroLines.length > 0) {
        gsap.fromTo(
          heroLines,
          { y: 80, opacity: 0, rotateX: -15 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1, stagger: 0.15, ease: 'power4.out',
            delay: 0.3,
          }
        )
      }

      const ctaLines = ctaRef.current?.querySelectorAll('.hero-cta')
      if (ctaLines && ctaLines.length > 0) {
        gsap.fromTo(
          ctaLines,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.8 }
        )
      }

      const orbits = globeRef.current?.querySelectorAll('.orbit-ring')
      if (orbits) {
        orbits.forEach((ring, i) => {
          gsap.to(ring, {
            rotation: 360,
            duration: 20 + i * 8,
            repeat: -1,
            ease: 'none',
          })
        })
      }

      const nodes = nodesRef.current?.querySelectorAll('.globe-node')
      if (nodes) {
        nodes.forEach((node, i) => {
          gsap.fromTo(node, { scale: 0, opacity: 0 }, {
            scale: 1, opacity: 1,
            duration: 0.6, delay: 0.5 + i * 0.08,
            ease: 'back.out(2)',
          })
          gsap.to(node, {
            y: -8 + (i % 3) * 4,
            duration: 2 + (i % 5) * 1.5,
            repeat: -1, yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
          })
        })
      }

      const cards = cardsRef.current?.querySelectorAll('.float-card')
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1,
            duration: 0.8, delay: 1.2 + i * 0.2,
            ease: 'power4.out',
          })
          gsap.to(card, {
            y: -6,
            duration: 3 + i * 0.5,
            repeat: -1, yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5,
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-background pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative z-10">
            <div ref={textRef}>
              <span className="hero-line inline-block text-xs text-accent tracking-[0.25em] uppercase font-medium mb-6">
                Digital Experience Studio
              </span>
              <h1 className="hero-line text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] mb-6">
                Building Digital
                <br />
                <span className="text-accent">Experiences</span>
                <br />
                That Drive Growth
              </h1>
              <p className="hero-line text-muted text-base md:text-lg leading-relaxed max-w-md">
                We design and engineer premium digital products — from web platforms
                to AI-powered solutions — that transform how businesses connect with their audience.
              </p>
            </div>

            <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <MagneticButton
                as="a"
                href="/contact"
                className="hero-cta group relative px-8 py-4 rounded-full bg-accent text-background text-sm font-medium tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <span className="relative z-10">Start Project</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="/work"
                className="hero-cta group relative px-8 py-4 rounded-full border border-border-light text-foreground text-sm font-medium tracking-wide overflow-hidden transition-all duration-500 hover:border-accent"
              >
                <span className="relative z-10">View Work</span>
                <span className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </MagneticButton>
            </div>

            <div className="hero-line mt-12 flex items-center gap-6">
              {['Next.js', 'React', 'TypeScript', 'Node.js'].map((tech) => (
                <span key={tech} className="text-xs text-muted-dark font-mono tracking-wide">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div ref={globeRef} className="relative hidden lg:flex items-center justify-center min-h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] rounded-full border border-accent/10 relative">
                <div className="orbit-ring absolute inset-0 rounded-full border border-accent/5" />
                <div
                  className="orbit-ring absolute inset-[15%] rounded-full border border-accent/10"
                  style={{ transformOrigin: 'center' }}
                />
                <div
                  className="orbit-ring absolute inset-[30%] rounded-full border border-accent/8"
                  style={{ transformOrigin: 'center' }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse-slow" />
                  </div>
                </div>
              </div>
            </div>

            <div ref={nodesRef} className="absolute inset-0">
              {[
                { angle: 0, dist: 32, label: 'UX' },
                { angle: 72, dist: 28, label: 'AI' },
                { angle: 144, dist: 38, label: 'Web' },
                { angle: 216, dist: 25, label: 'Cloud' },
                { angle: 288, dist: 35, label: 'Mobile' },
              ].map((node, i) => {
                const angleRad = (node.angle * Math.PI) / 180
                const x = 50 + node.dist * Math.cos(angleRad)
                const y = 50 + node.dist * Math.sin(angleRad)
                return (
                  <div
                    key={node.label}
                    className="globe-node absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center cursor-pointer hover:border-accent/50 hover:bg-accent/15 transition-all duration-500"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span className="text-[9px] font-mono font-bold text-accent tracking-wider uppercase">{node.label}</span>
                  </div>
                )
              })}
            </div>

            <div ref={cardsRef} className="absolute inset-0 pointer-events-none">
              <div className="float-card absolute top-[15%] right-[5%] px-4 py-2 rounded-lg border border-border bg-subtle/80 backdrop-blur-sm">
                <span className="text-[10px] text-accent font-mono">+240% ROI</span>
              </div>
              <div className="float-card absolute bottom-[25%] left-[8%] px-4 py-2 rounded-lg border border-border bg-subtle/80 backdrop-blur-sm">
                <span className="text-[10px] text-accent font-mono">98% Satisfaction</span>
              </div>
              <div className="float-card absolute top-[40%] -right-[2%] px-4 py-2 rounded-lg border border-border bg-subtle/80 backdrop-blur-sm">
                <span className="text-[10px] text-accent font-mono">50+ Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] text-muted tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent/40 to-transparent" />
      </div>
    </section>
  )
}
