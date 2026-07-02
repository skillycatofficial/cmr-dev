'use client'

import { useState } from 'react'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
  buyerType: 'Local' | 'NRI'
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    buyerType: 'Local',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
      setFormState({ name: '', email: '', phone: '', message: '', buyerType: 'Local' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-10 text-center space-y-4">
        <div className="w-16 h-16 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-full flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <h4 className="font-display font-bold text-brand-charcoal text-lg">Message Sent</h4>
        <p className="font-body text-sm text-brand-charcoal/50 max-w-xs mx-auto leading-relaxed">
          Thank you for contacting CMR Developers. A representative will contact you within the next 2 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs font-bold text-brand-green hover:text-brand-gold uppercase tracking-wider transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">
          Your Name
        </label>
        <input
          type="text"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          placeholder="e.g. Renjith Krishnan"
          className="w-full font-body text-sm text-brand-charcoal py-3 px-4 bg-white border border-brand-gray/40 rounded-lg focus:outline-none focus:border-brand-green transition-colors"
        />
      </div>

      {/* Email & Phone grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            placeholder="name@example.com"
            className="w-full font-body text-sm text-brand-charcoal py-3 px-4 bg-white border border-brand-gray/40 rounded-lg focus:outline-none focus:border-brand-green transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            required
            value={formState.phone}
            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
            placeholder="e.g. +91 9206 838 383"
            className="w-full font-body text-sm text-brand-charcoal py-3 px-4 bg-white border border-brand-gray/40 rounded-lg focus:outline-none focus:border-brand-green transition-colors"
          />
        </div>
      </div>

      {/* Buyer Type Radio Buttons */}
      <div>
        <label className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">
          Buyer Status
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 font-body text-sm text-brand-charcoal cursor-pointer select-none">
            <input
              type="radio"
              name="buyerType"
              checked={formState.buyerType === 'Local'}
              onChange={() => setFormState({ ...formState, buyerType: 'Local' })}
              className="w-4 h-4 text-brand-green accent-brand-green"
            />
            Local / Resident Indian
          </label>
          <label className="flex items-center gap-2 font-body text-sm text-brand-charcoal cursor-pointer select-none">
            <input
              type="radio"
              name="buyerType"
              checked={formState.buyerType === 'NRI'}
              onChange={() => setFormState({ ...formState, buyerType: 'NRI' })}
              className="w-4 h-4 text-brand-green accent-brand-green"
            />
            Non-Resident Indian (NRI)
          </label>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">
          Message / Requirement
        </label>
        <textarea
          rows={4}
          required
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          placeholder="Tell us which project or region you are interested in..."
          className="w-full font-body text-sm text-brand-charcoal py-3 px-4 bg-white border border-brand-gray/40 rounded-lg focus:outline-none focus:border-brand-green transition-colors"
        ></textarea>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 font-body bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand-green hover:bg-brand-gold disabled:bg-brand-gray text-brand-ivory font-body text-label font-bold tracking-wider uppercase rounded-lg transition-colors duration-300 cursor-pointer text-center flex items-center justify-center gap-2 text-[12px]"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Request...
          </>
        ) : (
          'Book Site Visit'
        )}
      </button>
    </form>
  )
}
