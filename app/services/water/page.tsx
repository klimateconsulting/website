import type { Metadata } from 'next'
import SectorServiceLayout, {
  type SectorServiceConfig,
} from '@/components/services/SectorServiceLayout'

export const metadata: Metadata = {
  title: 'Water Resource Management Consulting',
  alternates: { canonical: '/services/water/' },
  description:
    'Modernizing water management for a water-stressed world. Klimate Consulting works with utilities, agencies, and NGOs on data-driven water strategy.',
}

const config: SectorServiceConfig = {
  sectorKey: 'water',
  intro:
    "Most of the world's population lives in water-stressed regions. California manages its water with laws from the 1800s and infrastructure from the 1900s. We research how to modernize water management for the 21st century.",
  heroImage: '/images/services/water-hero.jpg',
  heroAlt: 'Aerial view of Lake Berryessa reservoir, California',
  whatWeDoHeading: 'A system built for a world that no longer exists',
  paragraphs: [
    "California's water system — the largest in the world — was built for different conditions. Snowpack is declining, groundwater basins are overdrafted, and the state's agricultural water delivery network remains the single largest electricity consumer in the state. Effective management requires data-driven modernization, but most water agencies still lack the granular data needed to make informed decisions.",
    "We help organizations understand and address water challenges through research, data analysis, and strategic advisory — with a particular focus on California's water infrastructure and policy landscape.",
  ],
  servicesLabel: 'Our water services',
  services: [
    'Water management R&D and policy analysis',
    'Infrastructure modernization research',
    'Water data analysis & dashboard development',
    'Water-energy nexus assessment',
    'Agricultural water delivery network analysis',
    'SGMA compliance support & groundwater analysis',
  ],
  dashboard: {
    name: 'California Water Intelligence Dashboard',
    href: 'https://data.klimateconsulting.com/ca-water/',
  },
  relatedProjectSlug: 'water-system-nrdc',
  relatedInsightSlugs: [
    'california-water-dilemma-part-1',
    'california-water-dilemma-part-2',
    'price-of-water-california',
  ],
  cta: {
    heading: 'Working on a water problem?',
    subline:
      "From SGMA compliance to infrastructure research — let's talk about it.",
    buttonLabel: 'Discuss a water project',
  },
}

export default function WaterPage() {
  return <SectorServiceLayout {...config} />
}
