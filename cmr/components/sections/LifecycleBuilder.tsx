'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { title: 'Luxury Villas',  desc: 'Premium villas crafted with world-class architecture for discerning families.',  img: '/images/slide/cmrslide3.webp', href: '/projects/luxury',  tag: 'EXOTICA'    },
  { title: 'Budget Homes',   desc: 'Thoughtfully designed homes for families who aspire for better living.',         img: '/images/extracted/cmr-villa-exterior.jpg', href: '/projects/budget',  tag: 'SERENITY'   },
  { title: 'Premium Villas', desc: 'Flagship villa projects with scenic locations, vasthu-compliant designs.',       img: '/images/extracted/cmr-grid-small-3.jpg',   href: '/projects/premium', tag: 'SIGNATURE'  },
  { title: 'NRI Specials',   desc: 'Secure investments tailored for NRI families with full lifecycle support.',      img: '/images/extracted/cmr-grid-small-4.jpg',   href: '/projects/nri',     tag: 'NRI SELECT' },
]

export default function LifecycleBuilder() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-white overflow-hidden border-t border-brand-gray/30">

      {/* Marquee strip */}
      <div className="py-5 bg-white border-b border-brand-gray/30 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {["INDIA'S FIRST  LIFECYCLE BUILDER  ", "INDIA'S FIRST  LIFECYCLE BUILDER  ",
            "INDIA'S FIRST  LIFECYCLE BUILDER  ", "INDIA'S FIRST  LIFECYCLE BUILDER  "].map((t, i) => (
            <span
              key={i}
              className="font-display font-bold text-brand-charcoal tracking-tight mr-4 flex-shrink-0"
              /* section (36px) → scales nicely with clamp for mobile */
              style={{ fontSize: 'clamp(24px, 4vw, 42px)', letterSpacing: '-0.015em' }}
            >
              {t}
              <span className="text-brand-gold mx-3">→</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Category cards */}
      <div ref={ref} className="px-section py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={cat.href} className="group block">
                <div className="relative overflow-hidden h-[220px] md:h-[260px] mb-4">
                  <Image 
                    src={cat.img} 
                    alt={cat.title} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Tag: micro (11px) */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="font-body text-brand-gold text-micro tracking-[0.25em] uppercase font-semibold">{cat.tag}</span>
                  </div>
                </div>
                {/* Card title: heading (22px) */}
                <h3 className="font-display font-bold text-brand-charcoal text-heading mb-2 group-hover:text-brand-green transition-colors duration-200">
                  {cat.title}
                </h3>
                {/* Card desc: body (20px) — user requirement */}
                <p className="font-body text-brand-charcoal/50 text-body leading-relaxed mb-3">
                  {cat.desc}
                </p>
                {/* Link: ui (16px) */}
                <span className="inline-flex items-center gap-1.5 font-body text-brand-green text-ui font-semibold group-hover:text-brand-gold transition-colors duration-200">
                  View Projects
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
