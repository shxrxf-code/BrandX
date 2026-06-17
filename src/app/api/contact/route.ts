import { NextRequest, NextResponse } from 'next/server'
import { trackContactSubmission } from '@/lib/analytics'

const RATE_LIMIT_WINDOW = 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5
const ipRequestMap = new Map<string, { count: number; resetAt: number }>()

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .trim()
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = ipRequestMap.get(ip)

  if (!record || now > record.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count++
  return false
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 })
    }

    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const name = typeof body.name === 'string' ? sanitizeInput(body.name) : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const company = typeof body.company === 'string' ? sanitizeInput(body.company) : ''
    const message = typeof body.message === 'string' ? sanitizeInput(body.message) : ''

    const fieldMaxLengths = { name: 100, company: 100, message: 5000, email: 254 }
    if (name.length > fieldMaxLengths.name) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 })
    }
    if (company.length > fieldMaxLengths.company) {
      return NextResponse.json({ error: 'Company name is too long' }, { status: 400 })
    }
    if (message.length > fieldMaxLengths.message) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 })
    }

    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Name is required (min 2 characters)' }, { status: 400 })
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ error: 'Message is too short (min 10 characters)' }, { status: 400 })
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 })
    }

    const spamPatterns = [
      /<script[\s>]/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:\s*text\/html/i,
      /vbscript:/i,
    ]
    for (const pattern of spamPatterns) {
      if (pattern.test(name) || pattern.test(message) || pattern.test(company)) {
        return NextResponse.json({ error: 'Invalid input detected' }, { status: 400 })
      }
    }

    const emailDomain = email.split('@')[1]
    const disposableDomains = [
      'mailinator.com', 'guerrillamail.com', 'tempmail.com',
      'throwaway.com', 'yopmail.com', '10minutemail.com',
    ]
    if (disposableDomains.includes(emailDomain)) {
      return NextResponse.json({ error: 'Disposable email addresses are not allowed' }, { status: 400 })
    }

    const ALLOWED_ORIGIN = 'https://brandexdigital.in'

    const origin = request.headers.get('origin')
    if (origin && origin !== ALLOWED_ORIGIN && !origin.startsWith('http://localhost')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    trackContactSubmission(name, email, company)

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      }
    )
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': 'https://brandexdigital.in',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    }
  )
}
