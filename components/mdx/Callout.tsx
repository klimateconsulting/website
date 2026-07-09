interface CalloutProps {
  /** Kept for backward compatibility; drives the default label when `label` is absent. */
  type?: 'note' | 'warning' | 'insight' | 'data'
  /** Uppercase blue eyebrow shown above the body. */
  label?: string
  children: React.ReactNode
}

const defaultLabels: Record<NonNullable<CalloutProps['type']>, string> = {
  note: 'Note',
  warning: 'Take note',
  insight: 'Worth knowing',
  data: 'By the numbers',
}

export default function Callout({ type = 'note', label, children }: CalloutProps) {
  return (
    <div className="not-prose my-10 rounded-md bg-kc-bg-blue px-[30px] py-[26px]">
      <div className="mb-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-blue">
        {label ?? defaultLabels[type]}
      </div>
      <div className="font-body text-[14.5px] leading-[1.7] text-[#2c4046] [&_a]:font-semibold [&_a]:text-kc-blue">
        {children}
      </div>
    </div>
  )
}
