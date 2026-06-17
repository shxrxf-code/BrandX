import { NextRequest, NextResponse } from 'next/server'
import { getAdminPassword, getSessionCookie, getLogoutCookie, getSession } from '@/lib/auth'
import { logAudit } from '@/lib/audit'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
    }

    const body = await request.json()
    const password = typeof body.password === 'string' ? body.password : ''

    const { action } = body as { action?: string }

    if (action === 'logout') {
      logAudit('logout', ip, 'Admin logout')
      return NextResponse.json(
        { success: true },
        {
          headers: {
            'Set-Cookie': getLogoutCookie(),
          },
        }
      )
    }

    const adminPassword = getAdminPassword()

    if (!adminPassword) {
      logAudit('login_failed', ip, 'Authentication not configured')
      return NextResponse.json(
        { error: 'Authentication not configured' },
        { status: 500 }
      )
    }

    if (!password || password.length < 4) {
      logAudit('login_failed', ip, 'Password too short')
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (password !== adminPassword) {
      logAudit('login_failed', ip, 'Invalid password attempt')
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    logAudit('login_success', ip, 'Admin login')
    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Set-Cookie': getSessionCookie(password),
        },
      }
    )
  } catch {
    logAudit('login_error', ip, 'Invalid request body')
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

export async function GET() {
  const session = await getSession()
  return NextResponse.json({ authenticated: session.authenticated })
}
