import Link from 'next/link'

interface ButtonProps {
  href: string
  /**
   * primary — blue bg / white text (default)
   * cta     — yellow bg / dark text (used in CTA bands)
   * outline — 1.5px light-blue border / blue text
   */
  variant?: 'primary' | 'cta' | 'outline'
  external?: boolean
  children: React.ReactNode
  className?: string
}

const base =
  'inline-flex items-center justify-center font-body font-semibold text-sm rounded transition-colors duration-200'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-kc-blue text-white hover:bg-kc-blue-dark px-8 py-[15px]',
  cta: 'bg-kc-yellow text-kc-dark hover:bg-kc-yellow-hover px-8 py-[15px]',
  outline:
    'border-[1.5px] border-kc-light-blue text-kc-blue hover:border-kc-blue px-8 py-[14px]',
}

export default function Button({
  href,
  variant = 'primary',
  external,
  children,
  className = '',
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
