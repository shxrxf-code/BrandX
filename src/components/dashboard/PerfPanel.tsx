'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { PagePerfStats } from '@/lib/analytics'

interface PerfPanelProps {
  data: PagePerfStats
}

function msToSeconds(ms: number): string {
  return `${(ms / 1000).toFixed(2)}s`
}

export default function PerfPanel({ data }: PerfPanelProps) {
  const hasData = data.recentEntries.length > 0

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-display font-bold tracking-tight mb-4">
        Page Performance
      </h3>

      {!hasData && (
        <p className="text-xs text-muted/50 py-4 text-center">No data yet</p>
      )}

      {hasData && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/[0.03] rounded-lg p-3">
              <p className="text-[10px] text-muted/60 uppercase tracking-wider mb-1">Avg Load Time</p>
              <p className="text-lg font-display font-bold text-foreground">{msToSeconds(data.avgLoadTime)}</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-3">
              <p className="text-[10px] text-muted/60 uppercase tracking-wider mb-1">Avg DOM Content</p>
              <p className="text-lg font-display font-bold text-foreground">{msToSeconds(data.avgDomContentLoaded)}</p>
            </div>
          </div>

          {data.slowestPages.length > 0 && (
            <div>
              <p className="text-[10px] text-muted/60 uppercase tracking-wider mb-2">Slowest Pages</p>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.slowestPages.slice(0, 5)} layout="vertical">
                    <XAxis
                      type="number"
                      tick={{ fill: '#94A3B8', fontSize: 10 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                      tickLine={false}
                      tickFormatter={(v) => `${(v / 1000).toFixed(1)}s`}
                    />
                    <YAxis
                      type="category"
                      dataKey="path"
                      tick={{ fill: '#94A3B8', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10,15,28,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                      labelStyle={{ color: '#F8FAFC' }}
                      formatter={(value: unknown) => [msToSeconds(Number(value)), 'Avg Load']}
                    />
                    <Bar dataKey="avgLoadTime" radius={[0, 4, 4, 0]} barSize={14}>
                      {data.slowestPages.slice(0, 5).map((_, i) => (
                        <Cell key={i} fill="#F59E0B" fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
