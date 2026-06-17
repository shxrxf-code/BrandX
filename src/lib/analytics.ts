// ─── Page Views ──────────────────────────────────

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
  timezone: string
  region: string
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

// ─── Geographic Data ─────────────────────────────

export interface GeoStats {
  region: string
  count: number
}

export interface TimezoneStats {
  timezone: string
  count: number
}

// ─── Contact Submissions ─────────────────────────

export interface ContactSubmission {
  name: string
  email: string
  company: string
  timestamp: number
  read: boolean
}

// ─── Page Performance ────────────────────────────

export interface PagePerfEntry {
  path: string
  timestamp: number
  loadTime: number
  domContentLoaded: number
  sessionId: string
}

export interface PagePerfStats {
  avgLoadTime: number
  avgDomContentLoaded: number
  slowestPages: { path: string; avgLoadTime: number }[]
  recentEntries: PagePerfEntry[]
}

// ─── Error Monitoring ────────────────────────────

export interface ErrorEntry {
  message: string
  source: string
  lineno: number
  colno: number
  path: string
  timestamp: number
  browser: string
  os: string
}

export interface ErrorStats {
  total: number
  byMessage: { message: string; count: number }[]
  byPage: { path: string; count: number }[]
  recent: ErrorEntry[]
}

// ─── Store ───────────────────────────────────────

const pageViews: PageView[] = []
const contactSubmissions: ContactSubmission[] = []
const perfEntries: PagePerfEntry[] = []
const errorEntries: ErrorEntry[] = []

const LIVE_WINDOW = 5 * 60 * 1000

// ─── UA Parsing ──────────────────────────────────

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

const REGION_MAP: Record<string, string> = {
  'America/New_York': 'North America',
  'America/Chicago': 'North America',
  'America/Denver': 'North America',
  'America/Los_Angeles': 'North America',
  'America/Toronto': 'North America',
  'America/Vancouver': 'North America',
  'America/Sao_Paulo': 'South America',
  'America/Argentina': 'South America',
  'America/Mexico_City': 'South America',
  'Europe/London': 'Europe',
  'Europe/Paris': 'Europe',
  'Europe/Berlin': 'Europe',
  'Europe/Madrid': 'Europe',
  'Europe/Rome': 'Europe',
  'Europe/Amsterdam': 'Europe',
  'Europe/Stockholm': 'Europe',
  'Europe/Moscow': 'Europe',
  'Europe/Istanbul': 'Europe',
  'Asia/Dubai': 'Middle East',
  'Asia/Riyadh': 'Middle East',
  'Asia/Tel_Aviv': 'Middle East',
  'Asia/Kolkata': 'South Asia',
  'Asia/Karachi': 'South Asia',
  'Asia/Dhaka': 'South Asia',
  'Asia/Shanghai': 'East Asia',
  'Asia/Tokyo': 'East Asia',
  'Asia/Seoul': 'East Asia',
  'Asia/Singapore': 'Southeast Asia',
  'Asia/Hong_Kong': 'Southeast Asia',
  'Asia/Bangkok': 'Southeast Asia',
  'Australia/Sydney': 'Oceania',
  'Australia/Melbourne': 'Oceania',
  'Pacific/Auckland': 'Oceania',
  'Africa/Cairo': 'Africa',
  'Africa/Lagos': 'Africa',
  'Africa/Johannesburg': 'Africa',
  'Africa/Nairobi': 'Africa',
}

function mapTimezoneToRegion(tz: string): string {
  return REGION_MAP[tz] || 'Other'
}

// ─── Track Page View ─────────────────────────────

export function trackPageView(
  path: string,
  referrer: string,
  userAgent: string,
  language: string,
  ip: string,
  timezone?: string
): void {
  const device = parseDevice(userAgent)
  const browser = parseBrowser(userAgent)
  const os = parseOS(userAgent)
  const sessionId = getSessionId(ip, userAgent)
  const isNew = isNewVisitor(sessionId)
  const tz = timezone || 'unknown'
  const region = mapTimezoneToRegion(tz)

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
    timezone: tz,
    region,
  })

  if (pageViews.length > 100_000) {
    pageViews.splice(0, pageViews.length - 50_000)
  }
}

// ─── Track Contact Submission ────────────────────

