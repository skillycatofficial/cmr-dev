'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface HeroCarouselProps {
  images: string[]
  projectName: string
  location: string
}

export default function HeroCarousel({ images, projectName, location }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setTimeout(() => {
      isFirstRender.current = false
      setCurrent((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearTimeout(timer)
  }, [current, images.length])

  const enterAnim = isFirstRender.current ? { opacity: 1 } : { opacity: 0 }
  const altText = `${projectName} — Luxury Villa in ${location} | CMR Developers Kerala`

  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={enterAnim}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={altText}
            fill
            priority={current === 0}
            className="object-cover"
            fetchPriority={current === 0 ? 'high' : 'auto'}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {images.length > 1 && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 pointer-events-none">
          <span className="font-body text-brand-ivory/50 text-xs font-medium tracking-widest">
            {String(current + 1).padStart(2, '0')}
          </span>
          <div className="w-20 h-[2px] bg-brand-ivory/20 relative overflow-hidden">
            <motion.div
              key={current}
              className="absolute top-0 left-0 h-full bg-brand-gold"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </div>
          <span className="font-body text-brand-ivory text-xs font-medium tracking-widest">
            {String(images.length).padStart(2, '0')}
          </span>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { isFirstRender.current = false; setCurrent(i) }}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 h-1.5 bg-brand-gold'
                  : 'w-1.5 h-1.5 bg-brand-ivory/40 hover:bg-brand-ivory/70'
              }`}
            />
          ))}
        </div>
      )}
    </>
  )
}
