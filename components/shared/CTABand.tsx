import Button from '@/components/shared/Button'
import SectorStripe from '@/components/shared/SectorStripe'

/**
 * CTABand — the full-width blue call-to-action band that closes most pages.
 * Blue (#0F4C81) background with the light sector stripe on its top edge,
 * heading + optional subline on the left, yellow CTA button on the right.
 *
 * Copy is passed via props so it stays trivially editable per page.
 */
export default function CTABand({
  heading = 'Ready to work together?',
  subline = "Bring us your hardest question — applied research, technical analysis, or strategic guidance. We'll show you how fast rigorous can be.",
  buttonLabel = 'Start a conversation',
  href = '/contact/',
}: {
  heading?: string
  subline?: string
  buttonLabel?: string
  href?: string
}) {
  return (
    <section className="relative overflow-hidden bg-kc-blue">
      <SectorStripe variant="light" className="absolute top-0 left-0 right-0" />
      <div className="mx-auto max-w-[1240px] px-8 py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div>
          <h2 className="font-heading text-[42px] leading-tight font-semibold text-white m-0 tracking-[-0.02em]">
            {heading}
          </h2>
          {subline && (
            <p className="font-body text-base leading-[1.75] text-kc-light-blue mt-4 max-w-[540px]">
              {subline}
            </p>
          )}
        </div>
        <Button href={href} variant="cta" className="shrink-0 !px-[38px] !py-[17px]">
          {buttonLabel}
        </Button>
      </div>
    </section>
  )
}
