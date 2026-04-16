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
  // For true 301 redirects (SEO-critical), configure these on the old WordPress
  // origin (or Cloudflare in front of it) BEFORE pointing klimateconsulting.com
  // at the new site:
  //
  // Article slugs (old WP -> new):
  //   /californias-water-dilemma-part-1-we-cannot-manage-what-we-dont-measure -> https://klimate.consulting/insights/california-water-dilemma-part-1/
  //   /californias-water-dilemma-part-2-water-data-scarcity                   -> https://klimate.consulting/insights/california-water-dilemma-part-2/
  //   /decarbonizing-agriculture-part1                                         -> https://klimate.consulting/insights/decarbonizing-agriculture-part-1/
  //   /decarbonizing-agriculture-part2                                         -> https://klimate.consulting/insights/decarbonizing-agriculture-part-2/
  //   /regulatory-trends-in-sustainability                                     -> https://klimate.consulting/insights/navigating-esg-disclosure/
  //   /navigating-the-changing-tides-of-sustainability                         -> https://klimate.consulting/insights/navigating-the-changing-tides-of-sustainability/
  //   /blogposts                                                               -> https://klimate.consulting/insights/
  //
  // Apex / catch-all (old WP single-page hash anchors):
  //   /  -> https://klimate.consulting/        (then client-side JS on the homepage maps preserved hashes:
  //                                              #about -> /about/, #services -> /services/,
  //                                              #projects -> /projects/, #blog -> /insights/,
  //                                              #contact -> /contact/)
  //
  // Server-side cannot 301 on a fragment (#) — browsers strip it before sending the request.
  // The hash mapping has to be done client-side on the new homepage.
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
