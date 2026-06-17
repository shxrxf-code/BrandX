'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import type { DayStats } from '@/lib/analytics'

interface TrafficChartProps {
  data: DayStats[]
  days?: number
}

export default function TrafficChart({ data, days = 7 }: TrafficChartProps) {
  const chartData = data.slice(-days).map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    views: d.pageViews,
    visitors: d.uniqueVisitors,
  }))

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-display font-bold tracking-tight mb-4">
        Traffic Trends ({days === 7 ? '7 days' : '30 days'})
      </h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F7CFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4F7CFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
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
            <Area
              type="monotone"
              dataKey="views"
              stroke="#4F7CFF"
              strokeWidth={2}
              fill="url(#viewsGradient)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#00D4FF"
              strokeWidth={2}
              fill="url(#visitorsGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
