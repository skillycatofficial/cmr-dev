import { groq } from 'next-sanity'
import { client } from './client'

// ─── Projects ────────────────────────────────────────────────────────────────

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    location,
    status,
    price,
    "heroImage": heroImage.asset->url,
    badge,
  }
`

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    location,
    status,
    price,
    "heroImage": heroImage.asset->url,
    badge,
  }
`

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    location,
    status,
    price,
    overview,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    amenities,
    badge,
  }
`

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    name,
    project,
    since,
    quote,
    "photo": photo.asset->url,
    initials,
    color,
  }
`

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const FEATURED_POSTS_QUERY = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0..2] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    readTime,
    excerpt,
    "coverImage": coverImage.asset->url,
  }
`

export const ALL_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    readTime,
    excerpt,
    "coverImage": coverImage.asset->url,
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    readTime,
    excerpt,
    "coverImage": coverImage.asset->url,
    body,
  }
`

// ─── Gallery ─────────────────────────────────────────────────────────────────

export const GALLERY_QUERY = groq`
  *[_type == "galleryItem" && featured == true] | order(order asc) {
    _id,
    label,
    "src": image.asset->url,
    category,
  }
`

// ─── Awards ──────────────────────────────────────────────────────────────────

export const AWARDS_QUERY = groq`
  *[_type == "award"] | order(order asc) {
    _id,
    name,
    year,
    "img": image.asset->url,
  }
`

// ─── Home Page singleton ─────────────────────────────────────────────────────

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    hero {
      heading,
      subheading,
      slides[] {
        "image": image.asset->url,
        eyebrow,
        title,
        cta,
        ctaHref,
      }
    },
    stats,
    about,
    seo,
  }
`

export const HERO_SLIDES_QUERY = groq`
  *[_type == "homePage"][0].hero.slides[] {
    "image": image.asset->url,
    eyebrow,
    title,
    cta,
    ctaHref,
  }
`

// ─── Fetch helpers ────────────────────────────────────────────────────────────

export async function getFeaturedProjects() {
  return client.fetch(FEATURED_PROJECTS_QUERY)
}

export async function getAllProjects() {
  return client.fetch(ALL_PROJECTS_QUERY)
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(PROJECT_BY_SLUG_QUERY, { slug })
}

export async function getTestimonials() {
  return client.fetch(TESTIMONIALS_QUERY)
}

export async function getFeaturedPosts() {
  return client.fetch(FEATURED_POSTS_QUERY)
}

export async function getAllPosts() {
  return client.fetch(ALL_POSTS_QUERY)
}

export async function getPostBySlug(slug: string) {
  return client.fetch(POST_BY_SLUG_QUERY, { slug })
}

export async function getGallery() {
  return client.fetch(GALLERY_QUERY)
}

export async function getAwards() {
  return client.fetch(AWARDS_QUERY)
}

export async function getHomePage() {
  return client.fetch(HOME_PAGE_QUERY)
}

export async function getHeroSlides() {
  return client.fetch(HERO_SLIDES_QUERY)
}
