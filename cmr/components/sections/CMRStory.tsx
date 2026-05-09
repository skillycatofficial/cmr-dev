'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function CMRStory() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#f8f8f8] py-0">
      <div ref={ref} className="grid lg:grid-cols-2">

        {/* ── Left: Image + "14+" stat badge ──────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative h-[400px] lg:h-[560px]"
        >
          <Image
            src="/images/extracted/cmr-interior-bedroom.jpg"
            alt="CMR Interior"
            fill
            className="object-cover"
          />
          {/* Dark overlay at bottom for badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* "14+ YEARS OF PRECISION" badge — bottom left */}
          <div className="absolute bottom-8 left-8 z-10 bg-brand-green px-6 py-4 min-w-[160px]">
            <div
              className="font-display font-bold text-brand-ivory leading-none mb-1"
              style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
            >
              14+
            </div>
            <div className="font-body text-brand-ivory/60 text-[10px] tracking-[0.25em] uppercase">
              YEARS OF PRECISION
            </div>
          </div>
        </motion.div>

        {/* ── Right: Story text ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 bg-white"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-brand-gold flex-shrink-0" />
            <span className="font-body text-brand-gold text-[10px] tracking-[0.3em] uppercase">
              THE MONOLITH EDGE
            </span>
          </div>

          <h2 className="font-display font-bold text-brand-charcoal text-3xl md:text-4xl mb-6 leading-tight">
            CMR is celebrating!
          </h2>

          <div className="space-y-3 font-body text-brand-charcoal/55 text-sm leading-relaxed">
            <p>
              We are celebrating becoming the top builders in Kannur, Kerala. Within a span of
              just 14 years, we have officially handed over 600+ villas, solidifying our position
              as the leading real estate developer in Kannur, Kerala.
            </p>
            <p>
              It is on an average of 100 villas over the past 2 years and 2 per month.
              Unbelievable! Isn't it?
            </p>
            <p>
              If you feel so, visit us and talk to our 600+ happy families. Each one of them will
              talk to you lavishly about CMR quality, selection of scenic site location,
              transparency in dealings, perfection in workmanship, care in material selection,
              thoughtful space utilisation, vasthu complied designs, timely completion, 100% loan
              scheme, ensuring customer delight and what not!
            </p>
            <p>
              Yes, our customers speak for us and bring us more and more of their family and
              friends. That's what made us the largest and most reputed villa promoter in Kerala.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-8 border border-brand-charcoal/20 px-6 py-3 text-brand-charcoal text-xs font-body font-semibold tracking-[0.15em] uppercase hover:border-brand-green hover:text-brand-green hover:bg-brand-green/5 transition-all duration-300 self-start"
          >
            Explore More
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
