import type { Metadata } from 'next'

// The contact page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Klimate Consulting about sustainability, decarbonization, and natural resource management projects.',
  alternates: { canonical: '/contact/' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
