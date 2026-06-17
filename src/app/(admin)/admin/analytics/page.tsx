'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import StatCard from '@/components/dashboard/StatCard'
import TrafficChart from '@/components/dashboard/TrafficChart'
import SourcesChart from '@/components/dashboard/SourcesChart'
import DevicesChart from '@/components/dashboard/DevicesChart'
import BrowsersChart from '@/components/dashboard/BrowsersChart'
import TopPagesTable from '@/components/dashboard/TopPagesTable'
import GeoChart from '@/components/dashboard/GeoChart'
import ContactLog from '@/components/dashboard/ContactLog'
import PerfPanel from '@/components/dashboard/PerfPanel'
import ErrorPanel from '@/components/dashboard/ErrorPanel'
import type { AnalyticsSnapshot, DeviceStats, BrowserStats, OsStats, GeoStats, TimezoneStats, ContactSubmission, PagePerfStats, ErrorStats } from '@/lib/analytics'

interface AnalyticsResponse {
  snapshot: AnalyticsSnapshot
  devices: DeviceStats[]
  browsers: BrowserStats[]
  operatingSystems: OsStats[]
  geo: { regions: GeoStats[]; timezones: TimezoneStats[] }
  contacts: ContactSubmission[]
  pagePerf: PagePerfStats
  errors: ErrorStats
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
      <div className="flex items-center justify-center min-h-screen bg-[#0A0E17]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0E17] px-6">
        <div className="text-center max-w-sm">
          <div className="bg-[#0D111C] border border-white/[0.06] rounded-xl p-8">
            <p className="text-sm text-red-500 mb-3">{error}</p>
            <button onClick={fetchData} className="px-4 py-2 text-xs bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors">
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
    <div className="min-h-screen bg-[#0A0E17]">
      <div className="px-6 md:px-8 py-6 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-display font-bold tracking-tight text-foreground">
              Analytics
            </h1>
            <p className="text-xs text-muted mt-0.5">
              Visitor insights, performance, and errors
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted/50 font-mono">Live</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/20"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          <StatCard label="Page Views" value={formatNumber(snapshot.allTime.totalPageViews)} subtitle={`${formatNumber(snapshot.today.pageViews)} today`} />
          <StatCard label="Unique Visitors" value={formatNumber(snapshot.allTime.totalUniqueVisitors)} subtitle={`${snapshot.today.uniqueVisitors} today`} />
          <StatCard label="Returning" value={formatNumber(snapshot.allTime.totalReturningVisitors)} subtitle={`${snapshot.allTime.totalUniqueVisitors > 0 ? Math.round((snapshot.allTime.totalReturningVisitors / snapshot.allTime.totalUniqueVisitors) * 100) : 0}% of visitors`} />
          <StatCard label="Sessions" value={formatNumber(snapshot.allTime.totalSessions)} subtitle={`${snapshot.today.sessions} today`} />
          <StatCard label="Bounce Rate" value={`${snapshot.allTime.bounceRate.toFixed(1)}%`} subtitle="Exits after 1 page" />
          <StatCard label="Avg Session" value={formatDuration(snapshot.allTime.avgSessionDuration)} subtitle="Duration" />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setDays(7)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${days === 7 ? 'bg-accent/20 text-accent border border-accent/30' : 'text-muted border border-white/[0.08] hover:border-white/20'}`}
              >
                7 days
              </button>
              <button
                onClick={() => setDays(30)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${days === 30 ? 'bg-accent/20 text-accent border border-accent/30' : 'text-muted border border-white/[0.08] hover:border-white/20'}`}
              >
                30 days
              </button>
            </div>
            <TrafficChart data={days === 7 ? snapshot.week : snapshot.month} days={days} />
          </div>
          <div>
            <SourcesChart data={snapshot.topSources} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <DevicesChart data={data.devices} />
          <BrowsersChart data={data.browsers} />
          <GeoChart regions={data.geo.regions} timezones={data.geo.timezones} />
          <div className="bg-[#0D111C] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-display font-bold tracking-tight mb-4">Operating Systems</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.operatingSystems.map((os) => {
                const total = data.operatingSystems.reduce((s, o) => s + o.count, 0)
                const pct = total > 0 ? Math.round((os.count / total) * 100) : 0
                return (
                  <div key={os.os} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02]">
                    <span className="text-sm text-foreground">{os.os}</span>
                    <span className="text-xs text-muted">{os.count} ({pct}%)</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
          <div className="md:col-span-2 xl:col-span-1">
            <TopPagesTable data={snapshot.topPages} />
          </div>
          <div>
            <ContactLog submissions={data.contacts} />
          </div>
          <div>
            <PerfPanel data={data.pagePerf} />
          </div>
          <div>
            <ErrorPanel data={data.errors} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div className="bg-[#0D111C] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-bold tracking-tight">Live Visitors</h3>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-lg font-display font-bold text-foreground">{snapshot.live.activeVisitors}</span>
              </div>
            </div>
            <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
              {snapshot.live.recentActivity.length === 0 && (
                <p className="text-xs text-muted/50 py-4 text-center">No active visitors</p>
              )}
              {snapshot.live.recentActivity.slice(0, 15).map((activity, i) => (
                <div key={`${activity.path}-${i}`} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0" />
                    <span className="text-xs text-foreground truncate">{activity.path}</span>
                  </div>
                  <span className="text-[10px] text-muted/50 shrink-0 ml-2">{activity.device}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0D111C] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-display font-bold tracking-tight mb-4">Recent Activity</h3>
            <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
              {data.pagePerf.recentEntries.length === 0 && (
                <p className="text-xs text-muted/50 py-4 text-center">No recent activity</p>
              )}
              {data.pagePerf.recentEntries.slice(0, 10).map((entry, i) => (
                <div key={i} className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <span className="text-[11px] text-foreground truncate min-w-0 flex-1 mr-2">{entry.path}</span>
                  <span className="text-[10px] text-muted/50 shrink-0">
                    {(entry.loadTime / 1000).toFixed(2)}s
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[10px] text-muted/40 text-center pb-4 font-mono">
          Last updated: {new Date(data.generatedAt).toLocaleTimeString()}
          {' · '}No PII collected · IPs anonymized
        </p>
      </div>
    </div>
  )
}
