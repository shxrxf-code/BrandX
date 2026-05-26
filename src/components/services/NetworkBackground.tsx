'use client'

interface NetworkBackgroundProps {
  isLoaded: boolean
  baseDelay: number
}

export default function NetworkBackground({ isLoaded, baseDelay }: NetworkBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/3 via-transparent to-accent-purple/3" />
    </div>
  )
}
