'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '@/components/ui/MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const nodeData = [
  { angle: 0, dist: 32, label: 'UX', size: 'lg' as const },
  { angle: 45, dist: 22, label: 'AI', size: 'sm' as const },
  { angle: 72, dist: 38, label: 'Web', size: 'lg' as const },
  { angle: 120, dist: 24, label: 'API', size: 'sm' as const },
  { angle: 144, dist: 36, label: 'Cloud', size: 'lg' as const },
  { angle: 185, dist: 20, label: 'IoT', size: 'sm' as const },
  { angle: 216, dist: 42, label: 'Mobile', size: 'lg' as const },
  { angle: 260, dist: 26, label: 'Data', size: 'sm' as const },
  { angle: 288, dist: 44, label: 'Design', size: 'lg' as const },
  { angle: 330, dist: 22, label: 'SEO', size: 'sm' as const },
]

const cardData = [
  { x: 10, y: 14, label: '+240% ROI' },
  { x: 82, y: 10, label: '98% Satisfaction' },
  { x: 88, y: 48, label: '50+ Delivered' },
  { x: 6, y: 54, label: '3x Speed' },
  { x: 78, y: 80, label: '24/7 Support' },
]

const particles = Array.from({ length: 25 }, (_, i) => ({
  x: 8 + Math.random() * 84,
  y: 8 + Math.random() * 84,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 3,
}))

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

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
            duration: 18 + i * 8,
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
            duration: 0.5, delay: 0.5 + i * 0.06,
            ease: 'back.out(2)',
          })
          gsap.to(node, {
            y: -8 + (i % 4) * 4,
            duration: 2 + (i % 6) * 1.2,
            repeat: -1, yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.25,
          })
        })
      }

      const cards = cardsRef.current?.querySelectorAll('.float-card')
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card, { y: 25, opacity: 0 }, {
            y: 0, opacity: 1,
            duration: 0.7, delay: 1.2 + i * 0.15,
            ease: 'power4.out',
          })
          gsap.to(card, {
            y: -5,
            duration: 3 + i * 0.4,
            repeat: -1, yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.4,
          })
        })
      }

      const dots = particlesRef.current?.querySelectorAll('.particle-dot')
      if (dots) {
        dots.forEach((dot, i) => {
          gsap.fromTo(dot, { opacity: 0 }, {
            opacity: 0.4 + Math.random() * 0.3,
            duration: 1,
            delay: 1.5 + i * 0.04,
            ease: 'power2.out',
          })
          gsap.to(dot, {
            y: -4 - Math.random() * 4,
            x: -3 + Math.random() * 6,
            duration: 3 + Math.random() * 3,
            repeat: -1, yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.15,
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
                className="hero-cta group relative px-8 py-4 rounded-full bg-accent text-background text-sm font-medium tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
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

          <div ref={globeRef} className="relative hidden lg:flex items-center justify-center min-h-[550px]">
            <div className="absolute w-[520px] h-[520px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

            <div className="relative w-[480px] h-[480px] flex items-center justify-center">
              {[18, 30, 42, 54, 66].map((pct, i) => (
                <div
                  key={i}
                  className="orbit-ring absolute rounded-full border"
                  style={{
                    inset: `${pct}%`,
                    borderColor: i % 2 === 0 ? 'rgba(0,229,255,0.08)' : 'rgba(124,58,237,0.08)',
                    borderStyle: i === 2 ? 'dashed' : 'solid',
                  }}
                />
              ))}

              <div className="absolute flex items-center justify-center" style={{ inset: '44%' }}>
                <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse-slow" />
                </div>
              </div>
            </div>

            <div ref={nodesRef} className="absolute inset-0">
              {nodeData.map((node) => {
                const angleRad = (node.angle * Math.PI) / 180
                const x = 50 + node.dist * Math.cos(angleRad)
                const y = 50 + node.dist * Math.sin(angleRad)
                const size = node.size === 'lg' ? 48 : 32
                return (
                  <div
                    key={node.label}
                    className="globe-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:border-accent/50 hover:bg-accent/10 transition-all duration-500"
                    style={{
                      width: size,
                      height: size,
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <span className={`font-mono font-bold text-accent tracking-wider uppercase ${node.size === 'lg' ? 'text-[9px]' : 'text-[7px]'}`}>
                      {node.label}
                    </span>
                  </div>
                )
              })}
            </div>

            <div ref={cardsRef} className="absolute inset-0 pointer-events-none">
              {cardData.map((card, i) => (
                <div
                  key={i}
                  className="float-card absolute px-3 py-1.5 rounded-lg border border-border bg-subtle/80 backdrop-blur-sm"
                  style={{ left: `${card.x}%`, top: `${card.y}%` }}
                >
                  <span className="text-[9px] text-accent font-mono tracking-wide">{card.label}</span>
                </div>
              ))}
            </div>

            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
              {particles.map((p, i) => (
                <div
                  key={i}
                  className="particle-dot absolute rounded-full bg-accent"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    opacity: 0,
                  }}
                />
              ))}
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
