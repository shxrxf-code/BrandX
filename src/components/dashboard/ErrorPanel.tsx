'use client'

import type { ErrorStats } from '@/lib/analytics'

interface ErrorPanelProps {
  data: ErrorStats
}

export default function ErrorPanel({ data }: ErrorPanelProps) {
  const hasData = data.total > 0

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold tracking-tight">
          Error Monitoring
        </h3>
        <span className={`text-xs font-mono ${hasData ? 'text-red-400' : 'text-muted/50'}`}>
          {data.total}
        </span>
      </div>

      {!hasData && (
        <p className="text-xs text-muted/50 py-4 text-center">No errors recorded</p>
      )}

      {hasData && (
        <>
          {data.byMessage.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] text-muted/60 uppercase tracking-wider mb-2">Top Errors</p>
              <div className="space-y-1">
                {data.byMessage.slice(0, 5).map((e) => (
                  <div key={e.message} className="flex items-center justify-between py-1 px-2 rounded bg-red-500/[0.04]">
                    <span className="text-[11px] text-red-300 truncate min-w-0 flex-1 mr-2">
                      {e.message}
                    </span>
                    <span className="text-[10px] text-red-400/60 font-mono shrink-0">{e.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.byPage.length > 0 && (
            <div>
              <p className="text-[10px] text-muted/60 uppercase tracking-wider mb-2">By Page</p>
              <div className="space-y-1">
                {data.byPage.slice(0, 5).map((p) => (
                  <div key={p.path} className="flex items-center justify-between py-1 px-2">
                    <span className="text-[11px] text-foreground truncate min-w-0 flex-1 mr-2">{p.path}</span>
                    <span className="text-[10px] text-muted/50 font-mono shrink-0">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
