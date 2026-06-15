'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    slug: 'solartech-energy',
    title: 'SolarTech Energy',
    tag: 'Clean Energy',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    result: '+340% Inbound Leads',
  },
  {
    slug: 'drifto-fashion',
    title: 'Drifto',
    tag: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    result: '+260% Conversion Rate',
  },
  {
    slug: 'finflow',
    title: 'FinFlow',
    tag: 'Fintech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    result: '$2.4M ARR Expansion',
  },
  {
    slug: 'lumen-clinics',
    title: 'Lumen Clinics',
    tag: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    result: '+410% Bookings',
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
                className="group block rounded-xl overflow-hidden border border-border bg-white hover:shadow-sm transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-foreground rounded-md">
                      {p.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-display font-bold tracking-tight group-hover:text-accent transition-colors duration-200">
                      {p.title}
                    </h3>
                    <span className="text-xs text-muted font-medium">{p.result}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
