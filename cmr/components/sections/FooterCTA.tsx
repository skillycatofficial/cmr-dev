'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FooterCTA() {
  return (
    <section className="w-full bg-white">
      <div className="">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full overflow-hidden"
        >
          <Image 
            src="/images/slide/cmrslide1.webp" 
            alt="CMR Developers - Premium Luxury Villa Banner Kerala" 
            width={1424}
            height={752}
            sizes="100vw"
            className="w-full h-auto" 
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </div>
    </section>
  )
}
