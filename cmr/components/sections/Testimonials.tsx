'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const testimonials = [
  { id: 1, name: 'Rajan & Priya Nair',      project: 'CMR Valencia, Kannur',        since: 'Since 2022', quote: 'CMR delivered beyond our expectations. Every corner of our villa reflects the care and craftsmanship they promised. The Vasthu-compliant design brought peace of mind from day one.', initials: 'RN', color: 'bg-[#0F2F2B]' },
  { id: 2, name: 'Suresh Menon',             project: 'CMR Grandeur, Taliparamba',   since: 'Since 2021', quote: 'As an NRI, I was worried about the process. CMR handled everything seamlessly — from land selection to handover. I could not have asked for a better team to trust with my family\'s dream home.', initials: 'SM', color: 'bg-brand-gold' },
  { id: 3, name: 'Anil & Sreelatha Krishnan',project: 'CMR Highland, Karuvanchal',   since: 'Since 2023', quote: 'The lifecycle support CMR provides is unlike anything we have seen. They were with us through every stage — and even after handing over, they are just a call away. Truly Kerala\'s most trusted builder.', initials: 'AK', color: 'bg-[#1A1A1A]' },
  { id: 4, name: 'Thomas & Maria Joseph',    project: 'CMR Elysium, Changanassery',  since: 'Since 2020', quote: 'We visited three builders before choosing CMR. The quality of materials, transparency in process, and the warmth of the team made all the difference. Our villa is everything we dreamed of.', initials: 'TJ', color: 'bg-[#0F2F2B]' },
]

export default function Testimonials() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-[#f8f9fa] py-14 md:py-20 border-t border-brand-gray/30">
      <div className="px-section" ref={ref}>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            {/* section (36px) */}
            <h2 className="font-display font-bold text-brand-charcoal text-section tracking-tight">TALES OF TRUST</h2>
            <div className="w-16 h-0.5 bg-brand-gold mt-3" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="flex items-center gap-6">
            <div className="text-right">
              {/* Stat: ~32px */}
              <div className="font-display font-bold text-brand-charcoal" style={{ fontSize: '32px' }}>8K+</div>
              {/* label (13px) */}
              <div className="font-body text-brand-charcoal/45 text-label tracking-[0.2em] uppercase">Happy Customers</div>
            </div>
            <div className="w-px h-10 bg-brand-gray/60" />
            {/* ui (16px) */}
            <Link href="/stories/testimonials" className="font-body text-brand-green text-ui font-semibold tracking-wide hover:text-brand-gold transition-colors duration-200 flex items-center gap-1.5 group">
              View More
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.09 }} className="bg-white p-6 hover:shadow-md transition-shadow duration-300">
              {/* Quote mark */}
              <div className="font-display text-brand-gold leading-none mb-4 select-none" style={{ fontSize: '40px' }}>&ldquo;</div>
              {/* Quote: body (20px) */}
              <p className="font-body text-brand-charcoal/65 text-body leading-relaxed mb-5">{t.quote}</p>

              <div className="flex items-center gap-3 border-t border-brand-gray/40 pt-4">
                <div className={`w-10 h-10 ${t.color} flex items-center justify-center flex-shrink-0`}>
                  {/* Initials: ui (16px) */}
                  <span className="font-display font-bold text-white text-ui">{t.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  {/* Name: heading (22px) */}
                  <div className="font-body text-brand-charcoal text-heading font-semibold leading-tight">{t.name}</div>
                  {/* Project: label (13px) */}
                  <div className="font-body text-brand-charcoal/40 text-label tracking-wide mt-0.5">{t.project}</div>
                </div>
                {/* Since: micro (11px) */}
                <div className="font-body text-brand-charcoal/30 text-micro tracking-[0.15em] uppercase text-right flex-shrink-0">{t.since}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Star rating row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-wrap items-center gap-4 justify-center">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          {/* ui (16px) */}
          <span className="font-body text-brand-charcoal/50 text-ui">4.9 / 5 · Based on 800+ Google Reviews</span>
          <Link href="/stories/testimonials" className="font-body text-brand-green text-ui font-semibold underline underline-offset-2 hover:text-brand-gold transition-colors duration-200">Read All Reviews</Link>
        </motion.div>

      </div>
    </section>
  )
}
