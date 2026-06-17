'use client'

import type { TopPage } from '@/lib/analytics'

interface TopPagesTableProps {
  data: TopPage[]
}

export default function TopPagesTable({ data }: TopPagesTableProps) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-display font-bold tracking-tight mb-4">
        Top Pages
      </h3>
      <div className="space-y-1">
        {data.slice(0, 10).map((page, i) => (
          <div
            key={page.path}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[11px] text-muted/40 font-mono w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm text-foreground truncate">
                {page.path}
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-muted">
                {page.views} views
              </span>
              <span className="text-[11px] text-muted/50">
                {page.uniqueVisitors} unique
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
