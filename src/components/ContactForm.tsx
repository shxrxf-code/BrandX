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
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
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
      <div className="border border-border p-10">
        <p className="text-eyebrow uppercase text-muted mb-4">Message sent</p>
        <p className="text-foreground leading-relaxed">
          Thanks for reaching out. We will get back to you within two business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
      </div>

      <Field label="Email" name="email" type="email" required />
      <Field label="Website" name="website" placeholder="https://" />

      <div>
        <label htmlFor="message" className="block text-eyebrow uppercase text-muted mb-3">
          What can we help with
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-transparent border-b border-border focus:border-foreground py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors duration-400 resize-none"
          placeholder="Tell us about your project, timeline, and goals."
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-foreground transition-colors duration-400 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-eyebrow uppercase text-muted mb-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border focus:border-foreground py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors duration-400"
      />
    </div>
  )
}
