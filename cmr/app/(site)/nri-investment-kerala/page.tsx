import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMetadata } from '@/lib/wordpress'

const defaultMetadata: Metadata = {
  title: 'NRI Villa Investment in Kerala | CMR Developers — Buy from Dubai, UK or USA',
  description: 'Invest in a luxury villa in Kerala from anywhere in the world. CMR Developers has helped hundreds of NRI families from the Gulf, UK and USA buy their dream Kerala home with complete transparency and zero hassle.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/nri-investment-kerala',
  },
  openGraph: {
    title: 'NRI Villa Investment in Kerala | CMR Developers',
    description: 'Buy a luxury villa in Kerala from Dubai, UK or USA. CMR Developers offers virtual site tours, POA assistance, and stage-wise payments for NRI buyers. 40%+ of our buyers are NRIs.',
    url: 'https://www.cmrdevelopers.com/nri-investment-kerala',
    siteName: 'CMR Developers',
    images: [
      {
        url: 'https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'CMR Developers — NRI Villa Investment in Kerala',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NRI Villa Investment in Kerala | CMR Developers',
    description: 'Build your Kerala home from Dubai, UK or USA. Virtual tours, POA support, stage-wise payments. 40%+ NRI buyers.',
    images: ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('nri-investment-kerala', defaultMetadata)
}


const nriSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.cmrdevelopers.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'NRI Investment Kerala', 'item': 'https://www.cmrdevelopers.com/nri-investment-kerala' }
      ]
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Can NRIs own property in Kerala?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Resident Indians living abroad (NRIs and PIOs) are fully eligible to purchase residential property in India, including Kerala, under FEMA regulations. CMR\'s legal team will guide you through all compliance requirements.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I get a home loan as an NRI buyer?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. All major banks including SBI, HDFC, Axis Bank, Federal Bank and South Indian Bank offer NRI home loans for CMR projects. Loan amounts up to 80% of property value are available subject to eligibility.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I need to visit Kerala to complete the purchase?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Not necessarily. With a valid Power of Attorney executed from your country of residence, the entire purchase can be completed by your authorised representative in Kerala. CMR has facilitated numerous 100% remote purchases.'
          }
        }
      ]
    }
  ]
}

