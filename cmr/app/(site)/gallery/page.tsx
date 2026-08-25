import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProjects, getProjectBySlug, getGalleryItems, getPageMetadata } from '@/lib/wordpress'
import { decodeHtml } from '@/lib/utils'

const Gallery = dynamic(() => import('@/components/sections/Gallery'))

const defaultMetadata: Metadata = {
  title: 'Gallery | Architectural Perspectives — CMR Developers Kerala',
  description: 'Explore the interiors, exteriors and amenities of CMR Developers’ luxury villas across Kannur, Ernakulam and Kottayam — project-wise photo galleries of our completed and ongoing developments.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/gallery',
  },
  openGraph: {
    title: 'Gallery | Architectural Perspectives — CMR Developers Kerala',
    description: 'Project-wise photo galleries of CMR Developers’ luxury villas — interiors, exteriors and amenities across Kerala.',
    url: 'https://www.cmrdevelopers.com/gallery',
    siteName: 'CMR Developers',
    images: [
      {
        url: 'https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'CMR Developers — Gallery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Architectural Perspectives — CMR Developers Kerala',
    description: 'Project-wise photo galleries of CMR Developers’ luxury villas — interiors, exteriors and amenities across Kerala.',
    images: ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery', defaultMetadata)
}

// Cycled aspect ratios for the plain masonry grids below — project gallery
// images don't carry aspect metadata the way the curated WP gallery items do
const ASPECTS = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[16/9]']

interface ProjectSection {
  name: string
  slug: string
  images: string[]
  location?: string
  villaCount?: string
}

async function getProjectSections(): Promise<ProjectSection[]> {
  try {
    const projects = await getAllProjects()
    if (!projects?.length) return []

    const details = await Promise.all(
      projects.map((p: { slug: string }) =>
        getProjectBySlug(p.slug).catch(() => null)
      )
    )

    return projects
      .map((p: Record<string, unknown>, i: number) => {
        const detail = details[i] as { gallery?: string[] } | null
        const heroImage = p.heroImage ? String(p.heroImage) : undefined
        const images = detail?.gallery?.length ? detail.gallery : (heroImage ? [heroImage] : [])

        const badge = p.badge as { num?: string } | undefined
        const villaCount = badge?.num ? String(badge.num) : (p.units ? String(p.units) : undefined)
        const subLocation = p.sub_location ? String(p.sub_location) : ''
        const rawLocation = p.location ? String(p.location) : ''
        const location = subLocation || rawLocation.split(',')[0].trim() || undefined

        return { name: decodeHtml(String(p.name || '')), slug: String(p.slug || ''), images, location, villaCount }
      })
      .filter((section: ProjectSection) => section.images.length > 0)
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [projectSections, galleryItems] = await Promise.all([
    getProjectSections(),
    getGalleryItems().catch(() => []),
  ])

  return (
    <>
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            Visual Archive
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            Architectural Perspectives — Inside Our Luxury Villas
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            A project-wise photo archive of CMR Developers&apos; villas across Kerala — from Vastu-compliant living spaces to landscaped community grounds.
          </p>
        </div>
      </section>

      {/* ── Project-wise Galleries ──────────────────────── */}
      {projectSections.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="px-section space-y-16 md:space-y-24">
            {projectSections.map((project) => (
              <div key={project.slug} className="border-b border-brand-gray/15 pb-16 md:pb-24 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl">
                      {project.name}
                    </h2>
                    {(project.location || project.villaCount) && (
                      <p className="font-body text-brand-charcoal/50 text-[13px] mt-1.5">
                        {project.location}
                        {project.location && project.villaCount && ' · '}
                        {project.villaCount && `${project.villaCount} Villas`}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-body text-brand-gold text-[12px] font-bold tracking-widest uppercase hover:text-brand-green transition-colors duration-200 flex-shrink-0"
                  >
                    View Project →
                  </Link>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                  {project.images.map((src, i) => (
                    <div
                      key={src}
                      className={`relative w-full ${ASPECTS[i % ASPECTS.length]} overflow-hidden group cursor-pointer mb-4 break-inside-avoid inline-block rounded-lg shadow-sm`}
                    >
                      <Image
                        src={src}
                        alt={`${project.name} — photo ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Others: general gallery, not tied to a specific project ───── */}
      <Gallery
        initialItems={galleryItems}
        eyebrow="OTHERS"
        title={<>MORE FROM<br/>CMR DEVELOPERS</>}
      />
    </>
  )
}
