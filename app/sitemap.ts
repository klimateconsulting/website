import type { MetadataRoute } from 'next'
import { getAllInsights, getAllProjects } from '@/lib/mdx'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://klimateconsulting.com'

  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/about/`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/team/`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services/`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services/agriculture/`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services/energy/`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services/water/`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services/food-systems/`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/projects/`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/insights/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/data-labs/`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact/`, priority: 0.6, changeFrequency: 'monthly' as const },
  ]

  const projectPages = getAllProjects().map((p) => ({
    url: `${baseUrl}/projects/${p.slug}/`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(p.frontmatter.date),
  }))

  const insightPages = getAllInsights().map((p) => ({
    url: `${baseUrl}/insights/${p.slug}/`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(p.frontmatter.date),
  }))

  return [...staticPages, ...projectPages, ...insightPages]
}
