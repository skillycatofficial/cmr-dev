'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
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
interface District { name: string; subLocations: SubLocation[] }

// ─── Legacy location parser (normalizes older WP records without district/sub_location fields) ──
const KNOWN_DISTRICTS = new Set([
  'Kannur', 'Ernakulam', 'Kottayam', 'Kozhikode', 'Thrissur',
  'Malappuram', 'Palakkad', 'Wayanad', 'Kasaragod', 'Alappuzha',
  'Pathanamthitta', 'Kollam', 'Thiruvananthapuram', 'Idukki',
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
      district = p.district.trim()
      subLocation = p.sub_location?.trim() || district
    } else {
      const parsed = legacyParseLocation(p.location)
      district = parsed.district
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
const primaryNavLinks = [
  { label: 'Projects', href: '/projects', hasProjects: true },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Videos', href: '/videos' },
  { label: 'Careers', href: '/careers' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Gallery', href: '/gallery' },
]

const moreNavLinks = [
  { label: 'Villa Customisation', href: '/villa-construction-kerala', desc: 'Tailored luxury villa design & build' },
  { label: 'NRI Investment', href: '/nri-investment-kerala', desc: 'End-to-end guidance for NRI buyers' },
  { label: 'Blog', href: '/blog', desc: 'Architecture insights & updates' },
]

const mobileNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects', hasProjects: true },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Videos', href: '/videos' },
  { label: 'Careers', href: '/careers' },
  { label: 'Villa Customisation', href: '/villa-construction-kerala' },
  { label: 'NRI Investment', href: '/nri-investment-kerala' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
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

// ─── Desktop: More Dropdown Menu ──────────────────────────────────────────────
function MoreMenu({ onClose }: { onClose?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full right-0 mt-3 w-72 bg-white border border-gray-200/90 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden z-50 p-2.5"
    >
      <div className="px-3 py-2 border-b border-gray-100 mb-1">
        <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-brand-gold">
          EXPLORE MORE
        </span>
      </div>
      <div className="space-y-1">
        {moreNavLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="flex flex-col px-3.5 py-2.5 rounded-xl hover:bg-brand-green/5 transition-colors group"
          >
            <div className="flex items-center justify-between text-[13.5px] font-bold text-brand-charcoal group-hover:text-brand-green transition-colors">
              <span>{item.label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-green" />
            </div>
            <span className="text-[11px] text-gray-500 group-hover:text-gray-700 transition-colors font-body mt-0.5">
              {item.desc}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Default District Fallbacks ───────────────────────────────────────────────
const DEFAULT_DISTRICTS: District[] = [
  {
    name: 'Kannur',
    subLocations: [
      {
        name: 'Nadal',
        projects: [
          { name: 'CMR Villa Nadal', slug: 'cmr-villa-nadal', status: 'Ongoing', price: '₹55 Lakhs' },
        ],
      },
      {
        name: 'Kadachira',
        projects: [
          { name: 'Alvina Harmony', slug: 'alvina-harmony', status: 'Ongoing', price: '₹55 Lakhs' },
        ],
      },
      {
        name: 'Chala',
        projects: [
          { name: 'CMR Villa Chala', slug: 'cmr-villa-chala', status: 'Ongoing', price: '₹58 Lakhs' },
        ],
      },
      {
        name: 'Vayattuparamba',
        projects: [
          { name: 'CMR Vayattuparamba', slug: 'cmr-vayattuparamba', status: 'Ongoing', price: '₹49 Lakhs' },
        ],
      },
      {
        name: 'Pilathara',
        projects: [
          { name: 'Aiza Golden Hills', slug: 'aiza-golden-hills', status: 'Ongoing', price: '₹55 Lakhs' },
        ],
      },
      {
        name: 'Kanhirangad',
        projects: [
          { name: 'CMR Kanhirangad Villas', slug: 'cmr-kanhirangad', status: 'Just Launched', price: '₹50 Lakhs' },
        ],
      },
      {
        name: 'Karuvanchal',
        projects: [
          { name: 'Anna Haven', slug: 'anna-haven', status: 'Just Launched', price: '₹48 Lakhs' },
        ],
      },
      {
        name: 'Taliparamba',
        projects: [
          { name: 'Aina Harmony', slug: 'aina-harmony', status: 'Completed', price: '₹62 Lakhs' },
        ],
      },
    ],
  },
  {
    name: 'Ernakulam',
    subLocations: [
      {
        name: 'Mulanthuruthy',
        projects: [
          { name: 'Aiza Harmony', slug: 'aiza-harmony', status: 'Ongoing', price: '₹58 Lakhs' },
        ],
      },
      {
        name: 'Angamaly',
        projects: [
          { name: 'CMR Villa Angamaly', slug: 'cmr-villa-angamaly', status: 'Just Launched', price: '₹52 Lakhs' },
        ],
      },
      {
        name: 'Perumbavoor',
        projects: [
          { name: 'CMR Villa Perumbavoor', slug: 'cmr-villa-perumbavoor', status: 'Ongoing', price: '₹50 Lakhs' },
        ],
      },
    ],
  },
  {
    name: 'Kottayam',
    subLocations: [
      {
        name: 'Changanassery',
        projects: [
          { name: 'CMR Villa Changanassery', slug: 'cmr-villa-changanassery', status: 'Ongoing', price: '₹54 Lakhs' },
        ],
      },
      {
        name: 'Kanjirappally',
        projects: [
          { name: 'CMR Villa Kanjirappally', slug: 'cmr-villa-kanjirappally', status: 'Just Launched', price: '₹49 Lakhs' },
        ],
      },
    ],
  },
]

// ─── Desktop: 3-Column Cascading Menu with Ultra-Smooth Reveal ──────────────
function ProjectsMenu({
  districts,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  districts: District[]
  scrolled?: boolean
  loading?: boolean
  onClose?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  const activeDistrictsList = districts.length > 0 ? districts : DEFAULT_DISTRICTS

  const [activeDistrictName, setActiveDistrictName] = useState<string | null>(null)
  const [activeSubLocationName, setActiveSubLocationName] = useState<string | null>(null)

  const activeDistrict = activeDistrictName
    ? activeDistrictsList.find(d => d.name === activeDistrictName) || null
    : null

  const activeSubLocation = activeDistrict && activeSubLocationName
    ? activeDistrict.subLocations.find(sl => sl.name === activeSubLocationName) || null
    : null

  const handleDistrictHover = (name: string) => {
    setActiveDistrictName(name)
    setActiveSubLocationName(null) // No sub-location active by default when district is hovered!
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 mt-3 flex items-stretch bg-white border border-gray-200/90 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden z-50 p-2.5 text-left divide-x divide-gray-100"
    >
      {/* ── Level 1: Districts Column ── */}
      <div className="w-[190px] pr-2.5 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="px-3 py-2 border-b border-gray-100 mb-1">
            <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-brand-gold">
              DISTRICTS
            </span>
          </div>
          <div className="space-y-0.5">
            {activeDistrictsList.map((d) => {
              const isActive = activeDistrictName === d.name
              return (
                <button
                  key={d.name}
                  type="button"
                  onMouseEnter={() => handleDistrictHover(d.name)}
                  onClick={() => handleDistrictHover(d.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-brand-green/10 text-brand-green font-bold shadow-xs'
                      : 'text-brand-charcoal hover:bg-gray-50 hover:text-brand-green'
                  }`}
                >
                  <span>{d.name}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-all duration-200 ${isActive ? 'text-brand-green opacity-100 translate-x-0.5' : 'text-gray-400 opacity-40'}`} />
                </button>
              )
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 mt-2">
          <Link
            href="/projects"
            onClick={onClose}
            className="block px-3 py-1.5 rounded-lg text-[11.5px] font-bold text-brand-gold hover:text-brand-green hover:bg-brand-gold/10 transition-colors uppercase tracking-wider text-center"
          >
            All Projects
          </Link>
        </div>
      </div>

      {/* ── Level 2: Sub-Locations Column ── */}
      <AnimatePresence mode="wait">
        {activeDistrict && (
          <motion.div
            key={activeDistrict.name}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 215 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 overflow-hidden"
          >
            <div className="w-[215px] px-2.5 flex flex-col justify-between h-full">
              <div>
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-brand-gold truncate block">
                    LOCATIONS IN {activeDistrict.name}
                  </span>
                </div>
                <div className="space-y-0.5 max-h-[310px] overflow-y-auto scrollbar-none">
                  {activeDistrict.subLocations.map((sl) => {
                    const isActiveSL = activeSubLocationName === sl.name
                    return (
                      <button
                        key={sl.name}
                        type="button"
                        onMouseEnter={() => setActiveSubLocationName(sl.name)}
                        onClick={() => setActiveSubLocationName(sl.name)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 text-left ${
                          isActiveSL
                            ? 'bg-brand-green/10 text-brand-green font-bold shadow-xs'
                            : 'text-brand-charcoal hover:bg-gray-50 hover:text-brand-green'
                        }`}
                      >
                        <span className="truncate">{sl.name}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-all duration-200 ${isActiveSL ? 'text-brand-green opacity-100 translate-x-0.5' : 'text-gray-400 opacity-40'}`} />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 mt-2">
                <Link
                  href={`/projects?location=${encodeURIComponent(activeDistrict.name)}`}
                  onClick={onClose}
                  className="block px-3 py-1.5 rounded-lg text-[11.5px] font-bold text-brand-green hover:bg-brand-green/5 transition-colors uppercase tracking-wider text-center truncate"
                >
                  All {activeDistrict.name} Projects
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Level 3: Villa Projects Column ── */}
      <AnimatePresence mode="wait">
        {activeSubLocation && (
          <motion.div
            key={activeSubLocation.name}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 245 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 overflow-hidden"
          >
            <div className="w-[245px] pl-2.5 flex flex-col justify-between h-full">
              <div>
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-brand-gold truncate block">
                    VILLAS IN {activeSubLocation.name}
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="space-y-0.5 max-h-[310px] overflow-y-auto scrollbar-none"
                >
                  {activeSubLocation.projects.map((p) => (
                    <Link
                      key={p.slug || p.name}
                      href={`/projects/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-bold text-brand-charcoal hover:text-brand-green hover:bg-brand-green/5 transition-all duration-200 group/villa"
                    >
                      <span className="truncate group-hover/villa:translate-x-0.5 transition-transform duration-200">{p.name}</span>
                      {p.status && (
                        <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-md bg-brand-gold/15 text-brand-gold whitespace-nowrap ml-1.5 shadow-xs">
                          {p.status}
                        </span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              </div>

              <div className="pt-2 border-t border-gray-100 mt-2">
                <Link
                  href={`/projects?location=${encodeURIComponent(activeSubLocation.name)}`}
                  onClick={onClose}
                  className="block px-3 py-1.5 rounded-lg text-[11.5px] font-bold text-brand-green hover:bg-brand-green/5 transition-colors uppercase tracking-wider text-center truncate"
                >
                  Explore Location
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Mobile: accordion row for Projects ──────────────────────────────────────
function MobileProjectsAccordion({
  districts,
  loading,
  onClose,
}: {
  districts: District[]
  loading: boolean
  onClose: () => void
}) {
  const [openDistrict, setOpenDistrict] = useState<string | null>(null)
  const [openSubLocation, setOpenSubLocation] = useState<string | null>(null)

  const toggleDistrict = (name: string) => {
    setOpenDistrict(prev => (prev === name ? null : name))
    setOpenSubLocation(null)
  }
  const toggleSubLocation = (name: string) => {
    setOpenSubLocation(prev => (prev === name ? null : name))
  }

  if (loading) {
    return (
      <div className="pl-2 pb-2 py-4 flex items-center gap-2 text-brand-ivory/40 text-[12px]">
        <div className="w-3.5 h-3.5 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
        Loading projects…
      </div>
    )
  }

  if (districts.length === 0) {
    return (
      <div className="pl-2 pb-2 py-4 text-brand-ivory/40 text-[12px]">
        Unable to load projects right now.
      </div>
    )
  }

  return (
    <div className="pl-2 pb-2 space-y-1">
      {districts.map((d) => (
        <div key={d.name} className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.01]">
          {/* District row */}
          <button
            onClick={() => toggleDistrict(d.name)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-display text-[12px] font-bold tracking-[0.15em] uppercase transition-colors ${openDistrict === d.name ? 'text-brand-gold bg-white/[0.03]' : 'text-brand-ivory/90 hover:text-brand-gold'
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
                        className={`w-full flex items-center justify-between py-2 text-left text-[11px] tracking-wider uppercase font-semibold transition-colors ${openSubLocation === sl.name ? 'text-white' : 'text-brand-ivory/60 hover:text-white'
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
                                    {p.units && (
                                      <div className="text-[9px] text-brand-ivory/50 font-medium mt-0.5">{p.units}</div>
                                    )}
                                  </div>
                                  {p.status && (
                                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold tracking-wider uppercase whitespace-nowrap flex-shrink-0 ${p.status === 'On Going'
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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDD, setActiveDD] = useState<string | null>(null)
  const [districts, setDistricts] = useState<District[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)
  const ddTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const desktopNavRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!activeDD) return
    const handlePointerDown = (e: PointerEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setActiveDD(null)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [activeDD])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen || activeDD === 'Projects') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, activeDD])

  useEffect(() => {
    let active = true
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (!active) return
        if (data?.length > 0) {
          const mapped: Project[] = data.map((p: Record<string, string | number | boolean | { num?: string } | undefined>) => ({
            name: String(p.name || ''),
            slug: String(p.slug || ''),
            location: p.location ? String(p.location) : undefined,
            district: p.district ? String(p.district) : undefined,
            sub_location: p.sub_location ? String(p.sub_location) : undefined,
            status: p.status ? String(p.status) : undefined,
            price: p.price ? String(p.price) : p.starting_price ? String(p.starting_price) : 'Price on Request',
            heroImage: p.heroImage ? String(p.heroImage) : p.featured_image ? String(p.featured_image) : p.image ? String(p.image) : '/images/extracted/cmr-villa-exterior.jpg',
            bhk: p.bhk ? String(p.bhk) : p.configurations ? String(p.configurations) : '3 & 4 BHK',
            units: p.units ? String(p.units) : p.badge && typeof p.badge === 'object' && p.badge.num ? `${p.badge.num} Villas` : undefined,
            featured: Boolean(p.featured),
          }))
          setDistricts(groupProjectsByDistrict(mapped))
        }
        setProjectsLoading(false)
      })
      .catch((err) => {
        console.error('Navbar: project fetch failed', err)
        if (active) setProjectsLoading(false)
      })
    return () => { active = false }
  }, [])

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white shadow-md'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
          }`}
      >
        {/* Contact utility bar */}
        <div
          className={`hidden lg:block overflow-hidden transition-all duration-300 border-b ${scrolled ? 'max-h-0 opacity-0 border-transparent' : 'max-h-10 opacity-100 border-white/10'
            }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-end gap-6 font-body text-[12.5px] text-white/85">
            <a href="mailto:info@cmrdevelopers.com" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@cmrdevelopers.com
            </a>
            <span className="w-px h-3.5 bg-white/20" />
            <a href="tel:+919206838383" className="hover:text-brand-gold transition-colors">+91 9206 838 383</a>
            <span className="text-white/30">|</span>
            <a href="tel:+919744475555" className="hover:text-brand-gold transition-colors">+91 9744 475 555</a>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 h-16 md:h-20 xl:h-[96px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="absolute top-0 left-4 sm:left-6 lg:left-8 z-10 w-[82px] h-[82px] md:w-[90px] md:h-[90px] xl:w-[115px] xl:h-[115px]"
          >
            <Image
              src="/images/cmr-logo.png"
              alt="CMR Developers"
              fill
              className="object-contain object-top"
              priority
            />
          </Link>
          <div className="flex-shrink-0 w-[82px] md:w-[90px] xl:w-[115px]" aria-hidden="true" />

          {/* Desktop Nav */}
          <nav ref={desktopNavRef} className="hidden xl:flex items-center gap-1 flex-1 justify-end">
            {primaryNavLinks.map((link) => {
              const ddOpen = activeDD === link.label
              const linkClassName = `flex items-center gap-1.5 px-3.5 py-2 font-body text-[14px] font-medium whitespace-nowrap transition-all duration-200 rounded-lg ${ddOpen
                  ? scrolled ? 'text-brand-green bg-brand-green/5' : 'text-brand-gold bg-white/10'
                  : scrolled
                    ? 'text-brand-charcoal/90 hover:text-brand-green hover:bg-black/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.hasProjects ? (
                    <button
                      type="button"
                      aria-expanded={ddOpen}
                      onClick={() => setActiveDD(ddOpen ? null : link.label)}
                      className={linkClassName}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`opacity-60 transition-transform duration-200 ${ddOpen ? 'rotate-180 text-brand-gold' : ''}`} />
                    </button>
                  ) : (
                    <Link href={link.href} className={linkClassName}>
                      {link.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {link.hasProjects && ddOpen && (
                      <ProjectsMenu
                        districts={districts}
                        scrolled={scrolled}
                        loading={projectsLoading}
                        onClose={() => setActiveDD(null)}
                        onMouseEnter={() => {
                          if (ddTimeout.current) clearTimeout(ddTimeout.current)
                        }}
                        onMouseLeave={handleMouseLeave}
                      />
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* More Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('More')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-expanded={activeDD === 'More'}
                onClick={() => setActiveDD(activeDD === 'More' ? null : 'More')}
                className={`flex items-center gap-1.5 px-3.5 py-2 font-body text-[14px] font-medium whitespace-nowrap transition-all duration-200 rounded-lg ${activeDD === 'More'
                    ? scrolled ? 'text-brand-green bg-brand-green/5' : 'text-brand-gold bg-white/10'
                    : scrolled
                      ? 'text-brand-charcoal/90 hover:text-brand-green hover:bg-black/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <span>More</span>
                <ChevronDown className={`opacity-60 transition-transform duration-200 ${activeDD === 'More' ? 'rotate-180 text-brand-gold' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDD === 'More' && <MoreMenu onClose={() => setActiveDD(null)} />}
              </AnimatePresence>
            </div>

            {/* Primary CTA Button */}
            <Link
              href="/contact-us"
              className="ml-3 px-5 py-2.5 rounded-lg bg-brand-gold hover:bg-brand-ivory text-brand-charcoal font-body text-[12.5px] font-extrabold tracking-[0.18em] uppercase shadow-md transition-all duration-300 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right actions (Mobile Hamburger) */}
          <div className="flex items-center gap-2 flex-shrink-0 xl:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5px] p-2 -mr-1"
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
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 xl:hidden backdrop-blur-sm"
              onClick={closeMenu}
            />

            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#0B1E1C] text-white flex flex-col xl:hidden shadow-2xl"
            >
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

              <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-0">
                {mobileNavLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.25 }}
                  >
                    {link.hasProjects ? (
                      <>
                        <button
                          onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                          className="w-full flex items-center justify-between py-3.5 border-b border-white/10 text-left font-display font-semibold text-[16px] text-brand-ivory hover:text-brand-gold transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={`transition-transform duration-250 ${mobileProjectsOpen ? 'rotate-180 text-brand-gold' : ''}`}
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
                                  loading={projectsLoading}
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
                        className={`block py-3.5 border-b border-white/10 font-display font-semibold text-[16px] transition-colors ${link.label === 'Contact Us' ? 'text-brand-gold font-bold' : 'text-brand-ivory hover:text-brand-gold'
                          }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="px-5 py-4 border-t border-white/10 flex-shrink-0 space-y-2">
                <a
                  href="tel:+919206838383"
                  className="flex items-center gap-2 text-brand-ivory/70 text-sm hover:text-brand-gold transition-colors"
                >
                  <svg className="w-4 h-4 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.38 1.18 2 2 0 012.37 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.34a16 16 0 006.29 6.29l1.41-1.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.51v1.41z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +91 9206 838 383
                </a>
                <a
                  href="mailto:info@cmrdevelopers.com"
                  className="flex items-center gap-2 text-brand-ivory/70 text-sm hover:text-brand-gold transition-colors"
                >
                  <svg className="w-4 h-4 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  info@cmrdevelopers.com
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

