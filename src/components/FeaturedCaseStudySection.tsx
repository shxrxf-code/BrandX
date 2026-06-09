'use client'

import { useRef } from 'react'
import Link from 'next/link'

export default function FeaturedCaseStudySection() {
  return (
    <section className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-12">
          <span className="scene-eyebrow">Featured Case Study</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            SolarTech Energy
            <br />
            <span className="text-accent">+340% inbound leads.</span>
          </h2>
        </div>

        <div className="relative rounded-3xl border border-border bg-subtle overflow-hidden">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-transparent" />
            <div className="absolute inset-0 dot-grid opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <span className="text-[clamp(2rem,8vw,8rem)] font-display font-bold text-accent/15 tracking-tight">
                SolarTech
              </span>
              <p className="text-muted/40 mt-2 text-lg">Clean Energy · Global Scale</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-8 md:p-10 lg:p-12">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-4 block">Challenge</span>
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                Fragmented brand identity across 14 markets with a dated web platform that failed to inspire investor confidence.
              </p>
            </div>
            <div className="p-8 md:p-10 lg:p-12">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-4 block">Solution</span>
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                Unified brand narrative with a premium visual system and modular web platform engineered for global scale.
              </p>
            </div>
            <div className="p-8 md:p-10 lg:p-12">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-4 block">Result</span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-accent tracking-tight">+340%</span>
                <span className="text-sm text-muted font-mono">Inbound Leads</span>
              </div>
              <Link
                href="/work/solartech-energy"
                className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4 transition-all"
              >
                Read full case study →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
