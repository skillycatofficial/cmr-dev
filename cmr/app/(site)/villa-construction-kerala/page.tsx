import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMetadata } from '@/lib/wordpress'

const defaultMetadata: Metadata = {
  title: 'Villa Construction in Kerala | CMR Developers — Custom & Gated Community Villas Kannur Ernakulam',
  description: 'CMR Developers offers end-to-end villa construction in Kerala — architect-designed, Vastu-compliant, and turnkey delivered. Serving Kannur, Ernakulam and Kottayam since 2012. No sub-contractors. On-time delivery guaranteed.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/villa-construction-kerala',
  },
  openGraph: {
    title: 'Villa Construction in Kerala | CMR Developers',
    description: 'End-to-end villa construction in Kerala by CMR Developers. Architect-designed, Vastu-compliant, turnkey delivery. 600+ villas delivered since 2012 with zero sub-contracting.',
    url: 'https://www.cmrdevelopers.com/villa-construction-kerala',
    siteName: 'CMR Developers',
    images: [
      {
        url: 'https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'CMR Developers — Villa Construction in Kerala',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Construction in Kerala | CMR Developers',
    description: 'Architect-designed, Vastu-compliant villa construction in Kerala. 600+ villas. No sub-contractors. On-time delivery.',
    images: ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('villa-construction-kerala', defaultMetadata)
}


const villaConstructionSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.cmrdevelopers.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Villa Construction Kerala', 'item': 'https://www.cmrdevelopers.com/villa-construction-kerala' }
      ]
    },
    {
      '@type': 'Service',
      'name': 'Villa Construction Kerala',
      'serviceType': 'Residential Villa Construction',
      'provider': {
        '@type': 'Organization',
        '@id': 'https://www.cmrdevelopers.com/#organization',
        'name': 'CMR Developers'
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Kannur' },
        { '@type': 'City', 'name': 'Ernakulam' },
        { '@type': 'City', 'name': 'Kottayam' }
      ],
      'description': 'End-to-end villa construction in Kerala — architect-designed, Vastu-compliant, turnkey delivery with no sub-contracting.',
      'url': 'https://www.cmrdevelopers.com/villa-construction-kerala'
    }
  ]
}

export default function ServicesPage() {
  const steps = [
    {
      num: '01',
      title: 'Site Assessment & Consultation',
      desc: 'Our team evaluates each plot for orientation, Vastu alignment and connectivity before finalising it for a CMR villa project.',
    },
    {
      num: '02',
      title: 'Architect Design & Vastu Planning',
      desc: 'Our certified architects design your home from scratch, incorporating Vastu principles from Day 1 — not retrofitted later. Floor plans, elevations and 3D renders provided before any construction begins.',
    },
    {
      num: '03',
      title: 'Regulatory & Statutory Approvals',
      desc: 'CMR handles all permit applications, municipality or panchayat sanctions, and statutory registrations for applicable projects. You receive certified approval copies at every stage.',
    },
    {
      num: '04',
      title: 'Construction by CMR\'s In-House Team',
      desc: 'Our own trained workforce builds your villa using premium materials — AAC blocks, branded cement, ISI-marked steel, and quality-tested tiles. Progress photos and updates shared monthly.',
    },
    {
      num: '05',
      title: 'Quality Inspection & Finishing',
      desc: 'Every CMR villa undergoes a multi-point quality inspection before finishing work begins. Electrical, plumbing, waterproofing, tiling and paintwork are all executed to a defined CMR standard checklist.',
    },
    {
      num: '06',
      title: 'Handover & After-Service',
      desc: 'We hand over your villa clean, complete, and ready to move in. Our relationship does not end at handover — CMR provides a post-completion service period for any snag rectification.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(villaConstructionSchema) }}
      />
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            Our Services
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            Custom Villa Construction in Kerala — From Design to Delivery | CMR Developers
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            At CMR Developers, villa construction is not a service we offer — it is the only thing we do, and we have done it 600+ times.
          </p>
        </div>
      </section>

      {/* ── Introduction Section ────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="px-section">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            {/* Left Narrative */}
            <div className="text-left font-body text-brand-charcoal/70 text-body space-y-6 leading-relaxed font-light">
              <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight">
                Kerala&apos;s Most Experienced Villa Construction Company
              </h2>
              <p>
                Every CMR villa is built entirely by our in-house team of trained engineers, masons, carpenters and finishing specialists. No sub-contractors. No middlemen. No shortcuts.
              </p>
              <p>
                From the initial land assessment and architect consultation to the final key handover, every stage is managed, monitored and delivered by CMR&apos;s own professionals — the same team responsible for on-time delivery across all 17+ of our completed projects.
              </p>
              <p>
                Whether you are joining one of our gated community projects or building a custom villa on your own plot, CMR brings the same level of commitment, quality and transparency to every square foot we build.
              </p>
            </div>

            {/* Right Quick Box */}
            <div className="bg-[#fcfbf9] p-8 border border-brand-gray/30 rounded-2xl w-full">
              <h3 className="font-display font-bold text-brand-charcoal text-[18px] mb-4">
                Construction Promise
              </h3>
              <ul className="space-y-3 font-body text-[13px] text-brand-charcoal/60">
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> In-House Trained Workforce
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> Zero Sub-Contracting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> Vastu-Compliant by Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> Branded, Quality Materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> 100% On-Time Turnkey Delivery
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Timeline (Visual Steps) ─────────────── */}
      <section className="bg-[#fcfbf9] py-16 md:py-24 border-t border-brand-gray/30">
        <div className="px-section">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block">
                Work Flow
              </span>
              <h2 className="font-display font-bold text-brand-charcoal text-3xl">
                Our 6-Step Construction Process
              </h2>
              <p className="font-body text-brand-charcoal/50 text-sm mt-3 max-w-md mx-auto">
                How we manage your project transparently from the initial consultation to handing over the keys.
              </p>
            </div>

            {/* Vertical timeline steps */}
            <div className="space-y-12 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-[1px] before:bg-brand-gray/60">
              {steps.map((step) => (
                <div key={step.num} className="relative pl-14 text-left">
                  {/* Step Number Dot */}
                  <div className="absolute left-0 top-0.5 z-10 w-12 h-12 rounded-full bg-brand-green text-brand-ivory flex items-center justify-center font-display font-bold text-sm border border-brand-green shadow-sm">
                    {step.num}
                  </div>
                  
                  {/* Step Details */}
                  <div className="bg-white p-6 border border-brand-gray/20 rounded-2xl shadow-sm">
                    <h3 className="font-display font-bold text-brand-charcoal text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-brand-charcoal/65 text-sm leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <section className="bg-[#0F2F2B] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="px-section relative z-10">
          <h3 className="font-display font-bold text-brand-ivory text-2xl md:text-3xl mb-4">
            Have a plot or looking to build?
          </h3>
          <p className="font-body text-brand-ivory/60 text-sm mb-8 max-w-lg mx-auto font-light">
            Contact our in-house engineering and architecture team for a free site assessment and Vastu alignment check.
          </p>
          <Link
            href="/contact-us"
            className="inline-block px-12 py-4 bg-brand-gold hover:bg-brand-ivory text-brand-green hover:text-brand-green font-body text-[12px] font-bold tracking-[0.25em] uppercase shadow-lg rounded-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Request Free Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
