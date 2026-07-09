interface StatProps {
  value: string
  label: string
}

/**
 * Stat — a single grey tile: 30px blue number + 12px label.
 * Designed to sit in a 3-up row; place three <Stat> side by side in MDX,
 * e.g. wrap them in <div className="grid grid-cols-3 gap-4">…</div>.
 */
export default function Stat({ value, label }: StatProps) {
  return (
    <div className="not-prose my-8 rounded-md bg-kc-bg-grey px-6 py-[22px] text-center">
      <div className="font-heading text-[30px] font-semibold leading-none text-kc-blue">
        {value}
      </div>
      <div className="mt-1.5 font-body text-[12px] leading-[1.5] text-kc-text-secondary">
        {label}
      </div>
    </div>
  )
}
