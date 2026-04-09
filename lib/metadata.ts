export const siteUrl = 'https://klimateconsulting.com'

export const defaultMetadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: 'Klimate Consulting',
    images: ['/og-image.png'],
    type: 'website' as const,
  },
  twitter: {
    card: 'summary_large_image' as const,
    images: ['/og-image.png'],
  },
}
