'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const projectLinks = [
  { label: 'Alvina Harmony',    href: '/projects/alvina-harmony' },
  { label: 'Aiza Harmony',      href: '/projects/aiza-harmony' },
  { label: 'Aina Harmony',      href: '/projects/aina-harmony' },
  { label: 'Anna Harmony',      href: '/projects/anna-harmony' },
  { label: 'Aiza Silver Hills', href: '/projects/aiza-silver-hills' },
  { label: 'Aiza Golden Hills', href: '/projects/aiza-golden-hills' },
  { label: 'CMR Paradise',      href: '/projects/cmr-paradise' },
  { label: 'Aina Paradise',     href: '/projects/aina-paradise' },
  { label: 'Anna Paradise',     href: '/projects/anna-paradise' },
  { label: 'Aiza Paradise',     href: '/projects/aiza-paradise' },
]

const companyLinks = [
  { label: 'About Us',          href: '/about-us' },
  { label: 'Projects',          href: '/projects' },
  { label: 'Villa Construction',href: '/villa-construction-kerala' },
  { label: 'NRI Investment',    href: '/nri-investment-kerala' },
  { label: 'Blog',              href: '/blog' },
]

const resourceLinks = [
  { label: 'Testimonials',      href: '/testimonials' },
  { label: 'Careers',           href: '/careers' },
  { label: 'Contact Us',        href: '/contact-us' },
]

const quickLinks = [
  { label: 'Home',              href: '/' },
  { label: 'About Us',          href: '/about-us' },
  { label: 'Projects',          href: '/projects' },
  { label: 'Villa Construction',href: '/villa-construction-kerala' },
  { label: 'NRI Investment',    href: '/nri-investment-kerala' },
]

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/cmrdeveloperspvtltd',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cmrvillaproject/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCEfYEItWDu0KTEsLblmnAyA',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cmrdevelopers',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919446475555',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
]

const FooterSection = ({ title, links }: { title: string, links: { label: string, href: string }[] }) => (
  <div>
    <div className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-5">
      {title}
    </div>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="font-body text-brand-ivory/50 hover:text-brand-ivory text-ui transition-colors duration-200"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default function Footer() {
  return (
    <footer className="bg-brand-green text-brand-ivory">

      {/* ── Main footer grid ──────────────────────────────── */}
      <div className="px-section py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-4 gap-y-10 lg:gap-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 border-b border-brand-ivory/10 lg:border-none pb-10 lg:pb-0">
            {/* Logo */}
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/cmr-logo.png"
                alt="CMR Developers"
                width={120}
                height={120}
                className="object-contain"
              />
            </Link>

            <p className="font-body text-brand-ivory/70 text-body leading-relaxed max-w-[260px] mb-6">
              Union Complex, Near S.N Park, Kannur - 670001, Kerala
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <a href="tel:+919446475555" className="flex items-center gap-2 font-body text-brand-ivory/55 text-ui hover:text-brand-gold transition-colors duration-200">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +91 94464 75555
              </a>
              <a href="tel:+919447475555" className="flex items-center gap-2 font-body text-brand-ivory/55 text-ui hover:text-brand-gold transition-colors duration-200">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +91 94474 75555
              </a>
              <a href="mailto:cmrdevelopers@gmail.com" className="flex items-center gap-2 font-body text-brand-ivory/55 text-ui hover:text-brand-gold transition-colors duration-200">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                cmrdevelopers@gmail.com
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-brand-ivory/20 flex items-center justify-center text-brand-ivory/50 hover:text-brand-gold hover:border-brand-gold transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <FooterSection title="Our Projects" links={projectLinks} />
          </div>

          <div className="col-span-1">
            <FooterSection title="Company" links={companyLinks} />
          </div>

          <div className="col-span-1">
            <FooterSection title="Resources" links={resourceLinks} />
          </div>

          <div className="col-span-1 lg:col-span-1">
            <FooterSection title="Quick Links" links={quickLinks} />

            {/* Newsletter */}
            <div className="mt-8">
              <div className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">
                Newsletter
              </div>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent border-b border-brand-ivory/30 pb-2 text-sm text-brand-ivory placeholder:text-brand-ivory/30 focus:outline-none focus:border-brand-gold transition-colors"
                />
                <button aria-label="Subscribe" className="border-b border-brand-ivory/30 pb-2 px-2 hover:text-brand-gold transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div className="border-t border-brand-ivory/10">
        <div className="px-section py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="font-body text-brand-ivory/60 text-label">
            © 2026 CMR Developers Pvt. Ltd. All Rights Reserved.
          </p>
          <p className="font-body text-brand-ivory/60 text-label">
            Made With Love From <a href="https://skillycat.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-ivory transition-colors">Skillycat Technologies LLP</a>
          </p>
        </div>
      </div>

    </footer>
  )
}
