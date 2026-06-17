'use client'

import { useState } from 'react'
import type { ContactSubmission } from '@/lib/analytics'

interface ContactLogProps {
  submissions: ContactSubmission[]
}

export default function ContactLog({ submissions }: ContactLogProps) {
  const [expanded, setExpanded] = useState<number | null>(null)

  if (submissions.length === 0) {
    return (
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-display font-bold tracking-tight mb-4">
          Contact Submissions
        </h3>
        <p className="text-xs text-muted/50 py-4 text-center">No submissions yet</p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold tracking-tight">
          Contact Submissions
        </h3>
        <span className="text-[10px] text-muted/50 font-mono">
          {submissions.length} total
        </span>
      </div>
      <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
        {submissions.map((s, i) => (
          <div key={s.timestamp} className="border-b border-white/[0.04] last:border-0 pb-1.5 last:pb-0">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.02] transition-colors text-left"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.read ? 'bg-muted/30' : 'bg-accent'}`} />
                  <span className="text-xs text-foreground truncate font-medium">{s.name}</span>
                </div>
                <span className="text-[10px] text-muted/50 block truncate pl-[14px]">{s.email}</span>
              </div>
              <span className="text-[10px] text-muted/30 shrink-0 ml-2">
                {new Date(s.timestamp).toLocaleDateString()}
              </span>
            </button>
            {expanded === i && (
              <div className="px-3 pb-2 pt-1 text-xs text-muted space-y-0.5">
                {s.company && <p>Company: {s.company}</p>}
                <p className="text-[10px] text-muted/40">
                  {new Date(s.timestamp).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
