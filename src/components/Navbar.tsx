import React, { useState, useEffect } from 'react';
import { Camera, Phone, Menu, X, ChevronRight, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';

interface NavbarProps {
  onNavigateContact?: (pkgName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Services & Pricing', href: '#pricing' },
    { name: 'Add-Ons & Albums', href: '#albums' },
    { name: 'How It Works', href: '#process' },
    // { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0C0B0A]/95 backdrop-blur-md border-b border-[#C9A96E]/12 py-3 shadow-lg shadow-black/30'
          : 'bg-gradient-to-b from-[#0C0B0A]/90 via-[#0C0B0A]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Studio Brand Logo */}
          <a href="#hero" className="group flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#9C9180] p-[1px] flex items-center justify-center transition-transform group-hover:scale-105 shadow-md shadow-black/30">
              <div className="w-full h-full bg-[#0C0B0A] rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-[#C9A96E] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#F5F0E8] group-hover:text-[#C9A96E] transition-colors">
                NEXESH
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-[#9C9180] uppercase -mt-1 font-sans font-medium">
                PHOTOGRAPHY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest text-[#9C9180] hover:text-[#F5F0E8] transition-colors py-1 relative font-medium group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <a
              href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-2 text-xs font-medium text-[#9C9180] hover:text-[#F5F0E8] transition-colors px-3 py-2 rounded-full border border-[#C9A96E]/18 hover:border-[#C9A96E]/50 bg-[#F5F0E8]/4"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>{STUDIO_INFO.phone}</span>
            </a>

            <a
              href="#contact"
              onClick={() => onNavigateContact && onNavigateContact()}
              className="px-4 py-2 rounded-full bg-[#C9A96E] text-[#0C0B0A] font-semibold text-xs tracking-wider uppercase hover:bg-[#E8C98A] transition-all shadow-md shadow-black/20 flex items-center space-x-1.5 font-sans"
            >
              <span>Enquire</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#9C9180] hover:text-[#F5F0E8] focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu — always mounted, CSS-animated open/close */}
      <div className={`lg:hidden mobile-menu-panel${isMobileMenuOpen ? ' open' : ''} bg-[#0C0B0A]/98 backdrop-blur-xl border-b border-[#C9A96E]/12 shadow-lg shadow-black/40`}>
        <div className="px-6 py-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-wider text-[#F5F0E8] hover:text-[#C9A96E] py-2 border-b border-[#C9A96E]/10 flex justify-between items-center transition-colors"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-[#4A4540]" />
            </a>
          ))}

          <div className="pt-4 flex flex-col space-y-3">
            <a
              href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl border border-[#C9A96E]/20 bg-[#161412] text-sm font-medium text-[#F5F0E8]"
            >
              <Phone className="w-4 h-4 text-[#C9A96E]" />
              <span>Call {STUDIO_INFO.phone}</span>
            </a>

            <a
              href="#contact"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onNavigateContact) onNavigateContact();
              }}
              className="w-full py-3 rounded-xl bg-[#C9A96E] text-[#0C0B0A] font-semibold text-sm uppercase tracking-wider text-center flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enquire Now</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
