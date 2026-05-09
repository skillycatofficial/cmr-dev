'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  width?: 'fit-content' | '100%'
  delay?: number
  duration?: number
  y?: number
  x?: number
}

export const Reveal = ({ 
  children, 
  width = '100%', 
  delay = 0, 
  duration = 0.8,
  y = 30,
  x = 0
}: RevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      style={{ width }}
    >
      {children}
    </motion.div>
  )
}
