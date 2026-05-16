'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Share2, Globe } from 'lucide-react'

const links = [
  { label: 'Work', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Process', href: '#' },
  { label: 'Contact', href: '#' },
]

const social = [
  { icon: Globe, href: '#' },
  { icon: Share2, href: '#' },
  { icon: MessageCircle, href: '#' },
  { icon: Mail, href: '#' },
]

export default function Footer() {
  return (
    <footer className="pt-20 pb-12 bg-background border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-display font-bold mb-8"
            >
              AGENCY<span className="text-accent-blue">.</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/40 text-lg max-w-sm mb-12"
            >
              The new standard of digital excellence. We build premium digital experiences for brands that demand nothing but the absolute best.
            </motion.p>
            
            <div className="flex gap-6">
              {social.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-white/20 font-bold mb-8">Navigation</h4>
            <ul className="space-y-4">
              {links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-lg text-white/50 hover:text-white hover:translate-x-2 transition-all inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-white/20 font-bold mb-8">Get in Touch</h4>
            <div className="space-y-6">
              <a href="mailto:hello@agency.digital" className="text-2xl font-bold text-white hover:text-accent-blue transition-colors block">
                hello@agency.digital
              </a>
              <p className="text-white/40 leading-relaxed">
                123 Creative Studio <br />
                Dubai Design District <br />
                United Arab Emirates
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-white/20 uppercase tracking-widest">
            © 2024 Digital Agency. All Rights Reserved.
          </div>
          <div className="flex gap-8 text-sm text-white/20 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </footer>
  )
}
