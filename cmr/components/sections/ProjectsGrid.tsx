'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  _id: string
  name: string
  slug: string
  location: string
  status: string
  price?: string
  heroImage?: string
  badge?: { num: string; label: string }
  reraNumber?: string
  bhk?: string
}

interface ProjectsGridProps {
  initialProjects?: Project[]
}

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    name: 'Azure Bay Towers',
    slug: 'azure-bay-towers',
    location: 'Kadachira, Kannur',
    status: 'On Going',
    price: '₹60 Lakhs Onwards',
    heroImage: '/images/slide/cmrslide3.webp',
    badge: { num: '32', label: 'Lucky\nHomes' },
    bhk: '3 BHK',
  },
  {
    _id: '2',
    name: 'The Gilded Prism',
    slug: 'the-gilded-prism',
    location: 'Mulanthuruthy, Ernakulam',
    status: 'On Going',
    price: '₹60 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-villa-exterior.jpg',
    badge: { num: '15', label: 'Lucky\nHomes' },
    bhk: '3 BHK',
  },
  {
    _id: '3',
    name: 'Monolith Heights',
    slug: 'monolith-heights',
    location: 'Taliparamba, Kannur',
    status: 'On Going',
    price: '₹48 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-grid-small-3.jpg',
    badge: { num: '20', label: 'Luxury\nVillas' },
    bhk: '3 & 4 BHK',
  },
]

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const router = useRouter()
  const projects = initialProjects && initialProjects.length > 0 ? initialProjects : FALLBACK_PROJECTS
  const displayProjects = projects.slice(0, 3)

  // Search state
  const [location, setLocation] = useState('Any Location')
  const [status, setStatus] = useState('Any Status')

  // Dynamic dropdown options from real data
  const locationOptions = useMemo(() => {
    const locs = new Set(projects.map((p) => {
      // Extract district from "Place, District" format
      const parts = p.location.split(',')
      return parts.length > 1 ? parts[parts.length - 1].trim() : parts[0].trim()
    }))
    return ['Any Location', ...Array.from(locs)]
  }, [projects])

  const statusOptions = useMemo(() => {
    const statuses = new Set(projects.map((p) => p.status))
    return ['Any Status', ...Array.from(statuses)]
  }, [projects])

  const handleSearchNow = () => {
    const params = new URLSearchParams()
    if (location !== 'Any Location') params.set('location', location)
    if (status !== 'Any Status') params.set('status', status)
    const qs = params.toString()
    router.push(`/projects${qs ? `?${qs}` : ''}`)
  }

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
              <span className="font-body text-sm text-brand-charcoal">Villa</span>
              <svg className="w-3 h-3 text-brand-charcoal/50" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M4 6l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block font-body text-[10px] text-brand-charcoal/50 uppercase tracking-wider mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full font-body text-sm text-brand-charcoal bg-transparent border-b border-brand-charcoal/20 pb-2 outline-none cursor-pointer appearance-none"
            >
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="block font-body text-[10px] text-brand-charcoal/50 uppercase tracking-wider mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full font-body text-sm text-brand-charcoal bg-transparent border-b border-brand-charcoal/20 pb-2 outline-none cursor-pointer appearance-none"
            >
              {statusOptions.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <button
              onClick={handleSearchNow}
              className="w-full md:w-auto bg-[#0F2F2B] text-white font-body text-[11px] font-semibold tracking-[0.1em] uppercase px-8 py-4 hover:bg-brand-gold transition-colors cursor-pointer"
            >
              Search Now
            </button>
          </div>
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {displayProjects.map((p, i) => (
            <motion.div 
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/projects/${p.slug}`}>
                <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                  <Image 
                    src={p.heroImage || '/images/extracted/cmr-villa-exterior.jpg'} 
                    alt={`${p.name} - Luxury Villa Project by CMR Developers Kerala`} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* Badges */}
                  {p.badge?.num && (
                    <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-md p-3 text-center min-w-[60px]">
                      <span className="font-display text-2xl text-[#4B5E5B] block leading-none">{p.badge.num}</span>
                      <span className="font-body text-[8px] text-brand-charcoal/60 leading-tight block mt-1 whitespace-pre-line">{p.badge.label}</span>
                    </div>
                  )}
                  {p.price && (
                    <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-md p-3 text-center min-w-[60px]">
                      <span className="font-body text-[10px] text-brand-charcoal font-bold block whitespace-pre-line">{p.price}</span>
                    </div>
                  )}
                  {p.status && (
                    <div className="absolute bottom-0 right-0 bg-[#0F2F2B] text-white px-3 py-1 font-body text-[8px] tracking-[0.2em] uppercase">
                      {p.status}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-xl text-brand-charcoal mb-1">{p.name}</h3>
                  <p className="font-body text-[10px] text-brand-charcoal/50 tracking-[0.15em] uppercase mb-3">{p.location}</p>
                  <div className="flex items-center justify-between border-t border-brand-charcoal/20 pt-3">
                    <span className="font-body text-[13px] text-brand-charcoal font-medium">{p.price}</span>
                    <span className="text-brand-charcoal/40 group-hover:text-brand-gold transition-colors">↗</span>
                  </div>
                </div>
              </Link>
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
