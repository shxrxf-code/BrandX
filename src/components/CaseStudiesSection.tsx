'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    slug: 'sunsolar-power-system',
    title: 'SunSolar Power System',
    type: 'Website Development & Branding',
    description: 'Professional solar energy company website designed to showcase renewable energy solutions, services, installations, and lead generation.',
    tag: 'Solar Energy',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&auto=format',
  },
  {
    slug: 'drifto',
    title: 'Drifto',
    type: 'E-Commerce Website',
    description: 'Modern men\'s wear e-commerce website featuring premium shopping experiences, product catalogs, and optimized conversion-focused design.',
    tag: "Men's Fashion",
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format',
  },
  {
    slug: 'mirra-montessori-school',
    title: 'Mirra Montessori School',
    type: 'Personal Branding',
    description: 'Modern Montessori school website designed to showcase admissions, programs, learning philosophy, events, and parent engagement.',
    tag: 'Education & Branding',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80&auto=format',
  },
  {
    slug: 'ravelon',
    title: 'RAVELON',
    type: 'Automotive Accessories Website',
    description: 'Premium automotive accessories brand website focused on showcasing products, brand identity, and customer experience.',
    tag: 'Automotive Branding',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format',
  },
]

export default function CaseStudiesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Selected Work
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            Projects that deliver.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/work/${p.slug}`}
                className="group block rounded-xl overflow-hidden border border-border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-foreground rounded-md">
                      {p.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg font-display font-bold tracking-tight group-hover:text-accent transition-colors duration-200 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted font-medium mb-2">
                    {p.type}
                  </p>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
