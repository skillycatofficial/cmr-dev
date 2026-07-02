import type { Metadata } from 'next'
import Link from 'next/link'
import { getCareers, getPageMetadata } from '@/lib/wordpress'
import CareersClient from './CareersClient'

const defaultMetadata: Metadata = {
  title: "Careers at CMR Developers | Join Kerala's Leading Villa Builder — Kannur",
  description: "Join CMR Developers — Kerala's most trusted villa construction company since 2012. Explore career opportunities in construction, sales, design and operations across Kannur and Ernakulam.",
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/careers',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('careers', defaultMetadata)
}

export default async function CareersPage() {
  let careers = []
  try {
    careers = await getCareers()
  } catch (error) {
    console.error('Failed to load careers from WordPress:', error)
  }

  return (
    <>
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            Build With Us
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            Build Your Career Where We Build Homes — Join CMR Developers, Kerala
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            Grow With the Team That Built Kerala&apos;s Most Trusted Villa Brand. We have delivered 600+ luxury villas with zero project delays. If you value quality, integrity, and growth, explore our open positions.
          </p>
        </div>
      </section>

      {/* ── Core Value / Culture Section ───────────────── */}
      <section className="bg-[#fcfbf9] py-16 md:py-24">
        <div className="px-section max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
            <div>
              <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block">
                Our Culture
              </span>
              <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight">
                Grow With the Team That Built Kerala&apos;s Most Trusted Villa Brand
              </h2>
            </div>
            <div className="font-body text-brand-charcoal/70 text-body leading-relaxed space-y-4 font-light">
              <p>
                CMR Developers is more than a construction company — it is a community of professionals who take genuine pride in the homes we build and the families we serve. In 14 years, we have grown from a small team in Taliparamba to one of the most respected real estate organisations in North Kerala — delivering 600+ villas across three districts with zero project delays.
              </p>
              <p>
                That track record is built on people. If you are a professional who takes quality seriously, who wants to build something real, and who wants to grow with an organisation that values integrity as much as ambition — CMR is the place for you.
              </p>
              <p>
                We are currently expanding our team across sales, construction, design and customer relations. We offer competitive compensation, a respectful work environment, and the satisfaction of working for a brand that genuinely means something to the people we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Content (Jobs & Application Form) ── */}
      <CareersClient initialJobs={careers} />

      {/* ── Bottom Link Cluster (Topical Authority) ──────── */}
      <section className="bg-white py-16 text-center border-t border-brand-gray/30">
        <div className="px-section max-w-xl mx-auto space-y-4">
          <h3 className="font-display font-bold text-brand-charcoal text-lg">
            Want to know more about what we do?
          </h3>
          <div className="flex justify-center gap-4">
            <Link 
              href="/about-us"
              className="text-[12px] font-bold tracking-wider text-brand-green hover:text-brand-gold uppercase transition-colors"
            >
              ← Read Our Story
            </Link>
            <span className="text-brand-gray/40">|</span>
            <Link 
              href="/projects"
              className="text-[12px] font-bold tracking-wider text-brand-green hover:text-brand-gold uppercase transition-colors"
            >
              See Our Projects →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
