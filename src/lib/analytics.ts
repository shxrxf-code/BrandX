export interface PageView {
  path: string
  timestamp: number
  sessionId: string
  referrer: string
  device: 'desktop' | 'tablet' | 'mobile'
  browser: string
  os: string
  language: string
  isNewVisitor: boolean
}

export interface AnalyticsSnapshot {
  today: DayStats
  week: DayStats[]
  month: DayStats[]
  allTime: AggregateStats
  live: LiveStats
  topPages: TopPage[]
  topSources: TopSource[]
}

export interface DayStats {
  date: string
  pageViews: number
  uniqueVisitors: number
  returningVisitors: number
  sessions: number
}

export interface AggregateStats {
  totalPageViews: number
  totalUniqueVisitors: number
  totalReturningVisitors: number
  totalSessions: number
  bounceRate: number
  avgSessionDuration: number
}

export interface LiveStats {
  activeVisitors: number
  recentPages: { path: string; count: number }[]
  recentActivity: { path: string; timestamp: number; device: string }[]
}

export interface TopPage {
  path: string
  views: number
  uniqueVisitors: number
}

export interface TopSource {
  source: string
  count: number
}

export interface DeviceStats {
  device: string
  count: number
}

export interface BrowserStats {
  browser: string
  count: number
}

export interface OsStats {
  os: string
  count: number
}

const pageViews: PageView[] = []

const LIVE_WINDOW = 5 * 60 * 1000
const SESSION_TIMEOUT = 30 * 60 * 1000

