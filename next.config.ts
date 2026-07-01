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

  // NOTE: Server-side redirects do NOT work with output: 'export' (static site);
  // GitHub Pages does not process them. These old WordPress URLs are handled two ways:
  //
  //   1. INTERIM (in this repo): static redirect stubs under public/<old-path>/index.html,
  //      each with <link rel="canonical">, a <meta http-equiv="refresh">, and a
  //      location.replace() fallback pointing at the absolute new URL below.
  //   2. SEO-IDEAL (do later, not in repo): true 301s via Cloudflare Bulk Redirects in the
  //      klimateconsulting.com zone. Configure the same mapping there, then the stubs are
  //      belt-and-suspenders.
  //
  // Article slugs (old WP -> new):
  //   /californias-water-dilemma-part-1-we-cannot-manage-what-we-dont-measure -> https://klimateconsulting.com/insights/california-water-dilemma-part-1/
  //   /californias-water-dilemma-part-2-water-data-scarcity                   -> https://klimateconsulting.com/insights/california-water-dilemma-part-2/
  //   /decarbonizing-agriculture-part1                                         -> https://klimateconsulting.com/insights/decarbonizing-agriculture-part-1/
  //   /decarbonizing-agriculture-part2                                         -> https://klimateconsulting.com/insights/decarbonizing-agriculture-part-2/
  //   /regulatory-trends-in-sustainability                                     -> https://klimateconsulting.com/insights/navigating-esg-disclosure/
  //   /navigating-the-changing-tides-of-sustainability                         -> https://klimateconsulting.com/insights/navigating-the-changing-tides-of-sustainability/
  //   /blogposts                                                               -> https://klimateconsulting.com/insights/
  //
  // NOTE: /blog-posts/microirrigation/ and /blog-posts/sargassum/ are LIVE interactive posts
  // (linked from the /insights/ teasers), NOT old URLs — do not redirect them.
  //
  // Apex / catch-all (old WP single-page hash anchors):
  //   /  -> https://klimateconsulting.com/     (then client-side JS on the homepage maps preserved hashes:
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
