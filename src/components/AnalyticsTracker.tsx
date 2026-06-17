'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const lastPath = useRef('')
  const startTime = useRef(0)

  useEffect(() => {
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/')) return

    if (pathname === lastPath.current) return
    lastPath.current = pathname
    startTime.current = performance.now()

    const ref = document.referrer || ''
    const base = window.location.origin
    const url = new URL('/api/track', base)
    url.searchParams.set('path', pathname)
    if (ref) url.searchParams.set('ref', ref.slice(0, 500))
    url.searchParams.set('tz', Intl.DateTimeFormat().resolvedOptions().timeZone || '')

    const img = new Image()
    img.src = url.toString()
  }, [pathname])

  useEffect(() => {
    function handleLoad() {
      if (!startTime.current || pathname.startsWith('/admin') || pathname.startsWith('/api/')) return

      const loadTime = performance.now() - startTime.current
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      const domContentLoaded = navEntry ? navEntry.domContentLoadedEventEnd : loadTime

      const base = window.location.origin
      fetch(`${base}/api/track/perf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          loadTime: Math.round(loadTime),
          domContentLoaded: Math.round(domContentLoaded),
        }),
        keepalive: true,
      }).catch(() => {})
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [pathname])

  useEffect(() => {
    function handleError(event: ErrorEvent) {
      if (pathname.startsWith('/admin') || pathname.startsWith('/api/')) return

      const base = window.location.origin
      fetch(`${base}/api/track/error`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: event.message?.slice(0, 1000) || 'Unknown error',
          source: event.filename?.slice(0, 500) || '',
          lineno: event.lineno || 0,
          colno: event.colno || 0,
          path: pathname,
        }),
        keepalive: true,
      }).catch(() => {})
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [pathname])

  return null
}
