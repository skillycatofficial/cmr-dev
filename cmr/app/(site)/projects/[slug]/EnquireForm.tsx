'use client'

import { useState } from 'react'
import { getRecaptchaToken } from '@/lib/recaptcha'

interface EnquireFormProps {
  projectName: string
  projectLocation: string
}

export default function EnquireForm({ projectName, projectLocation }: EnquireFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${projectName}, ${projectLocation}.`,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const recaptchaToken = await getRecaptchaToken('enquiry')
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, projectName, projectLocation, recaptchaToken }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
      setFormState({ name: '', email: '', phone: '', message: `I'm interested in ${projectName}, ${projectLocation}.` })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-6 text-center space-y-3">
        <div className="w-14 h-14 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto text-xl">
          ✓
        </div>
        <h4 className="font-display font-bold text-brand-ivory text-lg">Enquiry Sent</h4>
        <p className="font-body text-sm text-brand-ivory/50 max-w-xs mx-auto leading-relaxed">
          Thank you for your interest in {projectName}. Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-xs font-bold text-brand-gold hover:text-brand-ivory uppercase tracking-wider transition-colors"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          placeholder="Your Name"
          className="bg-white/5 border border-white/15 text-brand-ivory font-body text-ui px-4 py-3.5 outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/25 w-full"
        />
        <input
          type="tel"
          required
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
          placeholder="Phone Number"
          className="bg-white/5 border border-white/15 text-brand-ivory font-body text-ui px-4 py-3.5 outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/25 w-full"
        />
      </div>
      <input
        type="email"
        required
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        placeholder="Email Address"
        className="bg-white/5 border border-white/15 text-brand-ivory font-body text-ui px-4 py-3.5 outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/25 w-full"
      />
      <textarea
        rows={4}
        value={formState.message}
        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
        placeholder="Your message (optional)"
        className="bg-white/5 border border-white/15 text-brand-ivory font-body text-ui px-4 py-3.5 outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/25 w-full resize-none"
      />

      {error && (
        <p className="text-sm text-red-300 font-body bg-red-500/10 border border-red-400/30 rounded px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand-gold text-brand-charcoal font-body text-label font-bold tracking-[0.2em] uppercase hover:bg-brand-ivory transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  )
}
