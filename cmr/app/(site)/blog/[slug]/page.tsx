import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/wordpress'

// Generate static params at build time for both dynamic WordPress posts and our static fallbacks
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    const wordpressSlugs = (posts ?? []).map((p: { slug: string }) => ({ slug: p.slug }))
    
    // Always pre-render the fallback slugs for guaranteed SEO crawlability
    const fallbackSlugs = [
      { slug: 'villa-construction-cost-kerala-2025' },
      { slug: 'nri-guide-buy-villa-kannur-2025' }
    ]
    
    // Combine and de-duplicate slugs
    const allSlugs = [...fallbackSlugs]
    wordpressSlugs.forEach((ws: { slug: string }) => {
      if (!allSlugs.some(s => s.slug === ws.slug)) {
        allSlugs.push(ws)
      }
    })
    
    return allSlugs
  } catch {
    return [
      { slug: 'villa-construction-cost-kerala-2025' },
      { slug: 'nri-guide-buy-villa-kannur-2025' }
    ]
  }
}

// Generate dynamic metadata for search engine crawlers
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  
  // 1. Try to resolve from WordPress
  try {
    const post = await getPostBySlug(slug)
    if (post) {
      return {
        title: post.seo?.title || `${post.title} | CMR Developers`,
        description: post.seo?.description || post.excerpt || `${post.title} by CMR Developers. Read the latest villa construction and real estate insights in Kerala.`,
        alternates: {
          canonical: post.seo?.canonical || `https://www.cmrdevelopers.com/blog/${post.slug}`,
        }
      }
    }
  } catch (error) {
    console.warn(`Metadata fetch from WordPress failed for slug ${slug}, using fallback check:`, error)
  }

  // 2. Fallback to static metadata if WordPress is not yet populated
  if (slug === 'villa-construction-cost-kerala-2025') {
    return {
      title: 'Villa Construction Cost in Kerala 2025 — Complete Price Breakdown | CMR Developers',
      description: 'Planning to build a villa in Kerala? This 2025 guide breaks down villa construction costs by type, location and finishing level — from basic to premium. Includes Kannur and Ernakulam cost data.',
      alternates: {
        canonical: 'https://www.cmrdevelopers.com/blog/villa-construction-cost-kerala-2025',
      }
    }
  } else if (slug === 'nri-guide-buy-villa-kannur-2025') {
    return {
      title: 'How NRIs Can Buy a Villa in Kannur Kerala — Complete Step-by-Step Guide 2025',
      description: 'A complete guide for NRI buyers planning to purchase a villa in Kannur, Kerala in 2025. Covers FEMA rules, NRI home loans, POA, K-RERA, and the best villa projects in Kannur for NRI investment.',
      alternates: {
        canonical: 'https://www.cmrdevelopers.com/blog/nri-guide-buy-villa-kannur-2025',
      }
    }
  }

  return {
    title: 'Blog Article | CMR Developers'
  }
}

