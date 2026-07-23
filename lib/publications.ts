// Research & Publications data — single typed source for the /research page.
// Rendering, grouping, filtering, and JSON-LD schema all derive from this array.
//
// PDF hosting policy (see gated_downloads_system_plan):
//   - report / conference  -> LBNL/DOE PDFs are publicly funded and freely
//     distributable; hosted under public/reports/ and linked via `pdf`.
//   - journal              -> Elsevier/Springer copyrighted; NEVER host a PDF,
//     `pdf` stays undefined and the entry links to its DOI/publisher/LBNL page.
//
// `gated` is false on every entry today. When Arian sets NEXT_PUBLIC_FORMS_ENDPOINT
// and flips an entry to gated:true, the DownloadGate modal captures contact info
// before the download. Until then downloads are direct and the gate stays inert.

export type PublicationType = 'journal' | 'conference' | 'report' | 'tool' | 'talk'

export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  type: PublicationType
  year: number
  date?: string
  url: string
  topics: string[]
  featured?: boolean
  pdf?: string
  gated?: boolean
  /** Optional "Related on Klimate" internal links (service/insight pages). */
  related?: { label: string; href: string }[]
}

// The author string used to bold Arian across all citation displays.
export const SELF_AUTHOR = 'Aghajanzadeh'

