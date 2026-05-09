// ─── Project ─────────────────────────────────────────────────────────────────

export type ProjectStatus = 'ready' | 'under-construction' | 'upcoming'
export type ProjectCategory = 'villa' | 'apartment' | 'plot'

export interface ProjectSpec {
  bedrooms?: number
  bathrooms?: number
  area?: string       // e.g. "2400 sq.ft"
  floors?: number
  plotSize?: string   // e.g. "5 cents"
}

export interface Project {
  id:         string
  slug:       string
  name:       string
  tagline?:   string
  location:   string
  district:   string
  status:     ProjectStatus
  category:   ProjectCategory
  priceRange: string        // e.g. "₹45L – ₹85L"
  image:      string        // URL or path
  gallery?:   string[]
  specs:      ProjectSpec
  features?:  string[]
  featured?:  boolean
  completionDate?: string
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id:       string
  name:     string
  location: string
  project:  string
  content:  string
  rating:   1 | 2 | 3 | 4 | 5
  avatar?:  string
  video?:   string
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
  label:     string
  href:      string
  children?: Omit<NavLink, 'children'>[]
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export type GalleryCategory = 'all' | 'exterior' | 'interior' | 'amenities' | 'lifestyle'

export interface GalleryImage {
  id:       string
  src:      string
  alt:      string
  category: Exclude<GalleryCategory, 'all'>
  project?: string
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export interface Stat {
  value: string
  label: string
  desc?: string
}

// ─── Location ────────────────────────────────────────────────────────────────

export interface CMRLocation {
  city:     string
  district: string
  state:    string
  projects: number
  lat:      number
  lng:      number
}
