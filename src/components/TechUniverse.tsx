'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const technologies = [
  { name: 'Next.js', category: 'Frontend', x: 50, y: 18, size: 'lg' },
  { name: 'React', category: 'Frontend', x: 20, y: 32, size: 'lg' },
  { name: 'TypeScript', category: 'Language', x: 78, y: 28, size: 'md' },
  { name: 'Flutter', category: 'Mobile', x: 32, y: 48, size: 'md' },
  { name: 'Node.js', category: 'Backend', x: 68, y: 52, size: 'lg' },
  { name: 'Python', category: 'AI/ML', x: 22, y: 68, size: 'md' },
  { name: 'AI', category: 'Intelligence', x: 78, y: 72, size: 'lg' },
  { name: 'Cloud', category: 'Infrastructure', x: 50, y: 85, size: 'md' },
  { name: 'GraphQL', category: 'API', x: 88, y: 42, size: 'sm' },
  { name: 'Three.js', category: '3D', x: 12, y: 52, size: 'sm' },
  { name: 'GSAP', category: 'Animation', x: 88, y: 60, size: 'sm' },
  { name: 'Tailwind', category: 'CSS', x: 40, y: 28, size: 'sm' },
  { name: 'PostgreSQL', category: 'Database', x: 65, y: 65, size: 'sm' },
  { name: 'Docker', category: 'DevOps', x: 35, y: 78, size: 'sm' },
  { name: 'Redis', category: 'Cache', x: 55, y: 38, size: 'sm' },
]

export default function TechUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = sectionRef.current?.querySelectorAll('.tech-node')
      if (nodes) {
        nodes.forEach((node, i) => {
          gsap.fromTo(node, { scale: 0, opacity: 0 }, {
            scale: 1, opacity: 1,
            duration: 0.7, delay: i * 0.06,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          })
          gsap.to(node, {
            y: -6,
            duration: 2 + Math.random() * 2,
            repeat: -1, yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2,
          })
        })
      }

      const lines = canvasRef.current
      if (lines) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('class', 'absolute inset-0 w-full h-full pointer-events-none')
        svg.setAttribute('style', 'z-index: 0;')

        for (let i = 0; i < technologies.length; i++) {
          for (let j = i + 1; j < technologies.length; j++) {
            const dist = Math.sqrt(
              Math.pow(technologies[i].x - technologies[j].x, 2) +
              Math.pow(technologies[i].y - technologies[j].y, 2)
            )
            if (dist < 35) {
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
              const pct = 0.7
              line.setAttribute('x1', `${technologies[i].x * pct + 15}%`)
              line.setAttribute('y1', `${technologies[i].y * pct + 10}%`)
              line.setAttribute('x2', `${technologies[j].x * pct + 15}%`)
              line.setAttribute('y2', `${technologies[j].y * pct + 10}%`)
              line.setAttribute('stroke', 'rgba(59, 130, 246, 0.06)')
              line.setAttribute('stroke-width', '0.5')
              svg.appendChild(line)
            }
          }
        }
        lines.appendChild(svg)
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10 mb-16">
        <span className="scene-eyebrow">Technology Stack</span>
        <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
          Modern tools for
          <br />
          <span className="text-accent">modern solutions.</span>
        </h2>
      </div>

      <div ref={canvasRef} className="relative max-w-5xl mx-auto px-6 md:px-10" style={{ minHeight: '70vh' }}>
        <div className="relative w-full h-full" style={{ minHeight: '60vh' }}>
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="tech-node absolute group cursor-pointer"
              style={{
                left: `${tech.x * 0.7 + 15}%`,
                top: `${tech.y * 0.7 + 10}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className={`
                  relative flex items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
                  ${tech.size === 'lg' ? 'w-20 h-20 md:w-28 md:h-28 border-accent/30 bg-accent/10' : ''}
                  ${tech.size === 'md' ? 'w-16 h-16 md:w-20 md:h-20 border-border-light bg-subtle-light' : ''}
                  ${tech.size === 'sm' ? 'w-12 h-12 md:w-16 md:h-16 border-border-light bg-subtle-light' : ''}
                  group-hover:border-accent group-hover:bg-accent/15
                `}
              >
                <div className="text-center">
                  <span className={`
                    font-display font-bold tracking-tight
                    ${tech.size === 'lg' ? 'text-xs md:text-sm' : ''}
                    ${tech.size === 'md' ? 'text-[10px] md:text-xs' : ''}
                    ${tech.size === 'sm' ? 'text-[8px] md:text-[10px]' : ''}
                  `}>
                    {tech.name}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="text-[8px] text-accent tracking-[0.15em] uppercase font-mono">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
