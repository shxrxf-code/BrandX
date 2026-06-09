'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stages = [
  {
    number: '01',
    title: 'Research',
    subtitle: 'Discovery & Understanding',
    tagline: 'Uncover insights that drive every decision.',
    color: '#3B82F6',
    bgGlow: 'radial-gradient(ellipse 60% 50% at 35% 50%, rgba(59,130,246,0.10), transparent)',
  },
  {
    number: '02',
    title: 'Strategy',
    subtitle: 'Architecture & Blueprint',
    tagline: 'Structure emerges from raw potential.',
    color: '#3B82F6',
    bgGlow: 'radial-gradient(ellipse 60% 50% at 35% 50%, rgba(59,130,246,0.08), transparent)',
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Interface & Experience',
    tagline: 'Wireframes evolve into living interfaces.',
    color: '#3B82F6',
    bgGlow: 'radial-gradient(ellipse 60% 50% at 35% 50%, rgba(96,165,250,0.10), transparent)',
  },
  {
    number: '04',
    title: 'Development',
    subtitle: 'Engineering & Assembly',
    tagline: 'Components converge into systems.',
    color: '#3B82F6',
    bgGlow: 'radial-gradient(ellipse 60% 50% at 35% 50%, rgba(59,130,246,0.08), transparent)',
  },
  {
    number: '05',
    title: 'Testing',
    subtitle: 'Quality & Assurance',
    tagline: 'Every detail verified. Every edge case covered.',
    color: '#3B82F6',
    bgGlow: 'radial-gradient(ellipse 60% 50% at 35% 50%, rgba(96,165,250,0.08), transparent)',
  },
  {
    number: '06',
    title: 'Launch',
    subtitle: 'Deploy & Scale',
    tagline: 'Built. Shipped. performing.',
    color: '#3B82F6',
    bgGlow: 'radial-gradient(ellipse 60% 50% at 35% 50%, rgba(59,130,246,0.10), transparent)',
  },
]

/* ------------------------------------------------------------------ */
/*  Per-stage visual JSX helpers                                       */
/* ------------------------------------------------------------------ */

function ResearchVisual() {
  return (
    <div className="relative w-full h-[320px] lg:h-[420px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Network nodes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
          <line className="research-line" x1="120" y1="100" x2="280" y2="180" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" opacity="0" />
          <line className="research-line" x1="280" y1="180" x2="200" y2="300" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" opacity="0" />
          <line className="research-line" x1="120" y1="100" x2="80" y2="250" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" opacity="0" />
          <line className="research-line" x1="80" y1="250" x2="200" y2="300" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" opacity="0" />
          <line className="research-line" x1="200" y1="300" x2="310" y2="280" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" opacity="0" />
          <circle className="research-node" cx="120" cy="100" r="6" fill="#3B82F6" opacity="0" />
          <circle className="research-node" cx="280" cy="180" r="5" fill="#3B82F6" opacity="0" />
          <circle className="research-node" cx="200" cy="300" r="7" fill="#3B82F6" opacity="0" />
          <circle className="research-node" cx="80" cy="250" r="4" fill="#3B82F6" opacity="0" />
          <circle className="research-node" cx="310" cy="280" r="5" fill="#3B82F6" opacity="0" />
        </svg>

        {/* Animated sticky notes */}
        <div className="research-note absolute top-[5%] left-[8%] w-28 h-20 rounded-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 p-2.5 opacity-0">
          <div className="w-16 h-1.5 rounded bg-[#3B82F6]/30 mb-2" />
          <div className="w-20 h-1 rounded bg-white/10 mb-1" />
          <div className="w-14 h-1 rounded bg-white/10" />
        </div>
        <div className="research-note absolute top-[25%] right-[10%] w-32 h-24 rounded-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 p-2.5 opacity-0">
          <div className="w-20 h-1.5 rounded bg-[#3B82F6]/30 mb-2" />
          <div className="w-24 h-1 rounded bg-white/10 mb-1" />
          <div className="w-16 h-1 rounded bg-white/10 mb-1" />
          <div className="w-20 h-1 rounded bg-white/10" />
        </div>
        <div className="research-note absolute bottom-[18%] left-[15%] w-24 h-20 rounded-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 p-2.5 opacity-0">
          <div className="w-14 h-1.5 rounded bg-[#3B82F6]/30 mb-2" />
          <div className="w-18 h-1 rounded bg-white/10 mb-1" />
          <div className="w-12 h-1 rounded bg-white/10" />
        </div>
        <div className="research-note absolute top-[15%] right-[20%] w-20 h-16 rounded-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 p-2.5 opacity-0">
          <div className="w-12 h-1.5 rounded bg-[#3B82F6]/30 mb-2" />
          <div className="w-14 h-1 rounded bg-white/10" />
        </div>

        {/* Center glow */}
        <div className="absolute w-40 h-40 rounded-full bg-[#3B82F6]/5 blur-3xl" />
      </div>
    </div>
  )
}

