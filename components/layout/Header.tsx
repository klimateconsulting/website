'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import SectorStripe from '@/components/shared/SectorStripe'

const navLinks = [
  { name: 'Services', href: '/services/' },
  { name: 'Projects', href: '/projects/' },
  { name: 'Insights', href: '/insights/' },
  { name: 'Research', href: '/research/' },
  { name: 'Data Labs', href: '/data-labs/' },
  { name: 'Team', href: '/team/' },
  { name: 'About', href: '/about/' },
]

const services = [
  { name: 'Water', href: '/services/water/', icon: '/icons/water-color.png' },
  { name: 'Energy', href: '/services/energy/', icon: '/icons/energy-color.png' },
  { name: 'Agriculture', href: '/services/agriculture/', icon: '/icons/agriculture-color.png' },
  { name: 'Food Systems', href: '/services/food-systems/', icon: '/icons/food-color.png' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname() || '/'

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    const root = document.documentElement
    if (mobileOpen) {
      root.style.overflow = 'hidden'
    } else {
      root.style.overflow = ''
    }
    return () => {
      root.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-[rgba(253,253,251,0.94)] backdrop-blur-[12px] border-b border-kc-border">
      <div className="mx-auto max-w-[1240px] px-8 h-[76px] flex items-center justify-between gap-8">
        <Link href="/" className="shrink-0" aria-label="Klimate Consulting home">
          {/* Source: klimate-owned */}
          <Image
            src="/logos/logo-blue.png"
            alt="Klimate Consulting"
            width={180}
            height={40}
            className="h-[34px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-[30px]">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-body text-[13.5px] font-semibold tracking-[0.01em] transition-colors ${
                  active ? 'text-kc-blue' : 'text-kc-dark hover:text-kc-blue'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-[6px] left-0 right-0 h-[2px] bg-kc-blue" />
                )}
              </Link>
            )
          })}
          <Link
            href="/contact/"
            className="font-body text-[13px] font-semibold tracking-[0.02em] text-white bg-kc-blue hover:bg-kc-blue-dark px-6 py-[11px] rounded transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -mr-2 text-kc-dark min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <SectorStripe />

      {/* Mobile overlay — positioned against the sticky header (top-full) rather
          than viewport-fixed, because the header's backdrop-blur creates a
          containing block that collapses a `position: fixed` panel to ~0 height. */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 h-[calc(100dvh-80px)] bg-kc-bg z-40 overflow-y-auto">
          <nav className="flex flex-col p-6 gap-1">
            <Link
              href="/services/"
              onClick={() => setMobileOpen(false)}
              className="font-heading text-xl font-semibold text-kc-dark py-3 border-b border-kc-divider min-h-[44px] flex items-center"
            >
              Services
            </Link>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 font-body text-base text-kc-text-secondary py-2 pl-4 min-h-[44px]"
              >
                <Image src={s.icon} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
                {s.name}
              </Link>
            ))}
            {navLinks
              .filter((l) => l.href !== '/services/')
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-xl font-semibold text-kc-dark py-3 border-b border-kc-divider min-h-[44px] flex items-center"
                >
                  {link.name}
                </Link>
              ))}
            <Link
              href="/contact/"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-kc-blue text-white text-center font-body text-lg font-semibold px-6 py-3 rounded min-h-[44px] flex items-center justify-center"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
