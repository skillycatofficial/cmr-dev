import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/wordpress'
import { decodeHtml } from '@/lib/utils'
import GalleryLightbox from './GalleryLightbox'
import HeroCarousel from './HeroCarousel'
import LayoutSection from './LayoutSection'
import EnquireForm from './EnquireForm'

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

    const decodedName = decodeHtml(project.name);
    const decodedLocation = decodeHtml(project.location);
    const startingPrice = project.price ? ` — ${project.price}` : '';
    const defaultTitle = `${decodedName} Villas in ${decodedLocation} | CMR Developers${startingPrice}`;
    const defaultDesc = project.overview
      ? `${decodedName} in ${decodedLocation} by CMR Developers. ${decodeHtml(project.overview).replace(/\s+/g, ' ').substring(0, 150)}...`
      : `Explore ${decodedName} — a premium, Vastu-compliant luxury villa project in ${decodedLocation} by CMR Developers. Bank-approved with world-class amenities.`;

    return {
      title: project.seo?.title ? decodeHtml(project.seo.title) : defaultTitle,
      description: project.seo?.description ? decodeHtml(project.seo.description) : defaultDesc,
      alternates: {
        canonical: project.seo?.canonical || `https://www.cmrdevelopers.com/projects/${project.slug}`,
      }
    }
  } catch {
    return { title: 'Project' }
  }
}

