'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const pillars = [
  { 
    icon: (
      <svg className="w-5 h-5 text-[#80cbb1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 22h20L12 2zm0 6l4 10H8l4-10z" />
      </svg>
    ), 
    title: 'Architectural Integrity', 
    desc: 'Honest materials used in uncompromising ways.' 
  },
  { 
    icon: (
      <svg className="w-5 h-5 text-[#80cbb1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5.5c-4.6 0-8.9 2-11.9 5.5C2.6 9.6 1 13.9 1 18.5V23h4.5c4.6 0 8.9-1.6 11.9-4.5 3-2.9 5.1-6.8 5.6-11v-7h-5.5zM19 14.5c-1.9 2.2-4.7 3.5-7.5 3.5H4v-2.5c0-3.3 1.5-6.5 4.1-8.5 2.5-2 5.8-3 9.4-2.5 1.5.2 2.5 1.6 2.5 3v7z"/>
      </svg>
    ), 
    title: 'Green Core',              
    desc: 'Sustainable by design, not by obligation.'    
  },
]

export default function Philosophy() {
  return (
    <section className="bg-[#0f2a22] overflow-hidden relative">
      {/* Subtle Shadow Overlay (Simulating Palm Leaf Shadow) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-black/40 to-transparent -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-black/40 to-transparent translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="px-section py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* ── LEFT: Text ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-body font-bold text-[#80cbb1] text-[10px] tracking-[0.25em] uppercase mb-6">
              OUR PHILOSOPHY
            </p>

            <h2
              className="font-body font-normal text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
            >
              Beyond Four Walls.<br />
              A Narrative for<br />
              Living.
            </h2>

            <p className="font-body text-[#9ca3af] text-[15px] leading-relaxed max-w-md mb-12">
              Every CMR project begins with a story. Not just how a building
              looks, but how it feels to walk through its halls at dawn, or how the
              light dances across the floor at dusk.
            </p>

            {/* Pillars */}
            <div className="space-y-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex-shrink-0 mt-0.5">{pillar.icon}</span>
                  <div>
                    <div className="font-body font-semibold text-white text-[15px] mb-1">
                      {pillar.title}
                    </div>
                    <div className="font-body text-[#6b7280] text-[13px] leading-relaxed">
                      {pillar.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Interior image with play button ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[4/3] w-full max-w-[600px] overflow-hidden rounded-2xl shadow-2xl"
          >
            <Image
              src="/images/extracted/cmr-philosophy-interior.jpg"
              alt="Premium Interior Design Philosophy - CMR Developers Kerala"
              fill
              className="object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 hover:bg-black/20 group cursor-pointer">
              <div className="w-[72px] h-[56px] rounded-[10px] bg-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0f2a22] ml-1" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
