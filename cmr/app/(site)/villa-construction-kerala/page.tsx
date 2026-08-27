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
      desc: 'Before any commitment is made, CMR\'s team carries out a thorough evaluation of the plot — assessing its orientation, its alignment with Vastu principles, and its connectivity to surrounding infrastructure. Only once a site passes this evaluation does it move forward as a CMR villa project.',
    },
    {
      num: '02',
      title: 'Architect Design & Vastu Planning',
      desc: 'CMR\'s certified in-house architects design each home from a blank page, weaving Vastu principles into the layout from day one rather than retrofitting them later. Clients receive complete floor plans, elevation drawings and 3D renders before a single brick is laid.',
    },
    {
      num: '03',
      title: 'Regulatory & Statutory Approvals',
      desc: 'CMR takes full ownership of the paperwork burden — securing permits, obtaining municipal or panchayat sanctions, and completing statutory registrations wherever applicable. Homeowners are kept in the loop with certified copies of every approval as it comes through.',
    },
    {
      num: '04',
      title: 'Construction by CMR\'s In-House Team',
      desc: 'Construction is carried out entirely by CMR\'s own trained workforce, using premium-grade materials throughout — AAC blocks, branded cement, ISI-marked steel, and rigorously quality-tested tiling. Clients receive monthly progress photos and status updates, keeping them connected to the build even from a distance.',
    },
    {
      num: '05',
      title: 'Quality Inspection & Finishing',
      desc: 'Before any finishing work begins, every villa is put through a comprehensive, multi-point quality inspection. Electrical wiring, plumbing, waterproofing, tiling and paintwork are each carried out against a defined internal CMR quality standard.',
    },
    {
      num: '06',
      title: 'Handover & After-Service',
      desc: 'Villas are handed over spotless, complete and genuinely move-in ready. CMR\'s involvement doesn\'t stop at the handover ceremony — a dedicated post-completion service window is provided to address any snags or finishing issues that may surface after move-in.',
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
            For CMR Developers, villa construction isn&apos;t a line item on a services list — it is the singular focus of the business, refined across more than 600 homes built to date.
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
                Kerala&apos;s Most Trusted Name in Villa Construction
              </h2>
              <p>
                Each villa CMR builds is constructed by its own permanent team of engineers, masons, carpenters and finishing specialists — never outsourced, never subcontracted, and never handed off to unknown third-party labour.
              </p>
              <p>
                That commitment runs from the very first site visit and architectural consultation right through to the day the keys are placed in the homeowner&apos;s hands. Every stage sits under the direct supervision of CMR&apos;s own professionals — the same in-house team behind the on-time completion of all 17+ CMR project developments to date.
              </p>
              <p>
                Whether a client is purchasing a home within one of CMR&apos;s gated community developments or commissioning a fully custom villa on privately owned land, the same standard of craftsmanship, transparency and accountability applies to every square foot built.
              </p>
            </div>

            {/* Right Quick Box */}
            <div className="bg-[#fcfbf9] p-8 border border-brand-gray/30 rounded-2xl w-full">
              <h3 className="font-display font-bold text-brand-charcoal text-[18px] mb-4">
                Construction Promise
              </h3>
              <ul className="space-y-3 font-body text-[13px] text-brand-charcoal/60">
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> Permanent, Professionally Trained In-House Workforce
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> Absolute Zero Sub-Contracting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> Vastu-Compliant Design Built In From the Ground Up
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> Only Branded, Quality-Tested Materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green">✓</span> 100% On-Time, Fully Turnkey Handovers
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
            Ready to Build With CMR?
          </h3>
          <p className="font-body text-brand-ivory/60 text-sm mb-8 max-w-lg mx-auto font-light">
            Clients who already own a plot — or who are still exploring where to build — can reach out to CMR&apos;s in-house engineering and architecture team for a complimentary site assessment and Vastu alignment review.
          </p>
          <Link
            href="/contact-us"
            className="inline-block px-12 py-4 bg-brand-gold hover:bg-brand-ivory text-brand-green hover:text-brand-green font-body text-[12px] font-bold tracking-[0.25em] uppercase shadow-lg rounded-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Request a Free Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
