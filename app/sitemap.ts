import type { MetadataRoute } from 'next'
import { getAllInsights, getAllProjects } from '@/lib/mdx'
import { siteUrl } from '@/lib/metadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl

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
    { url: `${baseUrl}/research/`, priority: 0.7, changeFrequency: 'monthly' as const },
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

  // Standalone interactive posts served as static files under public/blog-posts/
  // (not MDX routes), so they're listed explicitly.
  const interactivePosts = [
    {
      url: `${baseUrl}/blog-posts/microirrigation/`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date('2026-04-17'),
    },
    {
      url: `${baseUrl}/blog-posts/sargassum/`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date('2026-06-12'),
    },
    {
      url: `${baseUrl}/blog-posts/price-of-water/`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date('2026-06-22'),
    },
    {
      url: `${baseUrl}/blog-posts/agtech-podcast-decade/`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date('2026-07-22'),
    },
  ]

  return [...staticPages, ...projectPages, ...insightPages, ...interactivePosts]
}
