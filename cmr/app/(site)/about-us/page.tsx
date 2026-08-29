import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMetadata } from '@/lib/wordpress'
import MdMessageSection from '@/components/about/MdMessageSection'
import EthicalFoundationsSection from '@/components/about/EthicalFoundationsSection'

const defaultMetadata: Metadata = {
  title: 'About CMR Developers | Villa Builders Since 2012 — Taliparamba, Kannur Kerala',
  description: 'CMR Developers was founded in Taliparamba, Kannur in 2012. In 14 years we have delivered 600+ luxury villas across Kerala, earning the trust of local families and NRI homebuyers through quality, transparency and timely delivery.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/about-us',
  },
  openGraph: {
    title: 'About CMR Developers | Villa Builders Since 2012 — Kannur Kerala',
    description: 'Founded in Taliparamba in 2012, CMR Developers has delivered 600+ luxury villas across Kerala. Trusted by local families and NRI homebuyers for quality, transparency and on-time delivery.',
    url: 'https://www.cmrdevelopers.com/about-us',
    siteName: 'CMR Developers',
    images: [
      {
        url: 'https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'CMR Developers — Building Kerala\'s Most Trusted Homes Since 2012',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CMR Developers | Villa Builders Since 2012',
    description: 'Founded in Taliparamba, Kannur in 2012. 600+ villas delivered across Kerala. Trusted by NRI families for quality & on-time delivery.',
    images: ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('about-us', defaultMetadata)
}


const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.cmrdevelopers.com/about-us',
      'name': 'About CMR Developers',
      'description': 'CMR Developers was founded in Taliparamba, Kannur in 2012. In 14 years we have delivered 600+ luxury villas across Kerala.',
      'url': 'https://www.cmrdevelopers.com/about-us',
      'publisher': {
        '@id': 'https://www.cmrdevelopers.com/#organization'
      }
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.cmrdevelopers.com/#organization',
      'name': 'CMR Developers',
      'url': 'https://www.cmrdevelopers.com',
      'logo': 'https://www.cmrdevelopers.com/logo.png',
      'foundingDate': '2012',
      'foundingLocation': 'Taliparamba, Kannur, Kerala, India',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91-9206838383',
        'contactType': 'sales',
        'email': 'info@cmrdevelopers.com',
        'areaServed': 'IN',
        'availableLanguage': ['en', 'ml']
      },
      'sameAs': [
        'https://www.facebook.com/cmrdeveloperspvtltd',
        'https://www.instagram.com/cmrvillaproject/',
        'https://www.youtube.com/channel/UCEfYEItWDu0KTEsLblmnAyA',
        'https://www.linkedin.com/company/cmrdevelopers'
      ]
    }
  ]
}

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            Our Story
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            Building Kerala&apos;s Most Trusted Homes Since 2012 — The CMR Developers Story
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            Fourteen years and 600+ delivered villas later, CMR Developers is the largest villa construction company in Kannur district — and one of the most respected residential developers in all of Kerala.
          </p>
        </div>
      </section>

      {/* ── Infographics / Stats ────────────────────────── */}
      <section className="bg-white py-12 border-b border-brand-gray/20">
        <div className="px-section">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 bg-brand-ivory/10 p-6 md:p-8 border border-brand-gray/30 rounded-2xl">
            <div className="text-center p-2 border-r border-brand-gray/20 last:border-0">
              <div className="font-display font-bold text-brand-green text-3xl md:text-4xl mb-1">600+</div>
              <div className="font-body text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-semibold">Villas Delivered</div>
            </div>
            <div className="text-center p-2 border-r border-brand-gray/20 last:border-0">
              <div className="font-display font-bold text-brand-green text-3xl md:text-4xl mb-1">14+</div>
              <div className="font-body text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-semibold">Years in Business</div>
            </div>
            <div className="text-center p-2 border-r border-brand-gray/20 last:border-0">
              <div className="font-display font-bold text-brand-green text-3xl md:text-4xl mb-1">11</div>
              <div className="font-body text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-semibold">Active Projects</div>
            </div>
            <div className="text-center p-2 border-r border-brand-gray/20 last:border-0">
              <div className="font-display font-bold text-brand-green text-3xl md:text-4xl mb-1">100%</div>
              <div className="font-body text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-semibold">Bank Approved</div>
            </div>
  
          </div>
        </div>
      </section>

      {/* ── Message from the Managing Director ──────────── */}
      <MdMessageSection />

      {/* ── Our Commitment: Built on Ethical Foundations ── */}
      <EthicalFoundationsSection />

      {/* ── Editorial Narrative ──────────────────────────── */}
      <section className="bg-[#fcfbf9] py-16 md:py-24">
        <div className="px-section max-w-5xl mx-auto">
          <div className="space-y-16">

            {/* Our Story — How It All Began */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div>
                <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block">
                  Chapter I
                </span>
                <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight">
                  Our Story — How It All Began
                </h2>
              </div>
              <div className="font-body text-brand-charcoal/70 text-body leading-relaxed space-y-4 font-light">
                <p>
                  In 2012, CMR Developers was founded in Taliparamba, Kannur with a single conviction: that middle-income Kerala families deserved more than a flat in a concrete building — they deserved a home with a garden, a community, and a life. At the time, the concept of a professionally built gated villa community in North Kerala was virtually unknown. Most families either built standalone homes on agricultural plots or settled for urban apartments.
                </p>
                <p>
                  CMR changed that. Our first project proved that quality villa living at an honest price was possible — and the market responded. Word spread the way it only does when quality speaks for itself: family to family, neighbour to neighbour. Within our first few years, waitlists formed before projects were even announced.
                </p>
              </div>
            </div>

            <hr className="border-brand-gray/30" />

            {/* Where We Are Today */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div>
                <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block">
                  Chapter II
                </span>
                <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight">
                  Where We Are Today
                </h2>
              </div>
              <div className="font-body text-brand-charcoal/70 text-body leading-relaxed space-y-4 font-light">
                <p>
                  Fourteen years and 600+ delivered villas later, CMR Developers is the largest villa construction company in Kannur district — and one of the most respected residential developers in all of Kerala. We have expanded from our Taliparamba roots to projects in Karuvanchal, Kadachira, and Chala Town in Kannur; Angamaly and Mulanthuruthy in Ernakulam; and Changanassery in Kottayam.
                </p>
                <p>
                  Our delivery rate speaks for itself: an average of 100 villas per year over the last two years, handed over on schedule, every single one. Not a single project delayed beyond its committed date.
                </p>
              </div>
            </div>

            <hr className="border-brand-gray/30" />

            {/* What Makes CMR Different */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div>
                <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block">
                  Chapter III
                </span>
                <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight">
                  What Makes CMR Different
                </h2>
              </div>
              <div className="font-body text-brand-charcoal/70 text-body leading-relaxed space-y-4 font-light">
                <p>
                  We do not sub-contract. Every CMR villa is built by our own trained workforce — the same team, the same standards, from the first brick to the final handover. We do not cut corners on materials. We do not make promises we cannot keep.
                </p>
                <p>
                  And we do not build homes in isolation — every CMR project is a community, designed so that your children grow up with friends next door and your family lives surrounded by greenery, not concrete. That is not a marketing line. It is the reason 600+ families chose us — and why so many of them sent their siblings, cousins, and colleagues to us next.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <section className="bg-white py-16 text-center border-t border-brand-gray/30">
        <div className="px-section">
          <h3 className="font-display font-bold text-brand-charcoal text-xl md:text-2xl mb-6">
            Ready to find your forever community?
          </h3>
          <Link
            href="/projects"
            className="inline-block px-10 py-4 bg-brand-green hover:bg-brand-gold text-brand-ivory font-body text-[12px] font-bold tracking-[0.25em] uppercase shadow-lg shadow-brand-green/10 rounded-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Active Projects
          </Link>
        </div>
      </section>
    </>
  )
}
