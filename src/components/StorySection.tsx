'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const milestones = [
  { year: '2019', text: 'Brandex was founded with a vision to redefine digital experiences' },
  { year: '2020', text: 'First major enterprise partnership — set the standard for quality' },
  { year: '2021', text: 'Expanded into AI-driven design and automation technologies' },
  { year: '2022', text: 'Recognized globally for innovation in interactive experiences' },
  { year: '2023', text: 'Team grew to 50+ specialists across design, engineering, and strategy' },
  { year: '2024', text: 'Launched next-generation digital products for Fortune 500 clients' },
]

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl.to(textContainerRef.current, {
        y: '-50%',
        ease: 'none',
      })

      tl.to(
        lineRef.current,
        {
          scaleY: 1,
          ease: 'none',
        },
        0
      )

      const milestoneItems = timelineRef.current?.querySelectorAll('.milestone-item')
      if (milestoneItems) {
        tl.to(milestoneItems, {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          ease: 'power2.out',
        }, 0)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-background">
      <div ref={pinRef} className="min-h-screen flex items-center overflow-hidden">
        <div className="max-w-content mx-auto px-6 md:px-10 w-full grid md:grid-cols-2 gap-16 md:gap-24">
          <div className="flex flex-col justify-center">
            <h2 ref={headingRef} className="scene-eyebrow mb-6">Our Story</h2>
            <p ref={subtitleRef} className="text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.05] mb-6">
              We don&apos;t just build websites.
              <br />
              <span className="text-accent">We engineer ecosystems.</span>
            </p>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-md">
              Every pixel, every interaction, every animation — intentional. 
              We combine technical precision with creative vision to deliver 
              experiences that drive measurable business growth.
            </p>

            <div className="mt-12 flex items-center gap-3">
              <div className="w-10 h-[1px] bg-accent/50" />
              <span className="text-xs text-muted tracking-[0.2em] uppercase">8+ Years of Excellence</span>
            </div>
          </div>

          <div ref={textContainerRef} className="relative">
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border overflow-hidden">
                <div
                  ref={lineRef}
                  className="w-full bg-accent origin-top"
                  style={{ transform: 'scaleY(0)', height: '100%' }}
                />
              </div>

              <div ref={timelineRef} className="space-y-16">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className="milestone-item opacity-0 translate-x-8"
                  >
                    <div className="absolute left-[-32px] w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-[5px] mt-1.5" />
                    <span className="text-2xl font-display font-bold text-accent mb-2 block">
                      {m.year}
                    </span>
                    <p className="text-muted text-sm md:text-base leading-relaxed">
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
