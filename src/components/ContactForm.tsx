'use client'

import { useState, useRef } from 'react'

function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim()
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const submitCountRef = useRef(0)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    submitCountRef.current++
    if (submitCountRef.current > 3) {
      setError('Too many submission attempts. Please reload the page.')
      setStatus('error')
      return
    }

    if (honeypotRef.current?.value) {
      return
    }

    const form = e.currentTarget
    const nameInput = form.elements.namedItem('name') as HTMLInputElement
    const emailInput = form.elements.namedItem('email') as HTMLInputElement
    const companyInput = form.elements.namedItem('company') as HTMLInputElement
    const messageInput = form.elements.namedItem('message') as HTMLTextAreaElement

    const name = sanitizeInput(nameInput.value)
    const email = emailInput.value.trim().toLowerCase()
    const company = sanitizeInput(companyInput ? companyInput.value : '')
    const message = sanitizeInput(messageInput.value)

    if (!name || name.length < 2) {
      setError('Please enter your name (min 2 characters)')
      setStatus('error')
      return
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      setStatus('error')
      return
    }
    if (!message || message.length < 10) {
      setError('Please enter a message (min 10 characters)')
      setStatus('error')
      return
    }
    if (message.length > 5000) {
      setError('Message is too long (max 5000 characters)')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong')
      }

      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="glass-strong rounded-xl p-8">
        <h3 className="text-lg font-semibold mb-2 text-foreground">Message sent</h3>
        <p className="text-sm text-muted">
          Thanks for reaching out. We will get back to you within two business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          ref={honeypotRef}
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Company" name="company" autoComplete="organization" />
      </div>

      <Field label="Email" name="email" type="email" required autoComplete="email" />

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          What can we help with?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted/60 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(79,124,255,0.1)] transition-all duration-200 resize-none text-sm"
          placeholder="Tell us about your project, timeline, and goals."
        />
      </div>

      {error && <p className="text-sm text-red-500" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-6 py-3 btn-gradient text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending\u2026' : 'Send Message'}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted/60 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(79,124,255,0.1)] transition-all duration-200 text-sm"
      />
    </div>
  )
}
