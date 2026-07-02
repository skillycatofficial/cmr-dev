'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  _id: string;
  name: string;
  slug: string;
  location: string;
  status: string;
  price?: string;
  heroImage?: string;
  badge?: { num: string; label: string };
  reraNumber?: string;
  bhk?: string;
}

interface ProjectsGridProps {
  initialProjects: Project[];
}

const statusColor: Record<string, string> = {
  'On Going':     'bg-blue-50 text-blue-700',
  'Just Launched':'bg-green-50 text-green-700',
  'Completed':    'bg-gray-100 text-gray-500',
  'Ready to Move':'bg-emerald-50 text-emerald-700',
  'Sold Out':     'bg-red-50 text-red-700',
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const searchParams = useSearchParams()

  // Search & Filter States
  const [bhkFilter, setBhkFilter] = useState<string>('All')
  const [locationFilter, setLocationFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Active state applied after clicking "Find Project" (or dynamically)
  const [appliedBhk, setAppliedBhk] = useState<string>('All')
  const [appliedLocation, setAppliedLocation] = useState<string>('All')
  const [appliedStatus, setAppliedStatus] = useState<string>('All')
  const [appliedSearch, setAppliedSearch] = useState<string>('')

  // Pre-apply filters from URL query params (from homepage search redirect)
  useEffect(() => {
    const qLocation = searchParams.get('location')
    const qStatus = searchParams.get('status')
    const qBhk = searchParams.get('type')

    if (qLocation) {
      // Find the matching location from project data (fuzzy match on district name)
      const match = initialProjects.find((p) =>
        p.location.toLowerCase().includes(qLocation.toLowerCase())
      )
      if (match) {
        setLocationFilter(match.location)
        setAppliedLocation(match.location)
      }
    }
    if (qStatus) {
      setStatusFilter(qStatus)
      setAppliedStatus(qStatus)
    }
    if (qBhk) {
      setBhkFilter(qBhk)
      setAppliedBhk(qBhk)
    }
  }, [searchParams, initialProjects])

  // Dynamic filter options based on data
  const locations = useMemo(() => {
    const unique = new Set(initialProjects.map((p) => p.location))
    return ['All', ...Array.from(unique)]
  }, [initialProjects])

  const statuses = useMemo(() => {
    const unique = new Set(initialProjects.map((p) => p.status))
    return ['All', ...Array.from(unique)]
  }, [initialProjects])

  const bhkOptions = ['All', '3 BHK', '4 BHK']

  // Filter projects list
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // BHK filter
      const matchesBhk =
        appliedBhk === 'All' ||
        (project.bhk && project.bhk.toLowerCase().includes(appliedBhk.toLowerCase()))

      // Location filter
      const matchesLocation =
        appliedLocation === 'All' ||
        project.location.toLowerCase() === appliedLocation.toLowerCase()

      // Status filter
      const matchesStatus =
        appliedStatus === 'All' ||
        project.status.toLowerCase() === appliedStatus.toLowerCase()

      // Search query filter
      const matchesSearch =
        !appliedSearch ||
        project.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        project.location.toLowerCase().includes(appliedSearch.toLowerCase())

      return matchesBhk && matchesLocation && matchesStatus && matchesSearch
    })
  }, [initialProjects, appliedBhk, appliedLocation, appliedStatus, appliedSearch])

  // Trigger search
  const handleFindProject = (e: React.FormEvent) => {
    e.preventDefault()
    setAppliedBhk(bhkFilter)
    setAppliedLocation(locationFilter)
    setAppliedStatus(statusFilter)
    setAppliedSearch(searchQuery)
  }

  // Clear all filters
  const handleClearFilters = () => {
    setBhkFilter('All')
    setLocationFilter('All')
    setStatusFilter('All')
    setSearchQuery('')
    setAppliedBhk('All')
    setAppliedLocation('All')
    setAppliedStatus('All')
    setAppliedSearch('')
  }

  return (
    <>
      {/* ── Real Estate Filter Panel (Asset Homes Reference) ── */}
      <section className="bg-white py-8 border-b border-brand-gray/20">
        <div className="px-section">
          <form 
            onSubmit={handleFindProject}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1.2fr_1.5fr_1fr] gap-6 lg:gap-8 items-end"
          >
            {/* BHK Dropdown */}
            <div className="relative">
              <label htmlFor="filter-bhk" className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/40 font-semibold mb-1">
                Property Type
              </label>
              <select
                id="filter-bhk"
                value={bhkFilter}
                onChange={(e) => setBhkFilter(e.target.value)}
                className="w-full font-body text-sm text-brand-charcoal py-2 border-b border-brand-gray/60 bg-transparent focus:outline-none focus:border-brand-green appearance-none cursor-pointer pr-8"
              >
                {bhkOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'All' ? 'All BHK Options' : opt}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 bottom-2.5 pointer-events-none text-brand-charcoal/40">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="relative">
              <label htmlFor="filter-location" className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/40 font-semibold mb-1">
                Location
              </label>
              <select
                id="filter-location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full font-body text-sm text-brand-charcoal py-2 border-b border-brand-gray/60 bg-transparent focus:outline-none focus:border-brand-green appearance-none cursor-pointer pr-8"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 bottom-2.5 pointer-events-none text-brand-charcoal/40">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <label htmlFor="filter-status" className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/40 font-semibold mb-1">
                Project Status
              </label>
              <select
                id="filter-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full font-body text-sm text-brand-charcoal py-2 border-b border-brand-gray/60 bg-transparent focus:outline-none focus:border-brand-green appearance-none cursor-pointer pr-8"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All' ? 'All Statuses' : st}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 bottom-2.5 pointer-events-none text-brand-charcoal/40">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Text Search */}
            <div className="relative">
              <label className="block font-body text-[11px] uppercase tracking-widest text-brand-charcoal/40 font-semibold mb-1">
                Search
              </label>
              <div className="relative border-b border-brand-gray/60 focus-within:border-brand-green">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Project Name"
                  className="w-full font-body text-sm text-brand-charcoal py-2 pl-7 bg-transparent focus:outline-none"
                />
                <div className="absolute left-0 bottom-2.5 text-brand-charcoal/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex gap-2 w-full">
              <button
                type="submit"
                className="flex-1 bg-brand-green hover:bg-brand-gold text-brand-ivory font-body text-label uppercase tracking-widest font-bold py-3 px-4 rounded transition-colors duration-300 text-center cursor-pointer text-[12px]"
              >
                Find Project
              </button>
              {(appliedBhk !== 'All' || appliedLocation !== 'All' || appliedStatus !== 'All' || appliedSearch) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="p-3 bg-brand-gray/20 hover:bg-brand-gray/30 text-brand-charcoal rounded transition-colors duration-300"
                  title="Clear Filters"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* ── Projects Grid Section ────────────────────────── */}
      <section className="bg-[#f8f9fa] py-14 md:py-20">
        <div className="px-section">
          {/* Count Indicator */}
          <div className="font-body text-xs text-brand-charcoal/40 tracking-wider font-semibold mb-6">
            {filteredProjects.length} Projects found
          </div>

          {filteredProjects.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="text-brand-gold text-4xl mb-4">⊙</div>
              <p className="font-body text-brand-charcoal/40 text-body">
                No projects found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug}`}
                  className="group bg-white shadow-sm hover:shadow-md transition-shadow duration-300 block text-left"
                >
                  {/* Image Container with Original Card Style */}
                  <div className="relative overflow-hidden h-[240px]">
                    {project.heroImage ? (
                      <Image
                        src={project.heroImage}
                        alt={project.name}
                        fill
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-gray/30 flex items-center justify-center">
                        <span className="font-body text-brand-charcoal/30 text-label">No image</span>
                      </div>
                    )}

                    {/* Original Badge (Purple Box top-right overlay) */}
                    {project.badge?.num && (
                      <div className="absolute top-3 right-3 z-10 bg-[#4a2d7a] text-white text-center px-2.5 py-1.5 min-w-[52px]">
                        <div className="font-display font-bold leading-none" style={{ fontSize: '18px' }}>
                          {project.badge.num}
                        </div>
                        <div className="font-body text-micro leading-tight mt-0.5 text-white/80">
                          {project.badge.label}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Original Info Section */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h2 className="font-display font-bold text-brand-charcoal text-heading leading-tight group-hover:text-brand-green transition-colors duration-200">
                        {project.name}
                      </h2>
                      {project.status && (
                        <span className={`font-body text-micro font-semibold tracking-wide px-2 py-1 rounded-full flex-shrink-0 mt-0.5 ${statusColor[project.status] ?? 'bg-gray-100 text-gray-500'}`}>
                          {project.status}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <p className="font-body text-brand-charcoal/45 text-label tracking-[0.15em] uppercase">
                        {project.location}
                      </p>
                      {project.bhk && (
                        <>
                          <span className="text-brand-charcoal/30">•</span>
                          <span className="font-body text-micro font-semibold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">
                            {project.bhk}
                          </span>
                        </>
                      )}
                    </div>

                    {project.reraNumber && (
                      <p className="font-body text-[11px] text-brand-charcoal/50 mb-4">
                        RERA: {project.reraNumber}
                      </p>
                    )}

                    {/* Footer price and CTA */}
                    <div className="flex items-center justify-between border-t border-brand-gray/40 pt-4">
                      <span className="font-body text-brand-charcoal/65 text-ui font-medium">
                        {project.price}
                      </span>
                      <span className="font-body text-brand-green text-ui font-semibold group-hover:text-brand-gold transition-colors duration-200">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
