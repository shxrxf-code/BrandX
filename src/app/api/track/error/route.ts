import { NextRequest, NextResponse } from 'next/server'
import { trackError } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const message = typeof body.message === 'string' ? body.message.slice(0, 1000) : ''
    const source = typeof body.source === 'string' ? body.source.slice(0, 500) : ''
    const lineno = typeof body.lineno === 'number' ? body.lineno : 0
    const colno = typeof body.colno === 'number' ? body.colno : 0
    const path = typeof body.path === 'string' ? body.path : '/'
    const userAgent = request.headers.get('user-agent') || ''

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    trackError(message, source, lineno, colno, path, userAgent)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
