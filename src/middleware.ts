import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BLOCKED_IP_PATHS = [
  '/.env',
  '/.env.local',
  '/.git',
  '/.git/config',
  '/.git/HEAD',
  '/.gitignore',
  '/node_modules',
  '/admin',
  '/wp-admin',
  '/wp-content',
  '/wp-includes',
  '/xmlrpc.php',
  '/_next/webpack-hmr',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  for (const blockedPath of BLOCKED_IP_PATHS) {
    if (pathname.startsWith(blockedPath)) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  if (
    pathname.endsWith('.php') ||
    pathname.endsWith('.asp') ||
    pathname.endsWith('.aspx') ||
    pathname.endsWith('.jsp') ||
    pathname.endsWith('.cgi')
  ) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|fonts|favicon.ico|opengraph-image|robots|sitemap).*)',
  ],
}
