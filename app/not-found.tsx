import type { Metadata } from 'next'
import Button from '@/components/shared/Button'

// Rendered inside the root layout, so the site header + footer wrap this
// automatically. Static export emits it as out/404.html, which GitHub Pages
// serves for unknown paths.
export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <section className="bg-kc-bg">
      <div className="mx-auto flex min-h-[60vh] max-w-[760px] flex-col items-center justify-center px-8 py-24 text-center">
        <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.14em] text-kc-blue">
          Error 404
        </p>
        <h1 className="m-0 mb-5 font-heading text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-kc-dark md:text-[52px]">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="m-0 mb-9 max-w-[520px] font-body text-[17px] leading-[1.7] text-kc-text-lead">
          The page you&rsquo;re looking for may have moved or never existed. Head back
          home, or browse our latest research.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/insights/" variant="outline">
            Read our insights
          </Button>
        </div>
      </div>
    </section>
  )
}
