import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMetadata } from '@/lib/wordpress'

const defaultMetadata: Metadata = {
  title: 'CMR Developers Reviews | Testimonials from Our Kerala Villa Buyers',
  description: 'Read what 600+ CMR Developers villa owners say about their experience — from local Kannur families to NRI buyers in Dubai, Sharjah and London who trusted CMR with their dream Kerala home.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/testimonials',
  },
  openGraph: {
    title: 'CMR Developers Reviews | What Our 600+ Villa Owners Say',
    description: 'Real testimonials from CMR Developers homeowners across Kerala and the Gulf. Discover why 600+ families trust CMR for quality, transparency, and on-time delivery.',
    url: 'https://www.cmrdevelopers.com/testimonials',
    siteName: 'CMR Developers',
    images: [
      {
        url: 'https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'CMR Developers — Reviews & Testimonials',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMR Developers Reviews | Kerala Villa Buyer Testimonials',
    description: '600+ happy CMR homeowners. Read real testimonials from local and NRI villa buyers in Kerala.',
    images: ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('testimonials', defaultMetadata)
}


const testimonialsSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.cmrdevelopers.com/#organization',
  'name': 'CMR Developers',
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'reviewCount': '600',
    'bestRating': '5',
    'worstRating': '1'
  },
  'review': [
    {
      '@type': 'Review',
      'author': { '@type': 'Person', 'name': 'Renjith Krishnan' },
      'reviewBody': 'CMR truly sets a standard that other builders in Kannur are still trying to match. Construction quality, on-time delivery, the way they handled every query — exceptional.',
      'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' }
    },
    {
      '@type': 'Review',
      'author': { '@type': 'Person', 'name': 'Abdul Latheef K.V.' },
      'reviewBody': 'I was in Sharjah when I bought my CMR villa. Every stage was documented. Every payment was receipted. The villa was exactly as promised. CMR\'s NRI process is something every builder in Kerala should learn from.',
      'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' }
    },
    {
      '@type': 'Review',
      'author': { '@type': 'Person', 'name': 'Dr Priya Nambiar' },
      'reviewBody': 'No sub-contractors, no confusion, no delays. My villa was ready exactly on the promised date. I have already referred four colleagues, all now CMR homeowners.',
      'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' }
    },
    {
      '@type': 'Review',
      'author': { '@type': 'Person', 'name': 'Binu Thomas' },
      'reviewBody': 'The best decision I ever made was trusting CMR. Price, quality, transparency — none of the five builders I compared could match them.',
      'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' }
    },
    {
      '@type': 'Review',
      'author': { '@type': 'Person', 'name': 'Sreejith P.K.' },
      'reviewBody': 'CMR gave us a home my children are proud to grow up in. The greenery, the community, the play area — everything a family home should be at a genuinely fair price.',
      'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' }
    }
  ]
}

export default function TestimonialsPage() {
  const reviews = [
    {
      quote: "I had looked at a dozen builders before finalising CMR. What convinced me was not their brochure — it was the fact that every single person I spoke to who already owned a CMR villa had nothing but good things to say. The construction quality, the on-time delivery, the way they handled every query — CMR truly sets a standard that other builders in Kannur are still trying to match.",
      author: "Renjith Krishnan",
      details: "Taliparamba, Kannur",
      project: "CMR Paradise"
    },
    {
      quote: "I was in Sharjah when I bought my CMR villa. I visited once for the site visit and relied on WhatsApp updates for everything else. Every stage was documented. Every payment was receipted. When I came for the handover, the villa was exactly as promised — not a single compromise. CMR's NRI process is something every builder in Kerala should learn from.",
      author: "Abdul Latheef K.V.",
      details: "Sharjah, UAE",
      project: "Aiza Diamond Hills"
    },
    {
      quote: "As a doctor with limited time to manage construction myself, CMR was a blessing. Their in-house team handled everything — no sub-contractors, no confusion, no delays. My villa was ready exactly on the promised date. I have already referred four of my colleagues, and all of them are now CMR homeowners too.",
      author: "Dr Priya Nambiar",
      details: "Karuvanchal, Kannur",
      project: "CMR Aiza Gardens"
    },
    {
      quote: "The best decision I ever made was trusting CMR. I compared five builders before committing and none of them could offer the same combination of price, quality, transparency and RERA compliance. The virtual tour facility made it easy to show my wife the progress every month. We moved in last year and the home is everything we dreamed of.",
      author: "Binu Thomas",
      details: "Abu Dhabi, UAE",
      project: "Alvina Gardens"
    },
    {
      quote: "CMR gave us a home that my children are proud to grow up in. The greenery, the community, the play area — it is everything a family home should be. And at a price that was genuinely fair. Three of my neighbours are now in CMR villas too. That is the best recommendation I can give.",
      author: "Sreejith P.K.",
      details: "Taliparamba",
      project: "CMR Anna Paradise"
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsSchema) }}
      />
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            Reviews
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            600+ Happy Homeowners — Here&apos;s What They Say About CMR Developers
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            The Real CMR Story — Told by Our Homeowners. Read what local families and NRI buyers who trusted CMR with their dream home have to say about their experience.
          </p>
        </div>
      </section>

      {/* ── Editorial Narrative Intro ───────────────────── */}
      <section className="bg-white py-12 md:py-16 border-b border-brand-gray/20">
        <div className="px-section text-left max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-brand-charcoal text-2xl mb-4">
            The Real CMR Story — Told by Our Homeowners
          </h2>
          <p className="font-body text-brand-charcoal/65 text-body leading-relaxed font-light">
            We do not need to tell you CMR Developers is the most trusted villa builder in Kannur. Our 600+ homeowners will do that for us. From local families in Taliparamba who watched their children grow up in CMR villas, to NRI professionals in Dubai who trusted us with their most important investment from 4,000 miles away — our homeowners are our most honest testimonial.
          </p>
        </div>
      </section>

      {/* ── Testimonials Masonry Grid ───────────────────── */}
      <section className="bg-[#fcfbf9] py-16 md:py-24">
        <div className="px-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-brand-gray/25 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full text-left"
              >
                {/* Gold quotation marks */}
                <span className="font-serif text-brand-gold/25 text-5xl leading-none select-none -mt-4 block mb-2">&ldquo;</span>

                {/* Quote Text */}
                <p className="font-body text-brand-charcoal/80 text-[15px] leading-relaxed font-light mb-6 flex-grow italic">
                  {item.quote}
                </p>

                {/* Author Info */}
                <div className="border-t border-brand-gray/30 pt-4 mt-auto">
                  <h4 className="font-display font-bold text-brand-charcoal text-md">
                    {item.author}
                  </h4>
                  <p className="font-body text-[12px] text-brand-gold font-semibold uppercase tracking-wider mt-0.5">
                    {item.details}
                  </p>
                  <p className="font-body text-[11px] text-brand-charcoal/40 mt-1">
                    Bought: <span className="font-medium text-brand-charcoal/60">{item.project}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <section className="bg-[#0F2F2B] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="px-section relative z-10">
          <h3 className="font-display font-bold text-brand-ivory text-2xl md:text-3xl mb-4">
            Become a part of our growing family
          </h3>
          <p className="font-body text-brand-ivory/60 text-sm mb-8 max-w-lg mx-auto font-light">
            Contact us today to explore our upcoming gated villa communities across Kerala.
          </p>
          <Link
            href="/contact-us"
            className="inline-block px-10 py-4 bg-brand-gold hover:bg-brand-ivory text-brand-green font-body text-[12px] font-bold tracking-[0.25em] uppercase shadow-lg rounded-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Contact Our Team &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
