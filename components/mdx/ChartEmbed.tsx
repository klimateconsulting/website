import Image from 'next/image'

interface ChartEmbedProps {
  src: string
  alt: string
  caption?: string
}

export default function ChartEmbed({ src, alt, caption }: ChartEmbedProps) {
  return (
    <figure className="my-8 not-prose">
      <div className="max-w-2xl mx-auto">
        {/* Source: klimate-owned */}
        <Image
          src={src}
          alt={alt}
          width={800}
          height={500}
          className="w-full h-auto rounded-lg"
        />
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-kc-text-secondary dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  )
}
