'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications, headless CMS architectures, and scalable frontends built with modern frameworks.',
    icon: '⚡',
  },
  {
    title: 'UI/UX Design',
    description: 'Research-driven design systems, interactive prototypes, and intuitive user flows crafted for conversion.',
    icon: '✦',
  },
  {
    title: 'Brand Identity',
    description: 'Strategic brand systems including visual identity, typography, and guidelines that communicate unique value.',
    icon: '◆',
  },
  {
    title: 'SEO',
    description: 'Technical SEO audits, content strategy, and performance engineering for sustainable organic growth.',
    icon: '◎',
  },
  {
    title: 'Digital Marketing',
    description: 'Paid media, lifecycle programs, and analytics-driven campaigns that turn traffic into revenue.',
    icon: '◈',
  },
  {
    title: 'AI Solutions',
    description: 'Custom AI agents, LLM-powered features, and intelligent automation that transform business operations.',
    icon: '◇',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function ServicesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Services
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            What we do.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative p-6 md:p-8 rounded-xl border border-border bg-white hover:border-accent/30 hover:shadow-sm transition-all duration-300"
            >
              <span className="text-2xl mb-4 block">{service.icon}</span>
              <h3 className="text-heading-3 font-bold tracking-tight mb-2 group-hover:text-accent transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
