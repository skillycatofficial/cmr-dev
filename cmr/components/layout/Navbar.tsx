'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
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
  { label: 'Villa Customisation', href: '/villa-construction-kerala' },
  { label: 'NRI Investment', href: '/nri-investment-kerala' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Gallery', href: '/gallery' },
]

const moreNavLinks = [
  { label: 'Testimonials', href: '/testimonials', desc: 'Client experiences & reviews' },
  { label: 'Videos', href: '/videos', desc: 'Cinematic project tours' },
  { label: 'Blog', href: '/blog', desc: 'Architecture insights & updates' },
  { label: 'Careers', href: '/careers', desc: 'Join our growing team' },
]

const mobileNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects', hasProjects: true },
  { label: 'Villa Customisation', href: '/villa-construction-kerala' },
  { label: 'NRI Investment', href: '/nri-investment-kerala' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Videos', href: '/videos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
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
function MapPinIcon({ className = 'w-3.5 h-3.5 flex-shrink-0' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
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

// ─── Desktop: Luxury Projects Mega Menu ──────────────────────────────────────
function ProjectsMenu({
  districts,
  loading,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  districts: District[]
  scrolled: boolean
  loading: boolean
  onClose?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(districts[0]?.name || null)
  const [activeSubLocation, setActiveSubLocation] = useState<string | null>(districts[0]?.subLocations[0]?.name || null)

  const districtTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeDistrictData = districts.find(d => d.name === activeDistrict) || districts[0]

  useEffect(() => {
    if (districts.length > 0) {
      if (!activeDistrict) {
        setActiveDistrict(districts[0].name)
      }
      if (!activeSubLocation && districts[0]?.subLocations.length > 0) {
        setActiveSubLocation(districts[0].subLocations[0].name)
      }
    }
  }, [districts, activeDistrict, activeSubLocation])

  const handleDistrictEnter = (name: string) => {
    if (districtTimeoutRef.current) clearTimeout(districtTimeoutRef.current)
    districtTimeoutRef.current = setTimeout(() => {
      setActiveDistrict(name)
      const dist = districts.find(d => d.name === name)
      if (dist && dist.subLocations.length > 0) {
        setActiveSubLocation(dist.subLocations[0].name)
      } else {
        setActiveSubLocation(null)
      }
    }, 60)
  }

  useEffect(() => {
    return () => {
      if (districtTimeoutRef.current) clearTimeout(districtTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const getDistrictProjectCount = (d: District) => {
    return d.subLocations.reduce((acc, sl) => acc + sl.projects.length, 0)
  }

  const activeSubLocationData = useMemo(() => {
    if (!activeDistrictData) return null
    return activeDistrictData.subLocations.find(sl => sl.name === activeSubLocation) || activeDistrictData.subLocations[0] || null
  }, [activeDistrictData, activeSubLocation])

  const displayedProjects = activeSubLocationData?.projects || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed inset-x-0 top-[64px] md:top-[80px] xl:top-[102px] max-h-[calc(85vh-80px)] xl:max-h-[580px] z-50 flex shadow-[0_30px_70px_-15px_rgba(0,0,0,0.22)] border-t-4 border-t-brand-gold"
    >
      <div className="bg-[#F7F4EE] border-b-2 border-brand-gold/30 flex flex-col w-full h-full overflow-hidden rounded-b-2xl shadow-2xl">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-7 h-7 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
            <p className="text-[13px] text-[#0F2F2B]/70 font-body">Loading developments…</p>
          </div>
        ) : districts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-[14px] text-[#0F2F2B]/70 font-body">Unable to load developments right now.</p>
            <Link
              href="/projects"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-[12px] font-bold tracking-widest uppercase bg-brand-green text-white hover:bg-brand-gold transition-colors"
            >
              View All Projects
            </Link>
          </div>
        ) : (
          <>
            {/* Top Bar – District Tabs (Exact Reference Styling) */}
            <div className="bg-[#F7F4EE] border-b border-[#E2D8C0] flex items-stretch justify-between h-[52px] xl:h-[56px] flex-shrink-0">
              <div className="flex items-stretch overflow-x-auto scrollbar-none">
                {districts.map((d) => {
                  const count = getDistrictProjectCount(d)
                  const isActive = activeDistrict === d.name
                  return (
                    <button
                      key={d.name}
                      type="button"
                      onMouseEnter={() => handleDistrictEnter(d.name)}
                      onClick={() => handleDistrictEnter(d.name)}
                      className={`relative h-full flex-shrink-0 px-7 font-display text-[13px] font-black tracking-widest uppercase transition-all duration-200 border-r border-[#E2D8C0]/80 flex items-center gap-3 ${
                        isActive
                          ? 'bg-[#F7F4EE] text-[#0F2F2B] font-black'
                          : 'bg-[#F7F4EE] text-[#0F2F2B]/70 hover:text-[#0F2F2B] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <span>{d.name}</span>
                      <span
                        className={`text-[10.5px] px-2 py-0.5 rounded-md font-black transition-colors ${
                          isActive
                            ? 'bg-[#E2D8C0] text-[#0F2F2B]'
                            : 'bg-[#E8DFC8]/70 text-[#0F2F2B]/70'
                        }`}
                      >
                        {count}
                      </span>
                      {/* Active gold underline bar directly matching reference */}
                      {isActive && (
                        <div className="absolute bottom-0 inset-x-5 h-[3.5px] bg-[#C4A968] rounded-full" />
                      )}
                    </button>
                  )
                })}
              </div>

              {onClose && (
                <div className="flex items-center px-5 border-l border-[#E2D8C0]/80 bg-[#F7F4EE]">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 hover:text-[#0F2F2B] px-3 py-1.5 rounded-lg bg-[#EFE9DC] hover:bg-[#E5DDCB] transition-all uppercase tracking-wider border border-[#DED7C5]"
                    title="Close menu (Esc)"
                  >
                    <span>Close</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Main Content Body */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Sidebar – Locations List (Exact Warm Tan Reference Theme) */}
              <div className="w-[240px] xl:w-[260px] bg-[#EFE9DC] text-[#0F2F2B] border-r border-[#E0D7C5] p-5 flex flex-col justify-between flex-shrink-0 overflow-y-auto">
                <div>
                  <div className="px-2 pb-4 text-[10px] font-black tracking-[0.2em] uppercase text-[#B59855] flex items-center justify-between">
                    <span>LOCATIONS IN {activeDistrictData?.name}</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeDistrictData?.subLocations.map((sl) => {
                      const isActiveSL = (activeSubLocationData?.name || activeSubLocation) === sl.name
                      return (
                        <button
                          key={sl.name}
                          type="button"
                          onClick={() => setActiveSubLocation(sl.name)}
                          className={`w-full group flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-200 text-[12px] font-bold tracking-wider uppercase text-left ${
                            isActiveSL
                              ? 'bg-[#DDD5C4] text-[#0F2F2B] font-black shadow-xs'
                              : 'text-[#0F2F2B]/75 hover:text-[#0F2F2B] hover:bg-[#E5DDCB] border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <MapPinIcon className={`w-3.5 h-3.5 transition-colors ${isActiveSL ? 'text-[#0F2F2B]' : 'text-[#0F2F2B]/60 group-hover:text-[#0F2F2B]'}`} />
                            <span>{sl.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                                isActiveSL
                                  ? 'bg-black/10 text-[#0F2F2B] font-black'
                                  : 'bg-[#DDD5C4]/70 text-[#0F2F2B]/80 group-hover:bg-[#D5CCBA] group-hover:text-[#0F2F2B]'
                              }`}
                            >
                              {sl.projects.length}
                            </span>
                            <ChevronRight
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isActiveSL
                                  ? 'translate-x-0.5 text-[#0F2F2B] opacity-100'
                                  : 'opacity-40 text-[#0F2F2B]/60 group-hover:opacity-100 group-hover:text-[#0F2F2B]'
                              }`}
                            />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DED7C5] mt-4">
                  <Link
                    href="/projects"
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[12px] font-bold tracking-widest uppercase transition-all duration-200 text-[#B59855] hover:text-[#0F2F2B] hover:bg-[#E5DDCB] border border-[#B59855]/30 shadow-sm"
                  >
                    <span>View All Projects</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Area – Developments Grid (Warm Ivory Theme) */}
              <div className="flex-1 flex flex-col p-6 xl:p-7 overflow-y-auto bg-[#F7F4EE] text-[#0F2F2B]">
                {activeDistrictData && (
                  <div className="flex flex-col min-h-full justify-between">
                    <div>
                      {/* Top Header */}
                      <div className="pb-3 border-b border-[#E2D8C0] mb-4 flex items-center justify-between text-[10.5px] font-black tracking-[0.2em] uppercase text-[#0F2F2B]/70">
                        <span>
                          {activeSubLocationData?.name
                            ? `Developments in ${activeSubLocationData.name}, ${activeDistrictData.name}`
                            : `Developments in ${activeDistrictData.name}`}
                        </span>
                        <span className="text-[11px] font-bold text-[#B59855]">
                          Showing {displayedProjects.length} active developments
                        </span>
                      </div>

                      {/* Developments Grid – Immediately under top header */}
                      {displayedProjects.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {displayedProjects.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/projects/${p.slug}`}
                              onClick={onClose}
                              className="group/item relative h-[155px] xl:h-[165px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-3.5 bg-black"
                            >
                              {/* Full Image Background with Zoom Scale */}
                              <Image
                                src={p.heroImage || '/images/extracted/cmr-villa-exterior.jpg'}
                                alt={p.name}
                                fill
                                className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                              />
                              {/* Dark Gradient Overlay for High Visibility Text */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover/item:from-black/95 transition-colors" />

                              {/* Top Badges */}
                              <div className="relative z-10 flex items-center justify-between gap-2">
                                {p.status ? (
                                  <span
                                    className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md shadow-md ${p.status === 'On Going' || p.status === 'Ongoing'
                                        ? 'bg-brand-gold text-brand-charcoal'
                                        : p.status === 'Just Launched'
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-black/80 text-white'
                                      }`}
                                  >
                                    {p.status === 'On Going' ? 'Ongoing' : p.status}
                                  </span>
                                ) : <div />}

                                {p.bhk && (
                                  <span className="text-[9.5px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                                    {p.bhk}
                                  </span>
                                )}
                              </div>

                              {/* Bottom Overlaid Text & Pricing */}
                              <div className="relative z-10 mt-auto">
                                <h4 className="font-display text-[15px] font-bold text-white group-hover/item:text-brand-gold transition-colors leading-tight truncate drop-shadow-sm">
                                  {p.name}
                                </h4>

                                {p.sub_location && (
                                  <p className="text-[11px] text-white/80 font-medium mt-0.5 flex items-center gap-1">
                                    <MapPinIcon className="w-3 h-3 text-brand-gold" />
                                    <span>{p.sub_location}</span>
                                  </p>
                                )}

                                <div className="mt-2 pt-1.5 border-t border-white/20 flex items-center justify-between">
                                  <span className="text-[13px] font-extrabold text-brand-gold font-display drop-shadow-sm">
                                    {p.price || '₹55 Lakhs Onwards'}
                                  </span>
                                  <span className="text-[10.5px] font-bold text-white/80 group-hover/item:text-white transition-colors flex items-center gap-0.5">
                                    <span>View</span>
                                    <ChevronRight className="w-3 h-3 text-brand-gold" />
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[13px] text-gray-500 py-12 text-center bg-[#EFE9DC]/60 rounded-2xl border border-dashed border-[#B59855]/30">
                          No developments currently listed in this location.
                        </div>
                      )}
                    </div>

                    {/* Bottom Footer Bar */}
                    <div className="pt-4 mt-6 border-t border-[#E2D8C0] flex items-center justify-between text-[12px] text-[#0F2F2B]/70 flex-shrink-0">
                      <span>
                        Showing {displayedProjects.length} active developments
                        {activeSubLocation ? ` in ${activeSubLocation}` : ` in ${activeDistrictData.name}`}
                      </span>
                      <Link
                        href="/projects"
                        onClick={onClose}
                        className="text-[#B59855] font-bold hover:underline flex items-center gap-1 text-[12.5px]"
                      >
                        <span>Explore Full Portfolio</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
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

