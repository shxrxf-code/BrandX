import { NextRequest, NextResponse } from 'next/server'
import { trackPagePerformance } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const path = typeof body.path === 'string' ? body.path : '/'
    const loadTime = typeof body.loadTime === 'number' ? body.loadTime : 0
    const domContentLoaded = typeof body.domContentLoaded === 'number' ? body.domContentLoaded : 0

    const ua = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || '127.0.0.1'
    const sessionId = `${Array.from(ip + ua).reduce((a, c) => a + c.charCodeAt(0), 0).toString(36)}`

    trackPagePerformance(path, loadTime, domContentLoaded, sessionId)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
