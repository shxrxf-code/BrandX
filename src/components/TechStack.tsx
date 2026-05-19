'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

const technologies = [
  { name: 'Next.js', category: 'Framework', level: 95 },
  { name: 'React', category: 'Library', level: 98 },
  { name: 'TypeScript', category: 'Language', level: 95 },
  { name: 'Tailwind CSS', category: 'Styling', level: 92 },
  { name: 'Framer Motion', category: 'Animation', level: 90 },
  { name: 'Node.js', category: 'Runtime', level: 88 },
  { name: 'PostgreSQL', category: 'Database', level: 85 },
  { name: 'AWS', category: 'Cloud', level: 82 },
  { name: 'Figma', category: 'Design', level: 95 },
  { name: 'Three.js', category: '3D', level: 78 },
  { name: 'GSAP', category: 'Animation', level: 88 },
  { name: 'Vercel', category: 'Deployment', level: 92 },
]

export default function TechStack() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block">
              Technology
            </span>
            <h2 className="font-display text-section font-bold text-gradient mb-6">
              Our Tech Stack
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-body-lg">
              We leverage cutting-edge technologies to build fast, scalable, and
              beautiful digital products.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, i) => (
            <ScrollReveal key={i} delay={i * 0.05} direction="up" distance={30}>
              <motion.div
                className="glass-card rounded-2xl p-6 group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-white font-semibold">
                    {tech.name}
                  </span>
                  <span className="text-xs text-text-muted">{tech.category}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
