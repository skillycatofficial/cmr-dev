import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return new NextResponse('Path parameter is required', { status: 400 })
  }

  // Security: only allow paths starting with /wp-content/ to prevent arbitrary SSRF/traversal
  if (!path.startsWith('/wp-content/')) {
    return new NextResponse('Access denied', { status: 403 })
  }

  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://test.local'
  const fileUrl = `${wordpressUrl.replace(/\/$/, '')}${path}`

  try {
    const res = await fetch(fileUrl)
    if (!res.ok) throw new Error(`Failed to fetch file from backend`)

    const blob = await res.blob()
    const headers = new Headers()

    // Extract file name from url
    const filename = fileUrl.split('/').pop() || 'download'

    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
    headers.set('Content-Type', res.headers.get('Content-Type') || 'application/octet-stream')

    return new NextResponse(blob, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Download error:', error)
    return new NextResponse('Failed to download file', { status: 500 })
  }
}
