'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { decodeHtml } from '@/lib/utils'

export type HeroSlide = {
  /** Desktop (landscape / 16:9) image */
  image: string
  /** Mobile (portrait / 9:16) image — falls back to `image` when not provided */
  mobileImage?: string
  eyebrow?: string
  title?: string
  cta?: string
  ctaHref?: string
}

const FALLBACK_SLIDES: HeroSlide[] = [
  { image: '/images/slide/cmrslide1.webp', mobileImage: '/images/slide/cmrslide3.webp' },
  { image: '/images/slide/cmrslide3.webp', mobileImage: '/images/slide/cmrslide4.webp' },
  { image: '/images/slide/cmrslide4.webp', mobileImage: '/images/slide/cmrslide5.webp' },
  { image: '/images/slide/cmrslide5.webp', mobileImage: '/images/slide/cmrslide1.webp' },
]

export default function Hero({ slides: sanitySlides }: { slides?: HeroSlide[] }) {
  const filteredSlides = sanitySlides?.filter(
    (slide) => slide && slide.image && slide.image.trim() !== ''
  )
  const slides =
    filteredSlides && filteredSlides.length > 0 ? filteredSlides : FALLBACK_SLIDES

  const [current, setCurrent] = useState(0)
  const isFirstRender = useRef(true)

  // Autoplay
  useEffect(() => {
    const timer = setTimeout(() => {
      isFirstRender.current = false
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearTimeout(timer)
  }, [current, slides.length])

  // Skip enter animation on first paint to avoid LCP delay
  const enterAnimation = isFirstRender.current
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 1.05 }

  const handleDragEnd = (event: unknown, info: PanInfo) => {
    if (slides.length <= 1) return
    const threshold = 50
    if (info.offset.x < -threshold) {
      isFirstRender.current = false
      setCurrent((prev) => (prev + 1) % slides.length)
    } else if (info.offset.x > threshold) {
      isFirstRender.current = false
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }
  }

  const hasContent = !!(slides[current].title?.trim() || slides[current].eyebrow?.trim() || slides[current].cta?.trim())

  return (
    <section className="relative w-full aspect-[3/4] md:aspect-[16/9] overflow-hidden bg-brand-charcoal pt-[102px] group">

      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={enterAnimation}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {/* Desktop image (16:9) — hidden on mobile */}
          <Image
            src={slides[current].image}
            alt="CMR Luxury Villa"
            fill
            className="object-cover hidden md:block pointer-events-none select-none"
            priority
            fetchPriority="high"
            draggable={false}
          />
          {/* Mobile image (3:4) — shown on mobile, falls back to desktop image */}
          <Image
            src={
              (slides[current].mobileImage && slides[current].mobileImage.trim() !== '')
                ? slides[current].mobileImage
                : slides[current].image
            }
            alt="CMR Luxury Villa"
            fill
            className="object-cover block md:hidden pointer-events-none select-none"
            priority
            fetchPriority="high"
            draggable={false}
          />
          {/* Dark Overlays for readability — only if slide has text content */}
          {hasContent && (
            <>
              <div className="absolute inset-0 bg-brand-green/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Screen Reader Only H1 for SEO */}
      <h1 className="sr-only">
        CMR Developers — Leading Luxury Villa Builder in Kerala, India
      </h1>

      {/* Slide text — only shown when Sanity data has content */}
      <AnimatePresence mode="wait">
        {(slides[current].eyebrow || slides[current].title) && (
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="absolute bottom-24 left-0 right-0 z-10 px-section"
          >
            {slides[current].eyebrow && (
              <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">
                {decodeHtml(slides[current].eyebrow)}
              </p>
            )}
            {slides[current].title && (
              <h2
                className="font-display font-bold text-brand-ivory leading-none mb-6"
                style={{ fontSize: 'clamp(34px, 5.5vw, 72px)', letterSpacing: '-0.025em' }}
              >
                {decodeHtml(slides[current].title)}
              </h2>
            )}
            {slides[current].cta && slides[current].ctaHref && (
              <a
                href={slides[current].ctaHref}
                className="inline-block px-8 py-3.5 bg-brand-gold text-brand-charcoal font-body text-label font-bold tracking-[0.2em] uppercase hover:bg-brand-ivory transition-colors duration-300"
              >
                {decodeHtml(slides[current].cta)}
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator with Timer Function */}
      <div className="absolute bottom-10 right-8 md:right-16 z-20 flex items-center gap-4 pointer-events-none">
        <span className="font-body text-brand-ivory/60 text-sm font-medium tracking-widest">
          {String(current + 1).padStart(2, '0')}
        </span>
        <div className="w-24 md:w-32 h-[2px] bg-brand-ivory/20 relative overflow-hidden">
          <motion.div
            key={current}
            className="absolute top-0 left-0 h-full bg-brand-gold"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
          />
        </div>
        <span className="font-body text-brand-ivory text-sm font-medium tracking-widest">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

    </section>
  )
}
