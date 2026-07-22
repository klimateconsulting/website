import type { Metadata } from 'next'
import { Space_Grotesk, Montserrat } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { siteUrl } from '@/lib/metadata'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

// NOTE: Default page copy — trivially editable. Positioning: a lean, AI-native
// research firm delivering high-quality analysis on water, energy, agriculture.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Klimate Consulting — A lean, AI-native research firm',
    template: '%s | Klimate Consulting',
  },
  description:
    'Klimate Consulting delivers high-quality analysis on water, energy, agriculture — and any question in between. Research-grade rigor, AI-native speed.',
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
  url: siteUrl,
  email: 'hello@klimateconsulting.com',
  description:
    'Applied sustainability research and consulting for agriculture, energy, water, and food systems.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '350 California Street',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94104',
    addressCountry: 'US',
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
      <body className="min-h-full flex flex-col bg-kc-bg text-kc-dark">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-JGETKXY9RF" />
      </body>
    </html>
  )
}
