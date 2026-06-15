'use client'

import { motion } from 'framer-motion'

const techGroups = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    color: 'bg-blue-50 border-blue-200 text-accent',
  },
  {
    category: 'Mobile',
    items: ['Flutter', 'React Native'],
    color: 'bg-cyan-50 border-cyan-200 text-cyan',
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
    color: 'bg-purple-50 border-purple-200 text-purple-600',
  },
  {
    category: 'AI & Cloud',
    items: ['OpenAI', 'AWS', 'Vercel', 'Docker'],
    color: 'bg-orange-50 border-orange-200 text-orange-600',
  },
]

export default function TechStackSection() {
  return (
    <section className="relative bg-secondary py-20 md:py-28 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
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
              className="rounded-xl border border-border bg-white p-6"
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
