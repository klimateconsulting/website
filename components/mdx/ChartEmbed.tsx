import Image from 'next/image'

interface ChartEmbedProps {
  /** Header title (falls back to `alt`). */
  title?: string
  /** Small muted source note shown on the right of the header. */
  source?: string
  /** Optional chart image. When omitted, a striped placeholder embed area renders. */
  src?: string
  alt?: string
  caption?: string
}

/**
 * ChartEmbed — white card with a title/source header and an embed area.
 * Pass `src` to render a static chart image, or leave it out for a striped
 * placeholder (used where an interactive chart/map is embedded separately).
 */
export default function ChartEmbed({
  title,
  source,
  src,
  alt,
  caption,
}: ChartEmbedProps) {
  const heading = title ?? alt

  return (
    <figure className="not-prose my-10">
      <div className="rounded-md border border-kc-border bg-white px-7 py-6">
        {(heading || source) && (
          <div className="mb-4 flex items-baseline justify-between gap-4">
            {heading && (
              <div className="font-heading text-[15px] font-semibold text-kc-dark">
                {heading}
              </div>
            )}
            {source && (
              <span className="shrink-0 font-body text-[11px] text-kc-text-muted">
                {source}
              </span>
            )}
          </div>
        )}

        {src ? (
          <div className="overflow-hidden rounded">
            {/* Source: klimate-owned */}
            <Image
              src={src}
              alt={alt ?? heading ?? ''}
              width={800}
              height={500}
              className="h-auto w-full"
            />
          </div>
        ) : (
          <div
            className="flex h-[320px] items-center justify-center rounded"
            style={{
              background:
                'repeating-linear-gradient(-45deg, #EFF3F7, #EFF3F7 12px, #F7FAFC 12px, #F7FAFC 24px)',
            }}
          >
            <span className="font-mono text-[13px] text-kc-text-muted">
              [ interactive chart ]
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-body text-[12px] text-kc-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
