'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlobeCanvas, services } from './ecosystem/GlobeScene'
import { ServiceModal } from './ecosystem/ServiceModal'

function MobileCarousel() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback((index: number) => {
    setActive(index)
    scrollRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [])

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service, i) => (
          <div
            key={service.title}
            className="snap-center shrink-0 w-[80vw] bg-white rounded-xl border border-border p-6"
          >
            <span className="text-[10px] text-accent font-semibold tracking-wider uppercase mb-2 block">
              0{i + 1}
            </span>
            <h3 className="text-lg font-display font-bold tracking-tight mb-2">{service.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">{service.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {service.deliverables.map((d) => (
                <span
                  key={d}
                  className="inline-block px-2 py-1 bg-secondary border border-border rounded-md text-[10px] text-foreground font-medium"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? 'w-6 bg-accent' : 'w-1.5 bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const [mounted, setMounted] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSetActive = useCallback((i: number | null) => {
    setActiveIndex(i)
    setHoveredIndex(null)
  }, [])

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background" id="services">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
          onViewportEnter={() => setRevealed(true)}
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Services
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            Explore Our Digital Ecosystem.
          </h2>
          <p className="text-muted text-sm mt-2 max-w-lg">
            Discover how Brandex combines strategy, design, development, marketing, and AI to build digital experiences that drive growth.
          </p>
        </motion.div>
      </div>

      <div className="hidden md:block relative" style={{ height: '560px' }}>
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={revealed ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          {mounted && (
            <GlobeCanvas
              activeIndex={activeIndex}
              setActiveIndex={handleSetActive}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              revealed={revealed}
            />
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <ServiceModal
            service={services[activeIndex]}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-content mx-auto px-6 md:px-10 md:hidden">
        <MobileCarousel />
      </div>
    </section>
  )
}
