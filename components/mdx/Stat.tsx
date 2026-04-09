interface StatProps {
  value: string
  label: string
}

export default function Stat({ value, label }: StatProps) {
  return (
    <div className="my-8 text-center not-prose">
      <div className="font-heading text-5xl md:text-6xl font-bold text-kc-blue mb-2">
        {value}
      </div>
      <div className="font-body text-sm text-kc-text-secondary dark:text-gray-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}
