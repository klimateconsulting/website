'use client'

import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="pt-20">
      <section className="py-20 md:py-28 bg-kc-dark text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s Work Together
          </h1>
          <p className="font-body text-lg text-gray-300 max-w-2xl mx-auto">
            Whether you have a specific project in mind or want to explore how Klimate can help your
            organization meet its sustainability goals, we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-kc-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-kc-light-green dark:bg-kc-green/10 rounded-xl p-8 text-center">
                  <h3 className="font-heading text-2xl font-bold text-kc-dark dark:text-white mb-3">
                    Thank you!
                  </h3>
                  <p className="font-body text-kc-text-secondary dark:text-gray-400">
                    We&apos;ve received your message and will be in touch soon.
                  </p>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/hello@klimateconsulting.com"
                  method="POST"
                  onSubmit={() => setSubmitted(true)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark-card text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark-card text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark-card text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark-card text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-2">
                      Area of Interest
                    </label>
                    <select
                      name="interest"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark-card text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
                    >
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
                    <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark-card text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue resize-vertical"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-kc-blue text-white font-body font-semibold text-sm px-8 py-3 rounded-md hover:bg-kc-blue-dark transition-colors hover:scale-[1.02]"
                  >
                    Send Message
                  </button>

                  <p className="text-sm text-kc-text-secondary dark:text-gray-300 mt-4">
                    Or email us directly at{' '}
                    <a
                      href="mailto:hello@klimateconsulting.com"
                      className="text-kc-blue dark:text-kc-light-blue hover:underline"
                    >
                      hello@klimateconsulting.com
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-kc-blue mt-0.5" />
                <div>
                  <h4 className="font-body text-sm font-semibold text-kc-dark dark:text-white">Email</h4>
                  <a
                    href="mailto:hello@klimateconsulting.com"
                    className="text-sm text-kc-text-secondary dark:text-gray-400 hover:text-kc-blue"
                  >
                    hello@klimateconsulting.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-kc-blue mt-0.5" />
                <div>
                  <h4 className="font-body text-sm font-semibold text-kc-dark dark:text-white">Location</h4>
                  <p className="text-sm text-kc-text-secondary dark:text-gray-400">
                    San Francisco, CA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <LinkedinIcon className="w-5 h-5 text-kc-blue mt-0.5" />
                <div>
                  <h4 className="font-body text-sm font-semibold text-kc-dark dark:text-white">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/company/klimate-consulting/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-kc-text-secondary dark:text-gray-400 hover:text-kc-blue"
                  >
                    Klimate Consulting
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
