interface SectionHeaderProps {
  title: string
  subtitle?: string
  light?: boolean
  centered?: boolean
}

export default function SectionHeader({ title, subtitle, light, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2
        className={`font-heading text-3xl md:text-4xl font-bold mb-4 ${
          light ? 'text-white' : 'text-kc-dark dark:text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-gray-300' : 'text-kc-text-secondary dark:text-gray-400'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
