import type { Metadata } from 'next'
import { Space_Grotesk, Montserrat } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://klimateconsulting.com'),
  title: {
    default: 'Klimate Consulting — Research-Based Sustainability Solutions',
    template: '%s | Klimate Consulting',
  },
  description:
    'Klimate Consulting helps organizations navigate sustainability complexity in agriculture, energy, water, and food systems. Science-based research and strategic guidance.',
  openGraph: {
    siteName: 'Klimate Consulting',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Klimate Consulting',
  url: 'https://klimateconsulting.com',
  email: 'hello@klimateconsulting.com',
  description:
    'Applied sustainability research and consulting for agriculture, energy, water, and food systems.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
  },
  sameAs: ['https://www.linkedin.com/company/klimate-consulting/'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-kc-dark text-kc-dark dark:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-20C803277W" />
      </body>
    </html>
  )
}
