'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  { name: 'CMR Valencia',  location: 'Kannur',        status: 'On Going',     img: '/images/extracted/cmr-interior-living.jpg',  href: '/projects/cmr-valencia',  badge: { num: '32', label: 'Lucky Homes'   }, price: '₹60 Lakhs Onwards' },
  { name: 'CMR Grandeur',  location: 'Taliparamba',   status: 'On Going',     img: '/images/slide/cmrslide5.webp',  href: '/projects/cmr-grandeur',  badge: { num: '35', label: 'Modern Villas' }, price: '₹75 Lakhs Onwards' },
  { name: 'CMR Highland',  location: 'Karuvanchal',   status: 'Just Launched',img: '/images/extracted/cmr-grid-small-3.jpg',     href: '/projects/cmr-highland',  badge: { num: '20', label: 'Luxury Villas' }, price: '₹55 Lakhs Onwards' },
  { name: 'CMR Elysium',   location: 'Changanassery', status: 'Completed',    img: '/images/extracted/cmr-grid-small-4.jpg',     href: '/projects/cmr-elysium',   badge: { num: '28', label: 'Premium Villas'}, price: '₹65 Lakhs Onwards' },
  { name: 'CMR Primrose',  location: 'Angamaly',      status: 'On Going',     img: '/images/extracted/cmr-villa-exterior.jpg',   href: '/projects/cmr-primrose',  badge: { num: '15', label: 'Villas'        }, price: '₹48 Lakhs Onwards' },
  { name: 'CMR Serene',    location: 'Mulanthuruthy', status: 'On Going',     img: '/images/extracted/cmr-grid-small-5.jpg',     href: '/projects/cmr-serene',    badge: { num: '24', label: 'Villas'        }, price: '₹58 Lakhs Onwards' },
]

const statusColor: Record<string, string> = {
  'On Going':     'bg-blue-100 text-blue-700',
  'Just Launched':'bg-green-100 text-green-700',
  'Completed':    'bg-gray-100 text-gray-600',
}

export default function FeaturedProjects() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-[#f8f9fa] py-14 md:py-20 border-t border-brand-gray/30">
      <div className="px-section">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          {/* section (36px) */}
          <h2 className="font-display font-bold text-brand-charcoal text-section tracking-tight">
            FEATURED PROJECTS
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mt-3" />
        </motion.div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white group shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link href={project.href}>
                <div className="relative overflow-hidden h-[210px]">
                  <Image 
                    src={project.img} 
                    alt={project.name} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />

                  {/* Villa count badge */}
                  <div className="absolute top-3 right-3 z-10 bg-[#4a2d7a] text-white text-center px-2.5 py-1.5 min-w-[52px]">
                    <div className="font-display font-bold leading-none" style={{ fontSize: '18px' }}>{project.badge.num}</div>
                    <div className="font-body text-micro leading-tight mt-0.5 text-white/80">{project.badge.label}</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    {/* Card title: heading (22px) */}
                    <h3 className="font-display font-bold text-brand-charcoal text-heading leading-tight group-hover:text-brand-green transition-colors">
                      {project.name}
                    </h3>
                    {/* Status pill: micro (11px) */}
                    <span className={`font-body text-micro font-semibold tracking-wide px-2 py-1 rounded-full flex-shrink-0 mt-0.5 ${statusColor[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  {/* Location: label (13px) */}
                  <p className="font-body text-brand-charcoal/45 text-label tracking-[0.15em] uppercase mb-3">
                    {project.location}
                  </p>
                  <div className="flex items-center justify-between border-t border-brand-gray/40 pt-3">
                    {/* Price: ui (16px) — keeps card row compact */}
                    <span className="font-body text-brand-charcoal/65 text-ui font-medium">
                      {project.price}
                    </span>
                    <span className="font-body text-brand-green text-ui font-semibold group-hover:text-brand-gold transition-colors">↗</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTAs: label (13px) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/contact" className="px-10 py-3.5 bg-brand-green text-brand-ivory font-body text-label font-semibold tracking-[0.2em] uppercase hover:bg-brand-gold transition-colors duration-300">
            Enquire Now
          </Link>
          <Link href="/projects" className="px-10 py-3.5 border border-brand-charcoal/25 text-brand-charcoal font-body text-label font-semibold tracking-[0.2em] uppercase hover:border-brand-green hover:text-brand-green transition-all duration-300">
            Explore Projects
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
