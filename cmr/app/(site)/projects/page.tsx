import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getAllProjects } from '@/lib/wordpress'
import ProjectsGrid from './ProjectsGrid'

export const metadata: Metadata = {
  title: 'Villa Projects in Kerala | CMR Developers — Kannur & Ernakulam',
  description: "Browse CMR Developers' luxury villa projects in Kannur and Ernakulam — Alvina Harmony, Aiza Harmony, Aina Harmony. Prices from Rs.50L. K-RERA registered. Book a site visit today.",
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/projects',
  },
}

// Fallback static data if WordPress is not yet populated
const FALLBACK_PROJECTS = [
  { 
    _id: '1', 
    name: 'Alvina Harmony',  
    slug: 'alvina-harmony',  
    location: 'Kadachira, Kannur', 
    status: 'On Going',      
    price: '₹55 Lakhs Onwards', 
    heroImage: '/images/extracted/cmr-villa-exterior.jpg',  
    badge: { num: '34', label: 'Premium Villas' }, 
    reraNumber: 'K-RERA/PRJ/KAN/024/2024', 
    bhk: '3 & 4 BHK' 
  },
  { 
    _id: '2', 
    name: 'Aiza Harmony',  
    slug: 'aiza-harmony',  
    location: 'Mulanthuruthy, Ernakulam', 
    status: 'On Going',      
    price: '₹65 Lakhs Onwards', 
    heroImage: '/images/extracted/cmr-interior-living.jpg',  
    badge: { num: '24', label: 'Luxury Villas' }, 
    reraNumber: 'K-RERA/PRJ/EKM/089/2024', 
    bhk: '3 BHK' 
  },
  { 
    _id: '3', 
    name: 'Aina Harmony',  
    slug: 'aina-harmony',  
    location: 'Angamaly, Ernakulam', 
    status: 'On Going',      
    price: '₹58 Lakhs Onwards', 
    heroImage: '/images/extracted/cmr-lifecycle-villa.jpg',  
    badge: { num: '28', label: 'Modern Villas' }, 
    reraNumber: 'K-RERA/PRJ/EKM/112/2024', 
    bhk: '3 BHK' 
  },
  { 
    _id: '4', 
    name: 'Anna Harmony',  
    slug: 'anna-harmony',  
    location: 'Taliparamba, Kannur', 
    status: 'Just Launched', 
    price: '₹48 Lakhs Onwards', 
    heroImage: '/images/extracted/cmr-grid-small-3.jpg',     
    badge: { num: '20', label: 'Premium Villas' }, 
    reraNumber: 'K-RERA/PRJ/KAN/154/2025', 
    bhk: '3 BHK' 
  },
  { 
    _id: '5', 
    name: 'Aiza Silver Hills',  
    slug: 'aiza-silver-hills',  
    location: 'Kakkanad, Ernakulam', 
    status: 'Just Launched', 
    price: '₹75 Lakhs Onwards', 
    heroImage: '/images/extracted/cmr-grid-small-4.jpg',     
    badge: { num: '15', label: 'Luxury Villas' }, 
    reraNumber: 'K-RERA/PRJ/EKM/178/2025', 
    bhk: '3 & 4 BHK' 
  },
  { 
    _id: '6', 
    name: 'Aiza Golden Hills',  
    slug: 'aiza-golden-hills',  
    location: 'Mulanthuruthy, Ernakulam', 
    status: 'Completed',     
    price: '₹70 Lakhs Onwards', 
    heroImage: '/images/extracted/cmr-grid-small-5.jpg',     
    badge: { num: '22', label: 'Completed Villas' }, 
    reraNumber: 'K-RERA/PRJ/EKM/045/2023', 
    bhk: '3 & 4 BHK' 
  },
]

