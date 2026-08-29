import React from 'react';
import { Camera, Phone, Mail, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Footer: React.FC = () => {
  const [footerRef, isFooterVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <footer className="bg-[#0C0B0A] text-[#9C9180] border-t border-[#C9A96E]/10 pt-16 pb-12 font-sans relative">
      <div
        ref={footerRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-hidden ${isFooterVisible ? 'reveal-visible' : ''}`}
      >
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Studio Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#9C9180] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0C0B0A] rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#C9A96E]" />
                </div>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold tracking-wider text-[#F5F0E8]">
                  NEXESH
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#C9A96E] uppercase -mt-1 font-semibold">
                  PHOTOGRAPHY
                </span>
              </div>
            </a>

            <p className="text-sm text-[#9C9180] max-w-sm leading-relaxed">
              "{STUDIO_INFO.tagline}"
            </p>
            <p className="text-xs text-[#4A4540]">
              Boutique photography studio in Coimbatore, Tamil Nadu. Specializing in weddings, candid storytelling, family celebrations, and corporate summit documentations.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#161412] hover:bg-[#C9A96E] text-[#9C9180] hover:text-[#0C0B0A] border border-[#C9A96E]/15 hover:border-[#C9A96E] flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
                className="w-9 h-9 rounded-full bg-[#161412] hover:bg-[#C9A96E] text-[#9C9180] hover:text-[#0C0B0A] border border-[#C9A96E]/15 hover:border-[#C9A96E] flex items-center justify-center transition-all"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="w-9 h-9 rounded-full bg-[#161412] hover:bg-[#C9A96E] text-[#9C9180] hover:text-[#0C0B0A] border border-[#C9A96E]/15 hover:border-[#C9A96E] flex items-center justify-center transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F5F0E8] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#hero"    className="hover:text-[#C9A96E] transition-colors">Home</a></li>
              <li><a href="#about"   className="hover:text-[#C9A96E] transition-colors">Why Choose Us</a></li>
              <li><a href="#pricing" className="hover:text-[#C9A96E] transition-colors">Services & Packages</a></li>
              <li><a href="#albums"  className="hover:text-[#C9A96E] transition-colors">Albums & Add-Ons</a></li>
              <li><a href="#process" className="hover:text-[#C9A96E] transition-colors">How Booking Works</a></li>
              {/* <li><a href="#gallery" className="hover:text-[#C9A96E] transition-colors">Visual Portfolio</a></li> */}
              <li><a href="#contact" className="hover:text-[#C9A96E] transition-colors">Contact & Enquiry</a></li>
            </ul>
          </div>

          {/* Col 4: Service Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F5F0E8] mb-4">
              Services Served
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#pricing" className="hover:text-[#C9A96E] transition-colors">Tamil Wedding Photography</a></li>
              <li><a href="#pricing" className="hover:text-[#C9A96E] transition-colors">Candid Couple Portraits</a></li>
              <li><a href="#pricing" className="hover:text-[#C9A96E] transition-colors">Seemantham / Baby Shower</a></li>
              <li><a href="#pricing" className="hover:text-[#C9A96E] transition-colors">1st Birthday Celebrations</a></li>
              <li><a href="#pricing" className="hover:text-[#C9A96E] transition-colors">Housewarming Functions</a></li>
              <li><a href="#pricing" className="hover:text-[#C9A96E] transition-colors">Corporate Event Documentation</a></li>
            </ul>
          </div>

          {/* Col 5: Studio Location */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F5F0E8] mb-4">
              Coimbatore Studio
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                <span>{STUDIO_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>{STUDIO_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span className="truncate">{STUDIO_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#C9A96E]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#4A4540] gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-[#F5F0E8] font-medium">NEXESH Photography</span>. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted for timeless memories in</span>
            <span className="text-[#C9A96E] font-medium">Coimbatore, Tamil Nadu</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
