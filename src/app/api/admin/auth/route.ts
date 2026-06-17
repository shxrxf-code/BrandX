import { NextRequest, NextResponse } from 'next/server'
import { getAdminPassword, getSessionCookie, getLogoutCookie, getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
    }

    const body = await request.json()
    const password = typeof body.password === 'string' ? body.password : ''

    const { action } = body as { action?: string }

    if (action === 'logout') {
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
      return NextResponse.json(
        { error: 'Authentication not configured' },
        { status: 500 }
      )
    }

    if (!password || password.length < 4) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Set-Cookie': getSessionCookie(password),
        },
      }
    )
  } catch {
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
