import Link from 'next/link'
import Image from 'next/image'
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const serviceLinks = [
  { name: 'Agriculture', href: '/services/agriculture/' },
  { name: 'Energy', href: '/services/energy/' },
  { name: 'Water', href: '/services/water/' },
  { name: 'Food Systems', href: '/services/food-systems/' },
]

const companyLinks = [
  { name: 'About', href: '/about/' },
  { name: 'Team', href: '/team/' },
  { name: 'Projects', href: '/projects/' },
  { name: 'Insights', href: '/insights/' },
  { name: 'Contact', href: '/contact/' },
]

export default function Footer() {
  return (
    <footer className="bg-kc-dark text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo + Social */}
          <div>
            {/* Source: klimate-owned */}
            <Image
              src="/logos/logo-white.png"
              alt="Klimate Consulting"
              width={180}
              height={40}
              className="h-8 w-auto mb-6"
            />
            <a
              href="https://www.linkedin.com/company/klimate-consulting/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gray-400">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gray-400">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools + Contact */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gray-400">
              Tools
            </h3>
            <ul className="space-y-2 mb-6">
              <li>
                <a
                  href="https://data.klimateconsulting.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Data Labs &rarr;
                </a>
              </li>
            </ul>

            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gray-400">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@klimateconsulting.com"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  hello@klimateconsulting.com
                </a>
              </li>
              <li className="text-sm text-gray-400">San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Klimate Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
