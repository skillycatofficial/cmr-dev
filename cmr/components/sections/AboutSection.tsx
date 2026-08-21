'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const stats = [
  { num: '14',   label: 'YEARS OF EXCELLENCE',                    sub: null },
  { num: '600+', label: 'LUXURY VILLAS HANDED OVER',              sub: null },
  { num: '100+', label: 'VILLAS DELIVERED IN THE PAST 2 YEARS',   sub: null },
  { num: '600+', label: 'HAPPY FAMILIES',                         sub: null },
]

export default function AboutSection() {
  return (
    <section className="bg-white pt-20 md:pt-32 pb-0">
      <div className="px-section">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
            className="flex flex-col h-full"
          >
            {/* Section h2 */}
            <h2
              className="font-body font-medium text-[#2d2d2d] leading-tight mb-8"
              style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
            >
              Where Dreams Find an Address
            </h2>

            <div className="w-full h-[1px] bg-gray-200 mb-8" />

            {/* Body paragraphs */}
            <div className="space-y-6 font-body text-[#4a4a4a] text-[16px] md:text-[18px] leading-[1.8] max-w-[95%] mb-12 flex-grow">
              <p>
                CMR has completed 600+ luxury villas in and around Taliparamba, Karuvanchal in Kannur district, Changanassery in Kottayam district and Angamaly, Mulanthuruthy in Ernakulam district. With elegant Vastu-compliant designs, top-quality construction, and personalised customer service, CMR has become the preferred home builder for middle-income families.
              </p>
              <p>
                We are celebrating becoming the top builders in Kannur, Kerala. Within a span of just 14 years, we have officially handed over 600+ villas, solidifying our position as the leading real estate developer in Kannur, Kerala.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-8">
              <Link href="/about-us" className="inline-flex items-center gap-4 font-body text-[#333333] text-[15px] font-semibold tracking-wide hover:text-brand-green transition-colors duration-200 group">
                Know More About CMR 
                <span className="text-xl leading-none -mt-1 group-hover:translate-x-1 transition-transform">{'>'}</span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            {/* Column label */}
            <p className="font-body text-[#666666] text-[14px] font-medium tracking-wide mb-6">
              What Makes Us Unique
            </p>
            <div className="w-full h-[1px] bg-gray-200 mb-2" />

            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="border-b border-gray-200 py-8 md:py-10 flex items-center gap-8 md:gap-12"
              >
                {/* Stat number */}
                <div className="flex-shrink-0 w-24 md:w-32">
                  <span
                    className="font-body font-light text-brand-green leading-none"
                    style={{ fontSize: 'clamp(48px, 5vw, 64px)' }}
                  >
                    {stat.num}
                  </span>
                </div>
                <div>
                  {/* Stat label */}
                  <div className="font-body text-[#4a4a4a] text-[13px] md:text-[14px] tracking-[0.05em] uppercase leading-relaxed max-w-[280px]">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
