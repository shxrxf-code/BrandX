export interface AuditEntry {
  action: string
  ip: string
  timestamp: number
  detail: string
}

const auditLog: AuditEntry[] = []

const MAX_LOG = 5_000

export function logAudit(action: string, ip: string, detail: string = ''): void {
  auditLog.push({
    action,
    ip: ip === 'unknown' ? 'unknown' : ip,
    timestamp: Date.now(),
    detail: detail.slice(0, 500),
  })

  if (auditLog.length > MAX_LOG) {
    auditLog.splice(0, auditLog.length - MAX_LOG)
  }
}

export function getAuditLog(limit: number = 100): AuditEntry[] {
  return [...auditLog]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit)
}

export function clearAuditLog(): void {
  auditLog.length = 0
}
