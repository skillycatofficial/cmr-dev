'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-white overflow-hidden pt-24">
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="px-section relative z-10 text-center">
        {/* Large 404 number with premium styling */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display font-bold text-brand-green leading-none mb-4"
          style={{ fontSize: 'clamp(120px, 15vw, 220px)', letterSpacing: '-0.05em' }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display font-medium text-brand-charcoal text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight mb-6">
            Even the best paths have<br/>unseen turns.
          </h2>
          
          <p className="font-body text-brand-charcoal/50 text-[15px] md:text-[16px] leading-relaxed max-w-md mx-auto mb-10">
            The architectural marvel you are looking for seems to have moved or does not exist. Let us guide you back to our flagship collections.
          </p>

          {/* Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-3 bg-brand-green text-brand-ivory px-10 py-4 font-body text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-brand-gold transition-colors duration-300 group shadow-xl"
          >
            Return to Sanctuary
            <span className="text-lg leading-none -mt-0.5 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-20"
      />
    </div>
  )
}
