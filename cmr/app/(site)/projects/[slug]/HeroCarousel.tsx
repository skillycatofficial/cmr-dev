'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import Image from 'next/image'

interface HeroCarouselProps {
  desktopImages: string[]
  mobileImages?: string[]
  projectName: string
  location: string
}

export default function HeroCarousel({
  desktopImages,
  mobileImages = [],
  projectName,
  location,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const isFirstRender = useRef(true)

  // Use desktopImages length as the primary slides count
  const slidesCount = desktopImages.length

  useEffect(() => {
    if (slidesCount <= 1) return
    const timer = setTimeout(() => {
      isFirstRender.current = false
      setCurrent((prev) => (prev + 1) % slidesCount)
    }, 6000)
    return () => clearTimeout(timer)
  }, [current, slidesCount])

  const enterAnim = isFirstRender.current ? { opacity: 1 } : { opacity: 0 }
  const altText = `${projectName} — Luxury Villa in ${location} | CMR Developers Kerala`

  const handleDragEnd = (event: unknown, info: PanInfo) => {
    if (slidesCount <= 1) return
    const threshold = 50
    if (info.offset.x < -threshold) {
      isFirstRender.current = false
      setCurrent((prev) => (prev + 1) % slidesCount)
    } else if (info.offset.x > threshold) {
      isFirstRender.current = false
      setCurrent((prev) => (prev - 1 + slidesCount) % slidesCount)
    }
  }

  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={enterAnim}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {/* Desktop Image */}
          <Image
            src={desktopImages[current] || desktopImages[0]}
            alt={altText}
            fill
            priority={current === 0}
            className="object-cover hidden md:block pointer-events-none select-none"
            sizes="100vw"
            fetchPriority={current === 0 ? 'high' : 'auto'}
            draggable={false}
          />
          {/* Mobile Image */}
          <Image
            src={
              (mobileImages.length > 0 && mobileImages[current] && mobileImages[current].trim() !== '')
                ? mobileImages[current]
                : (desktopImages[current] || desktopImages[0])
            }
            alt={altText}
            fill
            priority={current === 0}
            className="object-cover block md:hidden pointer-events-none select-none"
            sizes="100vw"
            fetchPriority={current === 0 ? 'high' : 'auto'}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {slidesCount > 1 && (
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
            {String(slidesCount).padStart(2, '0')}
          </span>
        </div>
      )}

      {slidesCount > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {desktopImages.map((_, i) => (
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