function parseBrowser(ua: string): string {
  if (/chrome/i.test(ua) && !/edge|opr/i.test(ua)) return 'Chrome'
  if (/firefox/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari'
  if (/edge/i.test(ua)) return 'Edge'
  if (/opr/i.test(ua)) return 'Opera'
  return 'Other'
}

function parseOS(ua: string): string {
  if (/windows/i.test(ua)) return 'Windows'
  if (/mac os|macintosh/i.test(ua)) return 'macOS'
  if (/linux/i.test(ua) && !/android/i.test(ua)) return 'Linux'
  if (/android/i.test(ua)) return 'Android'
  if (/ios|iphone|ipad|ipod/i.test(ua)) return 'iOS'
  return 'Other'
}

function parseDevice(ua: string): 'desktop' | 'tablet' | 'mobile' {
  if (/mobile|android.*mobile|iphone|ipod/i.test(ua)) return 'mobile'
  if (/tablet|ipad|android(?!.*mobile)/i.test(ua)) return 'tablet'
  return 'desktop'
}

function getSessionId(ip: string, ua: string): string {
  const hash = Array.from(ip + ua)
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    .toString(36)
  return `sess_${hash}`
}

function isNewVisitor(sessionId: string): boolean {
  return !pageViews.some((pv) => pv.sessionId === sessionId)
}

function getDateString(ts: number): string {
  return new Date(ts).toISOString().split('T')[0]
}

function getDaysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

export function trackPageView(
  path: string,
  referrer: string,
  userAgent: string,
  language: string,
  ip: string
): void {
  const device = parseDevice(userAgent)
  const browser = parseBrowser(userAgent)
  const os = parseOS(userAgent)
  const sessionId = getSessionId(ip, userAgent)
  const isNew = isNewVisitor(sessionId)

  pageViews.push({
    path,
    timestamp: Date.now(),
    sessionId,
    referrer: referrer || '(direct)',
    device,
    browser,
    os,
    language: language || 'unknown',
    isNewVisitor: isNew,
  })

  if (pageViews.length > 100_000) {
    pageViews.splice(0, pageViews.length - 50_000)
  }
}

function aggregateDayStats(views: PageView[], dateStr: string): DayStats {
  const dayViews = views.filter((v) => getDateString(v.timestamp) === dateStr)
  const uniqueSessions = new Set(dayViews.map((v) => v.sessionId))
  const returning = dayViews.filter((v) => {
    const earlierViews = views.filter(
      (pv) => pv.sessionId === v.sessionId && getDateString(pv.timestamp) < dateStr
    )
    return earlierViews.length > 0
  })
  const uniqueReturning = new Set(returning.map((v) => v.sessionId))

  return {
    date: dateStr,
    pageViews: dayViews.length,
    uniqueVisitors: uniqueSessions.size,
    returningVisitors: uniqueReturning.size,
    sessions: uniqueSessions.size,
  }
}

function getAggregateStats(views: PageView[]): AggregateStats {
  const uniqueSessions = new Set(views.map((v) => v.sessionId))
  const returning = views.filter((v) => {
    const earlierViews = views.filter(
      (pv) => pv.sessionId === v.sessionId && pv.timestamp < v.timestamp
    )
    return earlierViews.length > 0
  })
  const uniqueReturning = new Set(returning.map((v) => v.sessionId))
  const bouncedSessions = new Set<string>()
  const sessionFirstViews = new Map<string, number>()
  const sessionLastViews = new Map<string, number>()

  for (const v of views) {
    if (!sessionFirstViews.has(v.sessionId)) {
      sessionFirstViews.set(v.sessionId, v.timestamp)
    }
    sessionLastViews.set(v.sessionId, v.timestamp)

    const sessionViews = views.filter((pv) => pv.sessionId === v.sessionId)
    const firstView = sessionFirstViews.get(v.sessionId)!
    const lastView = sessionLastViews.get(v.sessionId)!
    const duration = lastView - firstView
    if (sessionViews.length === 1 || duration < 10000) {
      bouncedSessions.add(v.sessionId)
    }
  }

  let totalDuration = 0
  const sessionsWithDuration = new Set<string>()
  for (const [sid, firstTs] of sessionFirstViews) {
    const lastTs = sessionLastViews.get(sid)!
    totalDuration += lastTs - firstTs
    sessionsWithDuration.add(sid)
  }

  return {
    totalPageViews: views.length,
    totalUniqueVisitors: uniqueSessions.size,
    totalReturningVisitors: uniqueReturning.size,
    totalSessions: uniqueSessions.size,
    bounceRate: uniqueSessions.size > 0
      ? (bouncedSessions.size / uniqueSessions.size) * 100
      : 0,
    avgSessionDuration: sessionsWithDuration.size > 0
      ? totalDuration / sessionsWithDuration.size
      : 0,
  }
}

export function getAnalyticsSnapshot(): AnalyticsSnapshot {
  const today = getDateString(Date.now())
  const sevenDaysAgo = getDaysAgo(6)
  const thirtyDaysAgo = getDaysAgo(29)
  const now = Date.now()

  const weekDays: string[] = []
  for (let i = 6; i >= 0; i--) weekDays.push(getDaysAgo(i))

  const monthDays: string[] = []
  for (let i = 29; i >= 0; i--) monthDays.push(getDaysAgo(i))

  const recentViews = pageViews.filter((v) => (now - v.timestamp) < LIVE_WINDOW)
  const activeSessionIds = new Set(recentViews.map((v) => v.sessionId))

  const recentPageCount = new Map<string, number>()
  for (const v of recentViews) {
    recentPageCount.set(v.path, (recentPageCount.get(v.path) || 0) + 1)
  }

  const recentActivity = [...recentViews]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 20)
    .map((v) => ({
      path: v.path,
      timestamp: v.timestamp,
      device: v.device,
    }))

  const todayViews = pageViews.filter((v) => getDateString(v.timestamp) === today)

  const topPagesMap = new Map<string, { views: number; unique: Set<string> }>()
  for (const v of pageViews) {
    if (!topPagesMap.has(v.path)) {
      topPagesMap.set(v.path, { views: 0, unique: new Set() })
    }
    const entry = topPagesMap.get(v.path)!
    entry.views++
    entry.unique.add(v.sessionId)
  }

  const topPages: TopPage[] = [...topPagesMap.entries()]
    .sort((a, b) => b[1].views - a[1].views)
    .slice(0, 15)
    .map(([path, data]) => ({
      path,
      views: data.views,
      uniqueVisitors: data.unique.size,
    }))

  const sourceMap = new Map<string, number>()
  for (const v of pageViews) {
    let source = v.referrer || '(direct)'
    if (source === '(direct)') source = 'Direct'
    else if (/google\.|bing\.|yahoo\.|duckduckgo\./i.test(source)) source = 'Organic Search'
    else if (/facebook\.|twitter\.|linkedin\.|instagram\.|reddit\./i.test(source)) source = 'Social Media'
    else source = 'Referral'
    sourceMap.set(source, (sourceMap.get(source) || 0) + 1)
  }

  const topSources: TopSource[] = [...sourceMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({ source, count }))

  return {
    today: aggregateDayStats(pageViews, today),
    week: weekDays.map((d) => aggregateDayStats(pageViews, d)),
    month: monthDays.map((d) => aggregateDayStats(pageViews, d)),
    allTime: getAggregateStats(pageViews),
    live: {
      activeVisitors: activeSessionIds.size,
      recentPages: [...recentPageCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([path, count]) => ({ path, count })),
      recentActivity,
    },
    topPages,
    topSources,
  }
}

export function getDeviceStats(): DeviceStats[] {
  const map = new Map<string, number>()
  for (const v of pageViews) {
    map.set(v.device, (map.get(v.device) || 0) + 1)
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([device, count]) => ({ device, count }))
}

export function getBrowserStats(): BrowserStats[] {
  const map = new Map<string, number>()
  for (const v of pageViews) {
    map.set(v.browser, (map.get(v.browser) || 0) + 1)
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([browser, count]) => ({ browser, count }))
}

export function getOsStats(): OsStats[] {
  const map = new Map<string, number>()
  for (const v of pageViews) {
    map.set(v.os, (map.get(v.os) || 0) + 1)
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([os, count]) => ({ os, count }))
}
