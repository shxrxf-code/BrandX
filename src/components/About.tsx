'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-square rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-transparent to-accent-purple/20" />
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <p className="text-2xl md:text-3xl font-display font-medium leading-relaxed italic text-white/80">
                  "We believe that in the digital age, status is built through exceptional experiences."
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
              <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />
            </motion.div>
            
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-cyan/10 blur-[100px] rounded-full -z-10" />
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent-cyan font-display font-bold uppercase tracking-widest text-sm mb-4"
            >
              Our Vision
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9] tracking-tighter"
            >
              WE DON'T JUST <br />
              <span className="text-white/20">CREATE WEBSITES.</span> <br />
              WE CRAFT LEGACIES.
            </motion.h2>
            
            <div className="space-y-6 text-lg text-white/50 leading-relaxed max-w-xl">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                We understand that your digital presence is your most valuable asset. We bridge the gap between technology and emotion to create experiences that don't just look good—they feel iconic.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Our team of world-class designers and developers work at the intersection of art and innovation, delivering premium solutions for brands that demand excellence in every pixel.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-8"
            >
              <div>
                <div className="text-3xl font-bold mb-1 text-white">Innovation</div>
                <div className="text-sm text-white/30 uppercase tracking-widest">Driven by AI</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1 text-white">Excellence</div>
                <div className="text-sm text-white/30 uppercase tracking-widest">Pixel Perfect</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
