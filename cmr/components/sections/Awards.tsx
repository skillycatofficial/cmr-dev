'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const awards = [
  { id: 1, img: '/images/extracted/cmr-awards-1.jpg', name: 'Excellence Award' },
  { id: 2, img: '/images/extracted/cmr-awards-2.jpg', name: 'Green Leaf Certificate' },
  { id: 3, img: '/images/extracted/cmr-awards-3.jpg', name: 'Trust Builder Award' },
]

export default function Awards() {
  return (
    <section className="bg-[#f4f4f4] py-20 md:py-32">
      <div className="px-section">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-4/12"
          >
            <h2 className="font-display font-medium text-brand-charcoal text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
              AWARDS
            </h2>
            <p className="font-body text-brand-charcoal/70 text-[14px] leading-relaxed mb-6">
              We bring you a new array of apartments, flats, and villas that match your requirements and complement your lifestyle.
            </p>
            <Link href="/awards" className="inline-flex items-center gap-2 font-body text-brand-charcoal text-[13px] font-medium tracking-wide hover:text-brand-gold transition-colors duration-200">
              View More &gt;
            </Link>
          </motion.div>

          {/* Right Images */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-8/12 flex flex-col sm:flex-row gap-6 justify-end"
          >
            {awards.map((award, i) => (
              <motion.div 
                key={award.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full sm:w-1/3 aspect-[3/4] relative bg-white shadow-sm border border-brand-charcoal/5 p-2"
              >
                <div className="relative w-full h-full border border-brand-charcoal/10">
                  <Image 
                    src={award.img} 
                    alt={`CMR Developers Award - ${award.name}`} 
                    fill 
                    className="object-contain p-4" 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
