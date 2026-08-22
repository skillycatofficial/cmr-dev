'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { getAllProjects } from '@/lib/wordpress'
import { decodeHtml } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Project {
  name: string
  slug: string
  location?: string     // legacy display string
  district?: string     // e.g. "Kannur"
  sub_location?: string // e.g. "Kadachira"
  status?: string
  price?: string
  heroImage?: string
  bhk?: string
  units?: string
  featured?: boolean
  overview?: string
}
interface SubLocation { name: string; projects: Project[] }
interface District     { name: string; subLocations: SubLocation[] }

// ─── Fallback data ────────────────────────────────────────────────────────────
const FALLBACK_PROJECTS: Project[] = [
  {
    name: 'Alvina Harmony',
    slug: 'alvina-harmony',
    district: 'Kannur',
    sub_location: 'Kadachira',
    status: 'On Going',
    price: '₹55 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-villa-exterior.jpg',
    bhk: '3 & 4 BHK',
    units: '34 Luxury Villas',
    featured: true,
  },
  {
    name: 'Anna Harmony',
    slug: 'anna-harmony',
    district: 'Kannur',
    sub_location: 'Chala',
    status: 'Just Launched',
    price: '₹48 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-grid-small-3.jpg',
    bhk: '3 BHK',
    units: '20 Luxury Villas',
  },
  {
    name: 'Aiza Silver Hills',
    slug: 'aiza-silver-hills',
    district: 'Kannur',
    sub_location: 'Vayattuparamba',
    status: 'On Going',
    price: '₹75 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-grid-small-4.jpg',
    bhk: '3 & 4 BHK',
    units: '15 Premium Villas',
  },
  {
    name: 'Alvina Haven',
    slug: 'alvina-haven',
    district: 'Kannur',
    sub_location: 'Taliparamba',
    status: 'On Going',
    price: '₹52 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-projects-mid-1.jpg',
    bhk: '3 BHK',
    units: '24 Luxury Villas',
  },
  {
    name: 'Aiza Harmony',
    slug: 'aiza-harmony',
    district: 'Ernakulam',
    sub_location: 'Mulanthuruthy',
    status: 'On Going',
    price: '₹65 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-interior-living.jpg',
    bhk: '3 BHK',
    units: '24 Premium Villas',
    featured: true,
  },
  {
    name: 'Aina Harmony',
    slug: 'aina-harmony',
    district: 'Ernakulam',
    sub_location: 'Angamaly',
    status: 'On Going',
    price: '₹58 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-lifecycle-villa.jpg',
    bhk: '3 BHK',
    units: '28 Luxury Villas',
  },
  {
    name: 'Aiza Golden Hills',
    slug: 'aiza-golden-hills',
    district: 'Ernakulam',
    sub_location: 'Mulanthuruthy',
    status: 'Completed',
    price: '₹70 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-grid-small-5.jpg',
    bhk: '3 & 4 BHK',
    units: '22 Luxury Villas',
  },
  {
    name: 'Aina Paradise',
    slug: 'aina-paradise',
    district: 'Kottayam',
    sub_location: 'Changanassery',
    status: 'On Going',
    price: '₹62 Lakhs Onwards',
    heroImage: '/images/extracted/cmr-grid-small-6.jpg',
    bhk: '3 & 4 BHK',
    units: '18 Premium Villas',
  },
]

