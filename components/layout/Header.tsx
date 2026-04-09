'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

const services = [
  { name: 'Agriculture', href: '/services/agriculture/', icon: '/icons/agriculture-color.png', iconWhite: '/icons/agriculture-white.png' },
  { name: 'Energy', href: '/services/energy/', icon: '/icons/energy-color.png', iconWhite: '/icons/energy-white.png' },
  { name: 'Water', href: '/services/water/', icon: '/icons/water-color.png', iconWhite: '/icons/water-white.png' },
  { name: 'Food Systems', href: '/services/food-systems/', icon: '/icons/food-color.png', iconWhite: '/icons/food-white.png' },
]

const navLinks = [
  { name: 'Projects', href: '/projects/' },
  { name: 'Insights', href: '/insights/' },
  { name: 'Data Labs', href: '/data-labs/' },
  { name: 'Team', href: '/team/' },
  { name: 'About', href: '/about/' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white dark:bg-[#1e2d30] border-b border-gray-100 dark:border-white/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo — white over hero, blue when scrolled (light), white when scrolled (dark) */}
        <Link href="/" className="flex-shrink-0 overflow-hidden">
          {scrolled ? (
            <>
              <Image
                src="/logos/logo-blue.png"
                alt="Klimate Consulting"
                width={180}
                height={40}
                className="h-8 md:h-10 w-auto dark:hidden"
                priority
              />
              <Image
                src="/logos/logo-white.png"
                alt="Klimate Consulting"
                width={180}
                height={40}
                className="h-8 md:h-10 w-auto hidden dark:block"
                priority
              />
            </>
          ) : (
            <Image
              src="/logos/logo-white.png"
              alt="Klimate Consulting"
              width={180}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services/"
              className={`flex items-center gap-1 text-sm font-semibold font-body transition-colors ${
                scrolled
                  ? 'text-kc-dark dark:text-white hover:text-kc-blue dark:hover:text-kc-light-blue'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Services
              <ChevronDown className="w-4 h-4" />
            </Link>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-white dark:bg-kc-dark rounded-lg shadow-lg border border-gray-100 dark:border-kc-blue/20 p-4 min-w-[220px]">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-kc-bg-grey dark:hover:bg-kc-blue/10 transition-colors"
                    >
                      <Image src={s.icon} alt="" width={24} height={24} className="w-6 h-6 object-contain block dark:hidden" />
                      <Image src={s.iconWhite} alt="" width={24} height={24} className="w-6 h-6 object-contain hidden dark:block" />
                      <span className="text-sm font-semibold font-body text-kc-dark dark:text-white">
                        {s.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold font-body transition-colors ${
                scrolled
                  ? 'text-kc-dark dark:text-white hover:text-kc-blue dark:hover:text-kc-light-blue'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact/"
            className={`text-sm font-semibold font-body px-5 py-2.5 rounded-md transition-colors ${
              scrolled
                ? 'bg-kc-blue text-white hover:bg-kc-blue-dark'
                : 'border border-white text-white hover:bg-white/10'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 ${scrolled ? 'text-kc-dark dark:text-white' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white dark:bg-kc-dark z-40">
          <nav className="flex flex-col p-6 gap-2">
            <Link
              href="/services/"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-heading font-medium text-kc-dark dark:text-white py-3 border-b border-gray-100 dark:border-gray-800"
            >
              Services
            </Link>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-base font-body text-kc-text-secondary dark:text-gray-400 py-2 pl-4"
              >
                <Image src={s.icon} alt="" width={20} height={20} className="w-5 h-5 object-contain block dark:hidden" />
                <Image src={s.iconWhite} alt="" width={20} height={20} className="w-5 h-5 object-contain hidden dark:block" />
                {s.name}
              </Link>
            ))}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-heading font-medium text-kc-dark dark:text-white py-3 border-b border-gray-100 dark:border-gray-800"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact/"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-kc-blue text-white text-center text-lg font-semibold font-body px-6 py-3 rounded-md"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
