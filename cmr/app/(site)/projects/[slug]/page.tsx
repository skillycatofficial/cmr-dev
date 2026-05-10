import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/sanity/queries'

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
    return {
      title: project.name,
      description: project.overview ?? `${project.name} — a luxury villa project in ${project.location} by CMR Developers.`,
    }
  } catch {
    return { title: 'Project' }
  }
}

const statusColor: Record<string, string> = {
  'On Going':     'bg-blue-50 text-blue-700',
  'Just Launched':'bg-emerald-50 text-emerald-700',
  'Completed':    'bg-gray-100 text-gray-500',
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  let project: any = null
  try {
    project = await getProjectBySlug(slug)
  } catch {
    // Sanity not connected yet — fall through to notFound
  }

  if (!project) notFound()

  const gallery: string[] = project.gallery ?? []
  const amenities: { icon: string; label: string }[] = project.amenities ?? []

  return (
    <>
      {/* ── Cinematic Hero ──────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[480px] bg-[#0F2F2B] flex items-end">
        {project.heroImage && (
          <Image
            src={project.heroImage}
            alt={project.name}
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
      <nav className="bg-white border-b border-brand-gray/30 sticky top-[72px] z-30">
        <div className="px-section">
          <div className="flex items-center gap-8 overflow-x-auto">
            {['Overview', 'Gallery', 'Amenities', 'Enquire'].map((tab) => (
              <a
                key={tab}
                href={`#${tab.toLowerCase()}`}
                className="font-body text-label font-semibold tracking-wide text-brand-charcoal/50 hover:text-brand-green py-4 border-b-2 border-transparent hover:border-brand-green transition-all duration-200 whitespace-nowrap"
              >
                {tab}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Overview ────────────────────────────────────── */}
      <section id="overview" className="bg-white py-16 md:py-20">
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
            </div>

            {/* Quick specs card */}
            <div className="bg-[#f8f9fa] p-6 h-fit">
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

      {/* ── Gallery ─────────────────────────────────────── */}
      {gallery.length > 0 && (
        <section id="gallery" className="bg-[#f8f9fa] py-16 md:py-20 border-t border-brand-gray/30">
          <div className="px-section">
            <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Gallery</p>
            <h2
              className="font-display font-bold text-brand-charcoal mb-10"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
            >
              Project Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((img: string, i: number) => (
                <div
                  key={i}
                  className={`relative overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2 h-[420px] md:h-[500px]' : 'h-[200px] md:h-[240px]'}`}
                >
                  <Image
                    src={img}
                    alt={`${project.name} gallery ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Amenities ───────────────────────────────────── */}
      {amenities.length > 0 && (
        <section id="amenities" className="bg-white py-16 md:py-20 border-t border-brand-gray/30">
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

      {/* ── Enquire ─────────────────────────────────────── */}
      <section id="enquire" className="bg-[#0F2F2B] py-16 md:py-20">
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
              <a href="tel:+919447000000" className="font-body text-brand-ivory/40 text-ui hover:text-brand-gold transition-colors duration-200">
                📞 +91 94470 00000
              </a>
              <a href="https://wa.me/919447000000" className="font-body text-brand-ivory/40 text-ui hover:text-brand-gold transition-colors duration-200">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
