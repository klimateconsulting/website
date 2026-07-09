import Hero from '@/components/home/Hero'
import ClientLogos from '@/components/home/ClientLogos'
import HowWeWork from '@/components/home/HowWeWork'
import FocusAreas from '@/components/home/FocusAreas'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import DataLabsTeaser from '@/components/home/DataLabsTeaser'
import FromOurResearch from '@/components/home/FromOurResearch'
import CTABand from '@/components/shared/CTABand'
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
      <ClientLogos />
      <HowWeWork />
      <FocusAreas />
      <FeaturedProjects />
      <DataLabsTeaser />
      <FromOurResearch />
      <CTABand />
    </>
  )
}
