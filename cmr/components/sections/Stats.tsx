'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    value: '600+',
    label: 'Villas Handed Over',
    desc: 'Premium villas delivered across Kerala to satisfied families.',
  },
  {
    value: '14+',
    label: 'Years of Precision',
    desc: 'Established in 2012. Trusted by generations of homeowners.',
  },
  {
    value: '91',
    label: 'Projects Completed',
    desc: 'Across Kannur, Kottayam, Ernakulam and beyond.',
  },
  {
    value: '8K+',
    label: 'Satisfied Families',
    desc: 'Customers who speak for our quality and bring us more.',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Stats() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-brand-ivory py-24 md:py-36">
      <div className="px-section">

        {/* ── Section label ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-label mb-16"
        >
          <span>Our Legacy in Numbers</span>
        </motion.div>

        {/* ── Stats grid ─────────────────────────────────────── */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-gray"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="bg-brand-ivory p-10 group hover:bg-brand-green transition-colors duration-500 cursor-default"
            >
              {/* Big number */}
              <div className="font-display text-5xl md:text-6xl font-bold text-brand-green group-hover:text-brand-gold transition-colors duration-500">
                {stat.value}
              </div>

              {/* Label */}
              <div className="mt-4 font-display text-lg font-semibold text-brand-charcoal group-hover:text-brand-ivory transition-colors duration-500">
                {stat.label}
              </div>

              {/* Desc */}
              <div className="mt-2 text-sm text-brand-charcoal/45 group-hover:text-brand-ivory/45 leading-relaxed font-body transition-colors duration-500">
                {stat.desc}
              </div>

              {/* Animated underline */}
              <div className="mt-6 h-px bg-brand-gold w-8 group-hover:w-16 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
