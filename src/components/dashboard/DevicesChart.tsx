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
import type { DeviceStats } from '@/lib/analytics'

const BAR_COLORS: Record<string, string> = {
  desktop: '#4F7CFF',
  mobile: '#00D4FF',
  tablet: '#8B5CF6',
}

interface DevicesChartProps {
  data: DeviceStats[]
}

export default function DevicesChart({ data }: DevicesChartProps) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-display font-bold tracking-tight mb-4">
        Devices
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
              dataKey="device"
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
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={BAR_COLORS[entry.device] || '#4F7CFF'}
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
