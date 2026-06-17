import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || ''
}

function xorSign(data: string, password: string): string {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(password)
  const msgData = encoder.encode(data)
  return Array.from(
    new Uint8Array(msgData.map((b, i) => b ^ keyData[i % keyData.length]))
  )
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function createToken(password: string): string {
  const payload = {
    role: 'admin',
    exp: Date.now() + SESSION_DURATION,
  }
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = xorSign(data, password)
  return `${data}.${signature}`
}

export function verifyToken(token: string): boolean {
  const password = getAdminPassword()
  if (!password) return false

  const [data, signature] = token.split('.')
  if (!data || !signature) return false

  const expectedSig = xorSign(data, password)
  if (signature !== expectedSig) return false

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString())
    if (payload.role !== 'admin') return false
    if (payload.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

export async function getSession(): Promise<{ authenticated: boolean }> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token || !verifyToken(token)) {
    return { authenticated: false }
  }

  return { authenticated: true }
}

export function getSessionCookie(password: string): string {
  const token = createToken(password)
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DURATION / 1000}`
}

export function getLogoutCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
}

export { COOKIE_NAME }
