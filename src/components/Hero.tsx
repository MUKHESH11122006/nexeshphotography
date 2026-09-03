import React, { useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';

interface HeroProps {
  onEnquireClick?: () => void;
  onCategorySelect?: (categoryId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnquireClick, onCategorySelect }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  const categoriesMap: { label: string; id: string }[] = [
    { label: 'Weddings', id: 'wedding' },
    { label: 'Portraits', id: 'wedding' },
    { label: 'Celebrations', id: 'small-event' },
    { label: 'Corporate Events', id: 'corporate' },
  ];

  const handleCategoryClick = (catId: string) => {
    if (onCategorySelect) {
      onCategorySelect(catId);
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Parallax background scroll effect
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

  // Interactive particle animation matching reference video
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sectionRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = sectionRef.current.offsetWidth);
    let height = (canvas.height = sectionRef.current.offsetHeight);

    const handleResize = () => {
      if (!canvas || !sectionRef.current) return;
      width = canvas.width = sectionRef.current.offsetWidth;
      height = canvas.height = sectionRef.current.offsetHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      colorPrefix: string;
      alpha: number;
      floatAngle: number;
      floatSpeed: number;
      floatRadius: number;
    }

    let particles: Particle[] = [];
    const colors = [
      'rgba(201, 169, 110, ', // Gold #C9A96E
      'rgba(232, 201, 138, ', // Light Gold #E8C98A
      'rgba(245, 240, 232, ', // Champagne Ivory #F5F0E8
      'rgba(180, 150, 95,  ', // Muted Warm Gold
    ];

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(Math.min(width, height) / 16);
      for (let i = 0; i < particleCount; i++) {
        const rand = Math.random();
        // Vary sizes: small dots (2-4px), medium dots (5-8px), large dots (9-14px) matching reference video
        const radius = rand < 0.5 ? 2.5 + Math.random() * 2 : rand < 0.85 ? 5 + Math.random() * 3.5 : 9 + Math.random() * 5;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        const alpha = 0.25 + Math.random() * 0.55;

        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius,
          colorPrefix,
          alpha,
          floatAngle: Math.random() * Math.PI * 2,
          floatSpeed: 0.008 + Math.random() * 0.015,
          floatRadius: 8 + Math.random() * 20,
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mousePos.current;
      const hoverRadius = 150;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth floating motion
        p.floatAngle += p.floatSpeed;
        const floatX = Math.cos(p.floatAngle) * p.floatRadius * 0.05;
        const floatY = Math.sin(p.floatAngle) * p.floatRadius * 0.05;

        p.x += p.vx + floatX;
        p.y += p.vy + floatY;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Interactive mouse repulsion force (matching the reference video physics)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < hoverRadius && dist > 0) {
            const force = (hoverRadius - dist) / hoverRadius;
            const angle = Math.atan2(dy, dx);
            const repelX = Math.cos(angle) * force * 5;
            const repelY = Math.sin(angle) * force * 5;

            p.x -= repelX;
            p.y -= repelY;
          }
        }

        // Draw glowing particle circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${p.alpha})`;
        if (p.radius > 6) {
          ctx.shadowColor = '#C9A96E';
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={(e) => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          mousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
          };
        }
      }}
      onMouseLeave={() => {
        mousePos.current.active = false;
      }}
      className="hero-section relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden cursor-default"
    >
      {/* Background Image Layer */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ willChange: 'transform' }}>
        <img
          src="/assets/hero/hero-background.jpg"
          alt="NEXESH Photography Hero Background"
          className="w-full h-full object-cover object-center img-graded hero-bg-zoom filter brightness-[0.55] contrast-[1.02]"
        />
        {/* Dark vignette gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/55 to-transparent"></div>
        {/* Top darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0B0A]/70 via-transparent to-transparent"></div>
      </div>

      {/* Interactive Floating Particles Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />

      {/* Ambient champagne glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A96E]/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="hero-content relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Location & Studio Badge */}
        <div className="hero-location-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1E1B18]/70 border border-[#C9A96E]/20 backdrop-blur-md mb-6 shadow-md shadow-black/40 hero-animate hero-delay-0">
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
        <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#F5F0E8] tracking-tight leading-[1.1] mb-4 hero-animate hero-delay-1">
          NEXESH <span className="gold-text-gradient italic font-normal">Photography</span>
        </h1>

        {/* Studio Tagline */}
        <p className="hero-tagline text-xl sm:text-2xl md:text-3xl font-serif italic text-[#9C9180] font-light mb-6 tracking-wide hero-animate hero-delay-2">
          "{STUDIO_INFO.tagline}"
        </p>

        {/* Categories Served Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 max-w-2xl hero-animate hero-delay-3">
          {categoriesMap.map((cat, idx) => (
            <React.Fragment key={cat.label}>
              <button
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className="text-xs sm:text-sm font-sans font-medium text-[#9C9180] hover:text-[#F5F0E8] hover:border-[#C9A96E]/50 tracking-wider uppercase bg-[#F5F0E8]/5 hover:bg-[#C9A96E]/15 backdrop-blur-sm border border-[#C9A96E]/15 px-3.5 py-1.5 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                {cat.label}
              </button>
              {idx < categoriesMap.length - 1 && <span className="hidden sm:inline text-[#C9A96E] opacity-40">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Dual Call-to-Action Buttons */}
        <div className="hero-actions flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16 hero-animate hero-delay-4">
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
        <div className="hero-highlights grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl pt-8 border-t border-[#C9A96E]/15 hero-animate hero-delay-5">
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 text-[#4A4540] hover:text-[#C9A96E] transition-colors animate-bounce z-20"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};

export default Hero;
