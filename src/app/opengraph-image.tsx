import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Brandex Digital — We Build Brands That Dominate'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            zIndex: 1,
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            BRANDEX
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: '400',
              color: '#a1a1aa',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            We Build Brands That Dominate
          </div>

          {/* Divider */}
          <div
            style={{
              width: '120px',
              height: '3px',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
              borderRadius: '2px',
              marginTop: '8px',
            }}
          />

          {/* Services */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '16px',
              fontSize: '20px',
              color: '#71717a',
            }}
          >
            <span>Branding</span>
            <span>•</span>
            <span>Development</span>
            <span>•</span>
            <span>Marketing</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
