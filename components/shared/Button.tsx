import Link from 'next/link'

interface ButtonProps {
  href: string
  variant?: 'primary' | 'secondary' | 'white' | 'outline-white'
  external?: boolean
  children: React.ReactNode
  className?: string
}

export default function Button({
  href,
  variant = 'primary',
  external,
  children,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-body font-semibold text-sm px-7 py-3 rounded-md transition-all duration-200 hover:scale-[1.02]'

  const variants = {
    primary: 'bg-kc-blue text-white hover:bg-kc-blue-dark',
    secondary: 'border-2 border-kc-blue text-kc-blue hover:bg-kc-blue hover:text-white',
    white: 'bg-white text-kc-blue hover:bg-gray-100',
    'outline-white': 'border-2 border-white text-white hover:bg-white/10',
  }

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
