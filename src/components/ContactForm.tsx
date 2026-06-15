'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <div className="rounded-xl border border-border bg-white p-8">
        <h3 className="text-lg font-semibold mb-2">Message sent</h3>
        <p className="text-sm text-muted">
          Thanks for reaching out. We will get back to you within two business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
      </div>

      <Field label="Email" name="email" type="email" required />

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          What can we help with?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/60 outline-none focus:border-accent transition-colors duration-200 resize-none text-sm"
          placeholder="Tell us about your project, timeline, and goals."
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
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
        className="w-full bg-white border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/60 outline-none focus:border-accent transition-colors duration-200 text-sm"
      />
    </div>
  )
}
