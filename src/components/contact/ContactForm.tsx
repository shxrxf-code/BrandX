'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, label: 'Project' },
  { id: 2, label: 'Scope' },
  { id: 3, label: 'Contact' },
]

const services = [
  { id: 'brand-strategy', label: 'Brand Strategy & Identity' },
  { id: 'web-platforms', label: 'Web Platforms' },
  { id: 'ui-ux-product', label: 'UI/UX & Product Design' },
  { id: 'seo-growth', label: 'SEO & Organic Growth' },
  { id: 'performance-marketing', label: 'Performance Marketing' },
  { id: 'mobile-apps', label: 'Mobile Apps' },
]

const budgets = [
  { id: '<25', label: '< $25K' },
  { id: '25-75', label: '$25K – $75K' },
  { id: '75-200', label: '$75K – $200K' },
  { id: '200+', label: '$200K+' },
  { id: 'retainer', label: 'Ongoing retainer' },
]

const timelines = [
  { id: 'asap', label: 'ASAP' },
  { id: '1-3m', label: '1–3 months' },
  { id: '3-6m', label: '3–6 months' },
  { id: '6m+', label: '6+ months' },
  { id: 'exploring', label: 'Just exploring' },
]

export default function ContactForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState({
    services: [] as string[],
    budget: '',
    timeline: '',
    name: '',
    email: '',
    company: '',
    role: '',
    details: '',
    referral: '',
  })

  const update = (k: string, v: any) => setData((d) => ({ ...d, [k]: v }))

  const toggleService = (id: string) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(id)
        ? d.services.filter((s) => s !== id)
        : [...d.services, id],
    }))
  }

  const canProceed = () => {
    if (step === 1) return data.services.length > 0
    if (step === 2) return data.budget && data.timeline
    if (step === 3) return data.name && data.email
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="relative py-24 md:py-40">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(91,91,255,0.4)]">
              <Check size={28} className="text-accent" />
            </div>
            <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
              Inquiry Received
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-6">
              Thank you. We&apos;ll be in touch.
            </h2>
            <p className="text-lg text-white/55 leading-relaxed mb-10 max-w-lg mx-auto">
              A real human from our team will read your inquiry and reply within
              24 hours — usually within a few hours during business days.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-bright transition-colors"
              data-cursor-hover
            >
              <span className="text-sm font-medium uppercase tracking-wider">Back to home</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                02 — Inquiry
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight leading-[1.1] max-w-2xl">
                A few details so we can route your inquiry to the right person.
              </h2>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3 mb-12">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 flex-1">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 flex-shrink-0',
                      step > s.id
                        ? 'bg-accent text-white'
                        : step === s.id
                        ? 'bg-white text-black shadow-[0_0_20px_rgba(91,91,255,0.4)]'
                        : 'bg-white/5 text-white/40 border border-white/10'
                    )}
                  >
                    {step > s.id ? <Check size={12} /> : s.id}
                  </div>
                  <div
                    className={cn(
                      'text-sm font-medium transition-colors flex-1',
                      step >= s.id ? 'text-white' : 'text-white/40'
                    )}
                  >
                    {s.label}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="h-px flex-1 bg-white/10">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: step > s.id ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-6">
                      What do you need?
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {services.map((s) => {
                        const isActive = data.services.includes(s.id)
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleService(s.id)}
                            className={cn(
                              'p-5 rounded-2xl border text-left transition-all duration-300',
                              isActive
                                ? 'glass-elevated border-accent/40 bg-accent/[0.06]'
                                : 'border-white/[0.06] hover:border-white/15 hover:bg-white/[0.02]'
                            )}
                            data-cursor-hover
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={cn(
                                  'font-medium text-sm transition-colors',
                                  isActive ? 'text-white' : 'text-white/70'
                                )}
                              >
                                {s.label}
                              </span>
                              <div
                                className={cn(
                                  'w-5 h-5 rounded-full border flex items-center justify-center transition-colors',
                                  isActive ? 'bg-accent border-accent' : 'border-white/20'
                                )}
                              >
                                {isActive && <Check size={12} className="text-white" />}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-10"
                  >
                    <div>
                      <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                        Estimated Budget
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                        {budgets.map((b) => {
                          const isActive = data.budget === b.id
                          return (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => update('budget', b.id)}
                              className={cn(
                                'p-4 rounded-2xl border text-sm font-medium transition-all duration-300',
                                isActive
                                  ? 'glass-elevated border-accent/40 bg-accent/[0.06] text-white'
                                  : 'border-white/[0.06] text-white/70 hover:border-white/15 hover:bg-white/[0.02]'
                              )}
                              data-cursor-hover
                            >
                              {b.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                        Timeline
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                        {timelines.map((t) => {
                          const isActive = data.timeline === t.id
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => update('timeline', t.id)}
                              className={cn(
                                'p-4 rounded-2xl border text-sm font-medium transition-all duration-300',
                                isActive
                                  ? 'glass-elevated border-accent/40 bg-accent/[0.06] text-white'
                                  : 'border-white/[0.06] text-white/70 hover:border-white/15 hover:bg-white/[0.02]'
                              )}
                              data-cursor-hover
                            >
                              {t.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormInput
                        label="Full Name *"
                        value={data.name}
                        onChange={(v) => update('name', v)}
                        placeholder="Your name"
                        required
                      />
                      <FormInput
                        label="Work Email *"
                        type="email"
                        value={data.email}
                        onChange={(v) => update('email', v)}
                        placeholder="you@company.com"
                        required
                      />
                      <FormInput
                        label="Company"
                        value={data.company}
                        onChange={(v) => update('company', v)}
                        placeholder="Your company"
                      />
                      <FormInput
                        label="Your Role"
                        value={data.role}
                        onChange={(v) => update('role', v)}
                        placeholder="CEO, Head of Marketing, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-eyebrow uppercase tracking-[0.2em] text-accent mb-3">
                        Project Details
                      </label>
                      <textarea
                        value={data.details}
                        onChange={(e) => update('details', e.target.value)}
                        rows={5}
                        placeholder="Tell us about the project, the constraints, the vision..."
                        className="w-full px-5 py-4 rounded-2xl glass-elevated border border-white/[0.08] bg-white/[0.02] text-white placeholder:text-white/30 focus:border-accent/40 focus:outline-none transition-colors resize-none text-sm leading-relaxed"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/[0.06]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    data-cursor-hover
                  >
                    <ArrowLeft size={14} />
                    <span className="text-sm font-medium uppercase tracking-wider">Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canProceed()}
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300',
                      canProceed()
                        ? 'bg-accent text-white hover:bg-accent-bright shadow-[0_0_20px_rgba(91,91,255,0.3)]'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                    )}
                    data-cursor-hover
                  >
                    Continue
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canProceed()}
                    className={cn(
                      'inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300',
                      canProceed()
                        ? 'bg-accent text-white hover:bg-accent-bright shadow-[0_0_30px_rgba(91,91,255,0.4)]'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                    )}
                    data-cursor-hover
                  >
                    Send Inquiry
                    <ArrowUpRight size={14} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Side info */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div>
                <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                  What happens next
                </div>
                <ol className="space-y-4">
                  {[
                    { t: 'Within 24 hours', d: 'A senior team member reads and replies to your inquiry.' },
                    { t: 'Within 1 week', d: 'A 30-minute call to discuss scope, fit, and next steps.' },
                    { t: 'Within 2 weeks', d: 'A bespoke proposal — scope, timeline, investment, team.' },
                  ].map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-mono text-xs text-accent tabular-nums pt-0.5">
                        0{i + 1}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-white mb-0.5">{s.t}</div>
                        <div className="text-sm text-white/55 leading-relaxed">{s.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-6 rounded-2xl glass-elevated border border-white/[0.06]">
                <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                  Prefer email?
                </div>
                <a
                  href="mailto:brandexdigital.in@gmail.com"
                  className="text-white hover:text-accent transition-colors text-lg font-display font-medium"
                  data-cursor-hover
                >
                  brandexdigital.in@gmail.com
                </a>
                <p className="text-white/40 text-xs mt-3 font-mono uppercase tracking-wider">
                  Reply within 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-eyebrow uppercase tracking-[0.2em] text-accent mb-3">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-5 py-4 rounded-2xl glass-elevated border border-white/[0.08] bg-white/[0.02] text-white placeholder:text-white/30 focus:border-accent/40 focus:outline-none transition-colors text-sm"
      />
    </div>
  )
}
