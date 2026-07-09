'use client'

import { useState, useEffect } from 'react'
import Kicker from '@/components/shared/Kicker'
import FadeIn from '@/components/shared/FadeIn'

// ── Contact form backend config ────────────────────────────────────────────
// Both values below are public (the site key is meant to be exposed, and the
// Apps Script URL is called directly from the browser). The Turnstile SECRET
// key lives only inside the Apps Script — never here.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyCxrHSbGzCdJTw4Qrcu-Lgg3XgVsycjYKw74pEVEi1TiknjHJnOb5ZMmgahMqgvw/exec'
const TURNSTILE_SITE_KEY = '0x4AAAAAADp4ma2CwHgvVDoK'
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

// ── Editable copy ───────────────────────────────────────────────────────────
const PAGE_HEADER = {
  kicker: 'Contact',
  title: "Let's work together.",
  intro:
    "Whether you have a specific project in mind or want to explore what's possible, we'd love to hear from you.",
}

const EMAIL_ADDRESS = 'hello@klimateconsulting.com'
const LINKEDIN_URL = 'https://www.linkedin.com/company/klimate-consulting/'
const LINKEDIN_LABEL = 'Klimate Consulting'
const LOCATION = 'San Francisco, CA'
const RESPONSE_TIME_COPY = 'We reply to every serious inquiry within two business days.'
const MESSAGE_PLACEHOLDER = 'What are you trying to figure out?'

const SUCCESS_COPY = {
  heading: 'Thank you!',
  body: "We've received your message and will be in touch soon.",
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// Shared input styling — light theme, 4px radius, hairline border.
const inputClasses =
  'w-full px-4 py-[14px] rounded border-[1.5px] border-kc-divider bg-white text-kc-dark font-body text-sm outline-none focus:border-kc-blue transition-colors'
const labelClasses = 'block font-body text-[13px] font-semibold text-kc-dark mb-2'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Load the Cloudflare Turnstile script once. It auto-renders any element
  // with the `cf-turnstile` class and injects a hidden `cf-turnstile-response`
  // input into the surrounding form.
  useEffect(() => {
    if (document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)) return
    const s = document.createElement('script')
    s.src = TURNSTILE_SCRIPT
    s.async = true
    s.defer = true
    document.head.appendChild(s)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)

    // Require a Turnstile token before sending.
    if (!data.get('cf-turnstile-response')) {
      setError('Please complete the verification below.')
      return
    }

    setSubmitting(true)
    try {
      // Static site → no server, so we POST straight to the Apps Script web
      // app. Its response can't be read cross-origin (no CORS headers from
      // Apps Script), so we use no-cors and treat a resolved request as sent.
      await fetch(SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' })
      setSubmitted(true)
    } catch {
      setError('Something went wrong sending your message. Please email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-20 bg-kc-bg">
      {/* Page header */}
      <section className="bg-kc-bg border-b border-kc-border">
        <div className="mx-auto max-w-[1240px] px-8 pt-16 pb-16 md:pt-[88px] md:pb-16">
          <FadeIn>
            <Kicker className="mb-6">{PAGE_HEADER.kicker}</Kicker>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-[72px] items-end">
              <h1 className="font-heading font-semibold text-[36px] sm:text-[44px] lg:text-[56px] leading-[1.08] tracking-[-0.02em] text-kc-dark m-0">
                {PAGE_HEADER.title}
              </h1>
              <p className="font-body text-base leading-[1.8] text-kc-text-lead m-0">
                {PAGE_HEADER.intro}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-kc-bg">
        <div className="mx-auto max-w-[1240px] px-8 py-16 md:py-20 lg:py-[80px] lg:pb-[110px] grid grid-cols-1 lg:grid-cols-[7fr_4fr] gap-16 lg:gap-24">
          {/* Form */}
          <FadeIn>
            {submitted ? (
              <div className="bg-kc-bg-blue rounded-md p-10 text-center">
                <h3 className="font-heading text-2xl font-semibold text-kc-dark mb-3">
                  {SUCCESS_COPY.heading}
                </h3>
                <p className="font-body text-kc-text-secondary">{SUCCESS_COPY.body}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>First name</label>
                    <input type="text" name="firstName" required className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Last name</label>
                    <input type="text" name="lastName" required className={inputClasses} />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Email</label>
                  <input type="email" name="email" required className={inputClasses} />
                </div>

                <div>
                  <label className={labelClasses}>Organization</label>
                  <input type="text" name="organization" className={inputClasses} />
                </div>

                <div>
                  <label className={labelClasses}>Area of interest</label>
                  <select name="interest" className={inputClasses}>
                    <option value="">Select an area...</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="energy">Energy</option>
                    <option value="water">Water</option>
                    <option value="food-systems">Food Systems</option>
                    <option value="data-labs">Data Labs</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    placeholder={MESSAGE_PLACEHOLDER}
                    className={`${inputClasses} resize-y leading-[1.6]`}
                  />
                </div>

                {/* Cloudflare Turnstile — auto-rendered by the script above */}
                <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />

                {error && (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center font-body font-semibold text-sm tracking-[0.02em] text-white bg-kc-blue hover:bg-kc-blue-dark px-8 py-[15px] rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending…' : 'Send message'}
                  </button>

                  <p className="font-body text-[13px] text-kc-text-muted mt-4">
                    Or email us directly at{' '}
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      className="font-semibold text-kc-blue hover:text-kc-blue-dark"
                    >
                      {EMAIL_ADDRESS}
                    </a>
                  </p>
                </div>
              </form>
            )}
          </FadeIn>

          {/* Info cards */}
          <FadeIn delay={0.1} className="flex flex-col gap-5 lg:self-start">
            <div className="bg-kc-bg-grey rounded-md p-7">
              <div className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted mb-2">
                Email
              </div>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="font-heading text-base font-medium text-kc-blue hover:text-kc-blue-dark"
              >
                {EMAIL_ADDRESS}
              </a>
            </div>

            <div className="bg-kc-bg-grey rounded-md p-7">
              <div className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted mb-2">
                Location
              </div>
              <div className="font-heading text-base font-medium text-kc-dark">{LOCATION}</div>
            </div>

            <div className="bg-kc-bg-grey rounded-md p-7">
              <div className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-text-muted mb-2">
                LinkedIn
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-heading text-base font-medium text-kc-blue hover:text-kc-blue-dark"
              >
                <LinkedinIcon className="w-4 h-4" />
                {LINKEDIN_LABEL}
              </a>
            </div>

            <div className="bg-kc-bg-blue rounded-md p-7">
              <div className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-kc-blue mb-2">
                Response time
              </div>
              <div className="font-body text-sm leading-[1.7] text-[#2c4046]">
                {RESPONSE_TIME_COPY}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
