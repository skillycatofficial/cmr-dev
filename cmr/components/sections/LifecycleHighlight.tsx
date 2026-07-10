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
          viewport={{ once: true, margin: "-100px" }}
          className="font-body font-light text-[#2d2d2d] text-4xl md:text-5xl lg:text-[56px] leading-[1.2] mb-8 tracking-tight max-w-3xl">
          Building Homes That Grow With Your Lifestyle
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="font-body text-[#4a4a4a] text-[15px] md:text-[16px] leading-[1.8] max-w-5xl space-y-4">
          <p>
            At CMR Developers, we believe a home should evolve with your family
            and aspirations. Every villa community is carefully designed to
            offer the perfect balance of greenery, connectivity, privacy, and
            contemporary living.
          </p>
          <p>
            With over a decade of experience in Kerala&apos;s residential real
            estate, we have successfully delivered 600+ luxury villas while
            maintaining exceptional construction quality, transparent processes,
            and timely delivery.
          </p>
          <p>
            From first-time homeowners to NRIs seeking a secure investment, CMR
            creates homes built for generations.
          </p>
        </motion.div>
      </div>

      {/* Seamless Grid Section (Full Width Edge to Edge) */}
      <div className="w-full flex flex-col">
        {/* Row 1 — Alvina Harmony */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-2">
          {/* Text Left */}
          <div className="flex flex-col justify-center px-8 py-16 md:py-24 lg:px-20 xl:px-32 bg-white">
            <p className="font-body text-[#888888] text-[10px] tracking-[0.2em] uppercase mb-4 font-semibold">
              BRAND POSITIONING
            </p>
            <h3 className="font-body font-normal text-3xl md:text-4xl text-[#2d2d2d] mb-6">
              More Than a Villa. A Community Designed for Life.
            </h3>
            <p className="font-body text-[#666666] text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-md">
              Every CMR project is thoughtfully planned to create neighbourhoods
              where families can enjoy security, comfort, and meaningful
              connections. Spacious roads, landscaped surroundings, quality
              infrastructure, and premium amenities come together to offer an
              elevated lifestyle.
            </p>
          </div>
          {/* Image Right */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full">
            <Image
              src="/images/home/cmr-developers-luxury-villa-community-kerala.webp"
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-2">
          {/* Image Left */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full order-2 lg:order-1">
            <Image
              src="/images/home/kerala-villa-investment-premium-residential-community.webp"
              alt="Aiza Harmony luxury gated community villa exterior — Kannur by CMR Developers"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Text Right */}
          <div className="flex flex-col justify-center px-8 py-16 md:py-24 lg:px-20 xl:px-32 bg-white order-1 lg:order-2">
            <p className="font-body text-[#888888] text-[10px] tracking-[0.2em] uppercase mb-4 font-semibold">
              INVESTMENT SECTION
            </p>
            <h3 className="font-body font-normal text-3xl md:text-4xl text-[#2d2d2d] mb-6">
              Invest in Kerala&apos;s Fast-Growing Residential Market
            </h3>
            <p className="font-body text-[#666666] text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-md">
              Whether you&apos;re purchasing your first home, upgrading your
              lifestyle, or investing from abroad, CMR Developers offers villas
              in carefully selected locations with strong appreciation
              potential, excellent connectivity, and enduring construction
              quality.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
