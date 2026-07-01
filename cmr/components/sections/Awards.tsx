'use client'

import { motion } from 'framer-motion'

const AWARDS_LIST = [
  {
    id: 1,
    badgeLine1: 'ULTIMATE',
    badgeLine2: 'WINNER',
    title: 'Excellence in Modern Architecture Award',
    tags: ['ArchitectureAward', 'Honor', 'GlobalExcellence']
  },
  {
    id: 2,
    badgeLine1: 'HYPER',
    badgeLine2: 'BEST',
    title: 'Best Construction Quality Achievement Award',
    tags: ['ArchitectureAward', 'Honor', 'GlobalExcellence']
  },
  {
    id: 3,
    badgeLine1: 'ULTRA',
    badgeLine2: 'PREMIER',
    title: 'Premier Construction Performance Award',
    tags: ['ArchitectureAward', 'Honor', 'GlobalExcellence']
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

import Image from 'next/image'

export default function Awards({ initialAwards }: AwardsProps) {
  const displayAwards = AWARDS_LIST

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-28 overflow-hidden bg-[#0A0A0A]">
      <div className="px-section relative z-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[45%] flex flex-col relative"
          >
            {/* Top Title Section */}
            <div className="mb-10 lg:mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 bg-[#FFD700]"></div>
                <span className="font-body text-white text-[11px] font-bold uppercase tracking-[0.2em]">Award</span>
              </div>
              <h2 className="font-display font-bold text-white text-4xl md:text-[46px] tracking-tight leading-[1.2] max-w-md">
                Awards that reflect our passion for perfection
              </h2>
            </div>

            {/* Bottom 25+ Section with Dotted Cluster Background */}
            <div className="relative flex flex-col text-left py-4 w-full max-w-md">
              {/* Dotted World Map Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 scale-[1.3] md:scale-150 -translate-y-4 md:translate-x-12"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px',
                  backgroundPosition: 'center center',
                  WebkitMaskImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                  maskSize: 'contain',
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat'
                }}
              />

              <div className="relative z-10 flex flex-col items-start lg:pl-6">
                <div className="font-display text-white text-7xl md:text-[90px] font-bold leading-none mb-4">
                  25+
                </div>
                <p className="font-body text-white font-medium text-[15px] leading-snug max-w-[240px]">
                  Award-Winning Designs That Inspire and Endure.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Award Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[55%] flex flex-col gap-5 lg:pt-8"
          >
            {displayAwards.map((award, i) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-5 md:gap-8 bg-[#1f1f1f] rounded-full p-2 pr-6 md:pr-10 w-full transition-all hover:bg-[#252525]"
              >
                {/* Award SVG Image */}
                <div className="w-[85px] h-[85px] md:w-[110px] md:h-[110px] rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/20 p-3 md:p-2">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/icon-award-item-1-silver.svg"
                      alt={award.title || 'Award Badge'}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Award Details */}
                <div className="flex-1 py-3 overflow-hidden">
                  <h3 className="font-body font-bold text-white text-[15px] md:text-[18px] mb-3 leading-snug truncate">
                    {award.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {award.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-body text-white/70 border border-white/10 rounded-full px-4 py-1.5 text-[10px] md:text-[11px] tracking-wide whitespace-nowrap"
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
