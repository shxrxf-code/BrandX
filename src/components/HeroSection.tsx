'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const showcaseProjects = [
  {
    title: 'SolarTech Energy',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    result: '+340% leads',
  },
  {
    title: 'Drifto',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    result: '+260% conversion',
  },
  {
    title: 'FinFlow',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    result: '$2.4M ARR',
  },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-28">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">
                Digital Experience Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-heading-1 font-bold tracking-tight leading-[1.05] mb-6"
            >
              Building Digital Products
              <br />
              <span className="text-accent">That Drive Real Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted text-base md:text-lg leading-relaxed max-w-md mb-8"
            >
              We design and engineer premium digital experiences — from web platforms
              to AI-powered solutions — that transform how businesses connect with their audience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200"
              >
                Start Your Project
              </Link>
              <Link
                href="/work"
                className="inline-flex px-6 py-3 text-foreground text-sm font-medium rounded-lg border border-border hover:border-accent hover:text-accent transition-all duration-200"
              >
                View Work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <span className="text-xs text-muted">
                Built with modern technology{' '}
                <Link href="/services" className="text-accent hover:text-accent-dark underline underline-offset-2 transition-colors duration-200">
                  Learn more
                </Link>
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-white shadow-lg">
              <div className="aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="Dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex gap-3">
                  {showcaseProjects.map((p, i) => (
                    <div
                      key={p.title}
                      className="flex-1 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                    >
                      <p className="text-xs font-medium text-foreground truncate">{p.title}</p>
                      <p className="text-[10px] text-accent font-semibold mt-0.5">{p.result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