export default async function ProjectsPage() {
  let projects: (typeof FALLBACK_PROJECTS[0] & { reraNumber?: string; bhk?: string })[] = []

  try {
    const data = await getAllProjects()
    projects = data?.length ? data : FALLBACK_PROJECTS
  } catch {
    projects = FALLBACK_PROJECTS
  }

  // Schema generation
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'CMR Developers Luxury Villa Projects',
    'description': 'Explore our premium portfolio of luxury, Vastu-compliant villas in Kerala, including Kannur and Ernakulam.',
    'numberOfItems': projects.length,
    'itemListElement': projects.map((project, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `https://www.cmrdevelopers.com/projects/${project.slug}`,
      'name': project.name
    }))
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.cmrdevelopers.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Projects',
        'item': 'https://www.cmrdevelopers.com/projects'
      }
    ]
  }

  return (
    <>
      {/* Dynamic SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Page Hero (Brand Green & Gold Redesign) ────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {/* Soft gold gradient glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="px-section relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center">
            {/* Left Column: Title & Paragraph Content */}
            <div className="text-left">
              <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
                Our Portfolio
              </span>
              <h1
                className="font-display font-bold text-brand-ivory leading-tight mb-6"
                style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
              >
                Luxury Villa Projects Across Kerala — Explore Our Portfolio
              </h1>
              <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
                At CMR Developers, every project we build carries the same promise: Vastu-compliant design, honest pricing, K-RERA registration, and timely delivery. Since 2012, we have developed 17+ villa communities across three districts of Kerala — Kannur, Ernakulam and Kottayam — with 600+ families already living in CMR homes. Our ongoing projects bring our signature gated community experience to new locations, with modern amenities including swimming pools, club houses, landscaped gardens, and 24/7 security. Browse our active projects below or explore our completed portfolio to understand the CMR standard of quality.
              </p>
            </div>

            {/* Right Column: Visual Trust stats bar */}
            <div className="grid grid-cols-2 gap-4 bg-white/5 backdrop-blur-md p-6 md:p-8 border border-white/10 rounded-2xl shadow-2xl">
              <div className="text-center p-4 border-r border-b border-white/10">
                <div className="font-display font-bold text-brand-gold text-3xl md:text-4xl mb-1.5">600+</div>
                <div className="font-body text-[10px] uppercase tracking-widest text-brand-ivory/60 font-semibold">Villas Delivered</div>
              </div>
              <div className="text-center p-4 border-b border-white/10">
                <div className="font-display font-bold text-brand-gold text-3xl md:text-4xl mb-1.5">14+</div>
                <div className="font-body text-[10px] uppercase tracking-widest text-brand-ivory/60 font-semibold">Years of Trust</div>
              </div>
              <div className="text-center p-4 border-r border-white/10">
                <div className="font-display font-bold text-brand-gold text-3xl md:text-4xl mb-1.5">3</div>
                <div className="font-body text-[10px] uppercase tracking-widest text-brand-ivory/60 font-semibold">Districts Covered</div>
              </div>
              <div className="text-center p-4">
                <div className="font-display font-bold text-brand-gold text-3xl md:text-4xl mb-1.5">100%</div>
                <div className="font-body text-[10px] uppercase tracking-widest text-brand-ivory/60 font-semibold">K-RERA Registered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Filter & Minimalist Grid Component ── */}
      <Suspense fallback={<div className="py-20 text-center font-body text-brand-charcoal/40">Loading projects...</div>}>
        <ProjectsGrid initialProjects={projects} />
      </Suspense>

      {/* ── Bottom Editorial & SEO ──────────────────────── */}
      <section className="bg-white py-20 md:py-28 border-t border-brand-gray/20">
        <div className="px-section">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Left Column: Title Block */}
            <div className="space-y-4 lg:sticky lg:top-32">
              <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase block">
                Investment Guide
              </span>
              <h2 className="font-display font-bold text-brand-charcoal text-3xl md:text-4xl leading-tight tracking-tight">
                Find Your Perfect Villa in Kerala
              </h2>
            </div>

            {/* Right Columns (Span 2): Editorial Copy & Inline CTA */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-body text-brand-charcoal/70 text-[15px] leading-relaxed font-light">
                <div className="space-y-6">
                  <p>
                    CMR Developers has established itself as the most trusted villa builder in Kannur district — and is rapidly building the same reputation in Ernakulam and Kottayam. Our villa projects are built in carefully selected locations: close enough to town centres for daily convenience, yet far enough to offer the greenery, quiet and community feel that a real home deserves.
                  </p>
                  <p>
                    Every project is developed with all regulatory approvals in place — including K-RERA registration for all active projects and municipality or panchayat sanctions as applicable. All major nationalised and private banks have approved our projects for home loan sanctioning, including SBI, HDFC, Axis Bank, Federal Bank, and South Indian Bank.
                  </p>
                </div>
                <div className="space-y-8 flex flex-col justify-between h-full">
                  <p>
                    NRI buyers from the Gulf, UK and USA form a significant part of our buyer community. Our NRI-friendly process, virtual site tour facility, and POA support make purchasing your Kerala home from abroad completely hassle-free. Use the filters above to find projects by location or status, or contact our team directly for a personalised recommendation.
                  </p>
                  
                  <div className="pt-6 border-t border-brand-gray/20">
                    <Link
                      href="/contact-us"
                      className="group inline-flex items-center gap-2 text-brand-green hover:text-brand-gold font-body text-[12px] font-bold tracking-[0.2em] uppercase transition-colors duration-300"
                    >
                      <span>Schedule a Free Site Visit</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
