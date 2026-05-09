'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const propertyTypes = ['All Types', 'Villa', 'Apartment', 'Plot']
const locations     = ['Any Location', 'Kannur', 'Taliparamba', 'Karuvanchal', 'Changanassery', 'Angamaly', 'Mulanthuruthy']
const statuses      = ['Any Status', 'Ready to Occupy', 'Under Construction', 'Upcoming']

export default function PropertySearch() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [type,     setType]     = useState('All Types')
  const [location, setLocation] = useState('Any Location')
  const [status,   setStatus]   = useState('Any Status')

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden border-t border-brand-gray/30">
      <div className="px-section">
        <div ref={ref}>

          {/* ── Headline ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-10"
          >
            <h2
              className="font-display font-bold text-brand-charcoal leading-[0.92] tracking-tight uppercase"
              style={{ fontSize: 'clamp(36px, 6.5vw, 88px)' }}
            >
              THE ONLY TREE OF
              <br />
              TRUST IN THE LAND OF
              <br />
              ASSETS{' '}
              <span className="text-brand-gold text-[0.5em] align-middle">✳</span>
            </h2>
          </motion.div>

          {/* ── Search bar ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border border-brand-gray/70 rounded-sm shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto]">
              {/* Property Type */}
              <div className="border-b md:border-b-0 md:border-r border-brand-gray p-5">
                <label className="block font-body text-[9px] text-brand-charcoal/40 tracking-[0.3em] uppercase mb-2">
                  Property Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full font-body text-brand-charcoal text-sm bg-transparent outline-none cursor-pointer appearance-none"
                >
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="border-b md:border-b-0 md:border-r border-brand-gray p-5">
                <label className="block font-body text-[9px] text-brand-charcoal/40 tracking-[0.3em] uppercase mb-2">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full font-body text-brand-charcoal text-sm bg-transparent outline-none cursor-pointer appearance-none"
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="border-b md:border-b-0 md:border-r border-brand-gray p-5">
                <label className="block font-body text-[9px] text-brand-charcoal/40 tracking-[0.3em] uppercase mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full font-body text-brand-charcoal text-sm bg-transparent outline-none cursor-pointer appearance-none"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Search CTA */}
              <button className="bg-brand-green text-brand-ivory px-8 py-5 font-body text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-gold hover:text-brand-charcoal transition-colors duration-300">
                Search Now
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
