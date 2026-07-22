import type { Metadata } from 'next'
import SectorServiceLayout, {
  type SectorServiceConfig,
} from '@/components/services/SectorServiceLayout'

export const metadata: Metadata = {
  title: 'Energy Consulting',
  alternates: { canonical: '/services/energy/' },
  description:
    'Microgrid solutions, energy management R&D, and industrial energy efficiency consulting. Building a more resilient energy future.',
}

const config: SectorServiceConfig = {
  sectorKey: 'energy',
  intro:
    'Demand is rising, extreme weather is stressing the grid, and reliability is back at the center of energy planning. We develop microgrid solutions and conduct energy-management R&D for a resilient, efficient energy future.',
  heroImage: '/images/services/energy-hero.jpg',
  heroAlt: 'Solar panel array under blue sky',
  whatWeDoHeading: 'A grid under new pressure',
  paragraphs: [
    'The energy sector is in the middle of a generational transformation. Electrification is accelerating demand for clean, reliable power — while extreme heat, wildfire risk, and shifting load patterns strain the grid that has to deliver it. Energy security and efficiency are back at the center of planning for utilities, industry, and government alike.',
    'We help organizations navigate this dual challenge with research-based solutions spanning microgrid development, energy management systems, and industrial efficiency. Our work bridges the gap between DOE research programs and real-world implementation.',
  ],
  servicesLabel: 'Our energy services',
  services: [
    'Microgrid project development and evaluation',
    'Energy management systems (EnMS) research & implementation',
    'Industrial energy efficiency analysis',
    'DOE program support and technical assistance',
    'Water-energy nexus research',
    'Distributed energy resource assessment',
  ],
  dashboard: {
    name: 'EnMS Improvement Opportunity Finder',
    href: 'https://data.klimateconsulting.com/enms/',
  },
  relatedProjectSlug: 'microgrid-scale',
  relatedInsightSlugs: [
    'microirrigation-energy-paradox',
    'navigating-the-changing-tides-of-sustainability',
    'decarbonizing-agriculture-part-2',
  ],
  cta: {
    heading: 'Working on an energy problem?',
    subline: "From microgrids to industrial efficiency — let's talk about it.",
    buttonLabel: 'Discuss an energy project',
  },
}

export default function EnergyPage() {
  return <SectorServiceLayout {...config} />
}