// ─── Legacy location parser (fallback for old WP data) ───────────────────────
const KNOWN_DISTRICTS = new Set([
  'Kannur','Ernakulam','Kottayam','Kozhikode','Thrissur',
  'Malappuram','Palakkad','Wayanad','Kasaragod','Alappuzha',
  'Pathanamthitta','Kollam','Thiruvananthapuram','Idukki',
])
const LEGACY_SUB_TO_DISTRICT: Record<string, string> = {
  'Karuvanchal': 'Kannur', 'Taliparamba': 'Kannur', 'Iritty': 'Kannur',
  'Payyanur': 'Kannur', 'Angamaly': 'Ernakulam', 'Mulanthuruthy': 'Ernakulam',
  'Perumbavoor': 'Ernakulam', 'Changanassery': 'Kottayam', 'Kanjirappally': 'Kottayam',
}
function legacyParseLocation(location = ''): { subLocation: string; district: string } {
  const parts = location.split(',').map(s => s.trim()).filter(Boolean)
  if (!parts.length) return { subLocation: '', district: 'Other' }
  if (parts.length === 1) {
    const only = parts[0]
    return KNOWN_DISTRICTS.has(only)
      ? { subLocation: '', district: only }
      : { subLocation: only, district: LEGACY_SUB_TO_DISTRICT[only] ?? 'Other' }
  }
  const last = parts[parts.length - 1]
  const rest = parts.slice(0, -1).join(', ')
  if (KNOWN_DISTRICTS.has(last)) return { subLocation: rest, district: last }
  const mapped = LEGACY_SUB_TO_DISTRICT[last]
  return mapped ? { subLocation: rest, district: mapped } : { subLocation: rest, district: last }
}

// ─── Grouping ─────────────────────────────────────────────────────────────────
function groupProjectsByDistrict(projects: Project[]): District[] {
  const districtMap = new Map<string, Map<string, Project[]>>()
  for (const p of projects) {
    p.name = decodeHtml(p.name)
    if (p.location) p.location = decodeHtml(p.location)
    if (p.district) p.district = decodeHtml(p.district)
    if (p.sub_location) p.sub_location = decodeHtml(p.sub_location)

    let district: string, subLocation: string
    if (p.district?.trim()) {
      district    = p.district.trim()
      subLocation = p.sub_location?.trim() || district
    } else {
      const parsed = legacyParseLocation(p.location)
      district    = parsed.district
      subLocation = parsed.subLocation || parsed.district
    }
    if (!districtMap.has(district)) districtMap.set(district, new Map())
    const slMap = districtMap.get(district)!
    if (!slMap.has(subLocation)) slMap.set(subLocation, [])
    slMap.get(subLocation)!.push(p)
  }
  const ORDER = ['Kannur', 'Ernakulam', 'Kottayam', 'Kozhikode', 'Thrissur']
  const entries = Array.from(districtMap.entries())
  entries.sort(([a], [b]) => {
    const ai = ORDER.indexOf(a), bi = ORDER.indexOf(b)
    if (ai !== -1 && bi !== -1) return ai - bi
    if (ai !== -1) return -1
    if (bi !== -1) return 1
    return a.localeCompare(b)
  })
  return entries.map(([dist, slMap]) => ({
    name: dist,
    subLocations: Array.from(slMap.entries()).map(([name, projs]) => ({ name, projects: projs })),
  }))
}

// ─── Nav links ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home',               href: '/' },
  { label: 'About Us',           href: '/about-us' },
  { label: 'Projects',           href: '/projects', hasProjects: true },
  { label: 'Villa Customisation', href: '/villa-construction-kerala' },
  { label: 'NRI Investment',     href: '/nri-investment-kerala' },
  { label: 'Testimonials',       href: '/testimonials' },
  { label: 'Blog',               href: '/blog' },
  { label: 'Careers',            href: '/careers' },
  { label: 'Contact Us',         href: '/contact-us' },
]

