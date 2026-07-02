import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.cmrdevelopers.com' },
      { protocol: 'https', hostname: 'www.figma.com' },
      // WordPress Production
      { protocol: 'https', hostname: 'backendcmr.skillycat.com' },
      // WordPress Local / Development
      { protocol: 'http', hostname: 'test.local' },
      { protocol: 'https', hostname: 'test.local' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'localhost' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/projects.php',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about.php',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/about-us.php',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/contact.php',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/contact-us.php',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/careers.php',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/nri.php',
        destination: '/nri-investment-kerala',
        permanent: true,
      },
      {
        source: '/nri-investment.php',
        destination: '/nri-investment-kerala',
        permanent: true,
      },
      {
        source: '/villa-construction.php',
        destination: '/villa-construction-kerala',
        permanent: true,
      },
      {
        source: '/testimonials.php',
        destination: '/testimonials',
        permanent: true,
      },
      {
        source: '/blog.php',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://test.local'
    return [
      {
        source: '/wp-content/:path*',
        destination: `${wordpressUrl.replace(/\/$/, '')}/wp-content/:path*`,
      },
    ]
  },
}

export default nextConfig
