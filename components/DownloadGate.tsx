'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

// Same Apps Script endpoint the contact form posts to, but supplied via env so
// it isn't hard-coded here. When NEXT_PUBLIC_FORMS_ENDPOINT is unset the gate is
// never opened (the /research download button links straight to the PDF), so a
// missing endpoint can't strand a download.
const FORMS_ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT

export const UNLOCK_KEY = 'kc_download_unlocked'

export interface DownloadGateProps {
  reportTitle: string
  /** Path under /reports/, e.g. "/reports/foo.pdf" */
  reportFile: string
  onClose: () => void
}

function startDownload(reportFile: string) {
  const a = document.createElement('a')
  a.href = reportFile
  a.download = reportFile.split('/').pop() || ''
  a.target = '_blank'
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function DownloadGate({ reportTitle, reportFile, onClose }: DownloadGateProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)

    if (!data.get('consent')) {
      setError('Please agree to be contacted so we can send you the report.')
      return
    }

    // Carry the report metadata + routing field alongside the user's info.
    data.set('formType', 'download')
    data.set('reportTitle', reportTitle)
    data.set('reportFile', reportFile)
    data.set('pageUrl', typeof window !== 'undefined' ? window.location.href : '')

    setSubmitting(true)
    try {
      // Static site → POST straight to the Apps Script web app. Its response
      // can't be read cross-origin (no CORS), so we use no-cors and treat a
      // resolved request as sent — same mechanism as the contact form.
      if (FORMS_ENDPOINT) {
        await fetch(FORMS_ENDPOINT, { method: 'POST', body: data, mode: 'no-cors' })
      }
      try {
        localStorage.setItem(UNLOCK_KEY, '1')
      } catch {
        /* private mode — ignore */
      }
      startDownload(reportFile)
      onClose()
    } catch {
      setError('Something went wrong. Please email us and we’ll send it directly.')
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-gate-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white dark:bg-kc-dark-card p-6 md:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-kc-text-secondary dark:text-gray-400 hover:text-kc-dark dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3
          id="download-gate-title"
          className="font-heading text-xl font-bold text-kc-dark dark:text-white pr-8 mb-1"
        >
          Download the report
        </h3>
        <p className="font-body text-sm text-kc-text-secondary dark:text-gray-300 mb-5">
          {reportTitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-1.5">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-semibold text-kc-dark dark:text-white mb-1.5">
              Organization
            </label>
            <input
              type="text"
              name="organization"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-kc-dark text-kc-dark dark:text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-kc-blue"
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              value="yes"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-kc-blue focus:ring-kc-blue"
            />
            <span className="font-body text-xs text-kc-text-secondary dark:text-gray-300 leading-relaxed">
              I agree to be contacted by Klimate Consulting. We&apos;ll only use your details to
              follow up about our work — never shared or sold.
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-kc-blue text-white font-body font-semibold text-sm px-6 py-3 rounded-md hover:bg-kc-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Preparing download…' : 'Get the PDF'}
          </button>
        </form>
      </div>
    </div>
  )
}
