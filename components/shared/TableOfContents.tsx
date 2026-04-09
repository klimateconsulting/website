'use client'

import { useState, useEffect } from 'react'

interface TocHeading {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="text-sm font-body">
      <h4 className="font-heading font-bold text-kc-dark dark:text-white mb-4 text-xs uppercase tracking-wider">
        On this page
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${heading.id}`}
              className={`block py-0.5 transition-colors leading-snug ${
                activeId === heading.id
                  ? 'text-kc-blue dark:text-kc-light-blue font-semibold'
                  : 'text-kc-text-secondary dark:text-gray-300 hover:text-kc-blue dark:hover:text-kc-light-blue'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
