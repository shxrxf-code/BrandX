'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowDown, Sparkles, Zap, Globe } from 'lucide-react'
import GradientOrbs from '@/components/effects/GradientOrbs'
import Particles from '@/components/effects/Particles'
import MagneticButton from '@/components/ui/MagneticButton'

const floatingCards = [
  { icon: Sparkles, label: 'Brand Strategy', x: '8%', y: '22%', delay: 0 },
  { icon: Zap, label: 'Web Development', x: '78%', y: '18%', delay: 0.2 },
  { icon: Globe, label: 'Digital Marketing', x: '82%', y: '62%', delay: 0.4 },
]

const words = ['Designing', 'The', 'Future', 'Of', 'Digital', 'Brands']

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 80 : 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])

  const springY = isMobile ? y : useSpring(y, { stiffness: 100, damping: 30 })

  const baseDelay = isMobile ? 0.1 : 0.3

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GradientOrbs count={isMobile ? 1 : 3} />
      <Particles count={isMobile ? 10 : 30} speed={0.2} size={1.5} color="255,255,255" />

      {/* Animated grid background */}
      <div className="absolute inset-0 grid-lines opacity-30" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-blue/5 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 section-container text-center"
        style={{ y: springY, opacity, scale }}
      >
        {/* Top badge */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay, duration: 0.6 }}
        >
          <span className="h-px w-8 bg-accent-blue/50" />
          <span className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase">
            Award-Winning Digital Agency
          </span>
          <span className="h-px w-8 bg-accent-blue/50" />
        </motion.div>

        {/* Massive hero heading with staggered word animation */}
        <h1 className="font-display font-bold leading-[0.9] tracking-[-0.04em] mb-8">
          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-hero text-gradient"
                initial={{ opacity: 0, y: isMobile ? 40 : 120, rotateX: isMobile ? 0 : -90, filter: 'blur(10px)' }}
                animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  delay: baseDelay + 0.15 + i * 0.08,
                  duration: isMobile ? 0.5 : 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subtitle with blur-to-clear reveal */}
        <motion.p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: baseDelay + 0.7, duration: 0.8 }}
        >
          We craft premium digital experiences that elevate brands, drive growth,
          and leave lasting impressions in the minds of your audience.
        </motion.p>

        {/* CTA buttons with staggered fade-in */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 0.9, duration: 0.6 }}
        >
          <MagneticButton variant="primary" href="#work">
            View Our Work
          </MagneticButton>
          <MagneticButton variant="secondary" href="tel:+9170100096308">
            Book a Strategy Call
          </MagneticButton>
        </motion.div>

        {/* Stats with staggered reveal */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 1.1, duration: 0.6 }}
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '50+', label: 'Global Clients' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs text-text-muted mt-1 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating cards - desktop only */}
      {!isMobile && floatingCards.map((card, i) => (
        <motion.div
          key={i}
          className="hidden lg:block absolute glass rounded-2xl px-4 py-3"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: baseDelay + 1.3 + card.delay, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-3"
          >
            <card.icon size={18} className="text-accent-blue" />
            <span className="text-xs text-text-secondary whitespace-nowrap">
              {card.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: baseDelay + 1.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
