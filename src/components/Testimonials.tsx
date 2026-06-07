'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import { Play, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    quote:
      "Brandex didn't just deliver a website — they re-architected how we go to market. We closed our $48M Series B using their brand system, and our inbound pipeline is 3.2x what it was before.",
    author: 'Rajesh Kumar',
    role: 'CEO, SolarTech Energy',
    avatar: 'RK',
    rating: 5,
    company: 'SolarTech',
    industry: 'Clean Energy',
    metric: { value: '+340%', label: 'Inbound qualified leads' },
  },
  {
    id: 2,
    quote:
      "Working with Brandex felt like having an Awwwards-winning studio and a McKinsey strategy team in the same room. They are obsessively rigorous and unfailingly kind.",
    author: 'Priya Sharma',
    role: 'Founder & CEO, Drifto',
    avatar: 'PS',
    rating: 5,
    company: 'Drifto',
    industry: 'Fashion Tech',
    metric: { value: '2.4x', label: 'Average project value' },
  },
  {
    id: 3,
    quote:
      "In 12 weeks they unified four product squads on a single design system, doubled our ship velocity, and unblocked $2.4M in ARR expansion. The work paid for itself in the first month.",
    author: 'Arjun Mehta',
    role: 'CTO, FinFlow',
    avatar: 'AM',
    rating: 5,
    company: 'FinFlow',
    industry: 'B2B Fintech',
    metric: { value: '+62%', label: 'Ship velocity' },
  },
  {
    id: 4,
    quote:
      "Brandex treats every interaction as a chance to earn trust. From the kickoff to the launch, they operated as a true partner — not a vendor. Our NPS has never been higher.",
    author: 'Sarah Chen',
    role: 'CMO, Lumen Clinics',
    avatar: 'SC',
    rating: 5,
    company: 'Lumen',
    industry: 'Healthcare',
    metric: { value: '+410%', label: 'Appointment bookings' },
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const current = testimonials[active]

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.04]"
    >
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[200px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <SectionLabel number="07" label="Client Stories" className="mb-6" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white"
            >
              Trust, earned in{' '}
              <span className="text-gradient-shine">measurable outcomes</span>.
            </motion.h2>
          </div>
          <div className="lg:col-span-5 flex items-end justify-start lg:justify-end">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 rounded-full glass-elevated border border-white/10 hover:border-accent/40 hover:text-accent transition-colors flex items-center justify-center text-white/70"
                aria-label="Previous testimonial"
                data-cursor-hover
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActive((p) => (p + 1) % testimonials.length)}
                className="w-12 h-12 rounded-full glass-elevated border border-white/10 hover:border-accent/40 hover:text-accent transition-colors flex items-center justify-center text-white/70"
                aria-label="Next testimonial"
                data-cursor-hover
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative p-8 md:p-12 rounded-3xl glass-elevated border border-white/[0.08] overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/15 blur-3xl" />

                <Quote size={48} className="text-accent/30 mb-6" />

                <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.25] tracking-tight mb-10">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-white/[0.06]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-bright flex items-center justify-center text-white font-display font-semibold text-lg">
                      {current.avatar}
                    </div>
                    <div>
                      <div className="font-display text-base font-medium text-white">
                        {current.author}
                      </div>
                      <div className="text-sm text-white/50">{current.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-accent fill-accent" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Metric + video panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Metric card */}
            <motion.div
              key={`metric-${current.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-8 rounded-3xl glass-elevated border border-white/[0.06] overflow-hidden"
            >
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent/15 blur-3xl" />
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                Outcome
              </div>
              <div className="font-display text-5xl md:text-6xl font-semibold text-white mb-2 tabular-nums">
                {current.metric.value}
              </div>
              <div className="text-white/60 text-sm">{current.metric.label}</div>
              <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-white/40 font-mono uppercase tracking-wider">
                  {current.company}
                </span>
                <span className="text-white/40">{current.industry}</span>
              </div>
            </motion.div>

            {/* Video testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-background-tertiary border border-white/[0.06] cursor-pointer"
              data-cursor-hover
            >
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                alt="Video testimonial"
                fill
                className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-500">
                  <Play size={20} className="text-white ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-1">
                  Watch
                </div>
                <div className="text-sm font-medium text-white">
                  Priya on the Drifto rebrand
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Thumbnail row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={cn(
                'group text-left p-4 rounded-2xl border transition-all duration-500',
                i === active
                  ? 'border-accent/40 bg-accent/[0.04]'
                  : 'border-white/[0.05] hover:border-white/15 hover:bg-white/[0.02]'
              )}
              data-cursor-hover
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                    i === active
                      ? 'bg-accent text-white'
                      : 'bg-white/5 text-white/60 group-hover:bg-white/10'
                  )}
                >
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white truncate">
                    {t.author}
                  </div>
                  <div className="text-[10px] text-white/40 truncate">
                    {t.company}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
