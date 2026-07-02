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

type Article = {
  id?: string
  slug: string
  title: string
  excerpt?: string
  date: string
  readTime?: string
  category?: string
  image?: string
  author?: string
}

export default async function BlogIndexPage() {
  let articles: Article[] = []
  try {
    const data = await getAllPosts()
    if (data?.length) articles = data
  } catch {
    // WordPress not reachable — show empty state
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
                    {featuredArticle.category && <span>{featuredArticle.category}</span>}
                    {featuredArticle.category && featuredArticle.readTime && (
                      <span className="w-1 h-1 bg-brand-gray/40 rounded-full" />
                    )}
                    {featuredArticle.readTime && <span>{featuredArticle.readTime}</span>}
                  </div>

                  <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl leading-tight hover:text-brand-green transition-colors">
                    <Link href={`/blog/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  {featuredArticle.excerpt && (
                    <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed font-light">
                      {featuredArticle.excerpt}
                    </p>
                  )}
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
              {remainingArticles.map((article) => (
                <article
                  key={article.id ?? article.slug}
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
                      {article.category && (
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-body text-[9px] font-bold tracking-wider text-brand-green uppercase shadow-sm">
                          {article.category}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 font-body text-[10px] text-brand-charcoal/40">
                        <span>{article.date}</span>
                        {article.readTime && <><span>•</span><span>{article.readTime}</span></>}
                      </div>

                      <h3 className="font-display font-bold text-brand-charcoal text-lg leading-snug hover:text-brand-green transition-colors">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      {article.excerpt && (
                        <p className="font-body text-brand-charcoal/60 text-xs leading-relaxed font-light line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0 border-t border-brand-gray/10 flex items-center justify-between mt-4">
                    <span className="font-body text-[10px] font-semibold text-brand-charcoal/50">
                      {article.author}
                    </span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="font-body text-[11px] font-bold tracking-wider text-brand-green hover:text-brand-gold uppercase transition-colors"
                    >
                      Read Post →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-brand-gray/30 rounded-2xl">
              <p className="font-body text-sm text-brand-charcoal/40 font-light">
                No articles published yet. Check back soon.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────── */}
      <section className="bg-brand-green text-brand-ivory py-16 text-center">
        <div className="px-section max-w-xl mx-auto space-y-6">
          <span className="font-body text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase block">
            Stay Informed
          </span>
          <h3 className="font-display font-bold text-2xl">
            Get Kerala Real Estate Updates
          </h3>
          <p className="font-body text-brand-ivory/60 text-sm font-light max-w-md mx-auto leading-relaxed">
            Subscribe to our monthly newsletter and get honest cost updates, construction trends, and Kerala real estate regulatory updates directly in your inbox.
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
