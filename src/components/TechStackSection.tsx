'use client'

import { motion } from 'framer-motion'

const techGroups = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    color: 'bg-accent/10 border-accent/20 text-accent',
  },
  {
    category: 'Mobile',
    items: ['Flutter', 'React Native'],
    color: 'bg-cyan/10 border-cyan/20 text-cyan',
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
    color: 'bg-[#8B5CF6]/10 border-[#8B5CF6]/20 text-[#8B5CF6]',
  },
  {
    category: 'AI & Cloud',
    items: ['OpenAI', 'AWS', 'Vercel', 'Docker'],
    color: 'bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]',
  },
]

export default function TechStackSection() {
  return (
    <section className="relative bg-surface py-20 md:py-28 overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Technology Stack
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            Tools we trust.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider mb-4 ${group.color}`}>
                {group.category}
              </div>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-foreground font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
