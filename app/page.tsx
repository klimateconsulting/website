import Hero from '@/components/home/Hero'
import FocusAreas from '@/components/home/FocusAreas'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import DataLabsTeaser from '@/components/home/DataLabsTeaser'
import ClientLogos from '@/components/home/ClientLogos'
import CTAStrip from '@/components/home/CTAStrip'
import LegacyHashRedirect from '@/components/shared/LegacyHashRedirect'

export default function HomePage() {
  return (
    <>
      <LegacyHashRedirect />
      <Hero />
      <FocusAreas />
      <FeaturedProjects />
      <DataLabsTeaser />
      <ClientLogos />
      <CTAStrip />
    </>
  )
}