const statusColor: Record<string, string> = {
  'On Going': 'bg-blue-50 text-blue-700',
  'Just Launched': 'bg-emerald-50 text-emerald-700',
  'Completed': 'bg-gray-100 text-gray-500',
  'Ready to Move': 'bg-emerald-50 text-emerald-700',
  'Sold Out': 'bg-red-50 text-red-700',
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
    /** Multiple hero images for the carousel — falls back to [heroImage] */
    heroImages?: string[];
    heroMobileImage?: string;
    heroMobileImages?: string[];
    gallery?: string[];
    amenities?: { icon: string; label: string }[];
    badge?: { num: string; label: string };
    otherAmenities?: string;
    units?: string;
    bhk?: string;
    plotSize?: string;
    builtUpArea?: string;
    possessionDate?: string;
    googleMapsUrl?: string;
    latitude?: string;
    longitude?: string;
    address?: string;
    /** Short description of the area / neighbourhood for the location section */
    areaDescription?: string;
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
    if (project) {
      project.name = decodeHtml(project.name)
      project.location = decodeHtml(project.location)
      if (project.overview) project.overview = decodeHtml(project.overview)
      if (project.address) project.address = decodeHtml(project.address)
      if (project.areaDescription) project.areaDescription = decodeHtml(project.areaDescription)
    }
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
    'description': project.overview?.replace(/\s+/g, ' ') || `${project.name} is a luxury villa project by CMR Developers.`,
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

      {/* ── Cinematic Hero Carousel ──────────────────────── */}
      <section className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] bg-[#0F2F2B] flex items-end">
        {/* Carousel — uses heroImages[] or falls back to single heroImage */}
        {(() => {
          const heroImgs = (
            project.heroImages && project.heroImages.length > 0
              ? project.heroImages
              : project.heroImage
                ? [project.heroImage]
                : []
          )
          const heroMobileImgs = (
            project.heroMobileImages && project.heroMobileImages.length > 0
              ? project.heroMobileImages
              : project.heroMobileImage
                ? [project.heroMobileImage]
                : []
          )
          return heroImgs.length > 0 ? (
            <HeroCarousel
              desktopImages={heroImgs}
              mobileImages={heroMobileImgs}
              projectName={project.name}
              location={project.location}
            />
          ) : null
        })()}

        {/* Hero text */}
        <div className="relative z-10 px-section pb-8 md:pb-12 w-full">
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
              <div className="font-body text-brand-charcoal/60 text-body leading-relaxed space-y-5">
                {(project.overview ?? `${project.name} is a premium villa project by CMR Developers located in ${project.location}. Crafted with care and architectural precision, each villa is designed to deliver comfort, elegance, and a timeless living experience.`)
                  .split(/\n+/)
                  .filter((para) => para.trim())
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>

              {/* Key Specs Grid */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-brand-gray/40 pt-10">
                {[
                  { label: 'Other Amenities', value: project.otherAmenities ?? '—' },
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
                  { label: 'Location', value: project.location },
                  { label: 'Status', value: project.status },
                  { label: 'Price', value: project.price ?? 'On Request' },
                  { label: 'Units', value: project.badge ? `${project.badge.num} ${project.badge.label}` : '—' },
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
        <LayoutSection
          layout={project.layout}
          name={project.name}
          location={project.location}
        />
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
      {(() => {
        const defaultAmenities: { icon: string; label: string }[] = [
          { icon: '🏘️', label: 'Gated Community' },
          { icon: '🧱', label: 'Compound Wall' },
          { icon: '🚰', label: 'Underground Drainage' },
          { icon: '🌿', label: 'Landscaped Garden' },
          { icon: '🏛️', label: 'Vastu Design' },
          { icon: '🛡️', label: '24/7 Security' },
          { icon: '🛣️', label: 'Paved Internal Roads' },
          { icon: '💧', label: 'Municipal Water Supply' },
        ]
        const displayAmenities = amenities.length > 0 ? amenities : defaultAmenities
        return (
          <section id="amenities" className="bg-white py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
            <div className="px-section">
              <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Features</p>
              <h2
                className="font-display font-bold text-brand-charcoal mb-10"
                style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
              >
                Amenities &amp; Features
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {displayAmenities.map((a, i) => (
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
        )
      })()}

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

            {/* Landmarks Table + Area Description */}
            <div>
              {/* Area description — from CMS or smart default */}
              <p className="font-body text-brand-charcoal/60 text-body leading-relaxed mb-6">
                {project.areaDescription ??
                  `${project.name} is ideally positioned in ${project.location} to offer serene privacy alongside excellent connectivity. Surrounded by lush greenery and well-developed infrastructure, this location ensures easy access to essential services, premier schools, healthcare facilities, and transport links — making it a prime destination for luxury villa living in Kerala.`
                }
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
                <div className="font-body text-brand-charcoal/40 text-label py-4">Detailed landmark distances available on request.</div>
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
                  {
                    q: `What is the RERA status of ${project.name}?`,
                    a: `CMR Developers is committed to full regulatory compliance. For the current RERA registration status of ${project.name}, please contact our team directly at +91 9206 838 383 or admin@cmrdevelopers.com. We will share all legal approvals, land titles, and clearances at any stage of your enquiry.`
                  },
                  {
                    q: 'Can NRI buyers purchase a villa here?',
                    a: 'Absolutely. CMR Developers offers complete remote purchase support for NRI buyers — including virtual site walkthroughs via video call, Power of Attorney (POA) guidance, NRE/FCNR account payment assistance, and dedicated relationship managers who coordinate every legal and financial step on your behalf.'
                  },
                  {
                    q: `What is the expected possession date for ${project.name}?`,
                    a: `${project.possessionDate ? `The expected possession date for ${project.name} is ${project.possessionDate}.` : 'Possession timelines are shared during the booking process and are tied directly to construction milestones.'} We maintain full transparency in our construction schedule and provide monthly progress updates to all registered buyers.`
                  },
                  {
                    q: 'What are the main amenities and features provided?',
                    a: `${project.name} is a fully gated community featuring a robust compound wall for privacy and security. Key amenities include landscaped gardens, underground drainage, Vastu-compliant villa design, paved internal roads, 24/7 gated security, and reliable municipal water supply. Additional clubhouse or pool facilities may vary by project phase.`
                  },
                  {
                    q: 'Are there NRI-friendly home loan and payment plan options?',
                    a: 'Yes. The project is pre-approved by leading banks including SBI, HDFC Bank, and Axis Bank, enabling smooth and fast loan sanctioning for both resident and NRI buyers. Our stage-wise payment plan is linked to construction milestones, protecting your investment at every step. Our finance team can guide you through the complete process.'
                  }
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

            <EnquireForm projectName={project.name} projectLocation={project.location} />

            <div className="mt-8 flex items-center justify-center gap-6">
              <a href="tel:+919206838383" className="flex items-center gap-2 font-body text-brand-ivory/40 text-ui hover:text-brand-gold transition-colors duration-200">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 92068 38383
              </a>
              <a href="https://wa.me/919206838383" className="flex items-center gap-2 font-body text-brand-ivory/40 text-ui hover:text-brand-gold transition-colors duration-200">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
