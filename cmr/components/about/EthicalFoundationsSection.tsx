'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function EthicalFoundationsSection() {
  const [modalOpen, setModalOpen] = useState(false)

  const commitments = [
    {
      title: 'NEVER COMPROMISE',
      description: 'On quality, at any stage of construction',
    },
    {
      title: 'ISO CERTIFIED',
      description: 'Processes independently verified and certified',
    },
    {
      title: 'ENVIRONMENTALLY MINDFUL',
      description: 'Sustainable practices built into every project',
    },
    {
      title: 'QUALITY, ALWAYS',
      description: 'Our operating principle in whatever we do',
    },
  ]

  return (
    <section className="bg-white py-16 md:py-24 border-b border-brand-gray/20">
      <div className="px-section max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* ── Left Column: Title & Certificate Card ── */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.25em] uppercase mb-2 block">
                OUR COMMITMENT
              </span>
              <h2 className="font-display font-bold text-brand-charcoal text-3xl sm:text-4xl leading-tight">
                Built on Ethical Foundations
              </h2>
            </div>

            {/* Certificate Outer Card Frame */}
            <div className="relative rounded-2xl border border-brand-gold/30 p-4 bg-[#FCFAFA] shadow-sm max-w-[300px]">
              {/* Clickable Certificate Thumbnail */}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative block w-full aspect-[1/1.38] rounded-xl overflow-hidden border border-black/10 bg-white shadow-md group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              >
                <Image
                  src="/images/teams/iso-9001-2015.png"
                  alt="ISO 9001:2015 Certificate - CMR Builders and Developers"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-green/90 text-brand-ivory text-xs px-3 py-1.5 rounded-full font-body font-medium shadow-md">
                    Click to enlarge
                  </span>
                </div>
              </button>

              {/* Caption Line */}
              <div className="mt-3 font-body text-xs text-brand-charcoal/60 flex items-center justify-between">
                <span>ISO 9001:2015 Certified &mdash;</span>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="text-brand-gold font-medium hover:underline focus:outline-none"
                >
                  view certificate
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Column: Description & 2x2 Highlights Grid ── */}
          <div className="lg:col-span-7 space-y-10 text-left pt-2">
            <p className="font-body text-brand-charcoal/75 text-base sm:text-lg md:text-[19px] leading-relaxed font-normal">
              CMR Developers set out to become the largest professional villa builder in the region, built on ethical foundations and time-tested credibility &mdash; pioneering gated villa living at a time when the market knew only standalone homes on agricultural plots, with a lasting commitment to value for money across every villa and apartment we deliver.
            </p>

            {/* 2x2 Commitments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-brand-gray/20">
              {commitments.map((item) => (
                <div key={item.title} className="space-y-1.5">
                  <h3 className="font-display font-bold text-brand-charcoal text-base sm:text-[17px] tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <p className="font-body text-brand-charcoal/60 text-xs sm:text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── ISO Certificate Lightbox Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-2xl w-full max-h-[90vh] bg-white rounded-2xl p-4 overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
                <span className="font-display font-bold text-brand-green text-sm">
                  ISO 9001:2015 Certificate &mdash; CMR Builders & Developers
                </span>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative w-full aspect-[1/1.41]">
                <Image
                  src="/images/teams/iso-9001-2015.png"
                  alt="ISO 9001:2015 Full Certificate"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
