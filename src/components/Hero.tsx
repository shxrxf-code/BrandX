'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import HeroCanvas from '@/components/effects/HeroCanvas'
import { useIsMobile } from '@/lib/hooks'

const headline = ['Building', 'Digital', 'Brands']
const subline = ['That', 'People', 'Remember.']

const trustedBy = ['SolarTech', 'Drifto', 'FinFlow', 'Lumen', 'Meridian', 'Arc Studio']

const metrics = [
  { value: '150', suffix: '+', label: 'Projects Shipped' },
  { value: '40', suffix: 'M+', label: 'Users Reached' },
  { value: '12', suffix: '', label: 'Industries' },
  { value: '97', suffix: '', label: 'Lighthouse' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedText, setTypedText] = useState('')
  const fullText = 'Premium digital transformation partner for ambitious brands.'

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    let i = 0
    const id = setInterval(() => {
      i++
      setTypedText(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [isLoaded])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 80 : 200])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.96])

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (isMobile) return
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [isMobile, mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Mesh gradient + particles */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(91,91,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(91,91,255,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>

      <motion.div
        className="relative z-10 section-container text-center"
        style={{ y, opacity, scale }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 mb-10 px-4 py-2 rounded-full glass border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-eyebrow uppercase tracking-[0.18em] text-white/70 font-medium">
            Accepting Q3 2026 Partnerships
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.04em] mb-2 text-display">
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block text-white"
              initial={{ y: '110%' }}
              animate={isLoaded ? { y: '0%' } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {headline[0]}&nbsp;{headline[1]}&nbsp;{headline[2]}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block text-gradient-shine"
              initial={{ y: '110%' }}
              animate={isLoaded ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {subline[0]}&nbsp;{subline[1]}&nbsp;{subline[2]}
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-6 leading-relaxed font-light"
          initial={{ opacity: 0, y: 16 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          We craft websites, brands, campaigns, and digital experiences that
          accelerate growth.
        </motion.p>

        {/* Cursor typewriter */}
        <motion.div
          className="text-sm text-white/40 mb-12 font-mono h-6 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-accent">→</span>
          <span className="ml-2 min-h-[1.5em]">{typedText}</span>
          <span className="ml-0.5 inline-block w-2 h-4 bg-accent animate-pulse" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <MagneticButton
            variant="primary"
            size="lg"
            href="/contact"
            showArrow
          >
            Start Your Project
          </MagneticButton>
          <MagneticButton
            variant="outline"
            size="lg"
            href="/portfolio"
          >
            View Case Studies
          </MagneticButton>
        </motion.div>

        {/* Floating metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.08 }}
              className="glass-elevated rounded-2xl px-4 py-5 group hover:border-accent/40 transition-colors duration-500"
            >
              <div className="font-display text-3xl md:text-4xl font-semibold text-white tabular-nums">
                {m.value}
                <span className="text-accent">{m.suffix}</span>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 mt-1.5">
                {m.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="text-eyebrow uppercase tracking-[0.25em] text-white/30 font-medium">
            Trusted by growing brands worldwide
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 max-w-4xl">
            {trustedBy.map((brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0, y: 8 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.3 + i * 0.05 }}
                className="font-display text-lg md:text-xl font-medium text-white/30 hover:text-white/80 transition-colors duration-500 cursor-default"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-mono">
          Scroll
        </span>
        <ArrowDown size={14} className="text-white/30" />
      </motion.div>
    </section>
  )
}
