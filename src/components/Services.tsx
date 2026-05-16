'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Share2, Search, Cpu, BarChart, Camera, Zap } from 'lucide-react'

const services = [
  {
    title: 'Web Development',
    description: 'We build high-performance, cinematic web experiences that push the boundaries of modern technology.',
    icon: Code,
    color: 'accent-blue'
  },
  {
    title: 'AI Solutions',
    description: 'Integrating cutting-edge AI to automate workflows and create intelligent user interactions.',
    icon: Cpu,
    color: 'accent-purple'
  },
  {
    title: 'UI/UX Design',
    description: 'Award-winning design systems focused on user emotion, conversion, and premium aesthetics.',
    icon: Palette,
    color: 'accent-cyan'
  },
  {
    title: 'SEO Strategy',
    description: 'Dominating search results with advanced technical SEO and content-driven growth strategies.',
    icon: Search,
    color: 'accent-blue'
  },
  {
    title: 'Content Creation',
    description: 'Cinematic video production and high-end digital assets that define your brand identity.',
    icon: Camera,
    color: 'accent-purple'
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven performance marketing focused on high-ticket client acquisition.',
    icon: BarChart,
    color: 'accent-cyan'
  }
]

export default function Services() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-blue font-display font-bold uppercase tracking-widest text-sm mb-4"
          >
            What we do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            Capabilities that <span className="text-white/30">define</span> the future.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-3xl glass transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${service.color}/10 blur-[60px] group-hover:bg-${service.color}/20 transition-colors`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-${service.color}/10 flex items-center justify-center mb-8 border border-${service.color}/20 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className={`w-6 h-6 text-${service.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-white/50 leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white/70">
                  Explore Service <Zap className="w-3 h-3 text-accent-cyan" />
                </div>
              </div>

              {/* Animated border glow */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-3xl transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
