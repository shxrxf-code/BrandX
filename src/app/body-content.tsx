'use client'

import { useState, useEffect } from 'react'

export default function BodyContent({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handler = () => setIsLoaded(true)
    window.addEventListener('preloader-complete', handler)
    return () => window.removeEventListener('preloader-complete', handler)
  }, [])

  return (
    <main
      id="main-content"
      className="relative z-10"
      style={isLoaded ? {} : { visibility: 'visible' }}
    >
      {children}
    </main>
  )
}
