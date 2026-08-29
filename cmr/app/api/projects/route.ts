import { NextResponse } from 'next/server'
import { getAllProjects } from '@/lib/wordpress'

/**
 * GET /api/projects
 * Proxies the WordPress projects endpoint server-side so client components
 * (e.g. the Navbar mega menu) never call backendcmr.skillycat.com directly
 * from the browser, which is blocked by CORS.
 */
export async function GET() {
  const projects = await getAllProjects()
  return NextResponse.json(projects)
}
