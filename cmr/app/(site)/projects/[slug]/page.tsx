import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/wordpress'
import GalleryLightbox from './GalleryLightbox'

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    const projects = await getAllProjects()
    return (projects ?? []).map((p: { slug: string }) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await getProjectBySlug(slug)
    if (!project) return { title: 'Project Not Found' }
    
    const startingPrice = project.price ? ` — ${project.price}` : '';
    const defaultTitle = `${project.name} Villas in ${project.location} | CMR Developers${startingPrice} | K-RERA`;
    const defaultDesc = project.overview 
      ? `${project.name} in ${project.location} by CMR Developers. ${project.overview.substring(0, 150)}...`
      : `Explore ${project.name} — a premium, Vastu-compliant luxury villa project in ${project.location} by CMR Developers. K-RERA registered with world-class amenities.`;
    
    return {
      title: project.seo?.title || defaultTitle,
      description: project.seo?.description || defaultDesc,
      alternates: {
        canonical: project.seo?.canonical || `https://www.cmrdevelopers.com/projects/${project.slug}`,
      }
    }
  } catch {
    return { title: 'Project' }
  }
}

const statusColor: Record<string, string> = {
  'On Going':     'bg-blue-50 text-blue-700',
  'Just Launched':'bg-emerald-50 text-emerald-700',
  'Completed':    'bg-gray-100 text-gray-500',
  'Ready to Move':'bg-emerald-50 text-emerald-700',
  'Sold Out':     'bg-red-50 text-red-700',
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  let project: {
    name: string;
    slug: string;
    location: string;
    status: string;
    price?: string;
    overview?: string;
    heroImage?: string;
    gallery?: string[];
    amenities?: { icon: string; label: string }[];
    badge?: { num: string; label: string };
    reraNumber?: string;
    units?: string;
    bhk?: string;
    plotSize?: string;
    builtUpArea?: string;
    possessionDate?: string;
    googleMapsUrl?: string;
    latitude?: string;
    longitude?: string;
    address?: string;
    landmarks?: { landmark: string; distance: string }[];
    constructionProgress?: string;
    paymentPlan?: { stage: string; amount: string }[];
    bankPartners?: string[];
    faqs?: { question: string; answer: string }[];
    layout?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string;
      canonical?: string;
    };
  } | null = null

  try {
    project = await getProjectBySlug(slug)
  } catch {
    // WordPress not connected yet — fall through to notFound
  }

  if (!project) notFound()

  const gallery: string[] = project.gallery ?? []
  const amenities: { icon: string; label: string }[] = project.amenities ?? []
  const landmarks = project.landmarks ?? []
  const paymentPlan = project.paymentPlan ?? []
  const bankPartners = project.bankPartners ?? []
  const faqs = project.faqs ?? []

  // Dynamic JSON-LD schemas
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
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': project.name,
        'item': `https://www.cmrdevelopers.com/projects/${project.slug}`
      }
    ]
  }

  const realEstateSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': project.name,
    'description': project.overview || `${project.name} is a luxury villa project by CMR Developers.`,
    'url': `https://www.cmrdevelopers.com/projects/${project.slug}`,
    'image': project.heroImage,
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': project.price || 'Price on Request',
      'availability': project.status === 'Sold Out' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock'
    }
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `CMR Developers - ${project.name}`,
    'description': `${project.name} project site.`,
    'telephone': '+91-9206838383',
    'email': 'admin@cmrdevelopers.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': project.address || `${project.location}, Kerala`,
      'addressLocality': project.location,
      'addressRegion': 'Kerala',
      'addressCountry': 'IN'
    },
    ...(project.latitude && project.longitude ? {
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': parseFloat(project.latitude),
        'longitude': parseFloat(project.longitude)
      }
    } : {})
  }

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  } : null;

  return (
    <>
      {/* Dynamic SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── Cinematic Hero ──────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[480px] bg-[#0F2F2B] flex items-end">
        {project.heroImage && (
          <Image
            src={project.heroImage}
            alt={`${project.name} - Luxury Villa Project by CMR Developers Kerala`}
            fill
            priority
            className="object-cover"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Hero text */}
        <div className="relative z-10 px-section pb-12 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-body text-brand-ivory/50 text-label mb-4">
            <Link href="/" className="hover:text-brand-ivory transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-brand-ivory transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-brand-ivory">{project.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              {project.status && (
                <span className={`inline-block font-body text-micro font-semibold tracking-wide px-3 py-1 rounded-full mb-3 ${statusColor[project.status] ?? 'bg-gray-100 text-gray-500'}`}>
                  {project.status}
                </span>
              )}
              <h1
                className="font-display font-bold text-brand-ivory leading-none mb-2"
                style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.025em' }}
              >
                {project.name}
              </h1>
              <p className="font-body text-brand-ivory/60 text-ui tracking-[0.2em] uppercase">
                {project.location}
              </p>
            </div>

            <div className="flex-shrink-0">
              <div className="font-body text-brand-ivory/40 text-label tracking-[0.2em] uppercase mb-1">Starting From</div>
              <div
                className="font-display font-bold text-brand-gold"
                style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}
              >
                {project.price ?? 'Price on Request'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky quick-nav ────────────────────────────── */}
      <nav className="bg-white border-b border-brand-gray/30 sticky top-[72px] z-30 font-body text-label">
        <div className="px-section">
          <div className="flex items-center gap-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              project.layout ? { id: 'layout', label: 'Layout Plan' } : null,
              gallery.length > 0 ? { id: 'gallery', label: 'Gallery' } : null,
              amenities.length > 0 ? { id: 'amenities', label: 'Amenities' } : null,
              { id: 'location', label: 'Location' },
              { id: 'construction', label: 'Construction' },
              { id: 'finance', label: 'Finance' },
              faqs.length > 0 || project.status ? { id: 'faq', label: 'FAQ' } : null,
              { id: 'enquire', label: 'Enquire' },
            ].filter((tab): tab is { id: string; label: string } => tab !== null).map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="font-semibold tracking-wide text-brand-charcoal/50 hover:text-brand-green py-4 border-b-2 border-transparent hover:border-brand-green transition-all duration-200 whitespace-nowrap"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Overview ────────────────────────────────────── */}
      <section id="overview" className="bg-white py-16 md:py-20 scroll-mt-[130px]">
        <div className="px-section">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            <div>
              <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Overview</p>
              <h2
                className="font-display font-bold text-brand-charcoal mb-6"
                style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
              >
                About {project.name}
              </h2>
              <div className="w-16 h-0.5 bg-brand-gold mb-8" />
              <p className="font-body text-brand-charcoal/60 text-body leading-relaxed">
                {project.overview ?? `${project.name} is a premium villa project by CMR Developers located in ${project.location}. Crafted with care and architectural precision, each villa is designed to deliver comfort, elegance, and a timeless living experience.`}
              </p>

              {/* Key Specs Grid */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-brand-gray/40 pt-10">
                {[
                  { label: 'RERA Number', value: project.reraNumber ?? 'K-RERA Registered' },
                  { label: 'Total Units', value: project.units ?? '—' },
                  { label: 'BHK Options', value: project.bhk ?? '—' },
                  { label: 'Plot Size', value: project.plotSize ?? '—' },
                  { label: 'Built-up Area', value: project.builtUpArea ?? '—' },
                  { label: 'Possession Date', value: project.possessionDate ?? '—' },
                ].map((spec) => (
                  <div key={spec.label} className="p-4 bg-[#f8f9fa] border-l-2 border-brand-gold">
                    <div className="font-body text-[11px] text-brand-charcoal/45 tracking-wider uppercase mb-1">{spec.label}</div>
                    <div className="font-display font-bold text-brand-charcoal text-base">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick specs card */}
            <div className="bg-[#f8f9fa] p-6 h-fit border border-brand-gray/20 shadow-sm">
              <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-5">Project Details</p>
              <div className="space-y-4">
                {[
                  { label: 'Location',  value: project.location },
                  { label: 'Status',    value: project.status },
                  { label: 'Price',     value: project.price ?? 'On Request' },
                  { label: 'Units',     value: project.badge ? `${project.badge.num} ${project.badge.label}` : '—' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 pb-4 border-b border-brand-gray/40 last:border-0 last:pb-0">
                    <span className="font-body text-brand-charcoal/45 text-label tracking-wide">{item.label}</span>
                    <span className="font-body text-brand-charcoal text-label font-semibold text-right">{item.value}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#enquire"
                className="mt-6 block text-center px-6 py-3.5 bg-brand-green text-brand-ivory font-body text-label font-semibold tracking-[0.2em] uppercase hover:bg-brand-gold transition-colors duration-300"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Layout ──────────────────────────────── */}
      {project.layout && (
        <section id="layout" className="bg-[#f8f9fa] py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
          <div className="px-section">
            <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Architecture</p>
            <h2
              className="font-display font-bold text-brand-charcoal mb-6"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
            >
              Project Layout & Floor Plan
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold mb-8" />
            
            <div className="max-w-4xl bg-white border border-brand-gray/40 p-6 md:p-10 shadow-sm">
              {project.layout.toLowerCase().endsWith('.pdf') ? (
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-charcoal text-lg md:text-xl mb-1">
                        Master Layout Plan (PDF)
                      </h4>
                      <p className="font-body text-brand-charcoal/50 text-sm">
                        Download or view the comprehensive site layout and architectural master plan.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 w-full md:w-auto">
                    <a
                      href={project.layout}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none text-center px-6 py-3.5 border border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-ivory font-body text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                    >
                      View PDF
                    </a>
                    <a
                      href={project.layout}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none text-center px-6 py-3.5 bg-brand-green hover:bg-brand-gold text-brand-ivory font-body text-xs font-bold tracking-[0.2em] uppercase shadow-md shadow-brand-green/10 transition-all duration-300"
                    >
                      Download Plan
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="relative w-full aspect-[16/10] bg-[#fdfdfd] border border-brand-gray/30 overflow-hidden group">
                    <Image
                      src={project.layout}
                      alt={`${project.name} - Master Layout and Floor Plan`}
                      fill
                      className="object-contain p-2 md:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-brand-gray/20">
                    <div>
                      <h4 className="font-display font-bold text-brand-charcoal text-lg mb-1">
                        Master Layout & Site Map
                      </h4>
                      <p className="font-body text-brand-charcoal/50 text-sm">
                        High-resolution architectural layout indicating villa plots, roads, and common amenities.
                      </p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <a
                        href={project.layout}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none text-center px-6 py-3.5 border border-brand-gray text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory font-body text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                      >
                        View Full Screen
                      </a>
                      <a
                        href={project.layout}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none text-center px-6 py-3.5 bg-brand-green hover:bg-brand-gold text-brand-ivory font-body text-xs font-bold tracking-[0.2em] uppercase shadow-md shadow-brand-green/10 transition-all duration-300"
                      >
                        Download Image
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery ─────────────────────────────────────── */}
      {gallery.length > 0 && (
        <section id="gallery" className="bg-[#f8f9fa] py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
          <div className="px-section">
            <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Gallery</p>
            <h2
              className="font-display font-bold text-brand-charcoal mb-10"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
            >
              Project Gallery
            </h2>

            <GalleryLightbox gallery={gallery} projectName={project.name} />
          </div>
        </section>
      )}

      {/* ── Amenities ───────────────────────────────────── */}
      {amenities.length > 0 && (
        <section id="amenities" className="bg-white py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
          <div className="px-section">
            <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Features</p>
            <h2
              className="font-display font-bold text-brand-charcoal mb-10"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
            >
              Amenities
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border border-brand-gray/40 hover:border-brand-green transition-colors duration-200">
                  {a.icon && (
                    <span className="text-brand-gold text-heading flex-shrink-0">{a.icon}</span>
                  )}
                  <span className="font-body text-brand-charcoal/70 text-ui">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Location ────────────────────────────────────── */}
      <section id="location" className="bg-white py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
        <div className="px-section">
          <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Connectivity</p>
          <h2
            className="font-display font-bold text-brand-charcoal mb-10"
            style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
          >
            Location Advantages
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Map Embed */}
            <div className="relative aspect-video w-full bg-brand-gray/20 overflow-hidden shadow-sm h-[350px] md:h-[400px] border border-brand-gray/40">
              {project.googleMapsUrl ? (
                <iframe
                  src={project.googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center font-body text-brand-charcoal/40 text-label">
                  Google Map Embed Not Available
                </div>
              )}
            </div>

            {/* Landmarks Table */}
            <div>
              <p className="font-body text-brand-charcoal/60 text-body leading-relaxed mb-6">
                {project.name} is ideally positioned to offer serene privacy alongside excellent connectivity. Key landmarks are within short driving distance, making it convenient for daily needs, schools, and airport travel.
              </p>
              {landmarks.length > 0 ? (
                <div className="border border-brand-gray/40">
                  {landmarks.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 border-b border-brand-gray/30 last:border-0 hover:bg-[#f8f9fa] transition-colors font-body text-label">
                      <span className="text-brand-charcoal font-medium">{item.landmark}</span>
                      <span className="font-display text-brand-green font-bold">{item.distance}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="font-body text-brand-charcoal/40 text-label py-4">No landmarks provided.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Construction ────────────────────────────────── */}
      <section id="construction" className="bg-[#f8f9fa] py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
        <div className="px-section">
          <div className="max-w-3xl">
            <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Timeline</p>
            <h2
              className="font-display font-bold text-brand-charcoal mb-6"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
            >
              Construction Updates
            </h2>
            <p className="font-body text-brand-charcoal/60 text-body leading-relaxed mb-8">
              We maintain complete transparency in our development lifecycle. Here is the current construction status of {project.name}.
            </p>
            
            {/* Progress Track */}
            {project.constructionProgress ? (
              <div className="bg-white p-6 md:p-8 border border-brand-gray/40 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-brand-charcoal text-ui font-bold uppercase tracking-wider">Overall Completion</span>
                  <span className="font-display text-brand-green text-2xl font-bold">{project.constructionProgress}%</span>
                </div>
                <div className="w-full h-3 bg-brand-gray/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-green transition-all duration-1000" 
                    style={{ width: `${project.constructionProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 border border-brand-gray/40 text-center font-body text-brand-charcoal/40 text-label">
                Construction progress details on request.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Finance ─────────────────────────────────────── */}
      <section id="finance" className="bg-white py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
        <div className="px-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-body text-label">
            {/* Payment Plan */}
            <div>
              <p className="text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Milestones</p>
              <h2
                className="font-display font-bold text-brand-charcoal mb-6"
                style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
              >
                Stage-wise Payment Plan
              </h2>
              <p className="text-brand-charcoal/60 text-body leading-relaxed mb-8">
                Our payment schedules are linked directly to construction milestones, protecting your investment at every stage.
              </p>
              {paymentPlan.length > 0 ? (
                <div className="space-y-4">
                  {paymentPlan.map((stage, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-brand-gray/30 last:border-0 last:pb-0">
                      <span className="text-brand-charcoal font-medium">{stage.stage}</span>
                      <span className="font-display text-brand-gold font-bold">{stage.amount}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-brand-charcoal/40 text-label">Detailed payment schedules are customized per client agreement.</p>
              )}
            </div>

            {/* Bank Partners */}
            <div className="bg-[#f8f9fa] p-8 border border-brand-gray/40 shadow-sm h-fit">
              <p className="text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Financing</p>
              <h2 className="font-display font-bold text-brand-charcoal mb-6 text-2xl">
                Empanelled Bank Partners
              </h2>
              <p className="text-brand-charcoal/60 text-sm leading-relaxed mb-8">
                This project is pre-approved for home loans by major nationalized and private financial institutions, making the loan sanctioning process smooth and hassle-free, especially for NRI buyers.
              </p>
              <div className="flex flex-wrap gap-3">
                {bankPartners.length > 0 ? (
                  bankPartners.map((bank, idx) => (
                    <span key={idx} className="bg-white border border-brand-gray/40 text-brand-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded">
                      {bank}
                    </span>
                  ))
                ) : (
                  ['SBI', 'HDFC', 'Axis Bank', 'Federal Bank'].map((bank, idx) => (
                    <span key={idx} className="bg-white border border-brand-gray/40 text-brand-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded">
                      {bank}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="bg-[#f8f9fa] py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
        <div className="px-section">
          <div className="max-w-3xl mx-auto">
            <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3 text-center">Frequently Asked Questions</p>
            <h2
              className="font-display font-bold text-brand-charcoal mb-10 text-center"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
            >
              Project FAQs
            </h2>
            
            <div className="space-y-4">
              {faqs.length > 0 ? (
                faqs.map((faq, idx) => (
                  <details key={idx} className="group border border-brand-gray/40 p-5 cursor-pointer transition-all duration-300 open:border-brand-green bg-white rounded-md shadow-sm">
                    <summary className="flex items-center justify-between list-none font-display font-bold text-brand-charcoal text-base outline-none">
                      <span>{faq.question}</span>
                      <span className="text-brand-green group-open:rotate-180 transition-transform duration-300 font-bold">▼</span>
                    </summary>
                    <p className="font-body text-brand-charcoal/60 text-sm mt-4 leading-relaxed border-t border-brand-gray/30 pt-4">
                      {faq.answer}
                    </p>
                  </details>
                ))
              ) : (
                [
                  { q: `Is ${project.name} RERA registered?`, a: `Yes, ${project.name} carries a valid K-RERA registration. All legal approvals and clearances are fully documented and available for buyer verification.` },
                  { q: 'Can NRI buyers purchase a villa here?', a: 'Absolutely. We offer complete remote purchase support for NRI buyers, including virtual walkthroughs, POA guidance, and NRE/FCNR account payment assistance.' },
                  { q: 'What are the main amenities provided?', a: 'The project features premium amenities such as a swimming pool, clubhouse, landscaped gardens, paved internal roads, 24/7 security, and compound wall enclosure.' }
                ].map((faq, idx) => (
                  <details key={idx} className="group border border-brand-gray/40 p-5 cursor-pointer transition-all duration-300 open:border-brand-green bg-white rounded-md shadow-sm">
                    <summary className="flex items-center justify-between list-none font-display font-bold text-brand-charcoal text-base outline-none font-body">
                      <span>{faq.q}</span>
                      <span className="text-brand-green group-open:rotate-180 transition-transform duration-300 font-bold">▼</span>
                    </summary>
                    <p className="font-body text-brand-charcoal/60 text-sm mt-4 leading-relaxed border-t border-brand-gray/30 pt-4">
                      {faq.a}
                    </p>
                  </details>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Enquire ─────────────────────────────────────── */}
      <section id="enquire" className="bg-[#0F2F2B] py-16 md:py-20 scroll-mt-[130px]">
        <div className="px-section">
          <div className="max-w-xl mx-auto text-center">
            <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Get In Touch</p>
            <h2
              className="font-display font-bold text-brand-ivory mb-4"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
            >
              Interested in {project.name}?
            </h2>
            <p className="font-body text-brand-ivory/50 text-body mb-10">
              Leave your details and our team will get back to you within 24 hours.
            </p>

            <form className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/5 border border-white/15 text-brand-ivory font-body text-ui px-4 py-3.5 outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/25 w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-white/5 border border-white/15 text-brand-ivory font-body text-ui px-4 py-3.5 outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/25 w-full"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/5 border border-white/15 text-brand-ivory font-body text-ui px-4 py-3.5 outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/25 w-full"
              />
              <textarea
                rows={4}
                placeholder="Your message (optional)"
                className="bg-white/5 border border-white/15 text-brand-ivory font-body text-ui px-4 py-3.5 outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/25 w-full resize-none"
                defaultValue={`I'm interested in ${project.name}, ${project.location}.`}
              />
              <button
                type="submit"
                className="w-full py-4 bg-brand-gold text-brand-charcoal font-body text-label font-bold tracking-[0.2em] uppercase hover:bg-brand-ivory transition-colors duration-300"
              >
                Send Enquiry
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-6">
              <a href="tel:+919206838383" className="font-body text-brand-ivory/40 text-ui hover:text-brand-gold transition-colors duration-200">
                📞 +91 92068 38383
              </a>
              <a href="https://wa.me/919206838383" className="font-body text-brand-ivory/40 text-ui hover:text-brand-gold transition-colors duration-200">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
