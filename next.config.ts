import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.klimateconsulting.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,

  // NOTE: These redirects do NOT work with output: 'export' (static site).
  // GitHub Pages does not process server-side redirects.
  // For true 301 redirects (SEO-critical), set up Cloudflare Page Rules:
  //   /californias-water-dilemma-part-1-we-cannot-manage-what-we-dont-measure -> /insights/california-water-dilemma-part-1/
  //   /californias-water-dilemma-part-2-water-data-scarcity -> /insights/california-water-dilemma-part-2/
  //   /decarbonizing-agriculture-part1 -> /insights/decarbonizing-agriculture-part-1/
  //   /decarbonizing-agriculture-part2 -> /insights/decarbonizing-agriculture-part-2/
  //   /navigating-the-changing-tides-of-sustainability -> /insights/navigating-the-changing-tides-of-sustainability/
  //   /blogposts -> /insights/
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
