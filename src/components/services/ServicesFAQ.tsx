'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'How do you price engagements?',
    a: 'We work on a project basis with milestone-based payments. A typical engagement ranges from $40K to $250K+ depending on scope. We also offer retainer partnerships for ongoing work. Every proposal is bespoke and tied to outcomes, not hours.',
  },
  {
    q: 'How long does a typical engagement take?',
    a: 'A focused brand identity project runs 6–10 weeks. A full website or platform build runs 8–14 weeks. Growth engagements are ongoing with 90-day sprint cycles. We move fast but never at the cost of craft.',
  },
  {
    q: 'Do you work with startups or only enterprise?',
    a: 'We work with ambitious teams at every stage. Our sweet spot is Series A through enterprise — companies that are scaling and need a partner who can move at the same pace. We are not the right fit for pre-product or pre-revenue work.',
  },
  {
    q: 'Who will I actually be working with?',
    a: 'You work directly with the principals and senior team — no account managers, no handoffs, no dilution. The team that scopes the work is the team that builds the work. That is non-negotiable for us.',
  },
  {
    q: 'What if I only need one of your services?',
    a: 'Many clients come to us for a single capability — a rebrand, a website, an SEO foundation. We do not require you to engage us across the full stack. If there is a fit, we will tell you; if not, we will recommend someone who is.',
  },
  {
    q: 'Do you provide ongoing support after launch?',
    a: 'Yes. Most of our clients move into a retainer partnership after launch. We instrument, monitor, optimize, and ship continuously. We do not believe in launching and walking away.',
  },
]

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="04" label="FAQ" className="mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.05]">
              Common questions,{' '}
              <span className="text-gradient-shine">honest answers</span>.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className={cn(
                      'rounded-2xl border transition-colors duration-500 overflow-hidden',
                      isOpen
                        ? 'glass-elevated border-accent/30 bg-accent/[0.03]'
                        : 'border-white/[0.06] hover:border-white/15'
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left"
                      data-cursor-hover
                    >
                      <span
                        className={cn(
                          'font-display text-lg md:text-xl font-medium transition-colors',
                          isOpen ? 'text-white' : 'text-white/80'
                        )}
                      >
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors',
                          isOpen ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/60'
                        )}
                      >
                        <Plus size={16} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-white/65 leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