// ─── Helper Icons ──────────────────────────────────────────────────────────────
function ChevronRight({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-3 h-3 flex-shrink-0 ${className}`} viewBox="0 0 12 12" fill="none">
      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-3 h-3 flex-shrink-0 ${className}`} viewBox="0 0 12 12" fill="none">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function MapPinIcon({ className = 'w-3.5 h-3.5 flex-shrink-0' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// ─── Desktop: Luxury Mega Menu ───────────────────────────────────────────────
function ProjectsMenu({ districts }: { districts: District[]; scrolled: boolean }) {
  const [activeDistrict,    setActiveDistrict]    = useState<string | null>(districts[0]?.name || null)
  const [activeSubLocation, setActiveSubLocation] = useState<string | null>(districts[0]?.subLocations[0]?.name || null)

  const districtTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const subLocationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeDistrictData    = districts.find(d  => d.name  === activeDistrict)
  const activeSubLocationData = activeDistrictData?.subLocations.find(sl => sl.name === activeSubLocation)

  // Ensure defaults if data loads late or changes
  useEffect(() => {
    if (!activeDistrict && districts.length > 0) {
      setActiveDistrict(districts[0].name)
      if (districts[0].subLocations.length > 0) {
        setActiveSubLocation(districts[0].subLocations[0].name)
      }
    }
  }, [districts, activeDistrict])

  const handleDistrictEnter = (name: string) => {
    if (districtTimeoutRef.current) clearTimeout(districtTimeoutRef.current)
    if (subLocationTimeoutRef.current) clearTimeout(subLocationTimeoutRef.current)
    districtTimeoutRef.current = setTimeout(() => {
      setActiveDistrict(name)
      const districtData = districts.find(d => d.name === name)
      if (districtData && districtData.subLocations.length > 0) {
        setActiveSubLocation(districtData.subLocations[0].name)
      } else {
        setActiveSubLocation(null)
      }
    }, 100)
  }

  const handleSubLocationEnter = (name: string) => {
    if (subLocationTimeoutRef.current) clearTimeout(subLocationTimeoutRef.current)
    subLocationTimeoutRef.current = setTimeout(() => {
      setActiveSubLocation(name)
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (districtTimeoutRef.current) clearTimeout(districtTimeoutRef.current)
      if (subLocationTimeoutRef.current) clearTimeout(subLocationTimeoutRef.current)
    }
  }, [])

  // Count total projects in a district
  const getDistrictProjectCount = (d: District) => {
    return d.subLocations.reduce((acc, sl) => acc + sl.projects.length, 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 12, x: "-50%" }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed top-[98px] left-1/2 z-50 flex pt-2"
    >
      <div 
        className="bg-white border-2 border-gray-200/80 border-t-4 border-t-brand-gold shadow-[0_30px_70px_-15px_rgba(0,0,0,0.22)] flex rounded-3xl overflow-hidden w-[1180px] max-w-[95vw] max-h-[calc(92vh-100px)] transition-all duration-200"
      >
        {/* Level 1 – Districts Sidebar */}
        <div className="w-[260px] bg-gray-50/90 border-r-2 border-gray-200/70 py-6 flex flex-col justify-between flex-shrink-0 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div>
            <div className="px-6 pb-4 text-[11px] font-extrabold tracking-[0.2em] uppercase text-brand-gold flex items-center gap-2">
              <span>DISTRICTS</span>
            </div>
            <div className="space-y-1 px-3">
              {districts.map((d) => {
                const count = getDistrictProjectCount(d)
                const isActive = activeDistrict === d.name
                return (
                  <div
                    key={d.name}
                    onMouseEnter={() => handleDistrictEnter(d.name)}
                    className={`group flex items-center justify-between px-5 py-3.5 rounded-xl cursor-pointer transition-colors duration-150 text-[13.5px] font-bold tracking-wider uppercase ${
                      isActive
                        ? 'bg-brand-green/5 text-brand-green font-black'
                        : 'text-brand-charcoal/70 hover:text-brand-green hover:bg-brand-green/[0.02]'
                    }`}
                  >
                    <span>{d.name}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10.5px] px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                        isActive ? 'bg-brand-green/15 text-brand-green' : 'bg-gray-200 text-brand-charcoal/60 group-hover:bg-brand-green/10 group-hover:text-brand-green'
                      }`}>
                        {count}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                        isActive ? 'translate-x-1 text-brand-green opacity-100' : 'group-hover:translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="border-t border-gray-200/80 mt-6 pt-4 px-4">
            <Link
              href="/projects"
              className="flex items-center justify-between px-5 py-3 rounded-xl text-[12.5px] font-bold tracking-widest uppercase transition-all duration-150 text-brand-gold hover:text-white hover:bg-brand-gold shadow-sm border border-brand-gold/20"
            >
              <span>All Projects</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Level 2 – Developments & Location Filter Grid */}
        <div className="flex-1 flex flex-col p-7 overflow-hidden">
          {activeDistrictData && (
            <motion.div
              key={activeDistrictData.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col h-full justify-between overflow-hidden"
            >
              {/* Top: Location Filter Pills */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-between pb-3.5">
                  <div className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-brand-charcoal/50">
                    Locations in {activeDistrictData.name}
                  </div>
                  <div className="text-[12px] font-medium text-brand-charcoal/40">
                    Select location to filter
                  </div>
                </div>

                <div className="flex gap-2.5 overflow-x-auto pb-3.5 border-b border-gray-200/80 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {activeDistrictData.subLocations.map(sl => {
                    const isActiveSL = activeSubLocation === sl.name
                    return (
                      <button
                        key={sl.name}
                        onMouseEnter={() => handleSubLocationEnter(sl.name)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-bold tracking-wider uppercase transition-all duration-200 ${
                          isActiveSL
                            ? 'bg-brand-green text-white shadow-md'
                            : 'bg-gray-100 text-brand-charcoal/70 hover:bg-gray-200 hover:text-brand-charcoal'
                        }`}
                      >
                        {sl.name} ({sl.projects.length})
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Middle: Scrollable Project Cards Grid */}
              <div className="py-4 flex-1 overflow-y-auto overscroll-contain pr-2 my-1 max-h-[460px] xl:max-h-[500px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-brand-gold/40 hover:[&::-webkit-scrollbar-thumb]:bg-brand-gold/70 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="pb-4 text-[11px] font-extrabold tracking-[0.2em] uppercase text-brand-charcoal/50 flex items-center justify-between sticky top-0 bg-white z-10 py-1">
                  <span>{activeSubLocation ? `Developments in ${activeSubLocation}` : 'Developments'}</span>
                  <span className="text-[12px] font-normal lowercase italic text-gray-400">scroll to view all developments</span>
                </div>

                {activeSubLocationData?.projects && activeSubLocationData.projects.length > 0 ? (
                  <div className="grid grid-cols-2 gap-5">
                    {activeSubLocationData.projects.map(p => (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="group/item flex gap-4 p-4 rounded-2xl border-2 border-gray-200/80 bg-white hover:border-brand-gold hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Image Thumbnail */}
                        <div className="relative w-[150px] h-[115px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 shadow-inner">
                          <Image
                            src={p.heroImage || '/images/extracted/cmr-villa-exterior.jpg'}
                            alt={p.name}
                            fill
                            className="object-cover group-hover/item:scale-105 transition-transform duration-500"
                          />
                          {p.status && (
                            <span className={`absolute top-2 left-2 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md shadow-md backdrop-blur-md ${
                              p.status === 'On Going'
                                ? 'bg-brand-gold text-brand-charcoal'
                                : p.status === 'Just Launched'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-black/70 text-white'
                            }`}>
                              {p.status === 'On Going' ? 'Ongoing' : p.status}
                            </span>
                          )}
                        </div>

                        {/* Card Text & Pricing */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="font-display text-[17.5px] font-bold text-brand-charcoal group-hover/item:text-brand-green transition-colors truncate leading-tight">
                              {p.name}
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="text-[15px] font-extrabold text-brand-gold font-display">
                              {p.price || '₹55 Lakhs Onwards'}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-md bg-brand-green/10 text-brand-green border border-brand-green/20">
                                {p.bhk || '3 & 4 BHK'}
                              </span>
                              {p.units && (
                                <span className="text-[10.5px] font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-md truncate">
                                  {p.units}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-[14px] italic text-gray-400 py-10 text-center bg-gray-50/80 rounded-2xl border border-dashed border-gray-200">
                    No developments currently listed in this location.
                  </div>
                )}
              </div>

              {/* Bottom bar inside middle section */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[12px] text-gray-500 flex-shrink-0">
                <span>Showing {activeSubLocationData?.projects.length || 0} active developments</span>
                <Link href="/projects" className="text-brand-gold font-bold hover:underline flex items-center gap-1 text-[13px]">
                  <span>View Full Portfolio</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Mobile: accordion row for Projects ──────────────────────────────────────
function MobileProjectsAccordion({
  districts,
  onClose,
}: {
  districts: District[]
  onClose: () => void
}) {
  const [openDistrict,    setOpenDistrict]    = useState<string | null>(null)
  const [openSubLocation, setOpenSubLocation] = useState<string | null>(null)

  const toggleDistrict = (name: string) => {
    setOpenDistrict(prev => (prev === name ? null : name))
    setOpenSubLocation(null)
  }
  const toggleSubLocation = (name: string) => {
    setOpenSubLocation(prev => (prev === name ? null : name))
  }

  return (
    <div className="pl-2 pb-2 space-y-1">
      {districts.map((d) => (
        <div key={d.name} className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.01]">
          {/* District row */}
          <button
            onClick={() => toggleDistrict(d.name)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-display text-[12px] font-bold tracking-[0.15em] uppercase transition-colors ${
              openDistrict === d.name ? 'text-brand-gold bg-white/[0.03]' : 'text-brand-ivory/90 hover:text-brand-gold'
            }`}
          >
            <span>{d.name}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${openDistrict === d.name ? 'rotate-180 text-brand-gold' : 'text-brand-ivory/40'}`}
            />
          </button>

          <AnimatePresence>
            {openDistrict === d.name && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="bg-black/10"
              >
                <div className="px-4 py-2 space-y-1">
                  {d.subLocations.map((sl) => (
                    <div key={sl.name} className="border-b border-white/5 last:border-0 pb-1 last:pb-0">
                      {/* Sub-location row */}
                      <button
                        onClick={() => toggleSubLocation(sl.name)}
                        className={`w-full flex items-center justify-between py-2 text-left text-[11px] tracking-wider uppercase font-semibold transition-colors ${
                          openSubLocation === sl.name ? 'text-white' : 'text-brand-ivory/60 hover:text-white'
                        }`}
                      >
                        <span>{sl.name}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${openSubLocation === sl.name ? 'rotate-180 text-white' : 'text-brand-ivory/30'}`}
                        />
                      </button>

                      <AnimatePresence>
                        {openSubLocation === sl.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-2 py-1.5 space-y-2">
                              {sl.projects.map((p) => (
                                <Link
                                  key={p.slug}
                                  href={`/projects/${p.slug}`}
                                  onClick={onClose}
                                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-ivory hover:text-white transition-colors active:translate-x-0.5 duration-150 border border-white/5"
                                >
                                  {p.heroImage && (
                                    <div className="relative w-12 h-10 rounded overflow-hidden flex-shrink-0 bg-black/40">
                                      <Image
                                        src={p.heroImage}
                                        alt={p.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-bold text-white truncate">{p.name}</div>
                                    <div className="text-[10px] text-brand-gold font-semibold">{p.price || '₹55 Lakhs Onwards'}</div>
                                  </div>
                                  {p.status && (
                                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold tracking-wider uppercase whitespace-nowrap flex-shrink-0 ${
                                      p.status === 'On Going'
                                        ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/20'
                                        : 'bg-white/10 text-white/50'
                                    }`}>
                                      {p.status}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* View All */}
      <Link
        href="/projects"
        onClick={onClose}
        className="block pt-3 pb-1 text-[12px] font-bold text-brand-gold hover:text-white transition-colors tracking-widest uppercase pl-4"
      >
        → View All Projects
      </Link>
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeDD,  setActiveDD]  = useState<string | null>(null)
  const [districts, setDistricts] = useState<District[]>(() => groupProjectsByDistrict(FALLBACK_PROJECTS))
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)
  const ddTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu or megamenu is open
  useEffect(() => {
    if (menuOpen || activeDD === 'Projects') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, activeDD])

  // Fetch projects from WordPress
  useEffect(() => {
    let active = true
    getAllProjects()
      .then((data) => {
        if (active && data?.length > 0) {
          const mapped: Project[] = data.map((p: Record<string, string | number | boolean | { num?: string } | undefined>) => ({
            name:         String(p.name || ''),
            slug:         String(p.slug || ''),
            location:     p.location ? String(p.location) : undefined,
            district:     p.district ? String(p.district) : undefined,
            sub_location: p.sub_location ? String(p.sub_location) : undefined,
            status:       p.status ? String(p.status) : undefined,
            price:        p.price ? String(p.price) : p.starting_price ? String(p.starting_price) : 'Price on Request',
            heroImage:    p.heroImage ? String(p.heroImage) : p.featured_image ? String(p.featured_image) : p.image ? String(p.image) : '/images/extracted/cmr-villa-exterior.jpg',
            bhk:          p.bhk ? String(p.bhk) : p.configurations ? String(p.configurations) : '3 & 4 BHK',
            units:        p.units ? String(p.units) : p.badge && typeof p.badge === 'object' && p.badge.num ? `${p.badge.num} Villas` : 'Luxury Villas',
            featured:     Boolean(p.featured),
          }))
          setDistricts(groupProjectsByDistrict(mapped))
        }
      })
      .catch((err) => console.error('Navbar: project fetch failed', err))
    return () => { active = false }
  }, [])

  // Desktop hover with flicker-prevention delay
  const handleMouseEnter = (label: string) => {
    if (ddTimeout.current) clearTimeout(ddTimeout.current)
    setActiveDD(label)
  }
  const handleMouseLeave = () => {
    ddTimeout.current = setTimeout(() => setActiveDD(null), 120)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setMobileProjectsOpen(false)
  }

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md' 
            : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 h-16 md:h-20 xl:h-[102px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 relative w-[82px] h-[82px] md:w-[90px] md:h-[90px] xl:w-[120px] xl:h-[120px] self-start -mt-1 xl:-top-2"
          >
            <Image
              src="/images/cmr-logo.png"
              alt="CMR Developers"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-end">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2.5 font-body text-[14px] font-normal whitespace-nowrap transition-colors duration-200 ${
                    scrolled
                      ? 'text-brand-charcoal/80 hover:text-brand-green'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.hasProjects && (
                    <ChevronDown className="opacity-60" />
                  )}
                </Link>

                <AnimatePresence>
                  {link.hasProjects && activeDD === link.label && (
                    <ProjectsMenu districts={districts} scrolled={scrolled} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search — desktop only */}
            <button
              aria-label="Search"
              className={`hidden xl:flex w-9 h-9 items-center justify-center transition-colors ${
                scrolled
                  ? 'text-brand-charcoal/60 hover:text-brand-green'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Hamburger — mobile/tablet */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden flex flex-col gap-[5px] p-2 -mr-1"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`block w-6 h-[2px] rounded-full ${scrolled || menuOpen ? 'bg-brand-charcoal' : 'bg-white'}`}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className={`block w-6 h-[2px] rounded-full ${scrolled || menuOpen ? 'bg-brand-charcoal' : 'bg-white'}`}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`block w-6 h-[2px] rounded-full ${scrolled || menuOpen ? 'bg-brand-charcoal' : 'bg-white'}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile / Tablet Drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 xl:hidden"
              onClick={closeMenu}
            />

            {/* Drawer panel — slides in from right */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#1a2e2b] flex flex-col xl:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
                <Link href="/" onClick={closeMenu}>
                  <span className="text-brand-gold font-display font-bold text-lg tracking-wide">CMR Developers</span>
                </Link>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Scrollable nav links */}
              <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-0">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    {link.hasProjects ? (
                      <>
                        {/* Projects accordion trigger */}
                        <button
                          onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                          className="w-full flex items-center justify-between py-4 border-b border-white/10 text-left font-display font-semibold text-[17px] text-brand-ivory hover:text-brand-gold transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={`transition-transform duration-250 ${mobileProjectsOpen ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileProjectsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-1 pb-3">
                                <MobileProjectsAccordion
                                  districts={districts}
                                  onClose={closeMenu}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="block py-4 border-b border-white/10 font-display font-semibold text-[17px] text-brand-ivory hover:text-brand-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-5 py-4 border-t border-white/10 flex-shrink-0 space-y-2">
                <a
                  href="tel:+919206838383"
                  className="flex items-center gap-2 text-brand-ivory/70 text-sm hover:text-brand-gold transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.38 1.18 2 2 0 012.37 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.34a16 16 0 006.29 6.29l1.41-1.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.51v1.41z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +91 9206 838 383
                </a>
                <a
                  href="mailto:admin@cmrdevelopers.com"
                  className="flex items-center gap-2 text-brand-ivory/70 text-sm hover:text-brand-gold transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  admin@cmrdevelopers.com
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
