/**
 * SectorStripe — the signature 4-color brand motif.
 * A 3px-tall strip of 4 equal segments. Appears at the bottom edge of the
 * sticky header, the top edge of the blue CTA band (light variant), the footer
 * bottom-right (mini variant), and under team photos.
 *
 * Variants:
 *   - default: #0F4C81 · #70A288 · #FFAD05 · #220C10  (full-bleed, 3px)
 *   - light:   #D3EBFB · #70A288 · #FFAD05 · #C3D2DF  (over blue backgrounds)
 *   - mini:    default colors, 4 × 28px fixed segments (footer accent)
 */

type Variant = 'default' | 'light' | 'mini'

const COLORS: Record<Exclude<Variant, 'mini'>, [string, string, string, string]> = {
  default: ['#0F4C81', '#70A288', '#FFAD05', '#220C10'],
  light: ['#D3EBFB', '#70A288', '#FFAD05', '#C3D2DF'],
}

export default function SectorStripe({
  variant = 'default',
  className = '',
}: {
  variant?: Variant
  className?: string
}) {
  const colors = variant === 'mini' ? COLORS.default : COLORS[variant]

  if (variant === 'mini') {
    return (
      <div
        className={`grid h-[3px] ${className}`}
        style={{ gridTemplateColumns: 'repeat(4, 28px)' }}
        aria-hidden="true"
      >
        {colors.map((c, i) => (
          <div key={i} style={{ background: c }} />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-4 h-[3px] ${className}`}
      aria-hidden="true"
    >
      {colors.map((c, i) => (
        <div key={i} style={{ background: c }} />
      ))}
    </div>
  )
}
