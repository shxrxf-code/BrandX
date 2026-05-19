'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const projects = [
  {
    title: 'SolarTech Energy',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    size: 'col-span-12 md:col-span-8',
    year: '2024',
  },
  {
    title: 'NOIR Fashion',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    size: 'col-span-12 md:col-span-4',
    year: '2024',
  },
  {
    title: 'FinFlow',
    category: 'App Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    size: 'col-span-12 md:col-span-4',
    year: '2023',
  },
  {
    title: 'ArchViz Studio',
    category: '3D & Web',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    size: 'col-span-12 md:col-span-8',
    year: '2023',
  },
]

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section id="work" className="section-padding relative" ref={containerRef}>
      <motion.div style={{ opacity }}>
        <div className="section-container">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
              <div>
                <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block">
                  Selected Work
                </span>
                <h2 className="font-display text-section font-bold text-gradient">
                  Featured Projects
                </h2>
              </div>
              <p className="text-text-secondary max-w-md text-body-lg">
                A curated selection of our most impactful work, crafted for brands
                that demand excellence.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-6">
            {projects.map((project, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                direction="up"
                distance={isMobile ? 20 : 60}
                className={project.size}
              >
                <motion.a
                  href="#"
                  className="group relative block overflow-hidden rounded-3xl aspect-[4/3] md:aspect-[16/10]"
                  whileHover={isMobile ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute inset-0 bg-background-secondary" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono tracking-wider text-accent-blue mb-2 block">
                          {project.category} — {project.year}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>
                      {!isMobile && (
                        <motion.div
                          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: -45 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ExternalLink size={18} className="text-white" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
