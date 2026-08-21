'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Category = 'ALL' | 'EXTERIOR' | 'INTERIOR' | 'AMENITIES'

const categories: { key: Category; label: string }[] = [
  { key: 'ALL',       label: 'ALL WORKS' },
  { key: 'EXTERIOR',  label: 'EXTERIOR' },
  { key: 'INTERIOR',  label: 'INTERIOR' },
  { key: 'AMENITIES', label: 'AMENITIES' },
]

// Static fallback gallery items (used when WordPress data is not available)
const FALLBACK_ITEMS = [
  { id: 1,  cat: 'INTERIOR',  src: '/images/extracted/cmr-interior-living.jpg',    code: 'CMR/KT523', aspect: 'aspect-[3/4]',   title: 'Luxury Living Room Interior Design Kerala' },
  { id: 2,  cat: 'INTERIOR',  src: '/images/extracted/cmr-interior-dining.jpg',    code: 'CMR/KT522', aspect: 'aspect-[4/3]',   title: 'Modern Dining Space in Luxury Villa Kerala' },
  { id: 3,  cat: 'INTERIOR',  src: '/images/extracted/cmr-interior-bedroom.jpg',   code: 'CMR/KT519', aspect: 'aspect-square',  title: 'Premium Master Bedroom Design Kannur' },
  { id: 4,  cat: 'EXTERIOR',  src: '/images/slide/cmrslide5.webp',    code: 'CMR/KT520', aspect: 'aspect-[16/9]',  title: 'Contemporary Luxury Villa Exterior Kerala' },
  { id: 5,  cat: 'EXTERIOR',  src: '/images/extracted/cmr-villa-exterior.jpg',     code: 'CMR/KT518', aspect: 'aspect-[3/2]',   title: 'Traditional Vastu-Compliant Villa Exterior' },
  { id: 6,  cat: 'EXTERIOR',  src: '/images/extracted/cmr-grid-small-6.jpg',       code: 'CMR/KT517', aspect: 'aspect-[4/3]',   title: 'Premium Villa Architecture Design Kannur' },
  { id: 7,  cat: 'AMENITIES', src: '/images/extracted/cmr-gallery-1.jpg',          code: 'CMR/KT511', aspect: 'aspect-[3/4]',   title: 'Luxury Amenities at CMR Paradise Kerala' },
  { id: 8,  cat: 'AMENITIES', src: '/images/extracted/cmr-gallery-2.jpg',          code: 'CMR/BD501', aspect: 'aspect-square',  title: 'Community Living Spaces CMR Developers' },
  { id: 9,  cat: 'INTERIOR',  src: '/images/extracted/cmr-philosophy-interior.jpg',code: 'CMR/BD505', aspect: 'aspect-[3/4]',   title: 'Exquisite Interior Finishing Kerala' },
  { id: 10, cat: 'EXTERIOR',  src: '/images/extracted/cmr-grid-small-5.jpg',       code: 'CMR/BD509', aspect: 'aspect-[4/3]',   title: 'Modern Gated Community Villas Kannur' },
  { id: 11, cat: 'INTERIOR',  src: '/images/extracted/cmr-grid-small-3.jpg',       code: 'CMR/BD519', aspect: 'aspect-[16/9]',  title: 'Luxury Villa Staircase and Hallway Design' },
]

interface GalleryItem {
  id: number
  cat: string
  src: string
  code: string
  aspect: string
  title: string
}

interface GalleryProps {
  initialItems?: GalleryItem[]
}

export default function Gallery({ initialItems }: GalleryProps) {
  const galleryItems = initialItems && initialItems.length > 0 ? initialItems : FALLBACK_ITEMS
  const [active, setActive] = useState<Category>('ALL')

  const filtered = active === 'ALL' ? galleryItems : galleryItems.filter((g) => g.cat === active)

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="px-section">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-brand-charcoal/50 text-[10px] tracking-[0.25em] uppercase mb-4">VISUAL ARCHIVE</p>
            <h2 className="font-display font-medium text-brand-charcoal text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-none">
              ARCHITECTURAL<br/>PERSPECTIVES
            </h2>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-6"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`font-body text-[10px] md:text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                  active === cat.key
                    ? 'text-brand-charcoal font-semibold border-b border-brand-charcoal pb-1'
                    : 'text-brand-charcoal/50 hover:text-brand-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`relative w-full ${item.aspect} overflow-hidden group cursor-pointer mb-4 break-inside-avoid inline-block rounded-lg shadow-sm`}
              >
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Red Label Badge */}
                <div className="absolute top-4 right-4 bg-[#8C2020] text-white px-3 py-1 font-body text-[10px] font-semibold tracking-wider z-10 shadow-sm">
                  {item.code}
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
