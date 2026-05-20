'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Sparkles, Zap, Globe, Code2, Palette, TrendingUp } from 'lucide-react'
import GradientOrbs from '@/components/effects/GradientOrbs'
import Particles from '@/components/effects/Particles'
import HeroSpotlight from '@/components/effects/HeroSpotlight'
import FloatingShapes from '@/components/effects/FloatingShapes'
import MagneticButton from '@/components/ui/MagneticButton'
import { useIsMobile } from '@/lib/hooks'

const floatingCards = [
  { icon: Sparkles, label: 'Brand Strategy', x: '6%', y: '25%', delay: 0 },
  { icon: Code2, label: 'Web Development', x: '80%', y: '20%', delay: 0.2 },
  { icon: Palette, label: 'UI/UX Design', x: '85%', y: '65%', delay: 0.4 },
  { icon: TrendingUp, label: 'Growth Marketing', x: '5%', y: '68%', delay: 0.6 },
]

const line1Words = ['Designing']
const line2Words = ['The', 'Future']
const line3Words = ['Of', 'Digital', 'Brands']

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 80 : 200])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96])

  const springY = isMobile ? y : useSpring(y, { stiffness: 100, damping: 30 })

  const baseDelay = isMobile ? 0.1 : 0.3

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GradientOrbs count={isMobile ? 1 : 3} />
      <Particles count={isMobile ? 10 : 30} speed={0.2} size={1.5} color="255,255,255" />
      <HeroSpotlight />
      <FloatingShapes />

      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-accent-blue/5 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background/80 to-transparent" />

      <motion.div
        className="relative z-10 section-container text-center"
        style={{ y: springY, opacity, scale }}
      >
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay, duration: 0.6 }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent-blue/50" />
          <span className="relative flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-accent-blue uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
            </span>
            Award-Winning Digital Agency
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent-blue/50" />
        </motion.div>

        <div className="mb-10">
          <motion.div
            className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-accent-blue/60 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isLoaded ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: baseDelay + 0.1, duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <h1 className="font-display font-bold leading-[0.9] tracking-[-0.04em] mb-10">
          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5 mb-1">
            {line1Words.map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                className="inline-block text-hero text-gradient"
                initial={{ opacity: 0, y: isMobile ? 40 : 120, rotateX: isMobile ? 0 : -90, filter: 'blur(10px)' }}
                animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  delay: baseDelay + 0.2 + i * 0.08,
                  duration: isMobile ? 0.5 : 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5 mb-1">
            {line2Words.map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                className="inline-block text-hero text-gradient"
                initial={{ opacity: 0, y: isMobile ? 40 : 120, rotateX: isMobile ? 0 : -90, filter: 'blur(10px)' }}
                animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  delay: baseDelay + 0.35 + i * 0.08,
                  duration: isMobile ? 0.5 : 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5">
            {line3Words.map((word, i) => (
              <motion.span
                key={`l3-${i}`}
                className="inline-block text-hero"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 50%, #22D3EE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: 'gradient 4s ease infinite',
                }}
                initial={{ opacity: 0, y: isMobile ? 40 : 120, rotateX: isMobile ? 0 : -90, filter: 'blur(10px)' }}
                animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  delay: baseDelay + 0.5 + i * 0.08,
                  duration: isMobile ? 0.5 : 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        <motion.div
          className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10"
          initial={{ scaleX: 0 }}
          animate={isLoaded ? { scaleX: 1 } : {}}
          transition={{ delay: baseDelay + 0.6, duration: 0.6 }}
        />

        <motion.p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: baseDelay + 0.65, duration: 0.8 }}
        >
          We craft premium digital experiences that elevate brands, drive growth,
          and leave lasting impressions in the minds of your audience.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 0.85, duration: 0.6 }}
        >
          <MagneticButton variant="primary" href="#work">
            View Our Work
          </MagneticButton>
          <MagneticButton variant="secondary" href="tel:+9170100096308">
            Book a Strategy Call
          </MagneticButton>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 1, duration: 0.6 }}
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '50+', label: 'Global Clients' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient-blue">
                {stat.value}
              </div>
              <div className="text-xs text-text-muted mt-1.5 tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {!isMobile && floatingCards.map((card, i) => (
        <motion.div
          key={i}
          className="hidden lg:block absolute glass rounded-xl px-4 py-2.5"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 1.2 + card.delay, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2.5"
          >
            <div className="p-1.5 rounded-lg bg-accent-blue/10">
              <card.icon size={14} className="text-accent-blue" />
            </div>
            <span className="text-xs text-text-secondary whitespace-nowrap font-medium">
              {card.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: baseDelay + 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
          <div className="relative">
            <ArrowDown size={16} />
            <motion.div
              className="absolute inset-0 rounded-full bg-accent-blue/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