export function trackContactSubmission(
  name: string,
  email: string,
  company: string
): void {
  contactSubmissions.push({
    name,
    email,
    company,
    timestamp: Date.now(),
    read: false,
  })

  if (contactSubmissions.length > 10_000) {
    contactSubmissions.splice(0, contactSubmissions.length - 5_000)
  }
}

export function getContactSubmissions(): ContactSubmission[] {
  return [...contactSubmissions].sort((a, b) => b.timestamp - a.timestamp)
}

export function markContactRead(index: number): void {
  if (contactSubmissions[index]) {
    contactSubmissions[index].read = true
  }
}

// ─── Track Page Performance ──────────────────────

export function trackPagePerformance(
  path: string,
  loadTime: number,
  domContentLoaded: number,
  sessionId: string
): void {
  perfEntries.push({
    path,
    timestamp: Date.now(),
    loadTime,
    domContentLoaded,
    sessionId,
  })

  if (perfEntries.length > 20_000) {
    perfEntries.splice(0, perfEntries.length - 10_000)
  }
}

export function getPagePerformanceStats(): PagePerfStats {
  if (perfEntries.length === 0) {
    return {
      avgLoadTime: 0,
      avgDomContentLoaded: 0,
      slowestPages: [],
      recentEntries: [],
    }
  }

  const totalLoad = perfEntries.reduce((s, e) => s + e.loadTime, 0)
  const totalDom = perfEntries.reduce((s, e) => s + e.domContentLoaded, 0)

  const pageMap = new Map<string, { totalLoad: number; count: number }>()
  for (const e of perfEntries) {
    if (!pageMap.has(e.path)) pageMap.set(e.path, { totalLoad: 0, count: 0 })
    const entry = pageMap.get(e.path)!
    entry.totalLoad += e.loadTime
    entry.count++
  }

  const slowestPages = [...pageMap.entries()]
    .map(([path, data]) => ({ path, avgLoadTime: data.totalLoad / data.count }))
    .sort((a, b) => b.avgLoadTime - a.avgLoadTime)
    .slice(0, 10)

  return {
    avgLoadTime: perfEntries.length > 0 ? totalLoad / perfEntries.length : 0,
    avgDomContentLoaded: perfEntries.length > 0 ? totalDom / perfEntries.length : 0,
    slowestPages,
    recentEntries: [...perfEntries].sort((a, b) => b.timestamp - a.timestamp).slice(0, 20),
  }
}

// ─── Track Error ─────────────────────────────────

export function trackError(
  message: string,
  source: string,
  lineno: number,
  colno: number,
  path: string,
  userAgent: string
): void {
  errorEntries.push({
    message,
    source,
    lineno,
    colno,
    path,
    timestamp: Date.now(),
    browser: parseBrowser(userAgent),
    os: parseOS(userAgent),
  })

  if (errorEntries.length > 10_000) {
    errorEntries.splice(0, errorEntries.length - 5_000)
  }
}

export function getErrorStats(): ErrorStats {
  const msgMap = new Map<string, number>()
  const pageMap = new Map<string, number>()

  for (const e of errorEntries) {
    msgMap.set(e.message, (msgMap.get(e.message) || 0) + 1)
    pageMap.set(e.path, (pageMap.get(e.path) || 0) + 1)
  }

  return {
    total: errorEntries.length,
    byMessage: [...msgMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([message, count]) => ({ message, count })),
    byPage: [...pageMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([path, count]) => ({ path, count })),
    recent: [...errorEntries].sort((a, b) => b.timestamp - a.timestamp).slice(0, 20),
  }
}

// ─── Aggregation ─────────────────────────────────

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

// ─── Stats ───────────────────────────────────────

export function getAnalyticsSnapshot(): AnalyticsSnapshot {
  const today = getDateString(Date.now())
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

export function getGeoStats(): { regions: GeoStats[]; timezones: TimezoneStats[] } {
  const regionMap = new Map<string, number>()
  const tzMap = new Map<string, number>()

  for (const v of pageViews) {
    regionMap.set(v.region, (regionMap.get(v.region) || 0) + 1)
    tzMap.set(v.timezone, (tzMap.get(v.timezone) || 0) + 1)
  }

  return {
    regions: [...regionMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([region, count]) => ({ region, count })),
    timezones: [...tzMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([timezone, count]) => ({ timezone, count })),
  }
}
