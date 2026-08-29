import React, { useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';

interface HeroProps {
  onEnquireClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnquireClick }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax: gently shift the bg layer upward as user scrolls
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.28;
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Image Layer */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ willChange: 'transform' }}>
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
          alt="NEXESH Photography Hero Background"
          className="w-full h-full object-cover object-center img-graded hero-bg-zoom filter brightness-[0.55] contrast-[1.02]"
        />
        {/* Dark vignette gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/55 to-transparent"></div>
        {/* Top darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0B0A]/70 via-transparent to-transparent"></div>
      </div>

      {/* Ambient champagne glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A96E]/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Location & Studio Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1E1B18]/70 border border-[#C9A96E]/20 backdrop-blur-md mb-6 shadow-md shadow-black/40 hero-animate hero-delay-0">
          <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span className="text-xs font-sans font-medium tracking-widest text-[#F5F0E8] uppercase">
            {STUDIO_INFO.location}
          </span>
          <span className="text-[#C9A96E] font-bold">•</span>
          <span className="text-xs font-sans font-medium tracking-widest text-[#9C9180] uppercase">
            Photography Studio
          </span>
        </div>

        {/* Studio Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#F5F0E8] tracking-tight leading-[1.1] mb-4 hero-animate hero-delay-1">
          NEXESH <span className="gold-text-gradient italic font-normal">Photography</span>
        </h1>

        {/* Studio Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#9C9180] font-light mb-6 tracking-wide hero-animate hero-delay-2">
          "{STUDIO_INFO.tagline}"
        </p>

        {/* Categories Served Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 max-w-2xl hero-animate hero-delay-3">
          {['Weddings', 'Portraits', 'Celebrations', 'Corporate Events'].map((cat, idx) => (
            <React.Fragment key={cat}>
              <span className="text-xs sm:text-sm font-sans font-medium text-[#9C9180] tracking-wider uppercase bg-[#F5F0E8]/5 backdrop-blur-sm border border-[#C9A96E]/15 px-3.5 py-1.5 rounded-full">
                {cat}
              </span>
              {idx < 3 && <span className="hidden sm:inline text-[#C9A96E] opacity-40">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Dual Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16 hero-animate hero-delay-4">
          <a
            href="#contact"
            onClick={onEnquireClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C9A96E] hover:bg-[#E8C98A] text-[#0C0B0A] font-semibold text-sm uppercase tracking-widest transition-all shadow-lg shadow-black/30 flex items-center justify-center space-x-2 font-sans group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Enquire Now</span>
          </a>

          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent hover:bg-[#F5F0E8]/8 text-[#F5F0E8] border border-[#C9A96E]/35 hover:border-[#C9A96E] font-semibold text-sm uppercase tracking-widest transition-all backdrop-blur-md flex items-center justify-center space-x-2 font-sans"
          >
            <span>View Packages</span>
          </a>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl pt-8 border-t border-[#C9A96E]/15 hero-animate hero-delay-5">
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E8]">500+</span>
            <span className="text-xs text-[#9C9180] font-sans tracking-wide mt-0.5">Events Captured</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold gold-text-gradient">4.9 ★</span>
            <span className="text-xs text-[#9C9180] font-sans tracking-wide mt-0.5">Client Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E8]">100%</span>
            <span className="text-xs text-[#9C9180] font-sans tracking-wide mt-0.5">Transparent Rates</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold gold-text-gradient">Same Day</span>
            <span className="text-xs text-[#9C9180] font-sans tracking-wide mt-0.5">Reel / Photo Option</span>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#starting-rates"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 text-[#4A4540] hover:text-[#C9A96E] transition-colors animate-bounce z-10"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
