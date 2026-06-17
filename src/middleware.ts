import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const RATE_LIMIT_WINDOW = 60_000
const MAX_SUSPICIOUS_REQUESTS = 30
const enumLimitMap = new Map<string, { count: number; resetAt: number }>()

const SENSITIVE_PATHS = [
  '/.env',
  '/.env.local',
  '/.env.production',
  '/.env.development',
  '/.env.example',
  '/.git',
  '/.git/config',
  '/.git/HEAD',
  '/.git/index',
  '/.gitignore',
  '/.gitattributes',
  '/.gitmodules',
  '/.svn',
  '/.svn/entries',
  '/.hg',
  '/.bzr',
  '/.DS_Store',
  '/Thumbs.db',
  '/node_modules',
  '/composer.json',
  '/composer.lock',
  '/composer.lock',
  '/package-lock.json',
  '/yarn.lock',
  '/pnpm-lock.yaml',
  '/administrator',
  '/wp-admin',
  '/wp-content',
  '/wp-includes',
  '/wp-json',
  '/xmlrpc.php',
  '/xmlrpc',
  '/backup',
  '/backups',
  '/backup.zip',
  '/dump',
  '/dump.sql',
  '/db.sql',
  '/database.sql',
  '/migrate',
  '/migration',
  '/test',
  '/tests',
  '/testing',
  '/staging',
  '/staging',
  '/dev',
  '/development',
  '/private',
  '/internal',
  '/confidential',
  '/restricted',
  '/secret',
  '/secrets',
  '/config',
  '/configuration',
  '/config.php',
  '/config.json',
  '/settings',
  '/setup',
  '/install',
  '/install.php',
  '/upgrade',
  '/upgrade.php',
  '/debug',
  '/debug.log',
  '/error.log',
  '/access.log',
  '/tmp',
  '/temp',
  '/cache',
  '/logs',
  '/log',
  '/swagger',
  '/swagger.json',
  '/swagger-ui',
  '/api-docs',
  '/api/documentation',
  '/graphql',
  '/graphiql',
  '/playground',
  '/webpack-hmr',
  '/_next/webpack-hmr',
  '/sockjs-node',
  '/cgi-bin',
  '/cgi-bin/test.cgi',
  '/server-status',
  '/server-info',
  '/proxy',
  '/actuator',
  '/actuator/health',
  '/actuator/info',
  '/actuator/env',
  '/health',
  '/healthz',
  '/readyz',
  '/info',
  '/metrics',
  '/favicon.ico',
  '/crossdomain.xml',
  '/clientaccesspolicy.xml',
  '/security.txt',
  '/Dockerfile',
  '/docker-compose.yml',
  '/docker-compose.yaml',
  '/Makefile',
  '/Procfile',
  '/.htaccess',
  '/.htpasswd',
  '/web.config',
  '/.editorconfig',
  '/.prettierrc',
  '/.prettierrc.json',
  '/.eslintrc.json',
  '/.eslintrc',
  '/.stylelintrc',
  '/.browserslistrc',
  '/babel.config.js',
  '/.babelrc',
  '/tsconfig.json',
  '/tsconfig.tsbuildinfo',
  '/next.config.js',
  '/next.config.ts',
  '/tailwind.config.js',
  '/tailwind.config.ts',
  '/postcss.config.js',
  '/postcss.config.mjs',
]

const SENSITIVE_EXTENSIONS = [
  '.bak',
  '.backup',
  '.old',
  '.orig',
  '.swp',
  '.swo',
  '.swn',
  '.tmp',
  '.temp',
  '.zip',
  '.tar',
  '.tar.gz',
  '.gz',
  '.tgz',
  '.rar',
  '.7z',
  '.sql',
  '.dump',
  '.sqlite',
  '.db',
  '.log',
  '.pid',
  '.lock',
  '.env',
  '.env.local',
  '.env.production',
  '.php',
  '.asp',
  '.aspx',
  '.jsp',
  '.jspa',
  '.cgi',
  '.pl',
  '.pyc',
  '.pyo',
  '.class',
  '.jar',
  '.war',
  '.ear',
  '.yml',
  '.yaml',
  '.config',
  '.cfg',
  '.conf',
  '.ini',
  '.htaccess',
  '.htpasswd',
  '.DS_Store',
  '.DS_Store?',
  '.localized',
  '.Trashes',
  '.Spotlight-V100',
]

const SENSITIVE_FILE_PATTERNS = [
  /^(composer|package|yarn|pnpm-lock|Gemfile)\.(json|lock)$/i,
  /^\.(env|env\.|git|svn|hg|bzr|DS_Store|htaccess|htpasswd)/i,
  /^(docker-compose|Dockerfile|Makefile|Procfile|Vagrantfile)$/i,
  /^nginx\.conf|\.htaccess|web\.config/i,
  /(backup|dump|export|sql|db|database|migrate|secret|private|internal|confidential)/i,
]

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = enumLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    enumLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= MAX_SUSPICIOUS_REQUESTS) {
    return true
  }

  record.count++
  return false
}

function isSensitivePath(pathname: string): boolean {
  const lowerPath = pathname.toLowerCase()

  for (const blocked of SENSITIVE_PATHS) {
    if (lowerPath.startsWith(blocked) || lowerPath === blocked) {
      return true
    }
  }

  for (const ext of SENSITIVE_EXTENSIONS) {
    if (lowerPath.endsWith(ext)) {
      return true
    }
  }

  for (const pattern of SENSITIVE_FILE_PATTERNS) {
    const segments = lowerPath.split('/').filter(Boolean)
    for (const seg of segments) {
      if (pattern.test(seg)) {
        return true
      }
    }
  }

  return false
}

function isEnumerationAttempt(pathname: string): boolean {
  const enumerationPatterns = [
    /\/\.\.\//,
    /\/\.\/\./,
    /\/%2e%2e\//i,
    /\/%2e\//i,
    /\/+$/,
    /\/wp-/i,
    /\/\.env/i,
    /\/\.git/i,
    /\/(config|settings|setup|install|backup|dump|sql|db|private|internal|secret|administrator)/i,
    /\/(test|tests|staging|dev|development|debug|log|logs|cache|temp|tmp)/i,
    /\/(phpinfo|info|status|health|metrics|swagger|graphql)/i,
    /\/api\/v[12]\//i,
    /\/api\/docs/i,
    /\/api\/swagger/i,
    /\.[a-z]+\.(json|xml|yml|yaml)$/i,
  ]

  for (const pattern of enumerationPatterns) {
    if (pattern.test(pathname)) {
      return true
    }
  }

  return false
}

function normalizePath(pathname: string): string {
  return pathname
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') || '/'
}

export function middleware(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  const isSensitive = isSensitivePath(pathname)
  const isEnumeration = isEnumerationAttempt(pathname)

  if (isSensitive || isEnumeration) {
    if (isRateLimited(ip)) {
      return new NextResponse(null, { status: 429 })
    }
  }

  if (isSensitive) {
    return new NextResponse(null, { status: 404 })
  }

  if (isEnumeration) {
    return new NextResponse(null, { status: 404 })
  }

  const response = NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.delete('X-Powered-By')
  response.headers.delete('Server')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|fonts|api).*)',
  ],
}
