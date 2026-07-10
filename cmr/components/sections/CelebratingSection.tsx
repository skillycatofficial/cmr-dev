'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CelebratingSection() {
  return (
    <section className="bg-[#f8f9fa] py-20 md:py-32 overflow-hidden">
      <div className="px-section">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24 xl:gap-36 2xl:gap-40">
          {/* Left: Image with Precision Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-[80%] lg:w-2/5 relative">
            <div className="relative aspect-[3/4] w-full shadow-lg">
              <Image
                src="/images/home/cmr-established-villa-community-kannur-kerala.webp"
                alt="Luxury Villa Interior by CMR Developers - Living Room"
                fill
                className="object-cover"
              />
            </div>
            {/* Overlay Box */}
            <div className="absolute -bottom-8 -right-8 md:bottom-12 md:-right-12 bg-[#0F2F2B] p-8 md:p-10 shadow-2xl text-center">
              <span className="block font-display font-bold text-[#B89A5D] text-4xl md:text-5xl mb-2">
                14+
              </span>
              <span className="block font-body text-[10px] md:text-[11px] text-white/80 tracking-[0.2em] uppercase">
                YEARS OF PRECISION
              </span>
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/3">
            <p className="font-body text-brand-charcoal/50 text-[10px] tracking-[0.25em] uppercase mb-4">
              THE MONOLITH EDGE
            </p>
            <h2 className="font-display font-medium text-brand-charcoal text-4xl md:text-5xl lg:text-6xl mb-10 leading-tight">
              CMR is celebrating!
            </h2>

            <div className="space-y-6 font-body text-[14px] text-brand-charcoal/80 leading-relaxed max-w-2xl">
              <p>
                We are celebrating becoming the top builders in Kannur, Kerala.
                Within a span of just 14 years, we have officially handed over
                600+ villas, solidifying our position as the leading real estate
                developer in Kannur, Kerala.
              </p>
              <p>
                It is on an average of 100 villas over the past 2 years and 2
                per month. Unbelievable! Isn&apos;t it?
              </p>
              <p>
                If you feel so, visit us and talk to our 600+ happy families.
                Each one of them will talk to you lavishly about CMR quality,
                selection of scenic site location, transparency in dealings,
                perfection in workmanship, care in material selection,
                thoughtful space utilisation, vasthu complied designs, timely
                completion, 100% loan scheme, ensuring customer delight and what
                not!
              </p>
              <p>
                Yes, our customers speak for us and bring us more and more of
                their family and friends. That&apos;s what made us the largest
                and most reputed villa promoter in Kerala.
              </p>
              <p>
                CMR remains the builder of choice for both NRIs and middle
                income group of this area with 600+ happy families bearing
                testimony to our promise and integrity.
              </p>
            </div>

            <div className="mt-10">
              <button className="border border-brand-charcoal text-brand-charcoal font-body text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-4 hover:bg-brand-charcoal hover:text-white transition-colors">
                Explore More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
