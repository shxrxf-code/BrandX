'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from '@/components/providers/CursorProvider'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: 'Website Design',
    tagline: 'Premium digital presence',
    description: 'High-end web experiences that captivate and convert. Every interaction is crafted to feel effortless.',
    gradient: 'from-blue-500/20 via-purple-500/20 to-transparent',
    accent: '#5B5BFF',
  },
  {
    title: 'Brand Identity',
    tagline: 'Distinct brand worlds',
    description: 'Strategic brand systems that communicate your unique value across every touchpoint.',
    gradient: 'from-purple-500/20 via-pink-500/20 to-transparent',
    accent: '#A855F7',
  },
  {
    title: 'UI/UX Design',
    tagline: 'Human-centered interfaces',
    description: 'Interfaces that feel intuitive, flows that feel natural, experiences that feel effortless.',
    gradient: 'from-cyan-500/20 via-blue-500/20 to-transparent',
    accent: '#22D3EE',
  },
  {
    title: 'SEO & Growth',
    tagline: 'Data-driven visibility',
    description: 'Technical SEO, content strategy, and performance optimization engineered for search dominance.',
    gradient: 'from-emerald-500/20 via-teal-500/20 to-transparent',
    accent: '#34D399',
  },
  {
    title: 'Marketing',
    tagline: 'Conversion ecosystems',
    description: 'Integrated marketing strategies that turn attention into action and visitors into customers.',
    gradient: 'from-orange-500/20 via-red-500/20 to-transparent',
    accent: '#F97316',
  },
  {
    title: 'AI Solutions',
    tagline: 'Intelligent automation',
    description: 'Custom AI agents, automation pipelines, and intelligent systems that transform operations.',
    gradient: 'from-violet-500/20 via-indigo-500/20 to-transparent',
    accent: '#8B5CF6',
  },
]

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { setCursor } = useCursor()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.service-card')

      if (cards) {
        cards.forEach((card, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top center',
              end: 'bottom center',
              toggleActions: 'play none none reverse',
            },
          })

          tl.fromTo(
            card,
            { scale: 0.85, opacity: 0.4, filter: 'blur(4px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
          )
        })
      }

      const titleEls = sectionRef.current?.querySelectorAll('.service-title')
      if (titleEls) {
        titleEls.forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll('.title-word'),
            { y: 80, opacity: 0, rotateX: -20 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
    >
      <div className="max-w-content mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="mb-20 md:mb-32">
          <span className="scene-eyebrow">What We Build</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            We engineer excellence
            <br />
            <span className="text-accent">across every discipline.</span>
          </h2>
        </div>

        <div className="space-y-8 md:space-y-12">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card group relative overflow-hidden rounded-2xl border border-border bg-subtle hover:bg-subtle-light transition-colors duration-500"
              onMouseEnter={() => { setCursor('Explore', 'expand') }}
              onMouseLeave={() => { setCursor(null, 'default') }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${service.gradient})`,
                }}
              />

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: service.accent }}
                      />
                      <span
                        className="text-xs tracking-[0.2em] uppercase font-medium"
                        style={{ color: service.accent }}
                      >
                        {service.tagline}
                      </span>
                    </div>
                    <h3 className="service-title text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                      {service.title.split(' ').map((word, wi) => (
                        <span key={wi} className="inline-block overflow-hidden mr-[0.15em]">
                          <span className="title-word inline-block will-change-transform">
                            {word}
                          </span>
                        </span>
                      ))}
                    </h3>
                  </div>

                  <div className="md:w-80 lg:w-96">
                    <p className="text-muted text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
