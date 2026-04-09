import Button from '@/components/shared/Button'

export default function CTAStrip() {
  return (
    <section className="py-20 md:py-28 bg-kc-blue">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to work together?
        </h2>
        <p className="font-body text-lg text-blue-100 max-w-xl mx-auto mb-8">
          Whether you need applied research, technical analysis, or strategic guidance — we&apos;re
          ready to help.
        </p>
        <Button href="/contact/" variant="white">
          Start a Conversation
        </Button>
      </div>
    </section>
  )
}
