import { AlertCircle, Lightbulb, BarChart3, AlertTriangle } from 'lucide-react'

interface CalloutProps {
  type?: 'note' | 'warning' | 'insight' | 'data'
  children: React.ReactNode
}

const config = {
  note: {
    icon: AlertCircle,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-500',
  },
  insight: {
    icon: Lightbulb,
    bg: 'bg-kc-bg-blue dark:bg-kc-blue/10',
    border: 'border-kc-light-blue dark:border-kc-blue/30',
    iconColor: 'text-kc-blue',
  },
  data: {
    icon: BarChart3,
    bg: 'bg-kc-light-green dark:bg-kc-green/10',
    border: 'border-kc-green/30 dark:border-kc-green/30',
    iconColor: 'text-kc-green',
  },
}

export default function Callout({ type = 'note', children }: CalloutProps) {
  const { icon: Icon, bg, border, iconColor } = config[type]

  return (
    <div className={`${bg} ${border} border rounded-lg p-5 my-6 not-prose`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="text-sm font-body text-kc-dark dark:text-gray-200 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
