/**
 * Shared sector metadata — the single source of truth for the 4 focus areas.
 * Keys match the `sector` value in project/insight MDX frontmatter.
 *
 * Used by cards, list rows, filter chips, sector pages, and badges so accent
 * colors stay consistent everywhere. Edit a label or color once, here.
 */
export type SectorKey =
  | 'water'
  | 'energy'
  | 'agriculture'
  | 'food-systems'
  | 'ecosystem'

export interface SectorMeta {
  key: SectorKey
  label: string
  /** Accent hex — card top rules, left borders, active states. */
  color: string
  /** Contrast-safe version of the accent when used as text. */
  textColor: string
  /** Faint tint used for list-row hover backgrounds. */
  tint: string
  /** Color-icon path in /public/icons. */
  icon: string
}

export const SECTORS: Record<SectorKey, SectorMeta> = {
  water: {
    key: 'water',
    label: 'Water',
    color: '#0F4C81',
    textColor: '#0F4C81',
    tint: '#F0F5F9',
    icon: '/icons/water-color.png',
  },
  energy: {
    key: 'energy',
    label: 'Energy',
    color: '#FFAD05',
    textColor: '#d18d00',
    tint: '#FDF8EC',
    icon: '/icons/energy-color.png',
  },
  agriculture: {
    key: 'agriculture',
    label: 'Agriculture',
    color: '#70A288',
    textColor: '#4f7a63',
    tint: '#F2F7F4',
    icon: '/icons/agriculture-color.png',
  },
  'food-systems': {
    key: 'food-systems',
    label: 'Food Systems',
    color: '#220C10',
    textColor: '#220C10',
    tint: '#F6F2F3',
    icon: '/icons/food-color.png',
  },
  // Topic tag only (not one of the 4 focus areas / SECTOR_ORDER). Used by the
  // Sargassum insight. Green per the design mock.
  ecosystem: {
    key: 'ecosystem',
    label: 'Ecosystems',
    color: '#70A288',
    textColor: '#4f7a63',
    tint: '#F2F7F4',
    icon: '/icons/agriculture-color.png',
  },
}

/** Ordered list (Water · Energy · Agriculture · Food Systems). */
export const SECTOR_ORDER: SectorKey[] = [
  'water',
  'energy',
  'agriculture',
  'food-systems',
]

/** Safe lookup that tolerates unknown/legacy sector strings. */
export function getSector(key?: string): SectorMeta {
  if (key && key in SECTORS) return SECTORS[key as SectorKey]
  return SECTORS.water
}
