import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import {
  getAnalyticsSnapshot,
  getDeviceStats,
  getBrowserStats,
  getOsStats,
} from '@/lib/analytics'

export async function GET() {
  const session = await getSession()

  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const snapshot = getAnalyticsSnapshot()
    const devices = getDeviceStats()
    const browsers = getBrowserStats()
    const operatingSystems = getOsStats()

    return NextResponse.json({
      snapshot,
      devices,
      browsers,
      operatingSystems,
      generatedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    )
  }
}
