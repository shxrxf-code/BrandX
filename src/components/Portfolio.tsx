'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import HolographicCard from '@/components/portfolio/HolographicCard'

const projects = [
  {
    title: 'SolarTech Energy',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    year: '2026',
    description: 'Complete rebrand and web platform for a renewable energy startup',
    metrics: { conversion: '+340%', traffic: '+180%', engagement: '4.2x' },
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    accent: '#7C3AED',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    title: "Drifto Men's Fashion",
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    year: '2026',
    description: 'Luxury fashion e-commerce with immersive product experience',
    metrics: { conversion: '+220%', traffic: '+95%', engagement: '3.8x' },
    tech: ['Shopify', 'React', 'GSAP'],
    accent: '#06B6D4',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Mirra Montessori School',
    category: 'Personal Branding',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    year: '2026',
    description: 'Complete personal branding strategy and digital identity',
    metrics: { conversion: '+150%', traffic: '+120%', engagement: '2.9x' },
    tech: ['WordPress', 'Custom Theme', 'SEO'],
    accent: '#22D3EE',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Diamond Restaurant',
    category: 'Brand & Web',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    year: '2025',
    description: 'Premium restaurant branding with online ordering platform',
    metrics: { conversion: '+190%', traffic: '+140%', engagement: '3.1x' },
    tech: ['Next.js', 'Stripe', 'Sanity'],
    accent: '#F59E0B',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Aero Travels',
    category: 'Personal Branding',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
    year: '2026',
    description: 'Premium travel brand identity and digital presence',
    metrics: { conversion: '+210%', traffic: '+130%', engagement: '3.3x' },
    tech: ['Astro', 'Tailwind', 'Contentful'],
    accent: '#10B981',
    span: 'md:col-span-1 md:row-span-1',
  },
]

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="work" className="relative section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-3 block">
            Selected Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
            Our Projects
          </h2>
          <p className="text-text-secondary text-sm md:text-base mt-3 max-w-lg">
            A curated selection of brands, platforms, and digital experiences we&apos;ve crafted for forward-thinking clients.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[240px]"
        >
          {projects.map((project, i) => (
            <HolographicCard
              key={i}
              project={project}
              index={i}
              isHovered={hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-text-secondary text-sm mb-6">
            Ready to create something extraordinary?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-background font-medium text-sm tracking-wide uppercase rounded-full hover:bg-accent-blue hover:text-white transition-all duration-200"
          >
            Start a Project
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
