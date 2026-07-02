'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface LayoutSectionProps {
  layout: string;
  name: string;
  location: string;
}

export default function LayoutSection({ layout, name, location }: LayoutSectionProps) {
  const [showLayoutModal, setShowLayoutModal] = useState(false)
  const isPdf = layout.toLowerCase().endsWith('.pdf')

  // Convert full URL to relative path to hide the backend domain on the client-side
  const getRelativePath = (url: string) => {
    const index = url.indexOf('/wp-content/')
    if (index !== -1) {
      return url.substring(index)
    }
    return url
  }
  const relativeLayout = getRelativePath(layout)

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showLayoutModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showLayoutModal])

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLayoutModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <section id="layout" className="bg-[#f8f9fa] py-16 md:py-20 border-t border-brand-gray/30 scroll-mt-[130px]">
        <div className="px-section">
          <p className="font-body text-brand-gold text-label tracking-[0.3em] uppercase mb-3">Architecture</p>
          <h2
            className="font-display font-bold text-brand-charcoal mb-6"
            style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.015em' }}
          >
            Project Layout &amp; Floor Plan
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            {/* Visual Column */}
            <div>
              {isPdf ? (
                <div
                  onClick={() => setShowLayoutModal(true)}
                  className="relative w-full aspect-[16/10] bg-white border border-brand-gray/30 p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer rounded-sm"
                >
                  <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-brand-charcoal text-lg mb-2">Master Layout Plan (PDF)</h4>
                  <p className="font-body text-brand-charcoal/50 text-ui-sm text-center max-w-sm mb-4">
                    Click to open the high-resolution site layout & master plan document.
                  </p>
                  <span className="font-body text-brand-gold text-micro font-bold tracking-widest uppercase py-1.5 px-4 border border-brand-gold/30 rounded-full bg-brand-ivory/30">
                    Click to Open Document
                  </span>
                </div>
              ) : (
                <div
                  onClick={() => setShowLayoutModal(true)}
                  className="relative w-full aspect-[16/10] bg-white border border-brand-gray/30 p-2 md:p-3 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer rounded-sm overflow-hidden"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={relativeLayout}
                      alt={`${name} - Architectural Master Layout`}
                      fill
                      sizes="(max-w-1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Zoom icon overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Information & Actions Column */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-display font-bold text-brand-charcoal text-2xl mb-3">
                  Master Layout &amp; Site Map
                </h3>
                <p className="font-body text-brand-charcoal/60 text-ui leading-relaxed">
                  {isPdf
                    ? "Access the complete, official architectural layout plan detailing individual villa plots, inner pathways, green areas, and all gated community details."
                    : "High-resolution architectural layout indicating villa plots, roads, and common amenities. Crafted with care to ensure open spaces, privacy, and seamless access."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full pt-4 border-t border-brand-gray/20">
                <button
                  type="button"
                  onClick={() => setShowLayoutModal(true)}
                  className="flex-1 text-center py-4 bg-brand-green hover:bg-brand-gold text-brand-ivory hover:text-white font-body text-xs font-bold tracking-[0.2em] uppercase shadow-md transition-all duration-300"
                  aria-label={isPdf ? "Open layout PDF fullscreen" : "Open layout image fullscreen"}
                >
                  {isPdf ? "View PDF" : "View Full Screen"}
                </button>
                <a
                  href={`/api/download?path=${encodeURIComponent(relativeLayout)}`}
                  download
                  className="flex-1 text-center py-4 border border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-ivory font-body text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                  aria-label={isPdf ? "Download PDF" : "Download Image"}
                >
                  {isPdf ? "Download PDF" : "Download Image"}
                </a>
              </div>

              {/* WhatsApp lead generator */}
              <a
                href={`https://wa.me/919446475555?text=${encodeURIComponent(`Hi, I'd like to receive the floor plan for ${name} in ${location}. Please share the details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-4 bg-[#25D366] hover:bg-[#1da851] text-white font-body text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                aria-label="Request layout plan on WhatsApp"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get details on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {showLayoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm select-none"
          onClick={() => setShowLayoutModal(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setShowLayoutModal(false)}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-full transition-colors duration-200"
            aria-label="Close Fullscreen View"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image/PDF Wrapper */}
          <div
            className="relative w-full max-w-5xl h-[85vh] px-4 md:px-12 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isPdf ? (
              <iframe
                src={`${relativeLayout}#toolbar=0`}
                className="w-full h-full bg-white rounded shadow-2xl border-0"
                title={`${name} - Layout Plan PDF`}
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={relativeLayout}
                  alt={`${name} - Fullscreen Layout Plan`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
