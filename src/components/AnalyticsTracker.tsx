'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const lastPath = useRef('')

  useEffect(() => {
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/')) return

    if (pathname === lastPath.current) return
    lastPath.current = pathname

    const ref = document.referrer || ''
    const base = window.location.origin
    const url = new URL('/api/track', base)
    url.searchParams.set('path', pathname)
    if (ref) url.searchParams.set('ref', ref.slice(0, 500))

    const img = new Image()
    img.src = url.toString()
  }, [pathname])

  return null
}
