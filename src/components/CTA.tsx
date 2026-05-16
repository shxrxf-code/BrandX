'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Animated Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-[10vw] font-bold leading-[0.85] mb-8 tracking-tighter uppercase">
            Ready to build <br />
            <span className="text-white/20">Something</span> <br />
            Iconic?
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <button className="group relative px-12 py-6 bg-white text-black rounded-full font-bold text-2xl overflow-hidden transition-all hover:scale-110 active:scale-95">
              <span className="relative z-10 flex items-center gap-3">
                Start a Project <ArrowUpRight className="w-6 h-6" />
              </span>
              <div className="absolute inset-0 bg-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button className="text-xl font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors border-b border-white/10 pb-2">
              Book a Strategy Call
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative text */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="text-[20vw] font-bold whitespace-nowrap animate-marquee uppercase tracking-tighter">
          DIGITAL EXCELLENCE DIGITAL EXCELLENCE DIGITAL EXCELLENCE
        </div>
      </div>
    </section>
  )
}
