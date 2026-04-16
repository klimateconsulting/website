'use client'

import { useEffect } from 'react'

const map: Record<string, string> = {
  '#about': '/about/',
  '#services': '/services/',
  '#projects': '/projects/',
  '#blog': '/insights/',
  '#contact': '/contact/',
}

export default function LegacyHashRedirect() {
  useEffect(() => {
    const target = map[window.location.hash]
    if (target) window.location.replace(target)
  }, [])
  return null
}
