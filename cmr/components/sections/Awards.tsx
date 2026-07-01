'use client'

import { motion } from 'framer-motion'

import Image from 'next/image'

const AWARDS_LIST = [
  { 
    id: 1, 
    title: 'Excellence in Modern Architecture Award', 
    tags: ['ArchitectureAward', 'Honor', 'GlobalExcellence'],
    img: '/images/extracted/cmr-awards-1.jpg'
  },
  { 
    id: 2, 
    title: 'Best Construction Quality Achievement Award', 
    tags: ['ArchitectureAward', 'Honor', 'GlobalExcellence'],
    img: '/images/extracted/cmr-awards-2.jpg'
  },
  { 
    id: 3, 
    title: 'Premier Construction Performance Award', 
    tags: ['ArchitectureAward', 'Honor', 'GlobalExcellence'],
    img: '/images/extracted/cmr-awards-3.jpg'
  },
]

interface Award {
  id: number
  title?: string
  name?: string
  tags?: string[]
  img?: string
}

interface AwardsProps {
  initialAwards?: Award[]
}

export default function Awards({ initialAwards }: AwardsProps) {
  // If we want to use WordPress dynamic awards in the future, we can map over `initialAwards`
  // For now, using the hardcoded AWARDS_LIST which matches the new design and tags
  const displayAwards = AWARDS_LIST

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#0A0A0A]">
      {/* Dotted Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #F6F4EE 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Subtle brand glow decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 mix-blend-overlay" />
      </div>

      <div className="px-section relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-4/12 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-brand-gold"></div>
              <span className="font-body text-brand-ivory text-label uppercase tracking-widest3">Award</span>
            </div>
            
            <h2 className="font-display font-medium text-brand-ivory text-4xl md:text-5xl lg:text-[48px] tracking-tight leading-[1.15] mb-12 lg:mb-16 max-w-lg">
              Awards that reflect our passion for perfection
            </h2>
            
            <div className="relative mt-8 lg:ml-8">
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-gold rounded-full blur-[2px] hidden lg:block" />
              <div className="font-display text-brand-ivory text-8xl md:text-[110px] font-bold leading-none mb-3">
                25<span className="text-brand-ivory/80">+</span>
              </div>
              <p className="font-body text-brand-ivory/80 text-body font-medium max-w-[260px] leading-snug mx-auto lg:mx-0">
                Award-Winning Designs That Inspire and Endure.
              </p>
            </div>
          </motion.div>

          {/* Right Award Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-8/12 flex flex-col gap-4 lg:pl-12"
          >
            {AWARDS_LIST.map((award, i) => (
              <motion.div 
                key={award.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-brand-ivory/[0.04] border border-brand-ivory/10 rounded-2xl md:rounded-3xl p-3 sm:pr-8 transition-colors hover:bg-brand-ivory/[0.08]"
              >
                {/* Round Award Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-ivory flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden border border-brand-gold/30">
                  <Image 
                    src={award.img} 
                    alt={award.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                {/* Award Details */}
                <div className="flex-1 flex flex-col justify-center h-full text-center sm:text-left py-2 sm:py-4 w-full">
                  <h3 className="font-body font-bold text-brand-ivory text-[18px] md:text-heading mb-3 sm:mb-4 leading-snug">
                    {award.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    {award.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="font-body text-brand-ivory/60 border border-brand-ivory/15 rounded-full px-4 py-1.5 text-micro md:text-[12px] tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