function StrategyVisual() {
  return (
    <div className="relative w-full h-[320px] lg:h-[420px] flex items-center justify-center">
      <div className="grid grid-cols-5 grid-rows-5 gap-2 w-[260px] h-[260px]">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="strategy-cell aspect-square rounded-sm border opacity-0"
            style={{
              borderColor: (i === 6 || i === 7 || i === 8 || i === 11 || i === 12 || i === 13 || i === 16 || i === 17 || i === 18)
                ? '#3B82F6'
                : 'rgba(255,255,255,0.06)',
              backgroundColor: (i === 6 || i === 7 || i === 8 || i === 11 || i === 12 || i === 13 || i === 16 || i === 17 || i === 18)
                ? 'rgba(59,130,246,0.08)'
                : 'transparent',
              transform: 'scale(0)',
            }}
          />
        ))}
      </div>

      {/* Structure highlight lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        <rect className="strategy-gridline" x="95" y="95" width="210" height="210" rx="4" stroke="#3B82F6" strokeWidth="1" opacity="0" strokeDasharray="6 4" />
        <line className="strategy-gridline" x1="145" y1="95" x2="145" y2="305" stroke="#3B82F6" strokeWidth="0.5" opacity="0" />
        <line className="strategy-gridline" x1="255" y1="95" x2="255" y2="305" stroke="#3B82F6" strokeWidth="0.5" opacity="0" />
        <line className="strategy-gridline" x1="95" y1="145" x2="305" y2="145" stroke="#3B82F6" strokeWidth="0.5" opacity="0" />
        <line className="strategy-gridline" x1="95" y1="255" x2="305" y2="255" stroke="#3B82F6" strokeWidth="0.5" opacity="0" />
      </svg>
    </div>
  )
}

function DesignVisual() {
  return (
    <div className="relative w-full h-[320px] lg:h-[420px] flex items-center justify-center">
      {/* Wireframe layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="design-wireframe relative w-56 h-64 rounded-xl border-2 border-white/20 bg-transparent p-4 transition-all duration-500">
          <div className="w-20 h-2 rounded bg-white/20 mb-4" />
          <div className="w-full h-16 rounded-lg bg-white/5 mb-3" />
          <div className="flex gap-2 mb-3">
            <div className="w-1/3 h-8 rounded bg-white/5" />
            <div className="w-2/3 h-8 rounded bg-white/5" />
          </div>
          <div className="w-3/4 h-2 rounded bg-white/10 mb-2" />
          <div className="w-1/2 h-2 rounded bg-white/10" />
        </div>
        <div className="design-wireframe absolute -right-4 top-[15%] w-40 h-48 rounded-xl border-2 border-white/15 bg-transparent p-3 transition-all duration-500">
          <div className="w-16 h-1.5 rounded bg-white/20 mb-3" />
          <div className="w-full h-12 rounded-lg bg-white/5 mb-2" />
          <div className="w-3/4 h-1.5 rounded bg-white/10" />
        </div>
      </div>

      {/* UI elements that appear after morph */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
        <div className="design-ui relative w-56 h-64 rounded-xl bg-gradient-to-br from-[#3B82F6]/10 to-transparent border border-[#3B82F6]/30 p-4 shadow-lg shadow-[#3B82F6]/5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <div className="w-16 h-1.5 rounded bg-[#3B82F6]/40" />
          </div>
          <div className="w-full h-16 rounded-lg bg-[#3B82F6]/10 mb-3 border border-[#3B82F6]/10" />
          <div className="flex gap-2 mb-3">
            <div className="flex-1 h-8 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/10" />
            <div className="flex-1 h-8 rounded bg-[#3B82F6]/15 border border-[#3B82F6]/15" />
          </div>
          <div className="w-3/4 h-2 rounded bg-[#3B82F6]/20 mb-2" />
          <div className="w-1/2 h-2 rounded bg-[#3B82F6]/20" />
        </div>
        <div className="design-ui absolute -right-4 top-[15%] w-40 h-48 rounded-xl bg-gradient-to-br from-[#3B82F6]/8 to-transparent border border-[#3B82F6]/20 p-3">
          <div className="w-12 h-1.5 rounded bg-[#3B82F6]/30 mb-3" />
          <div className="w-full h-12 rounded-lg bg-[#3B82F6]/10 mb-2 border border-[#3B82F6]/10" />
          <div className="w-3/4 h-1.5 rounded bg-[#3B82F6]/20" />
        </div>
      </div>
    </div>
  )
}

