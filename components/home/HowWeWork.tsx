import Kicker from '@/components/shared/Kicker'
import FadeIn from '@/components/shared/FadeIn'

// New section — "How we work". Three principle cards with colored top rules.
const CARDS = [
  {
    n: '01',
    color: '#0F4C81',
    title: 'Rigor first',
    body: 'We rely solely on credible scientific literature and primary data. We do the research ourselves — and we stand by our results. Every claim is sourced, every number traceable — analysis you can put in front of a review board.',
  },
  {
    n: '02',
    color: '#FFAD05',
    title: 'AI, used properly',
    body: 'We build AI-assisted pipelines that read more literature and process more data than any manual team — with expert verification at every step, so speed never costs accuracy.',
  },
  {
    n: '03',
    color: '#70A288',
    title: 'Lean by design',
    body: 'No leverage pyramid, no pass-through layers. You work directly with the senior researchers doing the analysis — and get answers in days or weeks, not quarters.',
  },
]

export default function HowWeWork() {
  return (
    <section className="bg-kc-bg">
      <div className="mx-auto max-w-[1240px] px-8 pt-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-8 lg:gap-[72px] mb-16">
          <div>
            <Kicker className="mb-4">How we work</Kicker>
            <h2 className="font-heading text-[40px] leading-[1.12] font-semibold tracking-[-0.02em] text-kc-dark m-0">
              A different kind
              <br />
              of research firm.
            </h2>
          </div>
          <p className="font-body text-base leading-[1.8] text-kc-text-lead m-0 self-end max-w-[560px]">
            Most consultancies scale by adding junior staff. We scale with AI —
            kept honest by senior researchers who know exactly where it breaks.
            The result: more ground covered, fewer errors, faster delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {CARDS.map((c, i) => (
            <FadeIn key={c.n} delay={i * 0.1}>
              <div
                className="bg-white border border-kc-border rounded-md px-8 pt-9 pb-9 h-full"
                style={{ borderTop: `3px solid ${c.color}` }}
              >
                <div className="font-heading text-[15px] font-medium text-kc-text-muted mb-[18px]">
                  {c.n}
                </div>
                <h3 className="font-heading text-[21px] font-semibold tracking-[-0.01em] text-kc-dark m-0 mb-3.5">
                  {c.title}
                </h3>
                <p className="font-body text-sm leading-[1.75] text-kc-text-secondary m-0">
                  {c.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
