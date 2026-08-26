import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names safely, resolving conflicts.
 * Usage: cn('px-4 py-2', condition && 'bg-red-500', 'px-6') → 'py-2 bg-red-500 px-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number with a + suffix for display (e.g. 600 → "600+")
 */
export function formatStat(value: number, suffix = '+') {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K${suffix}`
  }
  return `${value}${suffix}`
}

/**
 * Slugify a string for use in URLs
 */
export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Decodes common HTML entities returned from WordPress API (e.g. &amp;, &#8217;)
 */
export function decodeHtml(str: string | undefined | null): string {
  if (!str) return ''
  
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#34;': '"',
    '&apos;': "'",
    '&#39;': "'",
    '&#039;': "'",
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&ndash;': '–',
    '&mdash;': '—',
    '&middot;': '·',
    '&deg;': '°',
    '&nbsp;': ' ',
  }

  return str.replace(/&[#a-zA-Z0-9]+;/g, (match) => {
    return entities[match] || match
  })
}

/**
 * Resolves a project's district (e.g. "Kannur") from WordPress data that may
 * only have a free-text `location` string like "Kadachira, Kannur" rather
 * than an explicit `district` field. Shared by the navbar mega menu and the
 * footer's project listing so both group projects under the same district.
 */
const KNOWN_DISTRICTS = new Set([
  'Kannur', 'Ernakulam', 'Kottayam', 'Kozhikode', 'Thrissur',
  'Malappuram', 'Palakkad', 'Wayanad', 'Kasaragod', 'Alappuzha',
  'Pathanamthitta', 'Kollam', 'Thiruvananthapuram', 'Idukki',
])
const LEGACY_SUB_TO_DISTRICT: Record<string, string> = {
  'Karuvanchal': 'Kannur', 'Taliparamba': 'Kannur', 'Iritty': 'Kannur',
  'Payyanur': 'Kannur', 'Angamaly': 'Ernakulam', 'Mulanthuruthy': 'Ernakulam',
  'Perumbavoor': 'Ernakulam', 'Changanassery': 'Kottayam', 'Kanjirappally': 'Kottayam',
}

export function resolveDistrict(project: { district?: string; sub_location?: string; location?: string }): string {
  if (project.district?.trim()) return project.district.trim()

  const parts = (project.location || '').split(',').map((s) => s.trim()).filter(Boolean)
  if (!parts.length) return 'Other'
  if (parts.length === 1) {
    const only = parts[0]
    return KNOWN_DISTRICTS.has(only) ? only : (LEGACY_SUB_TO_DISTRICT[only] ?? 'Other')
  }
  const last = parts[parts.length - 1]
  if (KNOWN_DISTRICTS.has(last)) return last
  return LEGACY_SUB_TO_DISTRICT[last] ?? last
}
