'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const PHILOSOPHY_VIDEO_ID = 'hSQKfqAp97s'

const pillars = [
  { 
    icon: (
      <svg className="w-6 h-6 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 22h20L12 2zm0 6l4 10H8l4-10z" />
      </svg>
    ), 
    title: 'Architectural Integrity', 
    desc: 'Honest materials used in uncompromising ways to stand the test of time.' 
  },
  { 
    icon: (
      <svg className="w-6 h-6 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5.5c-4.6 0-8.9 2-11.9 5.5C2.6 9.6 1 13.9 1 18.5V23h4.5c4.6 0 8.9-1.6 11.9-4.5 3-2.9 5.1-6.8 5.6-11v-7h-5.5zM19 14.5c-1.9 2.2-4.7 3.5-7.5 3.5H4v-2.5c0-3.3 1.5-6.5 4.1-8.5 2.5-2 5.8-3 9.4-2.5 1.5.2 2.5 1.6 2.5 3v7z"/>
      </svg>
    ), 
    title: 'Green Core',              
    desc: 'Sustainable by design, integrating nature seamlessly into luxury.'    
  },
]

export default function Philosophy() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section className="bg-[#0f2a22] overflow-hidden relative">
      {/* Subtle Shadow Overlay (Simulating Luxury Lighting) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40">
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFD700]/10 via-[#FFD700]/5 to-transparent blur-3xl opacity-50" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-brand-gold/5 to-transparent blur-3xl opacity-50" />
      </div>

      <div className="px-section py-24 md:py-36 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Text ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-brand-gold/50"></div>
              <p className="font-body font-bold text-brand-gold text-[11px] tracking-[0.3em] uppercase">
                OUR PHILOSOPHY
              </p>
            </div>

            <h2
              className="font-display font-light text-white leading-[1.1] mb-8 tracking-tight"
              style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
            >
              Beyond Four Walls.<br />
              <span className="italic font-serif text-brand-gold">A Narrative</span> for<br />
              Living.
            </h2>

            <p className="font-body text-gray-400 text-[16px] leading-relaxed max-w-lg mb-14 font-light">
              Every CMR project begins with a story. Not just how a building
              looks, but how it feels to walk through its halls at dawn, or how the
              golden light dances across the floor at dusk.
            </p>

            {/* Pillars */}
            <div className="grid sm:grid-cols-2 gap-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                  className="group flex flex-col items-start gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-brand-gold/30 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="p-3 rounded-full bg-black/40 border border-white/5 group-hover:border-brand-gold/20 transition-colors duration-500 shadow-xl relative z-10">
                    {pillar.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="font-display font-medium text-white text-[16px] mb-2 tracking-wide">
                      {pillar.title}
                    </div>
                    <div className="font-body text-gray-400 text-[13px] leading-relaxed font-light">
                      {pillar.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Interior image with play button ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-[640px] mx-auto lg:ml-auto group"
          >
            {/* Offset Gold Frame */}
            <div className="absolute inset-0 border border-brand-gold/40 rounded-2xl translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 transition-transform duration-700 group-hover:translate-x-3 group-hover:translate-y-3" />

            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              aria-label="Play CMR Developers brand film"
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl cursor-pointer border border-white/10 block text-left"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <Image
                src="/images/extracted/cmr-philosophy-interior.jpg"
                alt="Premium Interior Design Philosophy - CMR Developers Kerala"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-[80px] h-[80px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.3)] transform group-hover:scale-110 group-hover:bg-brand-gold/20 group-hover:border-brand-gold/50 transition-all duration-500 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <svg viewBox="0 0 24 24" className="w-8 h-8 text-white ml-1 drop-shadow-md group-hover:text-brand-gold transition-colors duration-300" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </button>
          </motion.div>

        </div>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video"
                className="absolute -top-12 right-0 text-white/70 hover:text-brand-gold transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${PHILOSOPHY_VIDEO_ID}?autoplay=1&rel=0`}
                  title="CMR Developers Brand Film"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
