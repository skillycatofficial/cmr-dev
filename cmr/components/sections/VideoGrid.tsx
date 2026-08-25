'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { YouTubeVideo } from '@/lib/youtube'

export default function VideoGrid({ videos }: { videos: YouTubeVideo[] }) {
  const [active, setActive] = useState<YouTubeVideo | null>(null)

  // Prevent background scroll when the modal is open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  // Close on Escape
  useEffect(() => {
    if (!active) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [active])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            className="relative w-full aspect-video overflow-hidden rounded-xl shadow-sm bg-black group text-left cursor-pointer"
            aria-label={`Play ${video.title}`}
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-brand-gold flex items-center justify-center shadow-lg transition-colors duration-300">
                <svg className="w-5 h-5 text-brand-charcoal ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <p className="absolute bottom-0 left-0 right-0 p-3 font-body text-white text-[13px] font-semibold leading-snug line-clamp-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              {video.title}
            </p>
          </button>
        ))}
      </div>

      {/* Video Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm select-none"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-full transition-colors duration-200"
            aria-label="Close video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-5xl px-4 md:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1`}
                title={active.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-center text-white/75 font-body text-sm tracking-wide">
              {active.title}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
