import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProjects } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore CMR Developers luxury villa projects across Kerala — Kannur, Taliparamba, Karuvanchal and more.',
}

const statusColor: Record<string, string> = {
  'On Going':     'bg-blue-50 text-blue-700',
  'Just Launched':'bg-green-50 text-green-700',
  'Completed':    'bg-gray-100 text-gray-500',
}

// Fallback static data if Sanity is not yet connected
const FALLBACK_PROJECTS = [
  { _id: '1', name: 'CMR Valencia',  slug: 'cmr-valencia',  location: 'Kannur',        status: 'On Going',      price: '₹60 Lakhs Onwards', heroImage: '/images/extracted/cmr-interior-living.jpg',  badge: { num: '32', label: 'Lucky Homes'    } },
  { _id: '2', name: 'CMR Grandeur',  slug: 'cmr-grandeur',  location: 'Taliparamba',   status: 'On Going',      price: '₹75 Lakhs Onwards', heroImage: '/images/extracted/cmr-lifecycle-villa.jpg',  badge: { num: '35', label: 'Modern Villas'  } },
  { _id: '3', name: 'CMR Highland',  slug: 'cmr-highland',  location: 'Karuvanchal',   status: 'Just Launched', price: '₹55 Lakhs Onwards', heroImage: '/images/extracted/cmr-grid-small-3.jpg',     badge: { num: '20', label: 'Luxury Villas'  } },
  { _id: '4', name: 'CMR Elysium',   slug: 'cmr-elysium',   location: 'Changanassery', status: 'Completed',     price: '₹65 Lakhs Onwards', heroImage: '/images/extracted/cmr-grid-small-4.jpg',     badge: { num: '28', label: 'Premium Villas' } },
  { _id: '5', name: 'CMR Primrose',  slug: 'cmr-primrose',  location: 'Angamaly',      status: 'On Going',      price: '₹48 Lakhs Onwards', heroImage: '/images/extracted/cmr-villa-exterior.jpg',   badge: { num: '15', label: 'Villas'         } },
  { _id: '6', name: 'CMR Serene',    slug: 'cmr-serene',    location: 'Mulanthuruthy', status: 'On Going',      price: '₹58 Lakhs Onwards', heroImage: '/images/extracted/cmr-grid-small-5.jpg',     badge: { num: '24', label: 'Villas'         } },
]

export default async function ProjectsPage() {
  let projects: typeof FALLBACK_PROJECTS = []

  try {
    const data = await getAllProjects()
    projects = data?.length ? data : FALLBACK_PROJECTS
  } catch {
    projects = FALLBACK_PROJECTS
  }

  return (
    <>
      {/* Page Hero */}
      <section className="bg-[#0F2F2B] pt-32 pb-16">
        <div className="px-section">
          <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">
            Our Portfolio
          </p>
          <h1
            className="font-display font-bold text-brand-ivory leading-none mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '-0.025em' }}
          >
            All Projects
          </h1>
          <p className="font-body text-brand-ivory/50 text-body max-w-xl">
            Explore our growing portfolio of luxury villas across Kerala — each crafted with care, precision, and a deep respect for nature.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-brand-gray/30 sticky top-[72px] z-30">
        <div className="px-section py-4 flex items-center gap-3 overflow-x-auto">
          {['All', 'On Going', 'Just Launched', 'Completed'].map((f) => (
            <span
              key={f}
              className="font-body text-label tracking-wide px-4 py-1.5 border border-brand-gray/50 text-brand-charcoal/50 whitespace-nowrap cursor-pointer hover:border-brand-green hover:text-brand-green transition-all duration-200 first:bg-brand-green first:text-brand-ivory first:border-brand-green"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Projects grid */}
      <section className="bg-[#f8f9fa] py-14 md:py-20">
        <div className="px-section">
          {projects.length === 0 ? (
            <p className="font-body text-brand-charcoal/40 text-body text-center py-20">
              No projects found. Add some from the Sanity Studio.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug}`}
                  className="group bg-white shadow-sm hover:shadow-md transition-shadow duration-300 block"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-[240px]">
                    {project.heroImage ? (
                      <Image
                        src={project.heroImage}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-gray/30 flex items-center justify-center">
                        <span className="font-body text-brand-charcoal/30 text-label">No image</span>
                      </div>
                    )}

                    {/* Badge */}
                    {project.badge?.num && (
                      <div className="absolute top-3 right-3 z-10 bg-[#4a2d7a] text-white text-center px-2.5 py-1.5 min-w-[52px]">
                        <div className="font-display font-bold leading-none" style={{ fontSize: '18px' }}>
                          {project.badge.num}
                        </div>
                        <div className="font-body text-micro leading-tight mt-0.5 text-white/80">
                          {project.badge.label}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h2 className="font-display font-bold text-brand-charcoal text-heading leading-tight group-hover:text-brand-green transition-colors duration-200">
                        {project.name}
                      </h2>
                      {project.status && (
                        <span className={`font-body text-micro font-semibold tracking-wide px-2 py-1 rounded-full flex-shrink-0 mt-0.5 ${statusColor[project.status] ?? 'bg-gray-100 text-gray-500'}`}>
                          {project.status}
                        </span>
                      )}
                    </div>

                    <p className="font-body text-brand-charcoal/45 text-label tracking-[0.15em] uppercase mb-4">
                      {project.location}
                    </p>

                    <div className="flex items-center justify-between border-t border-brand-gray/40 pt-4">
                      <span className="font-body text-brand-charcoal/65 text-ui font-medium">
                        {project.price}
                      </span>
                      <span className="font-body text-brand-green text-ui font-semibold group-hover:text-brand-gold transition-colors duration-200">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-brand-green text-brand-ivory font-body text-label font-semibold tracking-[0.2em] uppercase hover:bg-brand-gold transition-colors duration-300"
            >
              Enquire About a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
