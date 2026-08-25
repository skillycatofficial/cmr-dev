import type { Metadata } from 'next'
import { getChannelVideos } from '@/lib/youtube'
import VideoGrid from '@/components/sections/VideoGrid'

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@cmrdeveloperspvtltd'
// YouTube's "uploads" playlist for a channel is always the channel ID with
// its "UC" prefix swapped for "UU" — used as a fallback embed below if the
// scraped video list (getChannelVideos) ever comes back empty.
const UPLOADS_PLAYLIST_ID = 'UUEfYEItWDu0KTEsLblmnAyA'

export const metadata: Metadata = {
  title: 'Videos | CMR Developers Kerala — Villa Tours & Project Updates',
  description: 'Watch CMR Developers’ full video library — villa walkthroughs, construction updates, customer stories and project highlights from our YouTube channel.',
  alternates: {
    canonical: 'https://www.cmrdevelopers.com/videos',
  },
  openGraph: {
    title: 'Videos | CMR Developers Kerala',
    description: 'Villa walkthroughs, construction updates and customer stories — CMR Developers’ full video library.',
    url: 'https://www.cmrdevelopers.com/videos',
    siteName: 'CMR Developers',
    images: [
      {
        url: 'https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'CMR Developers — Videos',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videos | CMR Developers Kerala',
    description: 'Villa walkthroughs, construction updates and customer stories — CMR Developers’ full video library.',
    images: ['https://www.cmrdevelopers.com/images/extracted/cmr-villa-exterior.jpg'],
  },
}

export default async function VideosPage() {
  const videos = await getChannelVideos()

  return (
    <>
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative bg-[#0F2F2B] pt-36 pb-20 md:pb-24 overflow-hidden border-b border-brand-gray/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-section relative z-10 text-left max-w-5xl">
          <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">
            Watch &amp; Explore
          </span>
          <h1
            className="font-display font-bold text-brand-ivory leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.025em' }}
          >
            Villa Tours, Site Updates &amp; Stories from CMR Developers
          </h1>
          <p className="font-body text-brand-ivory/70 text-body leading-relaxed font-light max-w-3xl mb-8">
            Every video from our YouTube channel — villa walkthroughs, live construction progress, and real customer stories from across Kerala.
          </p>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-gold hover:bg-brand-ivory text-brand-charcoal font-body text-label font-bold tracking-[0.2em] uppercase transition-colors duration-300 rounded-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </section>

      {/* ── Full Video Library ─────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="px-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <p className="font-body text-brand-charcoal/50 text-[10px] tracking-[0.25em] uppercase mb-4">Full Library</p>
              <h2 className="font-display font-medium text-brand-charcoal text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-none">
                All Videos
              </h2>
            </div>
            {videos.length > 0 && (
              <p className="font-body text-brand-charcoal/50 text-sm">
                {videos.length} video{videos.length === 1 ? '' : 's'}
              </p>
            )}
          </div>

          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            // Fallback: embedded playlist player if the video list couldn't be fetched
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] border border-brand-gray/20">
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`}
                  title="CMR Developers — All Videos"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
