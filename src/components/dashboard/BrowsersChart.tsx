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
import type { BrowserStats } from '@/lib/analytics'

const BAR_COLORS: Record<string, string> = {
  Chrome: '#4F7CFF',
  Firefox: '#F59E0B',
  Safari: '#00D4FF',
  Edge: '#10B981',
  Opera: '#8B5CF6',
}

interface BrowsersChartProps {
  data: BrowserStats[]
}

export default function BrowsersChart({ data }: BrowsersChartProps) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-display font-bold tracking-tight mb-4">
        Browsers
      </h3>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis
              type="number"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="browser"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(10,15,28,0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#F8FAFC' }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry) => (
                <Cell
                  key={entry.browser}
                  fill={BAR_COLORS[entry.browser] || '#4F7CFF'}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
