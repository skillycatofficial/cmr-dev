'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryLightboxProps {
  gallery: string[];
  projectName: string;
}

export default function GalleryLightbox({ gallery, projectName }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : null))
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null))
      } else if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, gallery.length])

  if (!gallery || gallery.length === 0) return null

  return (
    <>
      {/* Grid of gallery images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map((img: string, i: number) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative overflow-hidden group cursor-pointer border border-brand-gray/20 ${
              i === 0 ? 'col-span-2 row-span-2 h-[420px] md:h-[500px]' : 'h-[200px] md:h-[240px]'
            }`}
          >
            <Image
              src={img}
              alt={`${projectName} gallery ${i + 1}`}
              fill
              sizes={i === 0 ? '(max-w-768px) 100vw, 66vw' : '(max-w-768px) 50vw, 33vw'}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Hover zoom overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm select-none"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-full transition-colors duration-200"
            aria-label="Close Lightbox"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Slider Container */}
          <div 
            className="relative flex items-center justify-center w-full max-w-5xl h-[80vh] px-4 md:px-12"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image container area
          >
            {/* Previous Button */}
            <button
              onClick={() => setActiveIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : null))}
              className="absolute left-4 md:left-6 z-10 p-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-full transition-colors duration-200"
              aria-label="Previous Slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Active Image */}
            <div className="relative w-full h-full">
              <Image
                src={gallery[activeIndex]}
                alt={`${projectName} fullscreen gallery ${activeIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain transition-all duration-300"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() => setActiveIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null))}
              className="absolute right-4 md:right-6 z-10 p-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-full transition-colors duration-200"
              aria-label="Next Slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slider Info Indicator */}
          <div className="mt-4 text-white/75 font-body text-sm tracking-wider select-none">
            {projectName} — {activeIndex + 1} of {gallery.length}
          </div>
        </div>
      )}
    </>
  )
}
