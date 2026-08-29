import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import { getPageMetadata } from '@/lib/wordpress'

const defaultMetadata: Metadata = {
  title: 'Contact CMR Developers | Book a Site Visit or Speak to Our NRI Desk',
  description: 'Get in touch with CMR Developers — call, WhatsApp or visit our Kannur office. Book a free villa site visit or speak to our NRI desk. We respond to all online enquiries within 2 hours.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/contact-us',
  },
  openGraph: {
    title: 'Contact CMR Developers | Book a Free Site Visit',
    description: 'Contact CMR Developers for villa enquiries in Kerala. Call, WhatsApp or submit an online form. NRI desk available 24 hours, 7 days a week.',
    url: 'https://www.cmrdevelopers.com/contact-us',
    siteName: 'CMR Developers',
    images: [
      {
        url: 'https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact CMR Developers — Kerala Villa Builders',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact CMR Developers | Book a Free Site Visit',
    description: 'Call, WhatsApp or submit a form. NRI desk available 24 hours, 7 days a week.',
    images: ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('contact-us', defaultMetadata)
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.cmrdevelopers.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Contact Us', 'item': 'https://www.cmrdevelopers.com/contact-us' }
      ]
    },
    {
      '@type': 'ContactPage',
      'name': 'Contact CMR Developers',
      'url': 'https://www.cmrdevelopers.com/contact-us',
      'description': 'Contact CMR Developers for villa enquiries in Kerala. NRI desk available 24 hours, 7 days a week.',
      'publisher': { '@id': 'https://www.cmrdevelopers.com/#organization' }
    }
  ]
}

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            Connect
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            Talk to CMR Developers — We&apos;ll Help You Find Your Perfect Villa
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            Get in touch with our villa sales team, coordinate a site tour, or speak directly to our dedicated NRI desk.
          </p>
        </div>
      </section>

      {/* ── Main Layout ──────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="px-section">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            
            {/* Left Column: Contact Details & Info */}
            <div className="text-left space-y-10">
              <div className="space-y-4 font-body text-brand-charcoal/70 text-body leading-relaxed font-light">
                <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight">
                  We Are Here to Help — At Every Stage of Your Home Buying Journey
                </h2>
                <p>
                  Whether you have one question or a hundred, our team at CMR Developers is here to help. We know that buying a home is one of the most significant decisions of your life. We do not treat it like a transaction — we treat it like the beginning of a long, trusted relationship.
                </p>
                <p>
                  Call us, WhatsApp us, visit our headquarters in Kannur, or submit the enquiry form. Our team responds to all online enquiries within 2 hours.
                </p>
              </div>

              {/* Office & Contact Info Cards */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start p-5 bg-brand-green/5 border border-brand-green/15 rounded-2xl">
                  <div className="p-3 bg-white text-brand-green rounded-xl border border-brand-green/10 shadow-sm">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-charcoal text-[15px] uppercase tracking-wider mb-1">Corporate Office</h4>
                    <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed">
                      Union Complex, 2nd Floor, South Bazar, Ward No. 46<br />
                      Near Kannur–Taliparamba Highway, Kannur – 670 001, Kerala
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-5 bg-brand-green/5 border border-brand-green/15 rounded-2xl">
                  <div className="p-3 bg-white text-brand-green rounded-xl border border-brand-green/10 shadow-sm">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-charcoal text-[15px] uppercase tracking-wider mb-2">Direct Contact</h4>
                    <p className="font-body text-brand-charcoal/70 text-body leading-relaxed">
                      Phone: <a href="tel:+919206838383" className="text-brand-green hover:text-brand-gold transition-colors font-display font-bold text-lg">+91 9206 838 383</a> | <a href="tel:+919744475555" className="text-brand-green hover:text-brand-gold transition-colors font-display font-bold text-lg">+91 9744 475 555</a><br />
                      Email: <a href="mailto:info@cmrdevelopers.com" className="hover:text-brand-green transition-colors font-medium">info@cmrdevelopers.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-5 bg-brand-green/5 border border-brand-green/15 rounded-2xl">
                  <div className="p-3 bg-white text-brand-green rounded-xl border border-brand-green/10 shadow-sm">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-charcoal text-[15px] uppercase tracking-wider mb-1">NRI Support Desk</h4>
                    <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed">
                      Phone: <a href="tel:+919206838383" className="text-brand-green hover:text-brand-gold transition-colors font-medium">+91 9206 838 383</a><br />
                      Hours: <span className="font-medium text-brand-charcoal/80">24 Hours, 7 Days a Week</span><br />
                      Dedicated coordination team for buyers in the Gulf, UK, and USA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (Client Component) */}
            <div className="bg-[#fcfbf9] p-8 md:p-10 border border-brand-gray/30 rounded-2xl w-full text-left shadow-sm">
              <h3 className="font-display font-bold text-brand-charcoal text-xl mb-6 border-b border-brand-gray/30 pb-4">
                Book a Free Site Visit or Speak to Our NRI Desk
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
