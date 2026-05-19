'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const projects = [
  {
    title: 'SolarTech Energy',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    year: '2026',
    description: 'Complete rebrand and web platform for a renewable energy startup',
  },
  {
    title: 'Drifto Fashion',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    year: '2026',
    description: 'Luxury fashion e-commerce with immersive product experience',
  },
  {
    title: 'FinFlow',
    category: 'App Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    year: '2025',
    description: 'Fintech dashboard and mobile app for seamless money management',
  },
  {
    title: 'ArchViz Studio',
    category: '3D & Web',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    year: '2025',
    description: 'Architectural visualization portfolio with interactive 3D tours',
  },
  {
    title: 'Veloce Motors',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    year: '2026',
    description: 'Premium automotive brand identity and digital presence',
  },
  {
    title: 'CloudSync SaaS',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    year: '2025',
    description: 'Enterprise cloud platform with real-time collaboration tools',
  },
]

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])

  return (
    <section id="work" className="section-padding relative" ref={containerRef}>
      <div className="section-container">
        <motion.div style={{ opacity, y }}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.08}
                direction="up"
                distance={isMobile ? 20 : 40}
              >
                <motion.div
                  className="group relative block overflow-hidden rounded-2xl bg-background-secondary cursor-pointer"
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono tracking-wider text-accent-blue">
                        {project.category}
                      </span>
                      <span className="text-xs text-text-muted">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
