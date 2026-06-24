'use client'

import { useState } from 'react'

export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    buyerType: 'Local', // Local or NRI
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API request
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormState({ name: '', email: '', phone: '', message: '', buyerType: 'Local' })
    }, 1200)
  }

  return (
    <>
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            Connect
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            Talk to CMR Developers — We&apos;ll Help You Find Your Perfect Villa
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            Get in touch with our villa sales team, coordinate a site tour, or speak directly to our dedicated NRI desk.
          </p>
        </div>
      </section>

      {/* ── Main Layout ──────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="px-section">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            
            {/* Left Column: Contact Details & Info */}
            <div className="text-left space-y-10">
              <div className="space-y-4 font-body text-brand-charcoal/70 text-body leading-relaxed font-light">
                <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight">
                  We Are Here to Help — At Every Stage of Your Home Buying Journey
                </h2>
                <p>
                  Whether you have one question or a hundred, our team at CMR Developers is here to help. We know that buying a home is one of the most significant decisions of your life. We do not treat it like a transaction — we treat it like the beginning of a long, trusted relationship.
                </p>
                <p>
                  Call us, WhatsApp us, visit our headquarters in Kannur, or submit the enquiry form. Our team responds to all online enquiries within 2 hours.
                </p>
              </div>

              {/* Office & Contact Info Cards */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-green/5 text-brand-green rounded-xl border border-brand-green/10">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-charcoal text-[15px] uppercase tracking-wider mb-1">Corporate Office</h4>
                    <p className="font-body text-brand-charcoal/60 text-sm leading-relaxed font-light">
                      Union Complex, 2nd Floor, South Bazar, Ward No. 46<br />
                      Near Kannur–Taliparamba Highway, Kannur – 670 001, Kerala
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-green/5 text-brand-green rounded-xl border border-brand-green/10">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-charcoal text-[15px] uppercase tracking-wider mb-1">Direct Contact</h4>
                    <p className="font-body text-brand-charcoal/60 text-sm leading-relaxed font-light">
                      Phone: <a href="tel:+919206838383" className="hover:text-brand-green transition-colors font-medium">+91 9206 838 383</a> | <a href="tel:+919744475555" className="hover:text-brand-green transition-colors font-medium">+91 9744 475 555</a><br />
                      Email: <a href="mailto:admin@cmrdevelopers.com" className="hover:text-brand-green transition-colors font-medium">admin@cmrdevelopers.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-green/5 text-brand-green rounded-xl border border-brand-green/10">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-charcoal text-[15px] uppercase tracking-wider mb-1">NRI Support Desk</h4>
                    <p className="font-body text-brand-charcoal/60 text-sm leading-relaxed font-light">
                      Hours: <span className="font-medium text-brand-charcoal/70">9:00 AM – 9:00 PM IST, 7 Days a Week</span><br />
                      Dedicated coordination team for buyers in the Gulf, UK, and USA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-[#fcfbf9] p-8 md:p-10 border border-brand-gray/30 rounded-2xl w-full text-left shadow-sm">
              <h3 className="font-display font-bold text-brand-charcoal text-xl mb-6 border-b border-brand-gray/30 pb-4">
                Book a Free Site Visit or Speak to Our NRI Desk
              </h3>

              {submitted ? (
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
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
