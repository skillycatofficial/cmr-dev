import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Villa Construction & Real Estate Blog Kerala | CMR Developers',
  description: 'Stay updated with the latest trends, costs, and guidelines on villa construction, NRI real estate investment, and Vastu compliance in Kerala from CMR Developers.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/blog',
  },
}

const FALLBACK_ARTICLES = [
  {
    id: 'fallback-1',
    slug: 'villa-construction-cost-kerala-2025',
    title: 'Villa Construction Cost in Kerala 2025 — Complete Breakdown',
    excerpt: 'Planning to build a villa in Kerala? This comprehensive 2025 guide breaks down construction costs by finishing levels, structure, and materials. Learn what it actually costs to build your dream home.',
    date: 'June 24, 2026',
    readTime: '6 min read',
    category: 'Construction Cost',
    image: '/images/extracted/cmr-villa-exterior.jpg',
    author: 'CMR Editorial Team'
  },
  {
    id: 'fallback-2',
    slug: 'nri-guide-buy-villa-kannur-2025',
    title: 'How NRIs Can Buy a Villa in Kannur — Step-by-Step Guide (2025)',
    excerpt: 'A complete legal, financial, and practical guide for NRI buyers planning to purchase a villa in Kannur, Kerala. Covers FEMA regulations, NRE accounts, power of attorney, and K-RERA safety.',
    date: 'June 20, 2026',
    readTime: '8 min read',
    category: 'NRI Investment',
    image: '/images/extracted/cmr-interior-living.jpg',
    author: 'CMR NRI Desk'
  },
  {
    id: 'fallback-3',
    slug: 'k-rera-registration-kerala-home-buyers',
    title: 'K-RERA Registration: What Kerala Home Buyers Must Know',
    excerpt: 'Understand the legal protections offered by the Kerala Real Estate Regulatory Authority. Learn how to verify RERA numbers, track project timelines, and protect your investment.',
    date: 'Coming Soon',
    readTime: '4 min read',
    category: 'Legal & RERA',
    image: '/images/extracted/cmr-lifecycle-villa.jpg',
    author: 'Legal Cell'
  },
  {
    id: 'fallback-4',
    slug: 'vastu-shastra-villa-design-kerala',
    title: 'Vastu Shastra for Villa Design in Kerala — CMR’s Approach',
    excerpt: 'Discover how Vastu Shastra principles are integrated into modern villa layouts. Explore the ideal directions for rooms, energy flow, and ventilation in your new home.',
    date: 'Coming Soon',
    readTime: '5 min read',
    category: 'Vastu Shastra',
    image: '/images/extracted/cmr-grid-small-3.jpg',
    author: 'Architectural Team'
  }
]

