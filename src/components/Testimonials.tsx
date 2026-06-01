'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useIsMobile } from '@/lib/hooks'

const testimonials = [
  {
    quote: "Brandex transformed our digital presence completely. The attention to detail and strategic thinking behind every decision was remarkable. Our conversions increased by 340%.",
    author: 'Rajesh Kumar',
    role: 'CEO, SolarTech Energy',
    avatar: 'RK',
    rating: 5,
  },
  {
    quote: "Working with Brandex felt like having an extension of our own team. They understood our vision instantly and delivered beyond our highest expectations.",
    author: 'Priya Sharma',
    role: 'Founder, Drifto Fashion',
    avatar: 'PS',
    rating: 5,
  },
  {
    quote: "The level of craft and precision in their work is unmatched. Every interaction feels intentional, every animation serves a purpose. Truly world-class.",
    author: 'Arjun Mehta',
    role: 'CTO, FinFlow',
    avatar: 'AM',
    rating: 5,
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height
    rotateX.set(normalizedY * -8)
    rotateY.set(normalizedX * 8)
  }, [isMobile, rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <ScrollReveal delay={index * 0.1} direction="up" distance={40}>
      <motion.div
        ref={cardRef}
        className="glass-card rounded-3xl p-8 h-full flex flex-col relative group hover:border-accent-blue/20 transition-colors duration-500"
        style={{
          perspective: '1000px',
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={isMobile ? {} : { y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Quote icon */}
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Quote size={32} className="text-accent-blue/20 mb-6 group-hover:text-accent-blue/40 transition-colors duration-500" />
        </motion.div>

        {/* Rating stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + j * 0.05, duration: 0.3 }}
            >
              <Star size={14} className="text-accent-blue fill-accent-blue" />
            </motion.div>
          ))}
        </div>

        {/* Quote text */}
        <p className="text-text-secondary leading-relaxed mb-8 flex-grow text-body">
          {testimonial.quote}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-4 pt-6 border-t border-black/5">
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-display font-bold text-sm"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {testimonial.avatar}
          </motion.div>
          <div>
            <div className="font-display text-text-primary font-semibold group-hover:text-accent-blue transition-colors duration-300">
              {testimonial.author}
            </div>
            <div className="text-xs text-text-muted">{testimonial.role}</div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Client Stories
            </motion.span>
            <motion.h2
              className="font-display text-section font-bold text-gradient mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Trusted by Industry Leaders
            </motion.h2>
          </div>
        </ScrollReveal>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
