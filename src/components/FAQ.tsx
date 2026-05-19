'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const faqs = [
  {
    question: 'What makes Brandex different from other agencies?',
    answer: 'We combine strategic thinking with creative excellence and technical precision. Every project is approached with a data-driven mindset, ensuring that beautiful design translates into measurable business results. Our team operates at the intersection of art and science.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A brand identity project typically takes 4-6 weeks, while a full website build ranges from 8-12 weeks. We provide detailed timelines during our initial consultation and keep you informed at every stage.',
  },
  {
    question: 'Do you work with startups or only established brands?',
    answer: 'We work with both. Startups benefit from our strategic foundation-building, while established brands leverage our expertise for transformation and growth. What matters most is your commitment to excellence and willingness to invest in quality.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'We offer project-based pricing tailored to your specific needs. Every engagement begins with a discovery call where we understand your goals and provide a transparent proposal. We believe in value-based pricing that reflects the impact we create.',
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Absolutely. We offer retainer packages for ongoing optimization, maintenance, and growth. Our relationship doesn\'t end at launch—we continue to monitor, test, and iterate to ensure your digital presence keeps evolving.',
  },
  {
    question: 'Can you work with our existing team?',
    answer: 'Yes, we frequently collaborate with in-house teams. Whether you need us to lead the project or augment your existing capabilities, we adapt our working style to integrate seamlessly with your organization.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding relative">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block">
              FAQ
            </span>
            <h2 className="font-display text-section font-bold text-gradient">
              Common Questions
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05} direction="up" distance={20}>
              <div className="faq-item py-6 cursor-none">
                <button
                  className="w-full flex items-center justify-between text-left group"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-display text-lg md:text-xl font-semibold text-white pr-8 group-hover:text-accent-blue transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === i ? (
                      <Minus size={18} className="text-white" />
                    ) : (
                      <Plus size={18} className="text-white" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="pt-4 text-text-secondary leading-relaxed pr-16">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
