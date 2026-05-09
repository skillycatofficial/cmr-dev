'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const posts = [
  { id: 1, category: 'Lifestyle',  date: 'April 18, 2026',  readTime: '4 min read', img: '/images/extracted/cmr-interior-living.jpg',  href: '/stories/blogs/vasthu-compliant-villas',         title: 'Why Vasthu-Compliant Villas Are the Right Choice for Kerala Families',               excerpt: 'Vasthu Shastra is not just tradition — it is a science of space that influences well-being, natural light, and family harmony. We explore how CMR integrates it into every villa.' },
  { id: 2, category: 'Design',     date: 'March 29, 2026',  readTime: '5 min read', img: '/images/extracted/cmr-interior-dining.jpg',   href: '/stories/blogs/interior-design-trends-2026',     title: "5 Interior Design Trends Shaping Kerala's Luxury Villa Market in 2026",              excerpt: "From earthy textures to open-plan living, we look at the design choices that modern Kerala families are making — and how CMR's villas are built ahead of the curve." },
  { id: 3, category: 'NRI Guide',  date: 'March 10, 2026',  readTime: '6 min read', img: '/images/slide/cmrslide4.webp',   href: '/stories/blogs/nri-guide-buying-property-kerala', title: 'A Complete Guide for NRIs Buying Property in Kerala: What CMR Does Differently',    excerpt: "Buying a villa in Kerala from abroad is now easier than ever with CMR's dedicated NRI support — from legal assistance to virtual walkthroughs and post-handover maintenance." },
]

export default function BlogSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-white py-14 md:py-20 border-t border-brand-gray/30">
      <div className="px-section" ref={ref}>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            {/* section (36px) */}
            <h2 className="font-display font-bold text-brand-charcoal text-section tracking-tight">WHAT&apos;S NEW @ CMR</h2>
            <div className="w-16 h-0.5 bg-brand-gold mt-3" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            {/* ui (16px) */}
            <Link href="/stories" className="font-body text-brand-green text-ui font-semibold tracking-wide hover:text-brand-gold transition-colors duration-200 flex items-center gap-1.5 group">
              View All Stories
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="group">
              <Link href={post.href}>
                <div className="relative overflow-hidden h-[200px] mb-4">
                  <Image 
                    src={post.img} 
                    alt={post.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Category: micro (11px) */}
                  <div className="absolute top-3 left-3 z-10 bg-brand-green text-brand-ivory text-micro font-body font-semibold tracking-[0.15em] uppercase px-2.5 py-1">{post.category}</div>
                </div>
                {/* Meta: label (13px) */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-body text-brand-charcoal/40 text-label">{post.date}</span>
                  <span className="text-brand-gray">·</span>
                  <span className="font-body text-brand-charcoal/40 text-label">{post.readTime}</span>
                </div>
                {/* Post title: heading (22px) */}
                <h3 className="font-display font-bold text-brand-charcoal text-heading leading-snug mb-3 group-hover:text-brand-green transition-colors duration-200">{post.title}</h3>
                {/* Excerpt: body (20px) */}
                <p className="font-body text-brand-charcoal/50 text-body leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                {/* Read link: ui (16px) */}
                <span className="inline-flex items-center gap-1.5 font-body text-brand-green text-ui font-semibold group-hover:text-brand-gold transition-colors duration-200">
                  Read Article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
