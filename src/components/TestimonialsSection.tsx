'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    quote: 'They didn\'t just redesign our website — they reimagined how our customers experience our brand. The results exceeded every benchmark we set.',
    name: 'Sarah Chen',
    role: 'CEO, SolarTech Energy',
    gradient: 'from-blue-500/10 via-blue-400/5 to-transparent',
  },
  {
    quote: 'Working with this team feels like having a world-class design studio and engineering firm rolled into one. The speed and quality are unmatched.',
    name: 'Marcus Rivera',
    role: 'Founder, Drifto',
    gradient: 'from-blue-600/10 via-blue-500/5 to-transparent',
  },
  {
    quote: 'They don\'t just deliver projects — they become true partners invested in your success. Our NPS score jumped 35 points post-launch.',
    name: 'Priya Patel',
    role: 'CTO, FinFlow',
    gradient: 'from-blue-500/8 via-blue-400/4 to-transparent',
  },
  {
    quote: 'Our conversion rates increased 156% after the redesign. More importantly, our team\'s ability to iterate and improve has been transformed.',
    name: 'Dr. James Kim',
    role: 'Director, Lumen Clinics',
    gradient: 'from-blue-400/10 via-blue-600/5 to-transparent',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.testimonial-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, delay: i * 0.12,
            ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="scene-eyebrow">Client Voices</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            Trusted by
            <br />
            <span className="text-accent">industry leaders.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card group relative p-8 md:p-10 rounded-2xl border border-border bg-subtle overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${t.gradient})` }}
              />
              <div className="relative z-10">
                <svg className="w-8 h-8 text-accent/30 mb-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted mt-0.5">{t.role}</p>
                  </div>
                  <span className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent transition-all duration-500">
                    <span className="text-sm group-hover:translate-x-0.5 transition-transform duration-500">↗</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
