'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'Web Development',
    desc: 'High-performance web platforms built with modern frameworks and best practices.',
    gradient: 'from-accent/20 to-violet-500/20',
    border: 'border-accent/30',
    glow: 'shadow-accent/20',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    desc: 'User-centered interfaces that balance aesthetics with conversion-driven flows.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: 'SEO',
    desc: 'Data-driven search strategies that increase visibility and drive organic traffic.',
    gradient: 'from-magenta/20 to-accent/20',
    border: 'border-magenta/30',
    glow: 'shadow-magenta/20',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
  {
    title: 'Digital Marketing',
    desc: 'Multi-channel campaigns engineered for measurable ROI and brand growth.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/30',
    glow: 'shadow-pink-500/20',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m9.5-7.5V5.25m-9 4.5V5.25" />
      </svg>
    ),
  },
  {
    title: 'Brand Identity',
    desc: 'Distinct brand systems that communicate your value and build lasting recognition.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: 'AI Solutions',
    desc: 'Custom AI integrations and automation that streamline operations and unlock insights.',
    gradient: 'from-violet-500/20 to-indigo-500/20',
    border: 'border-violet-500/30',
    glow: 'shadow-violet-500/20',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
]

const floatConfig = [0, 1, 2, 1.5, 0.5, 2.5]

export default function HeroVisual() {
  return (
    <div className="relative w-full">
      <div className="grid grid-cols-2 gap-3">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`group relative rounded-xl p-4 backdrop-blur-xl border transition-all duration-300 ${service.border} ${service.glow} hover:shadow-xl`}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
              animation: `float ${3 + floatConfig[i]}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${service.gradient}`} />
            <div className="relative z-10">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 border ${service.border} text-foreground/80 group-hover:text-foreground transition-colors duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-sm font-display font-bold tracking-tight text-foreground mb-1">
                {service.title}
              </h3>
              <p className="text-[10px] text-muted/70 leading-relaxed line-clamp-2">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}
