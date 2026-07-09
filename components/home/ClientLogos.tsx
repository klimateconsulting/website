// Client bar — "Trusted by" + client names. Wordmarks in Space Grotesk 600
// (no logo lockups exist for these; names read as a quiet trust bar).
const CLIENTS = [
  'Lawrence Berkeley National Laboratory',
  'NRDC',
  'UC Davis',
  'Ceres',
  'Carba',
  'Scale Microgrid Solutions',
]

export default function ClientLogos() {
  return (
    <section className="bg-white border-y border-kc-border">
      <div className="mx-auto max-w-[1240px] px-8 py-[30px] flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-kc-text-muted whitespace-nowrap">
          Trusted by
        </span>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 md:flex-1 md:justify-between">
          {CLIENTS.map((c) => (
            <span
              key={c}
              className="font-heading text-sm font-semibold text-kc-text-lead"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
