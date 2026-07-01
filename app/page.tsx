import Hero from '@/components/home/Hero'
import FocusAreas from '@/components/home/FocusAreas'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import DataLabsTeaser from '@/components/home/DataLabsTeaser'
import FromOurResearch from '@/components/home/FromOurResearch'
import ClientLogos from '@/components/home/ClientLogos'
import CTAStrip from '@/components/home/CTAStrip'
import LegacyHashRedirect from '@/components/shared/LegacyHashRedirect'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <LegacyHashRedirect />
      <Hero />
      <FocusAreas />
      <FeaturedProjects />
      <DataLabsTeaser />
      <FromOurResearch />
      <ClientLogos />
      <CTAStrip />
    </>
  )
}
