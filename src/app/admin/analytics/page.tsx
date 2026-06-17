'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import StatCard from '@/components/dashboard/StatCard'
import TrafficChart from '@/components/dashboard/TrafficChart'
import SourcesChart from '@/components/dashboard/SourcesChart'
import DevicesChart from '@/components/dashboard/DevicesChart'
import BrowsersChart from '@/components/dashboard/BrowsersChart'
import TopPagesTable from '@/components/dashboard/TopPagesTable'
import type { AnalyticsSnapshot, DeviceStats, BrowserStats, OsStats } from '@/lib/analytics'

interface AnalyticsResponse {
  snapshot: AnalyticsSnapshot
  devices: DeviceStats[]
  browsers: BrowserStats[]
  operatingSystems: OsStats[]
  generatedAt: string
}

function formatDuration(ms: number): string {
  if (ms < 1000) return '<1s'
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  return `${minutes}m ${seconds % 60}s`
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString()
}

export default function AnalyticsDashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [days, setDays] = useState<7 | 30>(7)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/analytics')
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!res.ok) throw new Error('Failed to fetch analytics')
      const json = await res.json()
      setData(json)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30_000)
    return () => clearInterval(interval)
  }, [fetchData])

  async function handleLogout() {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted">Loading analytics\u2026</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-sm">
          <div className="glass-strong rounded-xl p-8">
            <p className="text-sm text-red-500 mb-3">{error}</p>
            <button
              onClick={fetchData}
              className="px-4 py-2 btn-gradient text-xs"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { snapshot } = data

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[150px] animate-aurora-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan/3 blur-[120px] animate-aurora" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative z-10 w-full px-6 md:px-10 py-8 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">
              Analytics
            </h1>
            <p className="text-sm text-muted mt-1">
              Visitor insights and traffic overview
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted/50 font-mono">
              Live
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <StatCard
            label="Page Views"
            value={formatNumber(snapshot.allTime.totalPageViews)}
            subtitle={`${formatNumber(snapshot.today.pageViews)} today`}
          />
          <StatCard
            label="Unique Visitors"
            value={formatNumber(snapshot.allTime.totalUniqueVisitors)}
            subtitle={`${snapshot.today.uniqueVisitors} today`}
          />
          <StatCard
            label="Returning"
            value={formatNumber(snapshot.allTime.totalReturningVisitors)}
            subtitle={`${snapshot.allTime.totalUniqueVisitors > 0
              ? Math.round((snapshot.allTime.totalReturningVisitors / snapshot.allTime.totalUniqueVisitors) * 100)
              : 0}% of visitors`}
          />
          <StatCard
            label="Sessions"
            value={formatNumber(snapshot.allTime.totalSessions)}
            subtitle={`${snapshot.today.sessions} today`}
          />
          <StatCard
            label="Bounce Rate"
            value={`${snapshot.allTime.bounceRate.toFixed(1)}%`}
            subtitle="Exits after 1 page"
          />
          <StatCard
            label="Avg Session"
            value={formatDuration(snapshot.allTime.avgSessionDuration)}
            subtitle="Duration"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setDays(7)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  days === 7
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-muted border border-white/10 hover:border-white/20'
                }`}
              >
                7 days
              </button>
              <button
                onClick={() => setDays(30)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  days === 30
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-muted border border-white/10 hover:border-white/20'
                }`}
              >
                30 days
              </button>
            </div>
            <TrafficChart
              data={days === 7 ? snapshot.week : snapshot.month}
              days={days}
            />
          </div>
          <div>
            <SourcesChart data={snapshot.topSources} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-1">
            <DevicesChart data={data.devices} />
          </div>
          <div className="lg:col-span-1">
            <BrowsersChart data={data.browsers} />
          </div>
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-display font-bold tracking-tight mb-4">
                Operating Systems
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {data.operatingSystems.map((os) => {
                  const total = data.operatingSystems.reduce((s, o) => s + o.count, 0)
                  const pct = total > 0 ? Math.round((os.count / total) * 100) : 0
                  return (
                    <div
                      key={os.os}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02]"
                    >
                      <span className="text-sm text-foreground">{os.os}</span>
                      <span className="text-xs text-muted">
                        {os.count} ({pct}%)
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <TopPagesTable data={snapshot.topPages} />
          </div>
          <div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-display font-bold tracking-tight">
                  Live Visitors
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-lg font-display font-bold text-foreground">
                    {snapshot.live.activeVisitors}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
                {snapshot.live.recentActivity.length === 0 && (
                  <p className="text-xs text-muted/50 py-4 text-center">
                    No active visitors
                  </p>
                )}
                {snapshot.live.recentActivity.slice(0, 15).map((activity, i) => (
                  <div
                    key={`${activity.path}-${i}`}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0" />
                      <span className="text-xs text-foreground truncate">
                        {activity.path}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted/50 shrink-0 ml-2">
                      {activity.device}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-muted/40 text-center pb-4 font-mono">
          Last updated: {new Date(data.generatedAt).toLocaleTimeString()}
          {' \u00b7 '}No PII collected {' \u00b7 '}IPs anonymized
        </p>
      </div>
    </div>
  )
}
