/**
 * Kicker — the eyebrow label pattern used above section headings:
 * a 28×2px accent dash + an uppercase, wide-tracked label.
 *
 * `accent` sets the dash color (default Energy Yellow). Over blue panels
 * (Data Labs), pass accent="#0F4C81" and color="#0F4C81".
 */
export default function Kicker({
  children,
  accent = '#FFAD05',
  color = '#5a6a6e',
  className = '',
}: {
  children: React.ReactNode
  accent?: string
  color?: string
  className?: string
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className="block h-[2px] w-7 shrink-0"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <span
        className="font-body text-xs font-semibold uppercase"
        style={{ letterSpacing: '0.18em', color }}
      >
        {children}
      </span>
    </div>
  )
}
