'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, audience, and goals to find the unique angle that will make you stand out.'
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Creating a roadmap for success, combining data-driven insights with creative intuition.'
  },
  {
    number: '03',
    title: 'Design',
    description: 'Ultra-premium UI/UX design focused on emotion, clarity, and world-class aesthetics.'
  },
  {
    number: '04',
    title: 'Development',
    description: 'Building high-performance, cinematic digital products using the latest technologies.'
  },
  {
    number: '05',
    title: 'Launch',
    description: 'A seamless rollout strategy to ensure your new digital experience makes maximum impact.'
  },
  {
    number: '06',
    title: 'Growth',
    description: 'Continuous optimization and performance marketing to scale your brand to new heights.'
  }
]

export default function Process() {
  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3 sticky top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent-purple font-display font-bold uppercase tracking-widest text-sm mb-4"
            >
              How we work
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              Our <span className="text-white/20">Process</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed"
            >
              A systematic approach to creating digital excellence. We don't just build, we craft every detail with purpose.
            </motion.p>
          </div>

          <div className="md:w-2/3 space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group relative flex gap-12"
              >
                <div className="hidden md:block">
                  <span className="text-8xl font-display font-bold text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500">
                    {step.number}
                  </span>
                </div>
                
                <div>
                  <div className="md:hidden text-2xl font-display font-bold text-accent-purple mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-accent-purple transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-xl text-white/40 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>

                {/* Vertical Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute -bottom-20 left-[4.5rem] w-[1px] h-20 bg-gradient-to-b from-white/10 to-transparent hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
