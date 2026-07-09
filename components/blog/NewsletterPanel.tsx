'use client'

/**
 * NewsletterPanel — the "Get new analysis in your inbox" capture.
 *
 * There is no newsletter backend yet, so the input + button UI is gated behind
 * NEWSLETTER_ENABLED. Flip it to `true` (and wire the form) to go live.
 *
 * variant="strip"  → full-width grey band (insights list)
 * variant="panel"  → blue rounded panel (blog post footer)
 */
export const NEWSLETTER_ENABLED = false

const HEADING = 'Get new analysis in your inbox'
const SUBLINE_STRIP =
  'Occasional, citable research on water, energy, and agriculture. No noise.'
const SUBLINE_PANEL = 'Occasional, citable research. No noise.'

function Form({ compact = false }: { compact?: boolean }) {
  return (
    <form
      className="flex shrink-0 flex-wrap gap-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="you@organization.org"
        aria-label="Email address"
        className={`min-w-0 flex-1 rounded border-[1.5px] border-kc-divider bg-white font-body text-[14px] text-kc-dark outline-none focus:border-kc-blue ${
          compact ? 'px-[18px] py-[13px] sm:w-[240px]' : 'px-5 py-[14px] sm:w-[280px]'
        }`}
      />
      <button
        type="submit"
        className={`rounded bg-kc-blue font-body font-semibold text-white transition-colors hover:bg-kc-blue-dark ${
          compact ? 'px-6 py-[13px] text-[13.5px]' : 'px-7 py-[14px] text-[14px]'
        }`}
      >
        Subscribe
      </button>
    </form>
  )
}

export default function NewsletterPanel({
  variant = 'strip',
}: {
  variant?: 'strip' | 'panel'
}) {
  if (variant === 'panel') {
    return (
      <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-kc-bg-blue px-8 py-9 md:flex-row md:items-center md:px-10">
        <div>
          <div className="mb-1.5 font-heading text-[21px] font-semibold tracking-[-0.015em] text-kc-dark">
            {HEADING}
          </div>
          <p className="m-0 font-body text-[13.5px] text-[#2c4046]">{SUBLINE_PANEL}</p>
        </div>
        {NEWSLETTER_ENABLED ? (
          <Form compact />
        ) : (
          <span className="font-body text-[12.5px] font-medium text-kc-blue">
            Coming soon
          </span>
        )}
      </div>
    )
  }

  return (
    <section className="border-t border-kc-border bg-kc-bg-grey">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-8 py-[72px] md:flex-row md:items-center md:gap-16">
        <div>
          <h2 className="mb-2.5 font-heading text-[30px] font-semibold tracking-[-0.015em] text-kc-dark">
            {HEADING}
          </h2>
          <p className="m-0 font-body text-[14.5px] text-kc-text-secondary">
            {SUBLINE_STRIP}
          </p>
        </div>
        {NEWSLETTER_ENABLED ? (
          <Form />
        ) : (
          <span className="font-body text-[13px] font-medium text-kc-text-muted">
            Coming soon
          </span>
        )}
      </div>
    </section>
  )
}
