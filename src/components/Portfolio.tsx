'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useIsMobile } from '@/lib/hooks'

const projects = [
  {
    title: 'SolarTech Energy',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    year: '2026',
    description: 'Complete rebrand and web platform for a renewable energy startup',
    metrics: { conversion: '+340%', traffic: '+180%', engagement: '4.2x' },
  },
  {
    title: "Drifto Men's Fashion",
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    year: '2026',
    description: 'Luxury fashion e-commerce with immersive product experience',
    metrics: { conversion: '+220%', traffic: '+95%', engagement: '3.8x' },
  },
  {
    title: 'Mirra Montessori School',
    category: 'Personal Branding',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    year: '2026',
    description: 'Complete personal branding strategy and digital identity for a Montessori school',
    metrics: { conversion: '+150%', traffic: '+120%', engagement: '2.9x' },
  },
  {
    title: 'Nuts & Plants',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80',
    year: '2026',
    description: 'E-commerce website for premium nuts and chocolates with seamless checkout experience',
    metrics: { conversion: '+280%', traffic: '+160%', engagement: '3.5x' },
  },
  {
    title: 'Diamond Restaurant',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    year: '2025',
    description: 'Premium restaurant branding with menu design and online ordering platform',
    metrics: { conversion: '+190%', traffic: '+140%', engagement: '3.1x' },
  },
  {
    title: 'Aero Travels',
    category: 'Personal Branding',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
    year: '2026',
    description: 'Premium travel brand identity and digital presence for a luxury travel agency',
    metrics: { conversion: '+210%', traffic: '+130%', engagement: '3.3x' },
  },
]

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const totalWidth = projects.length * (isMobile ? 85 : 40)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${totalWidth - 100}%`])

  return (
    <section id="work" ref={containerRef} className="relative" style={{ height: isMobile ? '400vh' : '300vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="section-container mb-8 md:mb-12">
          <motion.span
            className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Work
          </motion.span>
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Projects
          </motion.h2>
        </div>

        <motion.div
          className="flex gap-6 md:gap-8 px-6 md:px-12 lg:px-16"
          style={{ x, width: `${totalWidth}%` }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 h-[55vh] md:h-[65vh] w-[80vw] md:w-[35vw] group cursor-pointer"
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0 overflow-hidden rounded-3xl bg-background-secondary">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{
                    scale: hoveredIndex === i ? 1.05 : 1,
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  loading="lazy"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-mono tracking-wider text-accent-blue">
                    {project.category}
                  </span>
                  <span className="text-sm text-text-muted">
                    {project.year}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 max-w-md">
                  {project.description}
                </p>

                <motion.div
                  className="flex gap-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={hoveredIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <div className="text-lg font-bold text-accent-blue">{project.metrics.conversion}</div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">Conversion</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent-purple">{project.metrics.traffic}</div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">Traffic</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent-cyan">{project.metrics.engagement}</div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">Engagement</div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={hoveredIndex === i ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight size={20} className="text-white" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