export default function NriInvestmentPage() {
  const processSteps = [
    {
      step: 'Step 1',
      title: 'Virtual Site Tour',
      desc: 'Book a live video walkthrough with our sales team at a time that suits your time zone — Gulf, UK or USA. See the project, the location and the amenities in real time without a single flight.',
    },
    {
      step: 'Step 2',
      title: 'Select Your Unit',
      desc: 'Choose your preferred villa unit, BHK configuration, plot size and orientation. Our team will send you a detailed cost sheet, floor plan and specification list within 24 hours.',
    },
    {
      step: 'Step 3',
      title: 'Book & Pay the Token',
      desc: 'Pay a refundable booking token through your NRE account to secure your preferred unit. CMR provides a signed booking confirmation receipt immediately.',
    },
    {
      step: 'Step 4',
      title: 'Legal Documentation & POA',
      desc: 'Our legal team guides you through the sale agreement, statutory documentation and — if required — helps you execute a Power of Attorney from your country of residence.',
    },
    {
      step: 'Step 5',
      title: 'Stage-wise Payments',
      desc: 'CMR follows a transparent stage-wise payment schedule linked to construction milestones. You pay as we build — not upfront. All stage completions are documented with photos and reports.',
    },
    {
      step: 'Step 6',
      title: 'Construction Updates',
      desc: 'Receive monthly WhatsApp video updates, construction progress photos and milestone reports directly from our site team. You see exactly what is being built, week by week.',
    },
    {
      step: 'Step 7',
      title: 'Handover',
      desc: 'When your villa is complete, CMR hands over the keys at a ceremony in Kannur. If you cannot travel, we arrange full documentation and keys handover to your authorised representative.',
    },
  ]

  const faqs = [
    {
      q: 'Can NRIs own property in Kerala?',
      a: 'Yes. Resident Indians living abroad (NRIs and PIOs) are fully eligible to purchase residential property in India, including Kerala, under FEMA regulations. CMR\'s legal team will guide you through all compliance requirements.',
    },
    {
      q: 'Can I get a home loan as an NRI buyer?',
      a: 'Yes. All major banks including SBI, HDFC, Axis Bank, Federal Bank and South Indian Bank offer NRI home loans for CMR projects. Loan amounts up to 80% of property value are available subject to eligibility.',
    },
    {
      q: 'Do I need to visit Kerala to complete the purchase?',
      a: 'Not necessarily. With a valid Power of Attorney executed from your country of residence, the entire purchase can be completed by your authorised representative in Kerala. CMR has facilitated numerous 100% remote purchases.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nriSchema) }}
      />
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            NRI Services
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-4"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            NRI? Build Your Kerala Home from Anywhere in the World — CMR Developers
          </h1>
          <p className="font-display italic text-brand-gold text-lg md:text-xl font-light mb-6">
            &ldquo;You&apos;ve Built a Life Abroad. Now Build a Home in Kerala.&rdquo;
          </p>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            CMR Developers has helped hundreds of NRI families from the Gulf, UK and USA buy their dream Kerala home with complete transparency and zero hassle.
          </p>
        </div>
      </section>

      {/* ── Narrative Intro ─────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="px-section">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            {/* Left Narrative */}
            <div className="text-left font-body text-brand-charcoal/70 text-body space-y-6 leading-relaxed font-light">
              <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight">
                Kerala&apos;s Most NRI-Friendly Villa Developer
              </h2>
              <p>
                Over 40% of CMR Developers&apos; villa buyers are NRI families — Keralites living in the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, the United Kingdom, Canada and the United States. They chose CMR not because we were the cheapest option, but because we were the most transparent one.
              </p>
              <p>
                In 14 years of selling homes to buyers thousands of miles away, CMR has perfected a process that makes the entire purchase journey — from first enquiry to final handover — completely manageable from abroad. Virtual site tours. WhatsApp-based progress updates. POA assistance. Stage-wise bank transfers. NRE/FCNR account guidance.
              </p>
              <p>
                Hundreds of CMR villa owners today live in Dubai, Sharjah, Abu Dhabi, Riyadh, London, and Toronto. They chose CMR because we made the process of buying a home in Kerala from abroad genuinely simple. Our NRI buyers consistently tell us one thing: <em className="text-brand-gold font-medium">&ldquo;I wish I had done this sooner.&rdquo;</em>
              </p>
            </div>

            {/* Right Desk Card */}
            <div className="bg-[#fcfbf9] p-8 border border-brand-gray/30 rounded-2xl w-full text-left">
              <h3 className="font-display font-bold text-brand-charcoal text-[18px] mb-3">
                Dedicated NRI Desk
              </h3>
              <p className="font-body text-xs text-brand-charcoal/65 mb-6 leading-relaxed">
                Available during Gulf, UK and USA business hours. We speak your language: Malayalam and English. No jargon, just honest answers.
              </p>
              <a
                href="https://wa.me/919206838383"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-3 bg-[#25D366] text-white font-body text-label font-bold tracking-wider uppercase rounded-lg hover:bg-[#20ba5a] transition-colors duration-300"
              >
                Talk on WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step-by-Step Purchase Process ───────────────── */}
      <section className="bg-[#fcfbf9] py-16 md:py-24 border-t border-brand-gray/30">
        <div className="px-section">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block">
                How It Works
              </span>
              <h2 className="font-display font-bold text-brand-charcoal text-3xl">
                The 7-Step Remote Buying Process
              </h2>
              <p className="font-body text-brand-charcoal/50 text-sm mt-3 max-w-md mx-auto">
                Step-by-step guidance on how to secure, buy, and monitor your villa construction without leaving your country of residence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processSteps.map((step) => (
                <div key={step.step} className="bg-white p-6 border border-brand-gray/25 rounded-2xl shadow-sm text-left flex flex-col h-full">
                  <div className="font-display font-bold text-brand-gold text-sm tracking-wider uppercase mb-2">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-brand-charcoal text-[17px] mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-brand-charcoal/60 text-[13px] leading-relaxed font-light mt-auto">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section (Native Details/Summary) ────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-brand-gray/30">
        <div className="px-section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block">
                Your Questions Answered
              </span>
              <h2 className="font-display font-bold text-brand-charcoal text-3xl">
                Key NRI Investment FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-[#fcfbf9] border border-brand-gray/30 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer list-none text-left"
                >
                  <summary className="flex items-center justify-between font-display font-bold text-brand-charcoal text-md md:text-lg select-none">
                    <span>{faq.q}</span>
                    <span className="ml-2 text-brand-gold transform group-open:rotate-180 transition-transform duration-300">
                      ▼
                    </span>
                  </summary>
                  <div className="mt-4 font-body text-brand-charcoal/65 text-sm leading-relaxed font-light border-t border-brand-gray/30 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <section className="bg-[#0F2F2B] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="px-section relative z-10">
          <h3 className="font-display font-bold text-brand-ivory text-2xl md:text-3xl mb-8">
            Schedule a virtual site tour today
          </h3>
          <Link
            href="/contact-us"
            className="inline-block px-12 py-4 bg-brand-gold hover:bg-brand-ivory text-brand-green hover:text-brand-green font-body text-[12px] font-bold tracking-[0.25em] uppercase shadow-lg rounded-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Enquire Now &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
