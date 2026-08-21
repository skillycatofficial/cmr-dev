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
                CMR Group has officially solidified its position as the premier
                real estate developer in Kannur, Kerala. Over a remarkable
                14-year journey, we have proudly handed over the keys to more
                than 600 premium villas, cementing our reputation as the
                region&apos;s most trusted name in home construction. Our growth
                is accelerating at an unprecedented pace, highlighted by the
                successful delivery of 100 luxury homes in the last two years
                alone. This milestone represents an incredible operational
                average of two villa handovers every single month, proving our
                capacity to scale without ever compromising on engineering
                excellence.
              </p>
              <p>
                Our unprecedented growth is built entirely on a foundation of
                customer trust and word-of-mouth referrals. We invite
                prospective homebuyers to visit our completed communities and
                speak directly with our vibrant network of over 600 happy
                families. Every homeowner will share their firsthand experience
                of the signature pillars that define the CMR brand. These
                pillars include our meticulous material selection, flawless
                architectural workmanship, and the thoughtful space utilisation
                embedded within our strictly Vastu-compliant designs. Combined
                with our selection of scenic, high-appreciating site locations,
                we ensure that every property delivers both a peaceful
                lifestyle and a secure financial investment.
              </p>
              <p>
                Transparency and accessibility remain at the core of our
                business philosophy. To make dream homeownership a reality, CMR
                offers a seamless 100% home loan scheme alongside strict
                adherence to project delivery timelines. This unwavering
                commitment to client satisfaction has made us the undisputed
                villa promoter of choice for both local middle-income families
                and Non-Resident Indians seeking reliable property investments
                back home. By consistently delivering on our promises, our
                customers have become our greatest ambassadors, continually
                introducing their friends and family to the growing CMR
                community.
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
