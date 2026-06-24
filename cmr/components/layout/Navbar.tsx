'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { getAllProjects } from '@/lib/wordpress'

const FALLBACK_PROJECTS = [
  { name: 'Alvina Harmony', slug: 'alvina-harmony', location: 'Kadachira, Kannur', status: 'On Going' },
  { name: 'Aiza Harmony', slug: 'aiza-harmony', location: 'Mulanthuruthy, Ernakulam', status: 'On Going' },
  { name: 'Aina Harmony', slug: 'aina-harmony', location: 'Angamaly, Ernakulam', status: 'On Going' },
  { name: 'Anna Harmony', slug: 'anna-harmony', location: 'Chala, Kannur', status: 'On Going' },
]

const navLinks = [
  { label: 'Home',               href: '/' },
  { label: 'About Us',           href: '/about-us' },
  {
    label: 'Projects',           href: '/projects',
    children: [] as { label: string; href: string }[],
  },
  { label: 'Villa Construction', href: '/villa-construction-kerala' },
  { label: 'NRI Investment',    href: '/nri-investment-kerala' },
  { label: 'Testimonials',      href: '/testimonials' },
  { label: 'Blog',              href: '/blog' },
  { label: 'Careers',           href: '/careers' },
  { label: 'Contact Us',        href: '/contact-us' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeDD,  setActiveDD]  = useState<string | null>(null)
  const [projects, setProjects] = useState<{ name: string; slug: string; location?: string; status?: string }[]>(FALLBACK_PROJECTS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    let active = true
    getAllProjects().then((data) => {
      if (active && data && data.length > 0) {
        const mapped = data.map((p: Record<string, string>) => ({
          name: p.name,
          slug: p.slug,
          location: p.location,
          status: p.status
        }))
        setProjects(mapped)
      }
    }).catch(err => {
      console.error('Error fetching projects in Navbar:', err)
    })
    return () => { active = false }
  }, [])

  const kannurProjects = projects.filter(p => {
    const loc = (p.location || '').toLowerCase()
    return !loc.includes('ernakulam') && !loc.includes('kottayam')
  })

  const half = Math.ceil(kannurProjects.length / 2)
  const kannurCol1 = kannurProjects.slice(0, half)
  const kannurCol2 = kannurProjects.slice(half)

  const ernakulamProjects = projects.filter(p => (p.location || '').toLowerCase().includes('ernakulam'))
  const kottayamProjects = projects.filter(p => (p.location || '').toLowerCase().includes('kottayam'))

  const renderedLinks = navLinks.map(link => {
    if (link.label === 'Projects') {
      const childrenList = projects.map(p => ({
        label: p.name,
        href: `/projects/${p.slug}`
      }))
      childrenList.push({
        label: 'View All Projects',
        href: '/projects'
      })
      return {
        ...link,
        children: childrenList
      }
    }
    return link
  })

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-0' : 'bg-transparent py-2'
        }`}
      >
        <div className="px-section h-[102px] flex items-center justify-between gap-6">

          {/* ── Logo ──────────────────────────────────────── */}
          <Link href="/" className="flex-shrink-0 relative w-[100px] md:w-[130px] h-[100px] md:h-[130px] self-start shadow-2xl -top-2 -ml-2">
            <Image 
              src="/images/cmr-logo.png" 
              alt="CMR Developers" 
              fill
              className="object-cover"
              priority
            />
          </Link>

          {/* ── Desktop Nav ──────────────────────────────── */}
          <nav className="hidden xl:flex items-center gap-1">
            {renderedLinks.map((link) => (
              <div
                key={link.label}
                className={link.label === 'Projects' ? '' : 'relative'}
                onMouseEnter={() => link.children && link.children.length > 0 && setActiveDD(link.label)}
                onMouseLeave={() => setActiveDD(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2.5 font-body text-[15px] font-normal transition-colors duration-200 ${
                    scrolled 
                      ? 'text-brand-charcoal/80 hover:text-brand-green' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.children && link.children.length > 0 && (
                    <svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdowns & Mega Menu */}
                <AnimatePresence>
                  {link.children && link.children.length > 0 && activeDD === link.label && (
                    link.label === 'Projects' ? (
                      /* Full-Width Mega Menu for Projects */
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute top-full left-0 right-0 w-full bg-white shadow-2xl border-t border-b border-gray-100 py-10 z-50 text-left"
                      >
                        <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-4 gap-10">
                          {/* Column 1: Kannur Part 1 */}
                          <div>
                            <h4 className="font-display font-bold text-brand-green text-[12px] tracking-wider uppercase mb-4 pb-2 border-b border-gray-100">
                              Kannur Projects
                            </h4>
                            <div className="space-y-2.5">
                              {kannurCol1.map((p) => (
                                <Link
                                  key={p.slug}
                                  href={`/projects/${p.slug}`}
                                  className="block text-[13.5px] font-body text-brand-charcoal/70 hover:text-brand-green hover:translate-x-1 transition-all duration-150"
                                >
                                  {p.name}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Kannur Part 2 (Continuation) */}
                          <div>
                            <h4 className="font-display font-bold text-transparent text-[12px] tracking-wider uppercase mb-4 pb-2 border-b border-transparent select-none">
                              Kannur Projects (Cont.)
                            </h4>
                            <div className="space-y-2.5">
                              {kannurCol2.map((p) => (
                                <Link
                                  key={p.slug}
                                  href={`/projects/${p.slug}`}
                                  className="block text-[13.5px] font-body text-brand-charcoal/70 hover:text-brand-green hover:translate-x-1 transition-all duration-150"
                                >
                                  {p.name}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 3: Ernakulam & Kottayam */}
                          <div>
                            {/* Ernakulam */}
                            <div className="mb-6">
                              <h4 className="font-display font-bold text-brand-gold text-[12px] tracking-wider uppercase mb-4 pb-2 border-b border-gray-100">
                                Ernakulam
                              </h4>
                              <div className="space-y-2.5">
                                {ernakulamProjects.map((p) => (
                                  <Link
                                    key={p.slug}
                                    href={`/projects/${p.slug}`}
                                    className="block text-[13.5px] font-body text-brand-charcoal/70 hover:text-brand-green hover:translate-x-1 transition-all duration-150"
                                  >
                                    {p.name}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Kottayam */}
                            <div>
                              <h4 className="font-display font-bold text-brand-gold text-[12px] tracking-wider uppercase mb-4 pb-2 border-b border-gray-100">
                                Kottayam
                              </h4>
                              <div className="space-y-2.5">
                                {kottayamProjects.map((p) => (
                                  <Link
                                    key={p.slug}
                                    href={`/projects/${p.slug}`}
                                    className="block text-[13.5px] font-body text-brand-charcoal/70 hover:text-brand-green hover:translate-x-1 transition-all duration-150"
                                  >
                                    {p.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Column 4: Brand Showcase & Call-to-Action */}
                          <div className="bg-brand-green/5 rounded-2xl p-6 border border-brand-green/10 flex flex-col justify-between h-full min-h-[220px]">
                            <div>
                              <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">
                                CMR Developers
                              </span>
                              <h5 className="font-display font-bold text-[#0F2F2B] text-[16px] leading-snug mb-3">
                                600+ Luxury Villas Delivered in Kerala
                              </h5>
                              <p className="font-body text-brand-charcoal/70 text-[12px] leading-relaxed font-light">
                                Discover our signature premium gated villa communities. Designed with Vastu compliance, world-class amenities, and 100% K-RERA transparency.
                              </p>
                            </div>
                            <div className="mt-4">
                              <Link
                                href="/projects"
                                className="group flex items-center justify-between px-4 py-2.5 bg-[#0F2F2B] hover:bg-[#B89A5D] text-white rounded-lg text-[11px] font-semibold tracking-wider uppercase transition-colors duration-300"
                              >
                                <span>Explore All</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Standard Dropdown for other links */
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 min-w-[220px] bg-white shadow-lg border border-gray-100 py-2 z-50 rounded-lg overflow-hidden"
                      >
                        {link.children.map((child, idx) => {
                          const isLast = idx === link.children!.length - 1;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={`block px-5 py-2.5 font-body text-[14px] transition-colors duration-150 ${
                                isLast 
                                  ? 'text-brand-green font-semibold border-t border-gray-100 mt-1 pt-3 hover:text-brand-gold hover:bg-brand-green/5' 
                                  : 'text-brand-charcoal/70 hover:text-brand-green hover:bg-brand-green/5'
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ── Right Actions ─────────────────────────────── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search icon */}
            <button
              aria-label="Search"
              className={`hidden xl:flex w-9 h-9 items-center justify-center transition-colors ${
                scrolled ? 'text-brand-charcoal/60 hover:text-brand-green' : 'text-white/90 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden flex flex-col gap-[5px] p-2"
              aria-label="Toggle menu"
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className={`block w-6 h-px ${scrolled || menuOpen ? 'bg-brand-charcoal' : 'bg-white'}`} />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className={`block w-6 h-px ${scrolled || menuOpen ? 'bg-brand-charcoal' : 'bg-white'}`} />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className={`block w-6 h-px ${scrolled || menuOpen ? 'bg-brand-charcoal' : 'bg-white'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-brand-green flex flex-col pt-24 pb-10 px-8 xl:hidden overflow-y-auto"
          >
            <nav className="flex-1 space-y-0">
              {renderedLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 border-b border-brand-ivory/10 font-display font-semibold text-heading text-brand-ivory hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
