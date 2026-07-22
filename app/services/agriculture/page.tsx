import type { Metadata } from 'next'
import SectorServiceLayout, {
  type SectorServiceConfig,
} from '@/components/services/SectorServiceLayout'

export const metadata: Metadata = {
  title: 'Agriculture Sustainability Consulting',
  alternates: { canonical: '/services/agriculture/' },
  description:
    'Research-based guidance on agricultural decarbonization, soil carbon, and sustainable farming systems. We help clients reduce emissions from farm to fork.',
}

const config: SectorServiceConfig = {
  sectorKey: 'agriculture',
  intro:
    'Soils are degrading and water is dwindling — yet agriculture must produce more than ever. We analyze how farms use land, water, and energy, and where the biggest gains hide.',
  heroImage: '/images/services/agriculture-hero.jpg',
  heroAlt: 'Aerial view of agricultural crop rows',
  whatWeDoHeading: 'More output, fewer inputs',
  paragraphs: [
    "Agriculture accounts for roughly 11.5% of U.S. greenhouse gas emissions — and when you include the broader food system, nearly a third of the global total. But farmland is also uniquely positioned: with the right practices it can shift from a carbon source to the world's largest sink, while using less water and energy per unit of output.",
    'We work with farming operations, agtech companies, and food companies to analyze production data, evaluate technologies, and build systems that improve soil health and long-term productivity.',
  ],
  servicesLabel: 'Our agriculture services',
  services: [
    'Farm production analytics & crop data analysis',
    'Agricultural census data insights',
    'Carbon sequestration research & soil carbon assessment',
    'Agricultural GHG emissions measurement & reduction',
    'Controlled Environment Agriculture (CEA) technology evaluation',
    'Regenerative agriculture advisory',
  ],
  dashboard: {
    name: 'U.S. Food & Agriculture Value Chain Dashboard',
    href: 'https://data.klimateconsulting.com/food-ag/',
  },
  relatedProjectSlug: 'cea-lbnl',
  relatedInsightSlugs: [
    'decarbonizing-agriculture-part-1',
    'decarbonizing-agriculture-part-2',
    'microirrigation-energy-paradox',
  ],
  cta: {
    heading: 'Working on an agriculture problem?',
    subline: "From farm data to CEA technology — let's talk about it.",
    buttonLabel: 'Discuss an ag project',
  },
}

export default function AgriculturePage() {
  return <SectorServiceLayout {...config} />
}
