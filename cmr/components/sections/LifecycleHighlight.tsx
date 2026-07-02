'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function LifecycleHighlight() {
  return (
    <section className="bg-white pt-10 pb-0 overflow-hidden">
      
      {/* Header Section (Centered/Constrained) */}
      <div className="px-section mb-20 lg:mb-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-body font-light text-[#2d2d2d] text-4xl md:text-5xl lg:text-[64px] leading-[1.1] mb-8 flex flex-wrap items-center gap-4 tracking-tight"
        >
          <span>INDIA&apos;S FIRST</span>
          <svg className="w-10 h-10 md:w-14 md:h-14 text-[#cba258]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="square" strokeLinejoin="miter" d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
          <span className="w-full">LIFECYCLE BUILDER</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2 }}
          className="font-body text-[#4a4a4a] text-[15px] md:text-[16px] leading-[1.8] max-w-5xl"
        >
          Living in luxury doesn&apos;t mean living in a concrete jungle. At CMR, every project is built amidst greenery without compromising the comforts and facilities of town living. Established in 2012, CMR has completed 600+ luxury villas across Kerala. Several projects are nearing completion and will be handed over by end of 2026.
        </motion.p>
      </div>

      {/* Seamless Grid Section (Full Width Edge to Edge) */}
      <div className="w-full flex flex-col">
        
        {/* Row 1 — Alvina Harmony */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-2"
        >
          {/* Text Left */}
          <div className="flex flex-col justify-center px-8 py-16 md:py-24 lg:px-20 xl:px-32 bg-white">
            <p className="font-body text-[#888888] text-[10px] tracking-[0.2em] uppercase mb-4 font-semibold">FLAGSHIP PROJECT · KADACHIRA, KANNUR</p>
            <h3 className="font-body font-normal text-3xl md:text-4xl text-[#2d2d2d] mb-6">Alvina Harmony</h3>
            <p className="font-body text-[#666666] text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-md">
              A gated community of architect-designed luxury villas in Kadachira, Kannur — featuring Vastu-compliant layouts, landscaped gardens, and a children&apos;s play area. Starting from ₹55 Lakhs.
            </p>
            <Link href="/projects/alvina-harmony" className="inline-flex items-center gap-3 font-body text-[11px] font-bold tracking-[0.15em] uppercase text-[#2d2d2d] hover:text-[#cba258] transition-colors group">
              EXPLORE ALVINA HARMONY 
              <span className="text-lg leading-none -mt-0.5 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
          {/* Image Right */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full">
            <Image 
              src="/images/slide/cmrslide4.webp" 
              alt="Alvina Harmony luxury villa exterior — Kadachira, Kannur by CMR Developers" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" 
            />
          </div>
        </motion.div>

        {/* Row 2 — Aiza Harmony */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-2"
        >
          {/* Image Left */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full order-2 lg:order-1">
            <Image 
              src="/images/extracted/cmr-villa-exterior.jpg" 
              alt="Aiza Harmony luxury gated community villa exterior — Kannur by CMR Developers" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" 
            />
          </div>
          {/* Text Right */}
          <div className="flex flex-col justify-center px-8 py-16 md:py-24 lg:px-20 xl:px-32 bg-white order-1 lg:order-2">
            <p className="font-body text-[#888888] text-[10px] tracking-[0.2em] uppercase mb-4 font-semibold">GATED COMMUNITY · KANNUR</p>
            <h3 className="font-body font-normal text-3xl md:text-4xl text-[#2d2d2d] mb-6">Aiza Harmony</h3>
            <p className="font-body text-[#666666] text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-md">
              Thoughtfully planned villas surrounded by greenery in Kannur, combining the serenity of nature with premium construction quality CMR is known for. No sub-contractors. On-time delivery.
            </p>
            <Link href="/projects/aiza-harmony" className="inline-flex items-center gap-3 font-body text-[11px] font-bold tracking-[0.15em] uppercase text-[#2d2d2d] hover:text-[#cba258] transition-colors group">
              EXPLORE AIZA HARMONY 
              <span className="text-lg leading-none -mt-0.5 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
