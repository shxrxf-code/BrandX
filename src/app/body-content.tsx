'use client'

import { useState } from 'react'

export default function BodyContent({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useState(() => {
    const handler = () => setIsLoaded(true)
    window.addEventListener('preloader-complete', handler)
    return () => window.removeEventListener('preloader-complete', handler)
  })

  return (
    <main
      id="main-content"
      className="relative z-10"
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}
    >
      {children}
    </main>
  )
}