export const publications: Publication[] = [
  // ── Peer-reviewed journal articles (link only — never host) ───────────────
  {
    id: 'cea-review-2026',
    title:
      'Technology pathways for energy- and water-efficient controlled environment agriculture: A review of technologies, implementation pathways, and regional use cases',
    authors: [
      'Aghajanzadeh, A.',
      'Carleton, B.',
      'Negron-Juarez, R.',
      'Smith, D.',
      'Schmick, R.',
      'Stokes-Draut, J.',
    ],
    venue: 'Sustainable Energy Technologies and Assessments',
    type: 'journal',
    year: 2026,
    url: 'https://www.sciencedirect.com/science/article/pii/S221313882600322X',
    topics: ['agriculture', 'energy'],
    featured: true,
    gated: false,
    related: [
      { label: 'Agriculture services', href: '/services/agriculture/' },
      { label: 'CEA case study', href: '/projects/' },
    ],
  },
  {
    id: 'iso-50001-drivers-2020',
    title:
      'Identification of drivers, benefits, and challenges of ISO 50001 through case study content analysis',
    authors: ['Fuchs, H.', 'Aghajanzadeh, A.', 'Therkelsen, P.'],
    venue: 'Energy Policy',
    type: 'journal',
    year: 2020,
    url: 'https://eta.lbl.gov/publications/identification-drivers-benefits-and',
    topics: ['energy'],
    gated: false,
  },
  {
    id: 'ag-demand-response-2019',
    title: 'Agricultural demand response for decarbonizing the electricity grid',
    authors: ['Aghajanzadeh, A.', 'Therkelsen, P.'],
    venue: 'Journal of Cleaner Production',
    type: 'journal',
    year: 2019,
    url: 'https://doi.org/10.1016/J.JCLEPRO.2019.02.207',
    topics: ['agriculture', 'energy'],
    featured: true,
    gated: false,
    related: [
      { label: 'Agriculture services', href: '/services/agriculture/' },
      { label: 'Energy services', href: '/services/energy/' },
    ],
  },
  {
    id: 'desalination-energy-2018',
    title:
      'Energy considerations associated with increased adoption of seawater desalination in the United States',
    authors: [
      'Rao, P.',
      'Morrow III, W.R.',
      'Aghajanzadeh, A.',
      'Sheaffer, P.',
      'Dollinger, C.',
      'Brueske, S.',
      'Cresko, J.',
    ],
    venue: 'Desalination, 445, 213–224',
    type: 'journal',
    year: 2018,
    url: 'https://doi.org/10.1016/j.desal.2018.08.014',
    topics: ['water', 'energy'],
    gated: false,
    related: [{ label: 'Water services', href: '/services/water/' }],
  },
  {
    id: 'iso-50001-climate-2017',
    title: 'Predicting the quantifiable impacts of ISO 50001 on climate change mitigation',
    authors: [
      'McKane, A.',
      'Therkelsen, P.',
      'Scodel, A.',
      'Rao, P.',
      'Aghajanzadeh, A.',
      'et al.',
    ],
    venue: 'Energy Policy',
    type: 'journal',
    year: 2017,
    url: 'https://doi.org/10.1016/j.enpol.2017.04.049',
    topics: ['energy'],
    featured: true,
    gated: false,
  },

  // ── Conference proceedings (host public PDF) ──────────────────────────────
  {
    id: 'accelerating-iso-50001-aceee-2018',
    title:
      'Accelerating the uptake of ISO 50001 in commercial buildings: two early adopters utilizing an "enterprise-wide" approach',
    authors: ['Liu, J.', 'Aghajanzadeh, A.', 'Sheaffer, P.', 'Therkelsen, P.', 'Allen, N.'],
    venue: '2018 ACEEE Summer Study on Energy Efficiency in Buildings',
    type: 'conference',
    year: 2018,
    url: 'https://eta.lbl.gov/publications/accelerating-uptake-iso-50001',
    topics: ['energy'],
    pdf: '/reports/accelerating-uptake-iso-50001-commercial-buildings.pdf',
    gated: false,
  },

  // ── Technical & government reports (LBNL / DOE — host public PDF) ──────────
  {
    id: 'cea-technology-catalog-2026',
    title: 'Technology Catalog for Controlled Environment Agriculture',
    authors: [
      'Aghajanzadeh, A.',
      'Schmick, R.',
      'Stokes-Draut, J.',
      'Carleton, B.',
      'Azzaretti, C.',
    ],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2026,
    url: 'https://eta.lbl.gov/publications/technology-catalog-controlled',
    topics: ['agriculture', 'energy'],
    pdf: '/reports/cea-technology-catalog.pdf',
    gated: false,
    related: [
      { label: 'Agriculture services', href: '/services/agriculture/' },
      { label: 'CEA case study', href: '/projects/' },
    ],
  },
  {
    id: 'water-energy-considerations-2019',
    title:
      "Water-Energy Considerations in California's Agricultural Sector and Opportunities to Provide Flexibility to California's Grid",
    authors: ['Aghajanzadeh, A.', 'Sohn, M.D.', 'Berger, M.A.', 'Bauer, D.J.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2019,
    url: 'https://eta.lbl.gov/publications/water-energy-considerations',
    topics: ['water', 'agriculture', 'energy'],
    pdf: '/reports/water-energy-considerations-ca-agriculture.pdf',
    gated: false,
    related: [
      { label: 'Water services', href: '/services/water/' },
      { label: 'Agriculture services', href: '/services/agriculture/' },
    ],
  },
  {
    id: 'opportunities-electricity-demand-2018',
    title: 'Opportunities for Electricity Demand Management in Irrigated Agriculture',
    authors: ['Aghajanzadeh, A.', 'English, M.', 'English, C.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2018,
    url: 'https://eta.lbl.gov/publications/opportunities-electricity-demand',
    topics: ['agriculture', 'energy'],
    pdf: '/reports/opportunities-electricity-demand-irrigated-ag.pdf',
    gated: false,
    related: [{ label: 'Agriculture services', href: '/services/agriculture/' }],
  },
  {
    id: 'using-industrys-own-words-2018',
    title:
      "Using Industry's Own Words to Evaluate ISO 50001 Energy Management Systems Adoption",
    authors: ['Fuchs, H.', 'Aghajanzadeh, A.', 'Therkelsen, P.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2018,
    url: 'https://eta.lbl.gov/publications/using-industry-s-own-words-evaluate',
    topics: ['energy'],
    pdf: '/reports/using-industrys-own-words-iso-50001.pdf',
    gated: false,
  },
  {
    id: 'automated-register-2017',
    title: 'Automated Register v1.0.3: User Manual',
    authors: [
      'Aghajanzadeh, A.',
      'McKane, A.T.',
      'Sheaffer, P.',
      'Therkelsen, P.',
      'Rao, P.',
    ],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2017,
    url: 'https://eta.lbl.gov/publications/automated-register-v102-user-manual-f',
    topics: ['energy'],
    pdf: '/reports/automated-register-user-manual.pdf',
    gated: false,
  },
  {
    id: 'dr-potential-sublaps-2017',
    title:
      'Demand Response Potential for California SubLAPs and Local Capacity Planning Areas (Addendum to 2025 CA DR Potential Study — Phase 2)',
    authors: ['Alstone, P.', 'Potter, J.', 'Piette, M.A.', 'et al. (incl. Aghajanzadeh, A.)'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2017,
    url: 'https://eta.lbl.gov/publications/demand-response-potential-california',
    topics: ['energy'],
    pdf: '/reports/dr-potential-sublaps-addendum.pdf',
    gated: false,
  },
  {
    id: '2025-ca-dr-phase2-2017',
    title: '2025 California Demand Response Potential Study — Phase 2 Final Report',
    authors: ['Alstone, P.', 'Potter, J.', 'Piette, M.A.', 'et al. (incl. Aghajanzadeh, A.)'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2017,
    url: 'https://eta.lbl.gov/publications/2025-california-demand-response',
    topics: ['energy'],
    pdf: '/reports/2025-ca-dr-potential-phase2.pdf',
    gated: false,
  },
  {
    id: 'energy-water-bandwidth-desalination-2016',
    title:
      'Survey of Available Information in Support of the Energy-Water Bandwidth Study of Desalination Systems (Vol. 1)',
    authors: ['Rao, P.', 'Aghajanzadeh, A.', 'Sheaffer, P.', 'et al.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2016,
    url: 'https://eta.lbl.gov/publications/volume-1-survey-of-available-informat',
    topics: ['water', 'energy'],
    pdf: '/reports/energy-water-bandwidth-desalination-vol1.pdf',
    gated: false,
    related: [{ label: 'Water services', href: '/services/water/' }],
  },
  {
    id: 'global-impact-iso-50001-2016',
    title:
      'Global Impact Estimation of ISO 50001 Energy Management System for Industrial and Service Sectors',
    authors: ['Aghajanzadeh, A.', 'Therkelsen, P.', 'Rao, P.', 'McKane, A.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2016,
    url: 'https://eta.lbl.gov/publications/global-impact-estimation-iso-50001',
    topics: ['energy'],
    pdf: '/reports/global-impact-estimation-iso-50001.pdf',
    gated: false,
  },
  {
    id: 'iso-50001-iet-guide-2016',
    title: 'The ISO 50001 Impact Estimator Tool (IET 50001 v1.1.4) — User Guide',
    authors: ['Therkelsen, P.', 'Rao, P.', 'Aghajanzadeh, A.', 'McKane, A.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2016,
    url: 'https://eta.lbl.gov/publications/iso-50001-impact-estimator-tool-iet',
    topics: ['energy'],
    pdf: '/reports/iso-50001-impact-estimator-tool-guide.pdf',
    gated: false,
  },
  {
    id: '2015-ca-dr-phase1-2016',
    title: '2015 California Demand Response Potential Study — Phase 1 Interim Report',
    authors: ['Alstone, P.', 'Potter, J.', 'Piette, M.A.', 'et al. (incl. Aghajanzadeh, A.)'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2016,
    url: 'https://eta.lbl.gov/publications/2015-california-demand-response',
    topics: ['energy'],
    pdf: '/reports/2015-ca-dr-potential-phase1.pdf',
    gated: false,
  },
  {
    id: 'drrc-final-report-2015',
    title: 'Demand Response Research Center — Final Report',
    authors: ['Piette, M.A.', 'Kiliccote, S.', 'Ghatikar, G.', 'et al. (incl. Aghajanzadeh, A.)'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2015,
    url: 'https://eta.lbl.gov/publications/demand-response-research-center-final',
    topics: ['energy'],
    pdf: '/reports/dr-research-center-final-report.pdf',
    gated: false,
  },
  {
    id: 'dr-research-summary-2006-2015',
    title:
      '2006–2015 Research Summary of Demand Response Potential in California Industry, Agriculture and Water Sectors',
    authors: ['Aghajanzadeh, A.', 'McKane, A.T.', 'Wray, C.P.', 'Therkelsen, P.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2015,
    url: 'https://eta.lbl.gov/publications/2006-2015-research-summary-demand',
    topics: ['energy', 'agriculture', 'water'],
    pdf: '/reports/2006-2015-dr-research-summary.pdf',
    gated: false,
  },
  {
    id: 'dr-quick-assessment-warehouses-2015',
    title:
      'Development and Validation of a Demand Response Quick Assessment Tool for Refrigerated Warehouses in California',
    authors: [
      'Yin, R.',
      'Aghajanzadeh, A.',
      'Zhang, R.',
      'McKane, A.',
      'Therkelsen, P.',
      'Hong, T.',
    ],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2015,
    url: 'https://eta.lbl.gov/publications/development-and-validation-demand',
    topics: ['energy', 'food-systems'],
    pdf: '/reports/dr-quick-assessment-refrigerated-warehouses.pdf',
    gated: false,
  },
  {
    id: 'adr-ca-agricultural-irrigation-2015',
    title: 'Opportunities for Automated Demand Response in California Agricultural Irrigation',
    authors: ['Olsen, D.', 'Aghajanzadeh, A.', 'McKane, A.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2015,
    url: 'https://eta.lbl.gov/publications/opportunities-automated-demand-0',
    topics: ['agriculture', 'energy'],
    pdf: '/reports/adr-ca-agricultural-irrigation.pdf',
    gated: false,
    related: [{ label: 'Agriculture services', href: '/services/agriculture/' }],
  },
  {
    id: 'adr-ca-wastewater-2015',
    title:
      'Opportunities for Automated Demand Response in California Wastewater Treatment Facilities',
    authors: ['Aghajanzadeh, A.', 'Wray, C.P.', 'McKane, A.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2015,
    url: 'https://eta.lbl.gov/publications/opportunities-for-automated-demand--2',
    topics: ['water', 'energy'],
    pdf: '/reports/adr-ca-wastewater-treatment.pdf',
    gated: false,
    related: [{ label: 'Water services', href: '/services/water/' }],
  },
  {
    id: 'adr-ca-dairy-processing-2015',
    title:
      "Opportunities for Automated Demand Response in California's Dairy Processing Industry",
    authors: ['Homan, G.K.', 'Aghajanzadeh, A.', 'McKane, A.'],
    venue: 'Lawrence Berkeley National Laboratory',
    type: 'report',
    year: 2015,
    url: 'https://eta.lbl.gov/publications/opportunities-automated-demand-3',
    topics: ['food-systems', 'energy'],
    pdf: '/reports/adr-ca-dairy-processing.pdf',
    gated: false,
  },

  // ── Interactive tools & data (KC-owned linkable assets) ───────────────────
  {
    id: 'tool-ca-water-dashboard',
    title: 'California Water Dashboard',
    authors: ['Aghajanzadeh, A.'],
    venue: 'Klimate Consulting Data Labs',
    type: 'tool',
    year: 2026,
    url: 'https://data.klimateconsulting.com/ca-water/',
    topics: ['water'],
    gated: false,
    related: [{ label: 'Water services', href: '/services/water/' }],
  },
  {
    id: 'tool-enms',
    title: 'Energy Management (ENMS) Dashboard',
    authors: ['Aghajanzadeh, A.'],
    venue: 'Klimate Consulting Data Labs',
    type: 'tool',
    year: 2025,
    url: 'https://data.klimateconsulting.com/enms/',
    topics: ['energy'],
    gated: false,
    related: [{ label: 'Energy services', href: '/services/energy/' }],
  },
  {
    id: 'tool-microirrigation',
    title: 'The Microirrigation Energy Paradox (interactive)',
    authors: ['Aghajanzadeh, A.'],
    venue: 'Klimate Consulting',
    type: 'tool',
    year: 2026,
    date: '2026-04-17',
    url: '/blog-posts/microirrigation/',
    topics: ['agriculture', 'water'],
    gated: false,
    related: [{ label: 'Agriculture services', href: '/services/agriculture/' }],
  },
  {
    id: 'tool-sargassum',
    title: 'The Golden Tide: Sargassum Tracker (interactive)',
    authors: ['Aghajanzadeh, A.'],
    venue: 'Klimate Consulting',
    type: 'tool',
    year: 2026,
    date: '2026-06-12',
    url: '/blog-posts/sargassum/',
    topics: ['ecosystem'],
    gated: false,
  },
  {
    id: 'tool-price-of-water',
    title: 'The Price of Water in California (interactive)',
    authors: ['Aghajanzadeh, A.'],
    venue: 'Klimate Consulting',
    type: 'tool',
    year: 2026,
    date: '2026-06-22',
    url: '/blog-posts/price-of-water/',
    topics: ['water'],
    gated: false,
    related: [{ label: 'Water services', href: '/services/water/' }],
  },
]

export const typeLabels: Record<PublicationType, string> = {
  journal: 'Peer-Reviewed Journal Articles',
  conference: 'Conference Proceedings',
  report: 'Technical & Government Reports',
  tool: 'Interactive Tools & Data',
  talk: 'Presentations & Talks',
}

// Fixed display order of the sections.
export const typeOrder: PublicationType[] = ['journal', 'conference', 'report', 'tool', 'talk']
