'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function MdMessageSection() {
  return (
    <section className="relative bg-[#FAF8F5] py-20 md:py-28 overflow-hidden">
      {/* Decorative Ambient Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(184,154,93,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(184,154,93,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Giant Decorative Background Quote Watermark */}
      <div className="absolute right-6 top-10 md:right-24 md:top-14 select-none pointer-events-none z-0">
        <svg
          className="w-48 h-48 md:w-80 md:h-80 text-brand-gold/10 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <div className="px-section max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">

          {/* ── Left Column: MD Executive Portrait Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
              {/* Offset Thin Border Frame */}
              <div className="absolute top-2.5 left-2.5 -bottom-2.5 -right-2.5 rounded-2xl border border-brand-gold/40 pointer-events-none" />

              {/* Main Photo Container */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-md border border-black/5 bg-[#E8DDD4] aspect-[4/5]">
                <Image
                  src="/images/restin-joseph-md.png"
                  alt="Restin Joseph - Managing Director, CMR Developers"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 340px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Leadership Quote Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Main Section Title */}
            <h2 className="font-display font-bold text-brand-green text-3xl sm:text-4xl md:text-[38px] leading-tight tracking-tight">
              Message from the <span className="text-brand-gold">Managing Director</span>
            </h2>

            {/* Message Body Paragraph */}
            <p className="font-body text-brand-charcoal/75 text-base md:text-[17px] leading-relaxed font-normal">
              At CMR Developers, we believe a home is more than just a place to live—it is a space where dreams become memories and families grow together. Since our journey began, our commitment has been to create quality homes with thoughtful design, trusted craftsmanship, and lasting value. With every project, we strive to earn the trust of our customers and turn their vision of a beautiful home into reality.
            </p>

            {/* MD Signature & Official Title Block */}
            <div className="pt-2">
              <h3 className="font-display font-bold text-brand-charcoal text-lg sm:text-xl leading-tight">
                Restin Joseph
              </h3>
              <p className="font-body text-brand-gold text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase mt-1">
                MANAGING DIRECTOR, CMR DEVELOPERS
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
