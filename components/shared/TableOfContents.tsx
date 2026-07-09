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
    <nav>
      <div className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted">
        On this page
      </div>
      <ul className="flex flex-col gap-3 border-l-2 border-kc-border">
        {headings.map((heading) => {
          const active = activeId === heading.id
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`-ml-[2px] block border-l-2 font-body text-[13px] leading-snug transition-colors ${
                  heading.level === 3 ? 'pl-7' : 'pl-[14px]'
                } ${
                  active
                    ? 'border-kc-blue font-semibold text-kc-blue'
                    : 'border-transparent text-kc-text-secondary hover:text-kc-blue'
                }`}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