export default async function BlogDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // 1. Try to fetch the post dynamically from WordPress
  let wpPost = null
  try {
    wpPost = await getPostBySlug(slug)
  } catch {
    // WordPress offline or empty — resolve via fallbacks
  }

  // 2. If dynamic post exists in WordPress, render it dynamically
  if (wpPost) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': wpPost.title,
      'image': wpPost.image ? [wpPost.image] : [],
      'datePublished': wpPost.date ? new Date(wpPost.date).toISOString() : new Date().toISOString(),
      'author': {
        '@type': 'Organization',
        'name': 'CMR Developers',
        'url': 'https://www.cmrdevelopers.com'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'CMR Developers',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.cmrdevelopers.com/images/cmr-logo.png'
        }
      },
      'description': wpPost.excerpt || wpPost.title
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <article className="bg-white min-h-screen pt-28 pb-20">
          {/* Breadcrumb */}
          <div className="px-section max-w-5xl mx-auto py-6">
            <div className="flex items-center gap-2 font-body text-[11px] font-semibold text-brand-charcoal/40 uppercase tracking-wider">
              <Link href="/" className="hover:text-brand-green">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-green">Blog</Link>
              <span>/</span>
              <span className="text-brand-charcoal/70 truncate max-w-[200px] md:max-w-[400px]">
                {wpPost.title}
              </span>
            </div>
          </div>

          {/* Header */}
          <header className="px-section max-w-5xl mx-auto text-left space-y-6">
            <div className="inline-block px-3 py-1 bg-brand-green/5 text-brand-green font-body text-[11px] font-bold tracking-widest uppercase rounded">
              {wpPost.category || 'Insights'}
            </div>
            <h1 className="font-display font-bold text-brand-charcoal text-3xl md:text-4xl lg:text-5xl leading-tight">
              {wpPost.title}
            </h1>
            
            <div className="flex items-center gap-4 py-4 border-y border-brand-gray/20">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center font-display font-bold text-brand-gold">
                CMR
              </div>
              <div>
                <div className="font-display font-semibold text-brand-charcoal text-sm">
                  Written by {wpPost.author || 'CMR Editorial Team'}
                </div>
                <div className="font-body text-brand-charcoal/40 text-xs flex items-center gap-3">
                  <span>{wpPost.date}</span>
                  <span>•</span>
                  <span>{wpPost.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {wpPost.image && (
            <div className="px-section max-w-5xl mx-auto my-10">
              <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-md bg-brand-green/5">
                <Image 
                  src={wpPost.image}
                  alt={wpPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Dynamic Article HTML Content */}
          <div className="px-section max-w-5xl mx-auto">
            <div 
              dangerouslySetInnerHTML={{ __html: wpPost.content }} 
              className="blog-prose font-body text-brand-charcoal/80 text-body-lg leading-relaxed font-light space-y-6"
            />
          </div>

          {/* Footer Author Card */}
          <footer className="px-section max-w-3xl mx-auto mt-16 pt-8 border-t border-brand-gray/20">
            <div className="bg-brand-ivory/10 border border-brand-gray/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-16 h-16 bg-[#0F2F2B] text-brand-gold rounded-full flex items-center justify-center font-display font-bold text-xl flex-shrink-0">
                CMR
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-display font-bold text-brand-charcoal text-sm">
                  About the Publisher
                </h4>
                <p className="font-body text-brand-charcoal/60 text-xs leading-relaxed font-light">
                  CMR Developers is Kerala&apos;s leading residential villa builder since 2012. With 600+ completed homes built across Kannur, Taliparamba, and Ernakulam, we provide transparent, high-quality, and on-time gated community developments.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/blog" 
                className="font-body text-xs font-bold tracking-widest text-brand-green hover:text-brand-gold uppercase transition-colors"
              >
                ← Back to Insights Blog
              </Link>
            </div>
          </footer>
        </article>
      </>
    )
  }

  // 3. Fallback: If not in WordPress, resolve our key SEO marketing articles statically
  if (slug === 'villa-construction-cost-kerala-2025') {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': 'Villa Construction Cost in Kerala 2025 — Complete Price Breakdown',
      'image': ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
      'datePublished': '2026-06-24T09:00:00+05:30',
      'dateModified': '2026-06-24T09:00:00+05:30',
      'author': {
        '@type': 'Organization',
        'name': 'CMR Developers',
        'url': 'https://www.cmrdevelopers.com'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'CMR Developers',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.cmrdevelopers.com/images/cmr-logo.png'
        }
      },
      'description': 'A complete, transparent guide on the cost to build a villa in Kerala in 2025. Covers price per square foot, materials, locations (Kannur & Ernakulam) and comparison with apartments.'
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is the average cost of villa construction in Kerala in 2025?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Villa construction cost in Kerala in 2025 ranges from Rs. 1,800 per sq.ft for basic economy finishes, Rs. 2,200 to Rs. 2,800 per sq.ft for a standard high-quality finish, and Rs. 2,800 to Rs. 3,800 per sq.ft for premium custom villa finishes. Luxury custom finishes can exceed Rs. 5,500 per sq.ft.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are gated community villas cheaper than apartments in Kannur, Kerala?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, in most residential areas of Kannur, gated community villas offer better value than apartments. For example, a 1,500 sq.ft villa in a gated community by CMR Developers (like Alvina Harmony) averages below 60% of the cost of a comparable urban apartment, while offering private land ownership and independent gardens.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does Vastu-compliant villa design cost more to build?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'At CMR Developers, Vastu-compliant layouts are integrated into the architectural plans from day one at no extra design premium. While specific room orientations are required, they do not increase the structural or material construction costs.'
          }
        }
      ]
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <article className="bg-white min-h-screen pt-28 pb-20">
          {/* Breadcrumb */}
          <div className="px-section max-w-4xl mx-auto py-6">
            <div className="flex items-center gap-2 font-body text-[11px] font-semibold text-brand-charcoal/40 uppercase tracking-wider">
              <Link href="/" className="hover:text-brand-green">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-green">Blog</Link>
              <span>/</span>
              <span className="text-brand-charcoal/70">Villa Construction Cost 2025</span>
            </div>
          </div>

          {/* Header */}
          <header className="px-section max-w-4xl mx-auto text-left space-y-6">
            <div className="inline-block px-3 py-1 bg-brand-green/5 text-brand-green font-body text-[11px] font-bold tracking-widest uppercase rounded">
              Construction Cost Analysis
            </div>
            <h1 className="font-display font-bold text-brand-charcoal text-3xl md:text-4xl lg:text-5xl leading-tight">
              Villa Construction Cost in Kerala 2025 — What Will Your Dream Home Actually Cost?
            </h1>
            
            <div className="flex items-center gap-4 py-4 border-y border-brand-gray/20">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center font-display font-bold text-brand-gold">
                CMR
              </div>
              <div>
                <div className="font-display font-semibold text-brand-charcoal text-sm">Written by CMR Editorial Team</div>
                <div className="font-body text-brand-charcoal/40 text-xs flex items-center gap-3">
                  <span>Published on June 24, 2026</span>
                  <span>•</span>
                  <span>6 min read</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="px-section max-w-5xl mx-auto my-10">
            <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-md bg-brand-green/5">
              <Image 
                src="/images/extracted/cmr-villa-exterior.jpg"
                alt="Premium luxury villa exterior construction in Kannur Kerala"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="block text-[11px] text-brand-charcoal/40 font-light text-center mt-3">
              An elegant completed gated community villa project in Kannur by CMR Developers.
            </span>
          </div>

          {/* Article Body */}
          <div className="px-section max-w-3xl mx-auto font-body text-brand-charcoal/80 text-body-lg leading-relaxed font-light space-y-6">
            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              Introduction
            </h2>
            <p>
              Building a villa in Kerala in 2025 is one of the most rewarding investments a family can make — but it is also one of the most misunderstood in terms of true cost. Many families approach construction with a rough &quot;per square foot&quot; number in mind, only to discover mid-project that the actual cost is significantly different from the initial estimate.
            </p>
            <p>
              This guide is CMR Developers&apos; honest, transparent breakdown of villa construction costs in Kerala in 2025 — based on 14 years of building 600+ homes across Kannur, Ernakulam, and Kottayam.
            </p>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              What Affects Villa Construction Cost in Kerala?
            </h2>
            <p>
              Villa construction cost in Kerala is not one number — it is a combination of several variables that interact with each other. The main cost drivers are:
            </p>
            <ul className="list-disc pl-6 space-y-3 font-light">
              <li>
                <strong>Location:</strong> Labour and material costs vary between North Kerala (Kannur, Malabar) and Central/South Kerala (Ernakulam, Kottayam).
              </li>
              <li>
                <strong>Plot size and configuration:</strong> A villa on 6 cents will cost differently per sq.ft than one on 10 cents, due to foundation requirements and common wall considerations.
              </li>
              <li>
                <strong>Floor area:</strong> Larger floor areas reduce the per-sq.ft cost due to economies of scale in structural and finishing elements.
              </li>
              <li>
                <strong>Construction quality tier:</strong> Basic, Standard, and Premium finishes carry very different material and labour costs.
              </li>
              <li>
                <strong>Vastu compliance:</strong> Vastu-compliant design sometimes requires non-standard orientations or layouts that marginally affect cost, but this is almost always worth the premium.
              </li>
              <li>
                <strong>Amenities:</strong> A villa in a gated community with a swimming pool, club house, and landscaping costs differently from a standalone villa on an open plot.
              </li>
            </ul>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              Villa Construction Cost Per Sq Ft in Kerala — 2025 Estimates
            </h2>
            <p>
              The following are indicative 2025 cost ranges for villa construction in Kerala, based on CMR&apos;s project data. These are built-up area costs including structure, finishing and basic fittings — but excluding land, registration, and project-specific common amenities.
            </p>

            {/* Cost Table */}
            <div className="overflow-x-auto my-8 border border-brand-gray/20 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2F2B] text-brand-ivory text-xs uppercase tracking-wider font-display">
                    <th className="p-4">Finishing Tier</th>
                    <th className="p-4">Average Cost Per Sq.Ft</th>
                    <th className="p-4">Key Specifications Included</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray/20 text-sm font-light bg-brand-ivory/5">
                  <tr>
                    <td className="p-4 font-semibold text-brand-charcoal">Basic Finish</td>
                    <td className="p-4 text-brand-green font-semibold">₹1,800 – ₹2,200</td>
                    <td className="p-4 text-brand-charcoal/70">Standard red bricks/blocks, basic tiles, standard sanitary ware, basic paint walls.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-semibold text-brand-charcoal">Standard Finish</td>
                    <td className="p-4 text-brand-green font-semibold">₹2,200 – ₹2,800</td>
                    <td className="p-4 text-brand-charcoal/70">Branded AAC blocks, high-quality vitrified tiles, branded plumbing/electricals, emulsion paint.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-brand-charcoal">Premium Finish</td>
                    <td className="p-4 text-brand-green font-semibold">₹2,800 – ₹3,800</td>
                    <td className="p-4 text-brand-charcoal/70">Imported floorings, modular kitchen cupboards, premium Kohler/Jaguar sanitary ware, designer lighting.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-semibold text-brand-charcoal">Luxury / Ultra-Premium</td>
                    <td className="p-4 text-brand-green font-semibold">₹3,800 – ₹5,500+</td>
                    <td className="p-4 text-brand-charcoal/70">Italian marble flooring, full smart-home automation, customized premium teak woodwork, luxury fittings.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              CMR Developers&apos; gated community villas are typically built to the <strong>Standard to Premium</strong> range — with final pricing depending on the specific project, unit configuration, and buyer-selected finishing upgrades.
            </p>

            {/* Internal Link Callout */}
            <div className="bg-brand-ivory/30 border-l-4 border-brand-gold p-6 my-8 rounded-r-xl space-y-2">
              <h4 className="font-display font-semibold text-brand-charcoal text-sm uppercase tracking-wider text-brand-gold">
                Are you an NRI living in the Gulf, UK, or USA?
              </h4>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                We specialize in remote purchases. You can monitor every stage of construction, manage documents via Power of Attorney, and process NRE payments smoothly.
              </p>
              <Link 
                href="/nri-investment-kerala"
                className="inline-block text-xs font-bold text-brand-green hover:text-brand-gold uppercase tracking-wider transition-colors mt-2"
              >
                Explore Our NRI Buying Process →
              </Link>
            </div>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              Comparing Villa Cost vs Apartment Cost in Kerala 2025
            </h2>
            <p>
              One of the most common misunderstandings among Kerala home buyers is the assumption that apartments are cheaper than villas. In most of our project locations, the opposite is true.
            </p>
            <p>
              A 3 BHK apartment of 1,400 sq.ft in a mid-range Kannur building typically costs ₹65–₹90 Lakhs in 2025. A comparable 3 BHK CMR villa of 1,500 sq.ft on 6 cents of land in Taliparamba or Kadachira can be acquired for ₹55–₹70 Lakhs — with the additional benefit of land ownership, a private garden, and community living.
            </p>
            <p>
              Our flagship development, <Link href="/projects" className="text-brand-green hover:text-brand-gold font-semibold underline">Alvina Harmony in Kadachira</Link>, offers luxury villas at an average cost below 60% of the cost of a nearby urban apartment in the same area. The numbers speak for themselves.
            </p>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              How to Get an Accurate Villa Construction Cost Estimate
            </h2>
            <p>
              The most reliable way to understand what your specific villa will cost is to speak directly with an experienced builder who has built in your target location. CMR Developers offers free, no-obligation consultation calls and site visits — during which our team will give you a realistic estimate based on your plot, your preferred configuration, and your budget.
            </p>
            <p>
              Call us on <a href="tel:+919206838383" className="font-semibold text-brand-green hover:text-brand-gold">+91 9206 838 383</a>, WhatsApp our NRI desk, or visit our office in Kannur. We will give you the honest number — not the number you want to hear.
            </p>

            {/* FAQs */}
            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-8 border-t border-brand-gray/20">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 pt-4">
              <details className="group border border-brand-gray/20 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <h3 className="font-display font-bold text-brand-charcoal text-base">
                    What is the average cost of villa construction in Kerala in 2025?
                  </h3>
                  <span className="transition group-open:-rotate-180">
                    <svg className="w-5 h-5 text-brand-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed mt-3 font-light">
                  Villa construction cost in Kerala in 2025 ranges from Rs. 1,800 per sq.ft for basic economy finishes, Rs. 2,200 to Rs. 2,800 per sq.ft for a standard high-quality finish, and Rs. 2,800 to Rs. 3,800 per sq.ft for premium custom villa finishes. Luxury custom finishes can exceed Rs. 5,500 per sq.ft.
                </p>
              </details>

              <details className="group border border-brand-gray/20 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <h3 className="font-display font-bold text-brand-charcoal text-base">
                    Are gated community villas cheaper than apartments in Kannur, Kerala?
                  </h3>
                  <span className="transition group-open:-rotate-180">
                    <svg className="w-5 h-5 text-brand-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed mt-3 font-light">
                  Yes, in most residential areas of Kannur, gated community villas offer better value than apartments. For example, a 1,500 sq.ft villa in a gated community by CMR Developers (like Alvina Harmony) averages below 60% of the cost of a comparable urban apartment, while offering private land ownership and independent gardens.
                </p>
              </details>

              <details className="group border border-brand-gray/20 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <h3 className="font-display font-bold text-brand-charcoal text-base">
                    Does Vastu-compliant villa design cost more to build?
                  </h3>
                  <span className="transition group-open:-rotate-180">
                    <svg className="w-5 h-5 text-brand-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed mt-3 font-light">
                  At CMR Developers, Vastu-compliant layouts are integrated into the architectural plans from day one at no extra design premium. While specific room orientations are required, they do not increase the structural or material construction costs.
                </p>
              </details>
            </div>
          </div>

          {/* Footer */}
          <footer className="px-section max-w-3xl mx-auto mt-16 pt-8 border-t border-brand-gray/20">
            <div className="bg-brand-ivory/10 border border-brand-gray/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-16 h-16 bg-[#0F2F2B] text-brand-gold rounded-full flex items-center justify-center font-display font-bold text-xl flex-shrink-0">
                CMR
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-display font-bold text-brand-charcoal text-sm">
                  About the Publisher
                </h4>
                <p className="font-body text-brand-charcoal/60 text-xs leading-relaxed font-light">
                  CMR Developers is Kerala&apos;s leading residential villa builder since 2012. With 600+ completed homes built across Kannur, Taliparamba, and Ernakulam, we provide transparent, high-quality, and on-time gated community developments.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/blog" 
                className="font-body text-xs font-bold tracking-widest text-brand-green hover:text-brand-gold uppercase transition-colors"
              >
                ← Back to Insights Blog
              </Link>
            </div>
          </footer>
        </article>
      </>
    )
  } else if (slug === 'nri-guide-buy-villa-kannur-2025') {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': 'NRI Guide to Buying a Villa in Kannur, Kerala — Everything You Need to Know in 2025',
      'image': ['https://www.cmrdevelopers.com/images/extracted/cmr-interior-living.jpg'],
      'datePublished': '2026-06-20T09:00:00+05:30',
      'dateModified': '2026-06-20T09:00:00+05:30',
      'author': {
        '@type': 'Organization',
        'name': 'CMR Developers',
        'url': 'https://www.cmrdevelopers.com'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'CMR Developers',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.cmrdevelopers.com/images/cmr-logo.png'
        }
      },
      'description': 'A comprehensive, step-by-step guide on how NRIs from Gulf, UK and USA can buy a villa in Kannur, Kerala in 2025. Understand FEMA rules, POA procedures, and NRI home loans.'
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Can an NRI buy a villa in Kannur without visiting India?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, absolutely. By executing a valid Power of Attorney (POA) in your country of residence (attested by the Indian Embassy/Consulate), your authorized representative in Kerala can complete the registration and buying process. CMR Developers provides full guidance and templates for POA execution.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What are the bank loan options for NRI villa buyers in Kerala?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Major nationalized and private banks including SBI, HDFC, Axis Bank, Federal Bank, and South Indian Bank offer dedicated NRI home loans for CMR Developer projects. NRIs can get up to 80% of the property value financed, subject to eligibility.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What type of bank accounts must NRIs use to buy property in India?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Under FEMA regulations, all funds for the purchase of real estate in India by an NRI must flow from overseas via normal banking channels, specifically through NRE (Non-Resident External) or NRO (Non-Resident Ordinary) bank accounts.'
          }
        }
      ]
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <article className="bg-white min-h-screen pt-28 pb-20">
          {/* Breadcrumb */}
          <div className="px-section max-w-4xl mx-auto py-6">
            <div className="flex items-center gap-2 font-body text-[11px] font-semibold text-brand-charcoal/40 uppercase tracking-wider">
              <Link href="/" className="hover:text-brand-green">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-green">Blog</Link>
              <span>/</span>
              <span className="text-brand-charcoal/70">NRI Buying Guide 2025</span>
            </div>
          </div>

          {/* Header */}
          <header className="px-section max-w-4xl mx-auto text-left space-y-6">
            <div className="inline-block px-3 py-1 bg-brand-green/5 text-brand-green font-body text-[11px] font-bold tracking-widest uppercase rounded">
              NRI Buying Guide
            </div>
            <h1 className="font-display font-bold text-brand-charcoal text-3xl md:text-4xl lg:text-5xl leading-tight">
              NRI Guide to Buying a Villa in Kannur, Kerala — Everything You Need to Know in 2025
            </h1>
            
            <div className="flex items-center gap-4 py-4 border-y border-brand-gray/20">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center font-display font-bold text-brand-gold">
                CMR
              </div>
              <div>
                <div className="font-display font-semibold text-brand-charcoal text-sm">Written by CMR NRI Desk</div>
                <div className="font-body text-brand-charcoal/40 text-xs flex items-center gap-3">
                  <span>Published on June 20, 2026</span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="px-section max-w-5xl mx-auto my-10">
            <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-md bg-brand-green/5">
              <Image 
                src="/images/extracted/cmr-interior-living.jpg"
                alt="Luxury villa interior living room gated community Kannur Kerala"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="block text-[11px] text-brand-charcoal/40 font-light text-center mt-3">
              An elegant living room view inside a premium CMR Developer villa in Kannur.
            </span>
          </div>

          {/* Article Body */}
          <div className="px-section max-w-3xl mx-auto font-body text-brand-charcoal/80 text-body-lg leading-relaxed font-light space-y-6">
            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              Introduction: Why Kannur is the NRI&apos;s First Choice for Kerala Property
            </h2>
            <p>
              If you are a Keralite living in the Gulf, UK or USA and thinking about investing in property back home, Kannur is consistently the first district on the list. The reasons are well-documented: the Kannur International Airport (opened 2018) has transformed travel convenience dramatically. Rental yields in Taliparamba and Karuvanchal have improved steadily. And most importantly, Kannur has a trusted, organised villa construction industry led by builders like CMR Developers — which means NRI buyers have credible, K-RERA registered options with transparent pricing and professional project management.
            </p>
            <p>
              This guide walks you through the entire process of buying a villa in Kannur as an NRI in 2025 — legally, financially, and practically.
            </p>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              Are NRIs Eligible to Buy Property in Kerala?
            </h2>
            <p>
              Yes, unequivocally. Non-Resident Indians (NRIs) and Persons of Indian Origin (PIOs) are fully eligible to purchase residential and commercial property in India, including Kerala, under the Foreign Exchange Management Act (FEMA).
            </p>
            <p>
              There are no restrictions on the number of properties an NRI can own in India. The only category of property NRIs cannot buy without special RBI permission is agricultural land, plantation property, or farmhouses — none of which apply to gated villa communities. Every CMR project is a legally structured residential development fully available for NRI purchase.
            </p>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              Step-by-Step: How to Buy a CMR Villa in Kannur as an NRI
            </h2>
            <ol className="list-decimal pl-6 space-y-4 font-light">
              <li>
                <strong>Step 1 — Shortlist Your Project:</strong> Visit our <Link href="/projects" className="text-brand-green hover:text-brand-gold font-semibold underline">Gated Villa Projects</Link> portal and browse active projects. Use our virtual tour facility or contact us directly to schedule a live video walkthrough.
              </li>
              <li>
                <strong>Step 2 — Get the Cost Sheet:</strong> Request a detailed cost sheet, floor plan, and payment schedule for your preferred unit. CMR provides this within 24 hours of any enquiry.
              </li>
              <li>
                <strong>Step 3 — Execute a Power of Attorney (if not visiting):</strong> If you cannot travel to India for the transaction, execute a POA in favour of a trusted family member or CMR&apos;s legal partner. CMR provides full POA guidance.
              </li>
              <li>
                <strong>Step 4 — Pay the Booking Token:</strong> Transfer the booking token from your NRE or NRO account to CMR&apos;s designated account. A signed booking confirmation receipt is issued immediately.
              </li>
              <li>
                <strong>Step 5 — Sign the Sale Agreement:</strong> The sale agreement (per K-RERA requirements) is executed and registered. CMR provides you a certified copy.
              </li>
              <li>
                <strong>Step 6 — Stage-wise Payments:</strong> Payments follow a construction milestone schedule — you pay as CMR builds. All payments must flow through your NRE/NRO account to maintain FEMA compliance.
              </li>
              <li>
                <strong>Step 7 — Handover:</strong> On project completion, CMR hands over keys at a ceremony. If you are abroad, your POA holder receives the handover. All documents — completion certificate, occupancy certificate, registration documents — are provided at this stage.
              </li>
            </ol>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              NRI Home Loans for Kannur Villa Purchase — 2025 Guide
            </h2>
            <p>
              NRIs are eligible for home loans from Indian banks and financial institutions for property purchase in India. Loan amounts of up to 80% of property value are typically available, subject to income documentation and credit assessment.
            </p>
            <p>
              Banks that have approved CMR projects for NRI home loans include:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-light">
              <li>State Bank of India (NRI Home Loan scheme)</li>
              <li>HDFC Bank</li>
              <li>Axis Bank</li>
              <li>Federal Bank</li>
              <li>South Indian Bank</li>
            </ul>
            <p>
              NRI home loans are typically sanctioned on the basis of overseas income documentation, a valid passport and visa, and property valuation. CMR&apos;s team will connect you directly with empanelled bank representatives for seamless loan processing.
            </p>

            {/* Callout */}
            <div className="bg-brand-ivory/30 border-l-4 border-brand-gold p-6 my-8 rounded-r-xl space-y-2">
              <h4 className="font-display font-semibold text-brand-charcoal text-sm uppercase tracking-wider text-brand-gold">
                Specialized NRI Desk Support
              </h4>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                We have a dedicated NRI desk operating during Gulf, UK, and USA business hours (9 AM – 9 PM IST, 7 days a week). Get in touch directly over WhatsApp for instant, jargon-free answers.
              </p>
              <Link 
                href="/nri-investment-kerala"
                className="inline-block text-xs font-bold text-brand-green hover:text-brand-gold uppercase tracking-wider transition-colors mt-2"
              >
                Learn More About Our NRI Services →
              </Link>
            </div>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              Kannur International Airport — The NRI&apos;s Biggest Investment Advantage
            </h2>
            <p>
              The single biggest change in Kannur&apos;s NRI investment profile over the last five years has been the Kannur International Airport, which became fully operational in December 2018.
            </p>
            <p>
              NRI buyers who previously had to fly into Calicut or Cochin and drive 2–3 hours to Kannur can now land directly at Kannur International Airport and reach their villa or sales office within 30 minutes. This convenience factor has meaningfully increased property demand in Taliparamba, Karuvanchal and Kadachira — all CMR project locations.
            </p>
            <p>
              Industry data suggests that property values within a 30 km radius of Kannur Airport have appreciated 15–25% since the airport became operational. For NRI buyers, this is both a lifestyle advantage and an investment opportunity.
            </p>

            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-4">
              Final Word: Why CMR Developers is the NRI Buyer&apos;s First Choice in Kannur
            </h2>
            <p>
              Over 40% of CMR Developers&apos; buyers are NRI families. That number is not a coincidence — it is the result of 14 years of delivering on every promise we made to buyers who trusted us from thousands of miles away.
            </p>
            <p>
              K-RERA registered projects. In-house construction with zero sub-contracting. WhatsApp-based monthly progress updates. Dedicated NRI desk. Stage-wise payment schedules. Zero delays across 600+ deliveries.
            </p>
            <p>
              If you are an NRI planning to invest in Kerala property in 2025, we would love to speak with you. Contact us: <a href="tel:+919206838383" className="font-semibold text-brand-green hover:text-brand-gold">+91 9206 838 383</a> | <a href="mailto:admin@cmrdevelopers.com" className="font-semibold text-brand-green hover:text-brand-gold">admin@cmrdevelopers.com</a>.
            </p>

            {/* FAQs */}
            <h2 className="font-display font-bold text-brand-charcoal text-2xl md:text-3xl pt-8 border-t border-brand-gray/20">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 pt-4">
              <details className="group border border-brand-gray/20 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <h3 className="font-display font-bold text-brand-charcoal text-base">
                    Can an NRI buy a villa in Kannur without visiting India?
                  </h3>
                  <span className="transition group-open:-rotate-180">
                    <svg className="w-5 h-5 text-brand-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed mt-3 font-light">
                  Yes, absolutely. By executing a valid Power of Attorney (POA) in your country of residence (attested by the Indian Embassy/Consulate), your authorized representative in Kerala can complete the registration and buying process. CMR Developers provides full guidance and templates for POA execution.
                </p>
              </details>

              <details className="group border border-brand-gray/20 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <h3 className="font-display font-bold text-brand-charcoal text-base">
                    What are the bank loan options for NRI villa buyers in Kerala?
                  </h3>
                  <span className="transition group-open:-rotate-180">
                    <svg className="w-5 h-5 text-brand-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed mt-3 font-light">
                  Major nationalized and private banks including SBI, HDFC, Axis Bank, Federal Bank, and South Indian Bank offer dedicated NRI home loans for CMR Developer projects. NRIs can get up to 80% of the property value financed, subject to eligibility.
                </p>
              </details>

              <details className="group border border-brand-gray/20 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <h3 className="font-display font-bold text-brand-charcoal text-base">
                    What type of bank accounts must NRIs use to buy property in India?
                  </h3>
                  <span className="transition group-open:-rotate-180">
                    <svg className="w-5 h-5 text-brand-charcoal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="font-body text-brand-charcoal/70 text-sm leading-relaxed mt-3 font-light">
                  Under FEMA regulations, all funds for the purchase of real estate in India by an NRI must flow from overseas via normal banking channels, specifically through NRE (Non-Resident External) or NRO (Non-Resident Ordinary) bank accounts.
                </p>
              </details>
            </div>
          </div>

          {/* Footer */}
          <footer className="px-section max-w-3xl mx-auto mt-16 pt-8 border-t border-brand-gray/20">
            <div className="bg-brand-ivory/10 border border-brand-gray/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-16 h-16 bg-[#0F2F2B] text-brand-gold rounded-full flex items-center justify-center font-display font-bold text-xl flex-shrink-0">
                CMR
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-display font-bold text-brand-charcoal text-sm">
                  About the Publisher
                </h4>
                <p className="font-body text-brand-charcoal/60 text-xs leading-relaxed font-light">
                  CMR Developers is Kerala&apos;s leading residential villa builder since 2012. With 600+ completed homes built across Kannur, Taliparamba, and Ernakulam, we provide transparent, high-quality, and on-time gated community developments.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/blog" 
                className="font-body text-xs font-bold tracking-widest text-brand-green hover:text-brand-gold uppercase transition-colors"
              >
                ← Back to Insights Blog
              </Link>
            </div>
          </footer>
        </article>
      </>
    )
  }

  // 4. Default: If not found anywhere, return a 404
  notFound()
}
