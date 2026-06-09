'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from '@/components/providers/CursorProvider'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const technologies = [
  { name: 'Next.js', category: 'Frontend', x: 50, y: 20, size: 'lg' },
  { name: 'React', category: 'Frontend', x: 20, y: 35, size: 'lg' },
  { name: 'TypeScript', category: 'Language', x: 80, y: 30, size: 'md' },
  { name: 'Flutter', category: 'Mobile', x: 35, y: 50, size: 'md' },
  { name: 'Node.js', category: 'Backend', x: 65, y: 55, size: 'lg' },
  { name: 'Python', category: 'AI/ML', x: 25, y: 70, size: 'md' },
  { name: 'AI', category: 'Intelligence', x: 75, y: 75, size: 'lg' },
  { name: 'Cloud', category: 'Infrastructure', x: 50, y: 85, size: 'md' },
  { name: 'GraphQL', category: 'API', x: 85, y: 45, size: 'sm' },
  { name: 'Three.js', category: '3D', x: 10, y: 55, size: 'sm' },
  { name: 'GSAP', category: 'Animation', x: 90, y: 65, size: 'sm' },
  { name: 'Framer', category: 'Motion', x: 60, y: 40, size: 'sm' },
  { name: 'Tailwind', category: 'CSS', x: 40, y: 30, size: 'sm' },
  { name: 'PostgreSQL', category: 'Database', x: 70, y: 65, size: 'sm' },
  { name: 'Docker', category: 'DevOps', x: 30, y: 80, size: 'sm' },
]

export default function TechUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const { setCursor } = useCursor()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = sectionRef.current?.querySelectorAll('.tech-node')

      if (nodes) {
        nodes.forEach((node, i) => {
          gsap.fromTo(
            node,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.08,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          )

          gsap.to(node, {
            y: -5,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2,
          })
        })
      }

      const lines = canvasRef.current
      if (lines) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('class', 'absolute inset-0 w-full h-full')
        svg.setAttribute('style', 'z-index: 0;')

        for (let i = 0; i < technologies.length; i++) {
          for (let j = i + 1; j < technologies.length; j++) {
            const dist = Math.sqrt(
              Math.pow(technologies[i].x - technologies[j].x, 2) +
              Math.pow(technologies[i].y - technologies[j].y, 2)
            )
            if (dist < 40) {
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
              const pct = 0.7
              line.setAttribute('x1', `${technologies[i].x * pct + 15}%`)
              line.setAttribute('y1', `${technologies[i].y * pct + 10}%`)
              line.setAttribute('x2', `${technologies[j].x * pct + 15}%`)
              line.setAttribute('y2', `${technologies[j].y * pct + 10}%`)
              line.setAttribute('stroke', 'rgba(91, 91, 255, 0.1)')
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
    <section
      ref={sectionRef}
      className="relative bg-subtle py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 md:px-10 mb-16">
        <span className="scene-eyebrow">Our Expertise</span>
        <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
          Technology is
          <br />
          <span className="text-accent">our native language.</span>
        </h2>
      </div>

      <div
        ref={canvasRef}
        className="relative max-w-5xl mx-auto px-6 md:px-10"
        style={{ minHeight: '70vh' }}
      >
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
              onMouseEnter={() => {
                setCursor('Explore', 'expand')
              }}
              onMouseLeave={() => {
                setCursor(null, 'default')
              }}
            >
              <div
                className={`
                  relative flex items-center justify-center rounded-full border
                  transition-all duration-500 group-hover:scale-110
                  ${tech.size === 'lg' ? 'w-20 h-20 md:w-28 md:h-28' : ''}
                  ${tech.size === 'md' ? 'w-16 h-16 md:w-20 md:h-20' : ''}
                  ${tech.size === 'sm' ? 'w-12 h-12 md:w-16 md:h-16' : ''}
                  ${tech.size === 'lg' ? 'border-accent/30 bg-accent/10' : 'border-border-light bg-subtle-light'}
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
                <span className="text-[8px] text-accent tracking-[0.15em] uppercase font-mono">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
