import type { Metadata } from 'next'
import SectorServiceLayout, {
  type SectorServiceConfig,
} from '@/components/services/SectorServiceLayout'

export const metadata: Metadata = {
  title: 'Food Systems Consulting',
  alternates: { canonical: '/services/food-systems/' },
  description:
    'Emission accounting, supply chain analysis, and Scope 3 reporting for the food and beverage industry. Farm to fork sustainability consulting.',
}

const config: SectorServiceConfig = {
  sectorKey: 'food-systems',
  intro:
    "The food supply chain is often the most complex and opaque part of an organization's footprint. We trace impacts from farm to fork — enabling smarter Scope 3 reporting and sourcing decisions.",
  heroImage: '/images/services/food-systems-hero.jpg',
  heroAlt: 'Fresh produce and vegetables',
  whatWeDoHeading: 'The most complex part of any footprint',
  paragraphs: [
    'From livestock methane and fertilizer nitrous oxide to processing energy and cold-chain logistics, impacts are embedded at every stage of the food value chain. For companies facing Scope 3 reporting requirements, the food supply chain is usually the hardest part of the inventory to get right.',
    'We help organizations navigate this complexity with research-based analysis and strategic guidance — building Scope 3 inventories, evaluating carbon credit quality, and quantifying the lifecycle impact of specific products.',
  ],
  servicesLabel: 'Our food systems services',
  services: [
    'Scope 3 emission accounting and reporting',
    'Food supply chain analysis',
    'Carbon insetting & offsetting strategy',
    'Life Cycle Assessment (LCA)',
    'Food system data analysis & visualization',
    'Voluntary carbon market guidance',
  ],
  dashboard: {
    name: 'U.S. Food & Agriculture Value Chain Dashboard',
    href: 'https://data.klimateconsulting.com/food-ag/',
  },
  relatedProjectSlug: 'food-center-lbnl',
  relatedInsightSlugs: [
    'navigating-the-changing-tides-of-sustainability',
    'navigating-esg-disclosure',
    'decarbonizing-agriculture-part-1',
  ],
  cta: {
    heading: 'Working on a food-system problem?',
    subline: "From Scope 3 inventories to LCA — let's talk about it.",
    buttonLabel: 'Discuss a project',
  },
}

export default function FoodSystemsPage() {
  return <SectorServiceLayout {...config} />
}
