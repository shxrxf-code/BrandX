'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.9])
  
  const springY = useSpring(y1, { damping: 30, stiffness: 100 })
  const springScale = useSpring(scale, { damping: 30, stiffness: 100 })

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 1000], [0, 200]) }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-[120px] animate-pulse-slow" 
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 1000], [0, -200]) }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[150px] animate-float" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-10" />
      </div>

      <motion.div 
        style={{ y: springY, opacity, scale: springScale }}
        className="container mx-auto px-6 relative z-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            damping: 20,
            stiffness: 100,
            delay: 0.5 
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium tracking-wider text-white/70 uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          The New Standard of Digital Excellence
        </motion.div>

        <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-bold mb-8 tracking-tighter uppercase">
          <motion.span
            initial={{ opacity: 0, y: 80, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
              type: "spring",
              damping: 30,
              stiffness: 70,
              delay: 0.7
            }}
            className="block overflow-hidden origin-left"
          >
            We Build
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 80, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
              type: "spring",
              damping: 30,
              stiffness: 70,
              delay: 0.8
            }}
            className="block overflow-hidden text-gradient origin-left"
          >
            Digital
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 80, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
              type: "spring",
              damping: 30,
              stiffness: 70,
              delay: 0.9
            }}
            className="block overflow-hidden origin-left"
          >
            Status
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 font-sans"
        >
          We are a premium agency crafting ultra-high-end digital experiences 
          for brands that demand nothing but the absolute best.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Start a Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="px-8 py-4 rounded-full font-bold border border-white/10 hover:bg-white/5 transition-colors">
            View Our Work
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-32 h-40 glass rounded-2xl border-white/20 hidden lg:block"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[10%] w-40 h-32 glass rounded-2xl border-white/20 hidden lg:block"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
      </motion.div>
    </section>
  )
}
