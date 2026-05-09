'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  {
    label: 'Projects',   href: '/projects',
    children: ['KANNUR', 'KOTTAYAM', 'ERNAKULAM', 'VIEW ALL PROJECTS'],
  },
  { label: 'Video',      href: '/video' },
  { label: 'Home Loans', href: '/homeLoans' },
  { label: 'Gallery',    href: '/gallery' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeDD,  setActiveDD]  = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDD(link.label)}
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
                  {link.children && (
                    <svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDD === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 min-w-[200px] bg-white shadow-lg border border-gray-100 py-2 z-50"
                    >
                      {link.children.map((child) => (
                         <Link
                          key={child}
                          href={`${link.href}/${child.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-5 py-2.5 font-body text-[15px] text-brand-charcoal/70 hover:text-brand-green hover:bg-brand-green/5 transition-colors duration-150"
                        >
                          {child}
                        </Link>
                      ))}
                    </motion.div>
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
              {navLinks.map((link, i) => (
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
