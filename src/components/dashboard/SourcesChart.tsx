'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { TopSource } from '@/lib/analytics'

const COLORS = ['#4F7CFF', '#00D4FF', '#8B5CF6', '#10B981', '#F59E0B']

interface SourcesChartProps {
  data: TopSource[]
}

export default function SourcesChart({ data }: SourcesChartProps) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-display font-bold tracking-tight mb-4">
        Traffic Sources
      </h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="source"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={40}
              paddingAngle={3}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity={0.8}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(10,15,28,0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#F8FAFC' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
