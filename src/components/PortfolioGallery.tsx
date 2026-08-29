import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/photographyData';
import type { GalleryItem } from '../data/photographyData';
import { Maximize2, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const PortfolioGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [headerRef, isHeaderVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [gridRef, isGridVisible]     = useScrollReveal<HTMLDivElement>({ threshold: 0.06, delay: 60 });

  const categories = [
    { id: 'all',         label: 'All Works' },
    { id: 'weddings',    label: 'Weddings' },
    { id: 'portraits',   label: 'Portraits' },
    { id: 'birthdays',   label: 'Birthdays' },
    { id: 'baby-shower', label: 'Baby Shower / Seemantham' },
    { id: 'corporate',   label: 'Corporate' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleNextLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setLightboxImage(filteredItems[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxImage(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="py-24 bg-[#0C0B0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-12 reveal-hidden ${isHeaderVisible ? 'reveal-visible' : ''}`}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold font-sans mb-3 block">
            Visual Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F0E8] tracking-tight mb-4">
            Captured <span className="gold-text-gradient italic">Moments & Stories</span>
          </h2>
          <p className="text-[#9C9180] font-sans text-base sm:text-lg">
            Explore authentic wedding rituals, candid family portraits, and corporate summits captured across Coimbatore and Tamil Nadu.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#C9A96E] text-[#0C0B0A] shadow-lg shadow-black/25 scale-105'
                    : 'bg-[#161412] text-[#9C9180] border border-[#C9A96E]/15 hover:border-[#C9A96E]/40 hover:text-[#F5F0E8]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              style={{ transitionDelay: `${idx * 0.07}s` }}
              className={`gallery-img-wrap group relative h-80 sm:h-96 rounded-3xl cursor-pointer border border-[#C9A96E]/10 bg-[#161412] shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A96E]/35 reveal-hidden ${isGridVisible ? 'reveal-visible' : ''}`}
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center img-graded filter brightness-90 group-hover:brightness-100"
                loading="lazy"
              />

              {/* Category Tag */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#C9A96E]/20 text-[10px] uppercase font-sans font-medium tracking-widest text-[#E8C98A] z-10">
                {item.categoryLabel}
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#C9A96E]/20 flex items-center justify-center text-[#E8C98A] group-hover:bg-[#C9A96E] group-hover:text-[#0C0B0A] transition-all z-10">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption overlay */}
              <div className="gallery-caption-overlay z-10">
                <div>
                  {item.location && (
                    <div className="flex items-center text-xs text-[#E8C98A] font-sans mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 lightbox-backdrop">
          <div className="lightbox-enter absolute inset-0" style={{ pointerEvents: 'none' }}></div>
          <div className="relative max-w-5xl w-full bg-[#161412] border border-[#C9A96E]/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row lightbox-enter">
            
            {/* Close */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1E1B18] text-[#F5F0E8] hover:text-[#C9A96E] border border-[#C9A96E]/20 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#1E1B18] text-[#F5F0E8] hover:text-[#C9A96E] border border-[#C9A96E]/20 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={handleNextLightbox}
              className="absolute right-16 md:right-4 top-4 md:top-1/2 md:-translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#1E1B18] text-[#F5F0E8] hover:text-[#C9A96E] border border-[#C9A96E]/20 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="md:w-2/3 max-h-[70vh] md:max-h-[85vh] bg-[#0C0B0A] flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="w-full h-full object-contain img-graded"
              />
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-between bg-[#161412] border-l border-[#C9A96E]/15">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#C9A96E]/12 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4 font-sans">
                  {lightboxImage.categoryLabel}
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-2">
                  {lightboxImage.title}
                </h3>

                {lightboxImage.location && (
                  <div className="flex items-center text-xs text-[#C9A96E] font-sans mb-4">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    <span>{lightboxImage.location}</span>
                  </div>
                )}

                <p className="text-sm text-[#9C9180] font-sans leading-relaxed mb-6">
                  {lightboxImage.caption}
                </p>
              </div>

              <div className="pt-6 border-t border-[#C9A96E]/15">
                <a
                  href="#contact"
                  onClick={() => setLightboxImage(null)}
                  className="w-full py-3 rounded-full bg-[#C9A96E] text-[#0C0B0A] font-semibold text-xs uppercase tracking-widest text-center block hover:bg-[#E8C98A] transition-all font-sans"
                >
                  Book Similar Coverage
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