function DevelopmentVisual() {
  return (
    <div className="relative w-full h-[320px] lg:h-[420px] flex items-center justify-center">
      {/* Code-like blocks assembling */}
      <div className="relative w-72">
        <div className="dev-block flex items-center gap-2 mb-2 opacity-0">
          <span className="w-3 h-3 rounded border border-[#3B82F6]/40 flex-shrink-0" />
          <div className="h-3 flex-1 rounded bg-[#3B82F6]/15" />
          <div className="w-12 h-3 rounded bg-[#3B82F6]/10" />
        </div>
        <div className="dev-block flex items-center gap-2 mb-2 opacity-0">
          <span className="w-3 h-3 rounded border border-[#3B82F6]/40 flex-shrink-0" />
          <div className="w-20 h-3 rounded bg-[#3B82F6]/15" />
          <div className="flex-1 h-3 rounded bg-[#3B82F6]/10 ml-12" />
        </div>
        <div className="dev-block flex items-center gap-2 mb-3 opacity-0">
          <span className="w-3 h-3 rounded border border-[#3B82F6]/40 flex-shrink-0" />
          <div className="w-28 h-3 rounded bg-[#3B82F6]/15" />
          <div className="flex-1 h-3 rounded bg-[#3B82F6]/8" />
        </div>

        {/* Bracket connectors */}
        <div className="dev-connector absolute left-3 top-0 bottom-0 w-0.5 bg-[#3B82F6]/20 opacity-0" />

        <div className="dev-block flex gap-2 mt-4 ml-8 opacity-0">
          <div className="flex-1 h-12 rounded-lg bg-[#3B82F6]/8 border border-[#3B82F6]/15" />
          <div className="flex-1 h-12 rounded-lg bg-[#3B82F6]/12 border border-[#3B82F6]/20" />
          <div className="flex-[0.6] h-12 rounded-lg bg-[#3B82F6]/8 border border-[#3B82F6]/15" />
        </div>

        <div className="dev-block flex gap-1.5 mt-2 ml-8 opacity-0">
          <div className="flex-[0.3] h-6 rounded bg-[#3B82F6]/10" />
          <div className="flex-[0.7] h-6 rounded bg-[#3B82F6]/15" />
          <div className="flex-[0.4] h-6 rounded bg-[#3B82F6]/8" />
          <div className="flex-[0.5] h-6 rounded bg-[#3B82F6]/12" />
        </div>

        <div className="dev-connector absolute left-11 top-[88px] bottom-0 w-0.5 bg-[#3B82F6]/15 opacity-0" />
      </div>

      {/* Right side component indicators */}
      <div className="absolute right-[5%] top-[20%] space-y-3">
        <div className="dev-block flex items-center gap-2 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
          <span className="text-[10px] font-mono text-[#3B82F6]/60">module</span>
        </div>
        <div className="dev-block flex items-center gap-2 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
          <span className="text-[10px] font-mono text-[#3B82F6]/60">api</span>
        </div>
        <div className="dev-block flex items-center gap-2 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
          <span className="text-[10px] font-mono text-[#3B82F6]/60">config</span>
        </div>
        <div className="dev-block flex items-center gap-2 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
          <span className="text-[10px] font-mono text-[#3B82F6]/60">routes</span>
        </div>
      </div>
    </div>
  )
}

