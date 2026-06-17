'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Authentication failed')
      }

      router.push('/admin/analytics')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] animate-aurora-slow" />
        <div className="absolute -bottom-40 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan/5 blur-[100px] animate-aurora" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="glass-strong rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-display font-bold tracking-tight">
              Admin<span className="text-accent">.</span>
            </h1>
            <p className="text-sm text-muted mt-2">Enter password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted/60 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(79,124,255,0.1)] transition-all duration-200 text-sm"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500" role="alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 btn-gradient text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating\u2026' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
