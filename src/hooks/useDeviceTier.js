'use client'

import { useState, useEffect } from 'react'

function detect(width) {
  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent
    if (/iPad|Macintosh.*Mobile/.test(ua)) return 'tablet'
  }
  if (width <= 767) return 'phone'
  if (width <= 1023) return 'tablet'
  return 'desktop'
}

export function useDeviceTier() {
  const [state, setState] = useState({ tier: 'desktop', width: 1280 })

  useEffect(() => {
    function update() {
      const width = window.innerWidth
      setState({ tier: detect(width), width })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return state
}
