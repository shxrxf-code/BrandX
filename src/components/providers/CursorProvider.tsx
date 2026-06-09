'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'

type CursorVariant = 'default' | 'view' | 'drag' | 'expand' | 'explore' | 'open' | 'discover' | 'contact'

type CursorState = {
  text: string | null
  variant: CursorVariant
  isHovering: boolean
  setCursor: (text: string | null, variant?: CursorVariant) => void
  setHovering: (hovering: boolean) => void
}

const CursorContext = createContext<CursorState>({
  text: null,
  variant: 'default',
  isHovering: false,
  setCursor: () => {},
  setHovering: () => {},
})

export function useCursor() {
  return useContext(CursorContext)
}

export default function CursorProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState<string | null>(null)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isHovering, setIsHovering] = useState(false)

  const setCursor = useCallback(
    (t: string | null, v: CursorVariant = 'default') => {
      setText(t)
      setVariant(v)
    },
    []
  )

  const setHovering = useCallback((hovering: boolean) => {
    setIsHovering(hovering)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (isFine) document.documentElement.classList.add('has-custom-cursor')
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <CursorContext.Provider value={{ text, variant, isHovering, setCursor, setHovering }}>
      {children}
    </CursorContext.Provider>
  )
}
