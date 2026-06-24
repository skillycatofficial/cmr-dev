import type { MetadataRoute } from 'next'
import { getAllProjects, getAllPosts } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

const BASE = 'https://www.cmrdevelopers.com'

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,                        priority: 1.0,  changeFrequency: 'weekly'  },
  { url: `${BASE}/projects`,                priority: 0.9,  changeFrequency: 'weekly'  },
  { url: `${BASE}/about-us`,                priority: 0.7,  changeFrequency: 'monthly' },
  { url: `${BASE}/blog`,                    priority: 0.8,  changeFrequency: 'weekly'  },
  { url: `${BASE}/testimonials`,            priority: 0.6,  changeFrequency: 'monthly' },
  { url: `${BASE}/careers`,                 priority: 0.6,  changeFrequency: 'monthly' },
  { url: `${BASE}/contact-us`,              priority: 0.7,  changeFrequency: 'monthly' },
  { url: `${BASE}/nri-investment-kerala`,   priority: 0.8,  changeFrequency: 'monthly' },
  { url: `${BASE}/villa-construction-kerala`, priority: 0.8, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic routes from WordPress (fail silently — static routes always included)
  const [projects, posts] = await Promise.allSettled([
    getAllProjects(),
    getAllPosts(),
  ])

  const projectRoutes: MetadataRoute.Sitemap =
    projects.status === 'fulfilled' && projects.value?.length
      ? projects.value.map((p: { slug: string }) => ({
          url: `${BASE}/projects/${p.slug}`,
          priority: 0.85,
          changeFrequency: 'weekly' as const,
        }))
      : []

  const blogRoutes: MetadataRoute.Sitemap =
    posts.status === 'fulfilled' && posts.value?.length
      ? posts.value.map((p: { slug: string }) => ({
          url: `${BASE}/blog/${p.slug}`,
          priority: 0.7,
          changeFrequency: 'monthly' as const,
        }))
      : []

  return [...STATIC_ROUTES, ...projectRoutes, ...blogRoutes]
}
