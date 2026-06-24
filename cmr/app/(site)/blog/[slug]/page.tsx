import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/wordpress'

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    return (posts ?? []).map((p: { slug: string }) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    if (!post) return { title: 'Blog Article | CMR Developers' }
    return {
      title: post.seo?.title || `${post.title} | CMR Developers`,
      description: post.seo?.description || post.excerpt || `${post.title} by CMR Developers.`,
      alternates: {
        canonical: post.seo?.canonical || `https://www.cmrdevelopers.com/blog/${post.slug}`,
      },
    }
  } catch {
    return { title: 'Blog Article | CMR Developers' }
  }
}

export default async function BlogDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  let post = null
  try {
    post = await getPostBySlug(slug)
  } catch {
    // WordPress not reachable
  }

  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': post.title,
    'image': post.image ? [post.image] : [],
    'datePublished': post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    'author': {
      '@type': 'Organization',
      'name': 'CMR Developers',
      'url': 'https://www.cmrdevelopers.com',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'CMR Developers',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.cmrdevelopers.com/images/cmr-logo.png',
      },
    },
    'description': post.excerpt || post.title,
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
              {post.title}
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="px-section max-w-5xl mx-auto text-left space-y-6">
          {post.category && (
            <div className="inline-block px-3 py-1 bg-brand-green/5 text-brand-green font-body text-[11px] font-bold tracking-widest uppercase rounded">
              {post.category}
            </div>
          )}
          <h1 className="font-display font-bold text-brand-charcoal text-3xl md:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-4 border-y border-brand-gray/20">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center font-display font-bold text-brand-gold">
              CMR
            </div>
            <div>
              <div className="font-display font-semibold text-brand-charcoal text-sm">
                Written by {post.author || 'CMR Editorial Team'}
              </div>
              <div className="font-body text-brand-charcoal/40 text-xs flex items-center gap-3">
                <span>{post.date}</span>
                {post.readTime && <><span>•</span><span>{post.readTime}</span></>}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="px-section max-w-5xl mx-auto my-10">
            <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-md bg-brand-green/5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="px-section max-w-3xl mx-auto">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="blog-prose font-body text-brand-charcoal/80 text-body-lg leading-relaxed font-light space-y-6"
          />
        </div>

        {/* Author Card */}
        <footer className="px-section max-w-3xl mx-auto mt-16 pt-8 border-t border-brand-gray/20">
          <div className="bg-brand-ivory/10 border border-brand-gray/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-[#0F2F2B] text-brand-gold rounded-full flex items-center justify-center font-display font-bold text-xl flex-shrink-0">
              CMR
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-display font-bold text-brand-charcoal text-sm">About the Publisher</h4>
              <p className="font-body text-brand-charcoal/60 text-xs leading-relaxed font-light">
                CMR Developers is Kerala&apos;s leading residential villa builder since 2012. With 600+ completed
                homes built across Kannur, Taliparamba, and Ernakulam, we provide transparent, high-quality,
                and on-time gated community developments.
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