export default async function BlogIndexPage() {
  let articles: typeof FALLBACK_ARTICLES = []
  try {
    const data = await getAllPosts()
    articles = data?.length ? data : FALLBACK_ARTICLES
  } catch {
    articles = FALLBACK_ARTICLES
  }

  const featuredArticle = articles[0]
  const remainingArticles = articles.slice(1)

  return (
    <>
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            CMR Insights & Guides
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            Villa Construction & Real Estate Blog Kerala
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl">
            Empowering home buyers and NRI investors with expert knowledge, transparent cost analysis, Vastu compliance rules, and step-by-step property guides.
          </p>
        </div>
      </section>

      {/* ── Featured Article ────────────────────────────── */}
      {featuredArticle && (
        <section className="bg-[#fcfbf9] py-16">
          <div className="px-section max-w-6xl mx-auto">
            <div className="text-xs font-bold tracking-widest text-brand-gold uppercase mb-6 font-body">
              Featured Article
            </div>

            <div className="bg-white border border-brand-gray/20 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch transition-transform duration-300 hover:translate-y-[-2px]">
              {/* Image side */}
              <div className="relative min-h-[300px] lg:min-h-full bg-brand-green/10">
                {featuredArticle.image ? (
                  <Image 
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-green/10 flex items-center justify-center font-display text-brand-green/50 font-bold">
                    CMR
                  </div>
                )}
              </div>
              
              {/* Text side */}
              <div className="p-8 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-body text-[11px] font-semibold tracking-wider text-brand-green uppercase">
                    <span>{featuredArticle.category}</span>
                    <span className="w-1 h-1 bg-brand-gray/40 rounded-full" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  
                  <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight hover:text-brand-green transition-colors">
                    <Link href={`/blog/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  
                  <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed font-light">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-brand-gray/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs font-display">
                      CMR
                    </div>
                    <div>
                      <div className="font-display font-semibold text-brand-charcoal text-xs">{featuredArticle.author}</div>
                      <div className="font-body text-brand-charcoal/40 text-[10px]">{featuredArticle.date}</div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/blog/${featuredArticle.slug}`}
                    className="font-body text-xs font-bold tracking-wider text-brand-green hover:text-brand-gold uppercase transition-colors"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Editorial Grid ──────────────────────────────── */}
      <section className="bg-white py-16 border-t border-brand-gray/20">
        <div className="px-section max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-brand-gold uppercase mb-8 font-body">
            All Articles & Guides
          </div>

          {remainingArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingArticles.map((article) => {
                const isComingSoon = article.date === 'Coming Soon'
                return (
                  <article 
                    key={article.id || article.slug}
                    className="bg-[#fcfbf9] border border-brand-gray/20 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-transform duration-300 hover:translate-y-[-2px]"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative h-48 w-full bg-brand-green/5">
                        {article.image ? (
                          <Image 
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-brand-green/10 flex items-center justify-center font-display text-brand-green/50 font-bold">
                            CMR
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-body text-[9px] font-bold tracking-wider text-brand-green uppercase shadow-sm">
                          {article.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 font-body text-[10px] text-brand-charcoal/40">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        
                        <h3 className="font-display font-bold text-brand-charcoal text-lg leading-snug hover:text-brand-green transition-colors">
                          {isComingSoon ? (
                            <span className="cursor-default">{article.title}</span>
                          ) : (
                            <Link href={`/blog/${article.slug}`}>
                              {article.title}
                            </Link>
                          )}
                        </h3>
                        
                        <p className="font-body text-brand-charcoal/60 text-xs leading-relaxed font-light line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 pt-0 border-t border-brand-gray/10 flex items-center justify-between mt-4">
                      <span className="font-body text-[10px] font-semibold text-brand-charcoal/50">
                        {article.author}
                      </span>

                      {isComingSoon ? (
                        <span className="font-body text-[9px] font-bold tracking-wider text-brand-gold/70 uppercase">
                          Coming Soon
                        </span>
                      ) : (
                        <Link 
                          href={`/blog/${article.slug}`}
                          className="font-body text-[11px] font-bold tracking-wider text-brand-green hover:text-brand-gold uppercase transition-colors"
                        >
                          Read Post →
                        </Link>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-brand-gray/30 rounded-2xl">
              <span className="font-body text-sm text-brand-charcoal/40 font-light">No other articles available yet.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Sticky CTA / Newsletter ─────────────────────── */}
      <section className="bg-brand-green text-brand-ivory py-16 text-center">
        <div className="px-section max-w-xl mx-auto space-y-6">
          <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase block">
            Stay Informed
          </span>
          <h3 className="font-display font-bold text-2xl">
            Get Kerala Real Estate Updates
          </h3>
          <p className="font-body text-brand-ivory/60 text-sm font-light max-w-md mx-auto leading-relaxed">
            Subscribe to our monthly newsletter and get honest cost updates, construction trends, and K-RERA regulatory updates directly in your inbox.
          </p>
          <div className="flex max-w-md mx-auto border border-brand-ivory/20 rounded-lg overflow-hidden">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/5 text-brand-ivory text-xs px-4 py-3.5 flex-1 outline-none font-body"
            />
            <button className="bg-brand-gold text-brand-charcoal px-6 text-xs font-bold tracking-widest uppercase hover:bg-brand-ivory transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
