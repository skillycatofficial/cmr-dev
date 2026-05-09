'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'Azure Bay Towers',
    category: 'WATERFRONT DISTRICT',
    price: '$2.4M - $8.9M',
    image: '/images/slide/cmrslide3.webp',
    badgeTopLeft: { text: '32', sub: 'Lucky\nHomes' },
    badgeBottomLeft: { text: '60', sub: 'Lakhs\nOnwards' },
    badgeBottomRight: 'FEATURED'
  },
  {
    id: 2,
    title: 'The Gilded Prism',
    category: 'FINANCIAL CORE',
    price: '$1.8M - $5.5M',
    image: '/images/extracted/cmr-villa-exterior.jpg',
    badgeTopRight: { text: '15', sub: 'Lucky\nHomes' },
    badgeBottomLeft: { text: '60', sub: 'Lakhs\nOnwards' }
  },
  {
    id: 3,
    title: 'Monolith Heights',
    category: 'THE RIDGE',
    price: '$3.2M - $12M',
    image: '/images/extracted/cmr-grid-small-3.jpg',
    badgeTopRight: { text: '20', sub: 'Luxury\nVillas' },
    badgeBottomLeftMal: true
  }
]

export default function ProjectsGrid() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="px-section">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <h2 className="font-display font-medium text-brand-charcoal text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-tight flex items-start gap-4">
            <span>THE ONLY TREE OF<br/>TRUST IN THE LAND OF<br/>ASSETS</span>
            <svg className="w-8 h-8 md:w-12 md:h-12 text-[#B89A5D] mt-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
            </svg>
          </h2>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#f4f4f4] p-4 flex flex-col md:flex-row items-center gap-4 mb-16"
        >
          <div className="flex-1 w-full">
            <label className="block font-body text-[10px] text-brand-charcoal/50 uppercase tracking-wider mb-1">Property Type</label>
            <div className="flex items-center justify-between border-b border-brand-charcoal/20 pb-2">
              <span className="font-body text-sm text-brand-charcoal">All Types</span>
              <svg className="w-3 h-3 text-brand-charcoal/50" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M4 6l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block font-body text-[10px] text-brand-charcoal/50 uppercase tracking-wider mb-1">Location</label>
            <div className="flex items-center justify-between border-b border-brand-charcoal/20 pb-2">
              <span className="font-body text-sm text-brand-charcoal">Any Location</span>
              <svg className="w-3 h-3 text-brand-charcoal/50" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M4 6l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block font-body text-[10px] text-brand-charcoal/50 uppercase tracking-wider mb-1">Status</label>
            <div className="flex items-center justify-between border-b border-brand-charcoal/20 pb-2">
              <span className="font-body text-sm text-brand-charcoal">Any Status</span>
              <svg className="w-3 h-3 text-brand-charcoal/50" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M4 6l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#0F2F2B] text-white font-body text-[11px] font-semibold tracking-[0.1em] uppercase px-8 py-4 hover:bg-brand-gold transition-colors">
              Search Now
            </button>
          </div>
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                <Image 
                  src={p.image} 
                  alt={`${p.title} - Luxury Villa Project by CMR Developers Kerala`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Badges */}
                {p.badgeTopLeft && (
                  <div className="absolute top-0 left-0 bg-white/90 backdrop-blur-md p-3 text-center min-w-[60px]">
                    <span className="font-display text-2xl text-[#4B5E5B] block leading-none">{p.badgeTopLeft.text}</span>
                    <span className="font-body text-[8px] text-brand-charcoal/60 leading-tight block mt-1 whitespace-pre-line">{p.badgeTopLeft.sub}</span>
                  </div>
                )}
                {p.badgeTopRight && (
                  <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-md p-3 text-center min-w-[60px]">
                    <span className="font-display text-2xl text-[#4B5E5B] block leading-none">{p.badgeTopRight.text}</span>
                    <span className="font-body text-[8px] text-brand-charcoal/60 leading-tight block mt-1 whitespace-pre-line">{p.badgeTopRight.sub}</span>
                  </div>
                )}
                {p.badgeBottomLeft && (
                  <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-md p-3 text-center min-w-[60px]">
                    <span className="font-display text-2xl text-brand-charcoal block leading-none">{p.badgeBottomLeft.text}</span>
                    <span className="font-body text-[8px] text-brand-charcoal/60 leading-tight block mt-1 whitespace-pre-line">{p.badgeBottomLeft.sub}</span>
                  </div>
                )}
                {p.badgeBottomLeftMal && (
                  <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-md p-3 text-center min-w-[60px]">
                    <span className="font-display text-xl text-[#8C2020] font-bold block mb-1">1</span>
                    <span className="font-body text-[10px] text-brand-charcoal font-bold block">ലക്ഷം</span>
                  </div>
                )}
                {p.badgeBottomRight && (
                  <div className="absolute bottom-0 right-0 bg-[#0F2F2B] text-white px-3 py-1 font-body text-[8px] tracking-[0.2em] uppercase">
                    {p.badgeBottomRight}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-display text-xl text-brand-charcoal mb-1">{p.title}</h3>
                <p className="font-body text-[10px] text-brand-charcoal/50 tracking-[0.15em] uppercase mb-3">{p.category}</p>
                <div className="flex items-center justify-between border-t border-brand-charcoal/20 pt-3">
                  <span className="font-body text-[13px] text-brand-charcoal font-medium">{p.price}</span>
                  <span className="text-brand-charcoal/40 group-hover:text-brand-gold transition-colors">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="w-full sm:w-auto text-center bg-[#0F2F2B] text-white font-body text-[11px] font-semibold tracking-[0.2em] uppercase px-12 py-4 hover:bg-brand-gold transition-colors">
            Enquire Now
          </Link>
          <Link href="/projects" className="w-full sm:w-auto text-center border border-brand-charcoal/20 text-brand-charcoal font-body text-[11px] font-semibold tracking-[0.2em] uppercase px-12 py-4 hover:border-[#0F2F2B] transition-colors">
            Explore Projects
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
