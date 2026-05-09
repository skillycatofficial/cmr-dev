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
