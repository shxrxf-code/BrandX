'use client'

import type { GeoStats, TimezoneStats } from '@/lib/analytics'

interface GeoChartProps {
  regions: GeoStats[]
  timezones: TimezoneStats[]
}

const REGION_COLORS: Record<string, string> = {
  'North America': '#4F7CFF',
  'South America': '#00D4FF',
  'Europe': '#8B5CF6',
  'Middle East': '#F59E0B',
  'South Asia': '#10B981',
  'East Asia': '#EC4899',
  'Southeast Asia': '#14B8A6',
  'Oceania': '#F97316',
  'Africa': '#6366F1',
  'Other': '#6B7280',
}

export default function GeoChart({ regions, timezones }: GeoChartProps) {
  const total = regions.reduce((s, r) => s + r.count, 0)

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-display font-bold tracking-tight mb-4">
        Geographic Distribution
      </h3>

      <div className="space-y-2 mb-5">
        {regions.length === 0 && (
          <p className="text-xs text-muted/50 py-4 text-center">No data yet</p>
        )}
        {regions.map((r) => {
          const pct = total > 0 ? (r.count / total) * 100 : 0
          return (
            <div key={r.region}>
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: REGION_COLORS[r.region] || '#6B7280' }}
                  />
                  <span className="text-foreground">{r.region}</span>
                </div>
                <span className="text-muted">{r.count} ({pct.toFixed(1)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: REGION_COLORS[r.region] || '#6B7280',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <details className="group">
        <summary className="text-[10px] text-muted/50 cursor-pointer hover:text-muted/80 transition-colors select-none">
          Timezone breakdown ({timezones.length})
        </summary>
        <div className="mt-2 max-h-[160px] overflow-y-auto space-y-1">
          {timezones.map((tz) => (
            <div key={tz.timezone} className="flex items-center justify-between text-[10px] px-1">
              <span className="text-muted/70">{tz.timezone}</span>
              <span className="text-muted/50 font-mono">{tz.count}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
