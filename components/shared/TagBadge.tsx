const sectorColors: Record<string, string> = {
  agriculture: 'bg-kc-light-green text-kc-green dark:bg-kc-green/20 dark:text-kc-green',
  energy: 'bg-kc-light-yellow text-kc-brown dark:bg-kc-yellow/20 dark:text-kc-yellow',
  water: 'bg-kc-light-blue text-kc-blue dark:bg-kc-blue/20 dark:text-kc-light-blue',
  'food-systems': 'bg-kc-light-brown text-kc-brown dark:bg-kc-brown/20 dark:text-kc-light-brown',
}

export default function TagBadge({ sector }: { sector: string }) {
  const label = sector === 'food-systems' ? 'Food Systems' : sector.charAt(0).toUpperCase() + sector.slice(1)
  return (
    <span
      className={`inline-block text-xs font-semibold font-body px-2.5 py-1 rounded-full ${
        sectorColors[sector] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
      }`}
    >
      {label}
    </span>
  )
}