function TestingVisual() {
  return (
    <div className="relative w-full h-[320px] lg:h-[420px] flex flex-col justify-center">
      <div className="space-y-4 max-w-sm mx-auto w-full">
        {/* Checklist items */}
        <div className="test-check flex items-center gap-3 opacity-0">
          <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6]/40 flex items-center justify-center">
            <svg className="w-3 h-3 text-[#3B82F6]" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-mono text-muted">Functional coverage</span>
          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="test-bar h-full rounded-full bg-[#3B82F6] w-0" />
          </div>
        </div>

        <div className="test-check flex items-center gap-3 opacity-0">
          <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6]/40 flex items-center justify-center">
            <svg className="w-3 h-3 text-[#3B82F6]" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-mono text-muted">Performance benchmarks</span>
          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="test-bar h-full rounded-full bg-[#3B82F6] w-0" />
          </div>
        </div>

        <div className="test-check flex items-center gap-3 opacity-0">
          <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6]/40 flex items-center justify-center">
            <svg className="w-3 h-3 text-[#3B82F6]" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-mono text-muted">Accessibility audit</span>
          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="test-bar h-full rounded-full bg-[#3B82F6] w-0" />
          </div>
        </div>

        <div className="test-check flex items-center gap-3 opacity-0">
          <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6]/40 flex items-center justify-center">
            <svg className="w-3 h-3 text-[#3B82F6]" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-mono text-muted">Security scan</span>
          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="test-bar h-full rounded-full bg-[#3B82F6] w-0" />
          </div>
        </div>

        {/* Status badges */}
        <div className="flex gap-3 mt-6 justify-center">
          <div className="test-badge px-3 py-1.5 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 text-[10px] font-mono text-[#3B82F6] tracking-wider opacity-0">
            PASSED
          </div>
          <div className="test-badge px-3 py-1.5 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 text-[10px] font-mono text-[#3B82F6] tracking-wider opacity-0">
            VERIFIED
          </div>
          <div className="test-badge px-3 py-1.5 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 text-[10px] font-mono text-[#3B82F6] tracking-wider opacity-0">
            APPROVED
          </div>
        </div>
      </div>
    </div>
  )
}

