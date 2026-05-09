'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Helper for letter animation
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
  }
}

const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(' ')
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block whitespace-nowrap">
          {word.split('').map((char, j) => (
            <motion.span key={j} variants={letterVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
          {i < words.length - 1 && <motion.span className="inline-block">&nbsp;</motion.span>}
        </motion.span>
      ))}
    </motion.span>
  )
}

const slides = [
  {
    id: 1,
    image: '/images/slide/cmrslide1.webp',
  },
  {
    id: 2,
    image: '/images/slide/cmrslide3.webp',
  },
  {
    id: 3,
    image: '/images/slide/cmrslide4.webp',
  },
  {
    id: 4,
    image: '/images/slide/cmrslide5.webp',
  }
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  // Autoplay
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearTimeout(timer)
  }, [current])

  return (
    <section className="relative w-full h-[90vh] md:h-screen min-h-[600px] overflow-hidden bg-brand-charcoal pt-[102px] group">
      
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <Image 
            src={slides[current].image} 
            alt="CMR Luxury Villa" 
            fill 
            className="object-cover" 
            priority 
          />
          {/* Dark Overlays for readability */}
          <div className="absolute inset-0 bg-brand-green/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Screen Reader Only H1 for SEO */}
      <h1 className="sr-only">
        CMR Developers — Leading Luxury Villa Builder in Kerala, India
      </h1>

      {/* Main Content (Temporarily hidden per user request) */}
      {false && (
        <div className="relative z-10 h-full flex flex-col justify-end pb-32 px-section pointer-events-none">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.02, delayChildren: 0.2 }
              }
            }}
            className="pointer-events-auto w-full px-section"
          >
            {/* Eyebrow */}
            <motion.h2 className="font-body font-normal text-brand-ivory text-xl md:text-3xl mb-1 tracking-wide">
              <AnimatedText text="We are celebrating" />
            </motion.h2>

            {/* Main Heading */}
            <motion.h1 
              className="font-body font-medium text-brand-ivory leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
            >
              <AnimatedText text="handling over" />{' '}
              <AnimatedText text="600+" className="text-brand-gold font-semibold" />{' '}
              <AnimatedText text="villas" /><br className="hidden md:block" />
              <AnimatedText text="in a short span of" />{' '}
              <AnimatedText text="14" className="text-brand-gold font-semibold" />{' '}
              <AnimatedText text="years" />
            </motion.h1>
          </motion.div>
        </div>
      )}

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
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
        <span className="font-body text-brand-ivory text-sm font-medium tracking-widest">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

    </section>
  )
}
