import Link from 'next/link'
import Image from 'next/image'
import SectorStripe from '@/components/shared/SectorStripe'

const serviceLinks = [
  { name: 'Water', href: '/services/water/' },
  { name: 'Energy', href: '/services/energy/' },
  { name: 'Agriculture', href: '/services/agriculture/' },
  { name: 'Food Systems', href: '/services/food-systems/' },
]

const companyLinks = [
  { name: 'About', href: '/about/' },
  { name: 'Team', href: '/team/' },
  { name: 'Projects', href: '/projects/' },
  { name: 'Insights', href: '/insights/' },
  { name: 'Data Labs', href: '/data-labs/' },
]

// Real company LinkedIn — see IMPLEMENTATION_PLAN open item #5.
const LINKEDIN_URL = 'https://www.linkedin.com/company/klimate-consulting/'

const linkCls =
  'font-body text-[13.5px] text-[#d6e4ef] hover:text-white transition-colors'
const headingCls =
  'font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7fa2bd] mb-[18px]'

export default function Footer() {
  return (
    <footer className="bg-kc-blue-dark">
      <div className="mx-auto max-w-[1240px] px-8 pt-[72px] pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr_2fr_3fr] gap-12 mb-14">
          {/* Logo + tagline + LinkedIn */}
          <div>
            {/* Source: klimate-owned */}
            <Image
              src="/logos/logo-white.png"
              alt="Klimate Consulting"
              width={180}
              height={40}
              className="h-[30px] w-auto mb-5"
            />
            <p className="font-body text-[13px] leading-[1.7] text-[#9db8cd] mb-5 max-w-[280px]">
              A lean, AI-native research firm delivering high-quality analysis on
              water, energy, agriculture — and beyond.
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] font-semibold text-kc-light-blue hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Services */}
          <div>
            <div className={headingCls}>Services</div>
            <div className="flex flex-col gap-[10px]">
              {serviceLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls}>
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className={headingCls}>Company</div>
            <div className="flex flex-col gap-[10px]">
              {companyLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls}>
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className={headingCls}>Contact</div>
            <div className="flex flex-col gap-[10px]">
              <a href="mailto:hello@klimateconsulting.com" className={linkCls}>
                hello@klimateconsulting.com
              </a>
              <span className="font-body text-[13.5px] text-[#9db8cd]">
                San Francisco, CA
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.14] pt-7 flex items-center justify-between gap-4">
          <span className="font-body text-[12.5px] text-[#7fa2bd]">
            © {new Date().getFullYear()} Klimate Consulting. All rights reserved.
          </span>
          <SectorStripe variant="light" />
        </div>
      </div>
    </footer>
  )
}