function LaunchVisual() {
  return (
    <div className="relative w-full h-[320px] lg:h-[420px] flex items-center justify-center">
      <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
        {/* Metrics */}
        <div className="launch-metric text-center">
          <div className="metric-number text-3xl lg:text-4xl font-display font-bold text-[#3B82F6]">0</div>
          <div className="text-[10px] font-mono text-muted-dark mt-1 tracking-wider">PERFORMANCE</div>
        </div>
        <div className="launch-metric text-center">
          <div className="metric-number text-3xl lg:text-4xl font-display font-bold text-[#3B82F6]">0</div>
          <div className="text-[10px] font-mono text-muted-dark mt-1 tracking-wider">UPTIME</div>
        </div>
        <div className="launch-metric text-center">
          <div className="metric-number text-3xl lg:text-4xl font-display font-bold text-[#3B82F6]">0</div>
          <div className="text-[10px] font-mono text-muted-dark mt-1 tracking-wider">COVERAGE</div>
        </div>

        {/* Bars */}
        <div className="col-span-3 flex gap-2 items-end h-24 mt-2">
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="launch-bar w-full rounded-t-sm bg-gradient-to-t from-[#3B82F6]/40 to-[#3B82F6]/80" style={{ height: '0%' }} />
            <span className="text-[8px] font-mono text-muted-dark">Response</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="launch-bar w-full rounded-t-sm bg-gradient-to-t from-[#3B82F6]/40 to-[#3B82F6]/80" style={{ height: '0%' }} />
            <span className="text-[8px] font-mono text-muted-dark">Throughput</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="launch-bar w-full rounded-t-sm bg-gradient-to-t from-[#3B82F6]/40 to-[#3B82F6]/80" style={{ height: '0%' }} />
            <span className="text-[8px] font-mono text-muted-dark">Reliability</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="launch-bar w-full rounded-t-sm bg-gradient-to-t from-[#3B82F6]/40 to-[#3B82F6]/80" style={{ height: '0%' }} />
            <span className="text-[8px] font-mono text-muted-dark">SEO</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="launch-bar w-full rounded-t-sm bg-gradient-to-t from-[#3B82F6]/40 to-[#3B82F6]/80" style={{ height: '0%' }} />
            <span className="text-[8px] font-mono text-muted-dark">Access</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="launch-status col-span-3 text-center mt-4 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="text-xs font-mono text-[#3B82F6] tracking-widest">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pin = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${stages.length * 100}vh`,
        pin: pinRef.current,
        anticipatePin: 1,
        scrub: 1,
      })

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${stages.length * 100}vh`,
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * stages.length), stages.length - 1)
            setActiveIdx(idx)
          },
        },
      })

      master.to(wrapperRef.current, {
        y: () => -(stages.length - 1) * window.innerHeight,
        ease: 'none',
      }, 0)

      stages.forEach((_, i) => {
        const panel = panelsRef.current[i]
        if (!panel) return

        const start = i / stages.length
        const mid = (i + 0.5) / stages.length
        const end = (i + 1) / stages.length

        const title = panel.querySelector('.process-title')
        const accentBar = panel.querySelector('.accent-bar')
        const subtitle = panel.querySelector('.process-subtitle')
        const tagline = panel.querySelector('.process-tagline')

        if (title) {
          master.fromTo(title, { y: 80, opacity: 0, rotateX: -15 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.04, ease: 'power4.out' }, start)
        }
        if (accentBar) {
          master.fromTo(accentBar, { scaleX: 0 }, { scaleX: 1, duration: 0.04, ease: 'power4.out' }, start + 0.01)
        }
        if (subtitle) {
          master.fromTo(subtitle, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.035, ease: 'power4.out' }, start + 0.015)
        }
        if (tagline) {
          master.fromTo(tagline, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.03, ease: 'power4.out' }, start + 0.025)
        }

        switch (i) {
          case 0: researchTimeline(master, panel, start, mid, end); break
          case 1: strategyTimeline(master, panel, start, mid, end); break
          case 2: designTimeline(master, panel, start, mid, end); break
          case 3: developmentTimeline(master, panel, start, mid, end); break
          case 4: testingTimeline(master, panel, start, mid, end); break
          case 5: launchTimeline(master, panel, start, mid, end); break
        }
      })

      ScrollTrigger.addEventListener('refresh', () => master.scrollTrigger?.refresh())
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ------------------------------------------------------------------ */
  /*  Per-stage animation builders                                       */
  /* ------------------------------------------------------------------ */

  function researchTimeline(tl: gsap.core.Timeline, panel: HTMLDivElement, start: number, _mid: number, _end: number) {
    const notes = panel.querySelectorAll('.research-note')
    const lines = panel.querySelectorAll('.research-line')
    const nodes = panel.querySelectorAll('.research-node')

    notes.forEach((note, i) => {
      const x = gsap.utils.random(-200, 200)
      const y = gsap.utils.random(-120, 120)
      const rot = gsap.utils.random(-12, 12)
      tl.fromTo(note, { x, y, opacity: 0, rotation: rot * 2.5 }, { x: 0, y: 0, opacity: 1, rotation: rot, duration: 0.04, ease: 'power4.out' }, start + 0.03 + i * 0.02)
    })

    lines.forEach((line, i) => {
      tl.fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.4, duration: 0.03, ease: 'power4.out' }, start + 0.04 + i * 0.015)
    })

    nodes.forEach((node) => {
      tl.fromTo(node, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.02, ease: 'back.out(2.5)' }, start + 0.05)
      tl.to(node, { scale: 1.8, opacity: 0.25, duration: 0.03, ease: 'sine.inOut', repeat: -1, yoyo: true }, start + 0.08)
    })
  }

  function strategyTimeline(tl: gsap.core.Timeline, panel: HTMLDivElement, start: number, _mid: number, _end: number) {
    const cells = panel.querySelectorAll('.strategy-cell')
    const gridlines = panel.querySelectorAll('.strategy-gridline')

    cells.forEach((cell, i) => {
      tl.to(cell, { scale: 1, opacity: 1, duration: 0.01, ease: 'back.out(2)' }, start + 0.02 + i * 0.004)
    })

    gridlines.forEach((line, i) => {
      tl.fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.5, duration: 0.03, ease: 'power4.out' }, start + 0.04 + i * 0.01)
    })
  }

  function designTimeline(tl: gsap.core.Timeline, panel: HTMLDivElement, start: number, _mid: number, _end: number) {
    const wireframes = panel.querySelectorAll('.design-wireframe')
    const uiElements = panel.querySelectorAll('.design-ui')

    wireframes.forEach((wf) => {
      tl.to(wf, {
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        duration: 0.03,
        ease: 'power4.out',
      }, start + 0.03)
    })

    tl.to(uiElements[0]?.parentElement, { opacity: 1, duration: 0.02, ease: 'power4.out' }, start + 0.06)

    uiElements.forEach((el, i) => {
      tl.fromTo(el, { opacity: 0, y: 30, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.04, ease: 'back.out(1.7)' }, start + 0.07 + i * 0.02)
    })
  }

  function developmentTimeline(tl: gsap.core.Timeline, panel: HTMLDivElement, start: number, _mid: number, _end: number) {
    const blocks = panel.querySelectorAll('.dev-block')
    const connectors = panel.querySelectorAll('.dev-connector')

    blocks.forEach((block, i) => {
      const fromX = i % 2 === 0 ? gsap.utils.random(-80, 80) : 0
      const fromY = i % 2 !== 0 ? gsap.utils.random(40, 90) : 0
      const rot = gsap.utils.random(-4, 4)
      tl.fromTo(block,
        { x: fromX, y: fromY, opacity: 0, rotation: rot * 2 },
        { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.03, ease: 'power4.out' },
        start + 0.02 + i * 0.015
      )
    })

    connectors.forEach((conn, i) => {
      tl.fromTo(conn, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.02, ease: 'power4.out' }, start + 0.04 + i * 0.015)
    })
  }

  function testingTimeline(tl: gsap.core.Timeline, panel: HTMLDivElement, start: number, _mid: number, _end: number) {
    const checks = panel.querySelectorAll('.test-check')
    const bars = panel.querySelectorAll('.test-bar')
    const badges = panel.querySelectorAll('.test-badge')

    checks.forEach((check, i) => {
      tl.fromTo(check, { scale: 0.8, opacity: 0, x: -20 }, { scale: 1, opacity: 1, x: 0, duration: 0.03, ease: 'power4.out' }, start + 0.02 + i * 0.015)
    })

    bars.forEach((bar, i) => {
      tl.fromTo(bar, { width: '0%' }, { width: '100%', duration: 0.03, ease: 'power4.out' }, start + 0.04 + i * 0.015)
    })

    badges.forEach((badge, i) => {
      tl.fromTo(badge, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.025, ease: 'power4.out' }, start + 0.05 + i * 0.012)
    })
  }

  function launchTimeline(tl: gsap.core.Timeline, panel: HTMLDivElement, start: number, _mid: number, _end: number) {
    const metricNums = panel.querySelectorAll('.metric-number')
    const bars = panel.querySelectorAll('.launch-bar')
    const status = panel.querySelectorAll('.launch-status')

    const heights = [95, 88, 100, 78, 92]

    metricNums.forEach((num, i) => {
      const vals = [100, 99.97, 96]
      tl.fromTo(num, { textContent: '0' }, { textContent: `${vals[i]}`, duration: 0.06, ease: 'power4.out', snap: { textContent: 1 } }, start + 0.03 + i * 0.015)
    })

    bars.forEach((bar, i) => {
      tl.fromTo(bar, { height: '0%' }, { height: `${heights[i]}%`, duration: 0.04, ease: 'power4.out' }, start + 0.04 + i * 0.01)
    })

    status.forEach((s, i) => {
      tl.fromTo(s, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.025, ease: 'power4.out' }, start + 0.07 + i * 0.01)
    })
  }

  const active = stages[activeIdx]

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ height: `${stages.length * 100}vh` }}>
      {/* Stage indicator — right side */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4 pointer-events-none">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        {stages.map((s, i) => (
          <div key={s.number} className="flex items-center gap-3 transition-all duration-700" style={{ opacity: i === activeIdx ? 1 : i < activeIdx ? 0.3 : 0.15 }}>
            <span
              className="text-[9px] font-mono font-bold tracking-widest transition-all duration-700"
              style={{ color: i <= activeIdx ? s.color : 'rgba(255,255,255,0.2)' }}
            >
              {s.number}
            </span>
            <div
              className="w-[6px] h-[6px] rounded-full transition-all duration-700"
              style={{
                background: i === activeIdx ? s.color : i < activeIdx ? `${s.color}60` : 'rgba(255,255,255,0.12)',
                boxShadow: i === activeIdx ? `0 0 12px ${s.color}60` : 'none',
              }}
            />
          </div>
        ))}
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Stage number badge — bottom left */}
      <div className="fixed bottom-8 left-6 md:left-10 z-50 pointer-events-none hidden lg:block">
        <div className="flex items-end gap-3">
          <span
            className="text-[clamp(4rem,10vw,8rem)] font-display font-bold leading-none transition-colors duration-700"
            style={{ color: active.color, opacity: 0.12 }}
          >
            {active.number}
          </span>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full transition-colors duration-700" style={{ background: active.color }} />
            <span className="text-[10px] font-mono tracking-[0.25em] transition-colors duration-700" style={{ color: active.color }}>
              STAGE {active.number}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile stage indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 lg:hidden pointer-events-none">
        {stages.map((s, i) => (
          <div
            key={s.number}
            className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{
              background: i === activeIdx ? s.color : 'rgba(255,255,255,0.12)',
              width: i === activeIdx ? 6 : 4,
              height: i === activeIdx ? 6 : 4,
            }}
          />
        ))}
      </div>

      {/* Pinned container */}
      <div ref={pinRef} className="h-screen w-full overflow-hidden fixed top-0 left-0 bg-background">
        <div ref={wrapperRef} className="will-change-transform" style={{ height: `${stages.length * 100}vh` }}>
          {stages.map((stage, i) => (
            <div
              key={stage.number}
              ref={(el) => { panelsRef.current[i] = el }}
              className="h-screen w-full flex-shrink-0 relative overflow-hidden flex items-center"
            >
              {/* Dynamic background glow */}
              <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ background: stage.bgGlow, opacity: i === activeIdx ? 1 : 0.3 }}
              />

              {/* Subtle dot grid */}
              <div className="absolute inset-0 dot-grid-sm opacity-20 pointer-events-none" />

              <div className="relative z-10 w-full max-w-content mx-auto px-6 md:px-10 lg:px-16">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 xl:gap-24">
                  {/* Text side */}
                  <div className="flex-1 max-w-xl">
                    <div className="overflow-hidden mb-4">
                      <span
                        className="accent-bar block h-[3px] w-20 rounded-full origin-left"
                        style={{ background: stage.color, transform: 'scaleX(0)' }}
                      />
                    </div>
                    <h2
                      className="process-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-[0.88]"
                      style={{ opacity: 0, transform: 'translateY(80px)' }}
                    >
                      {stage.title}
                    </h2>
                    <p
                      className="process-subtitle text-lg md:text-xl lg:text-2xl mt-4 text-muted font-display font-medium"
                      style={{ opacity: 0, transform: 'translateY(40px)' }}
                    >
                      {stage.subtitle}
                    </p>
                    <p
                      className="process-tagline text-sm md:text-base mt-3 text-muted-dark font-mono"
                      style={{ opacity: 0, transform: 'translateY(20px)' }}
                    >
                      {stage.tagline}
                    </p>
                  </div>

                  {/* Visual side */}
                  <div className="flex-1 visual-area">
                    {i === 0 && <ResearchVisual />}
                    {i === 1 && <StrategyVisual />}
                    {i === 2 && <DesignVisual />}
                    {i === 3 && <DevelopmentVisual />}
                    {i === 4 && <TestingVisual />}
                    {i === 5 && <LaunchVisual />}
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
