import React from 'react';
import { STARTING_RATES } from '../data/photographyData';
import { Camera, Cake, Home, Heart, Briefcase, Sparkles, User } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const StartingRates: React.FC = () => {
  const [sectionRef, isSectionVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const getIcon = (name: string) => {
    switch (name) {
      case 'User':      return <User      className="w-4 h-4 text-[#C9A96E]" />;
      case 'Cake':      return <Cake      className="w-4 h-4 text-[#C9A96E]" />;
      case 'Home':      return <Home      className="w-4 h-4 text-[#C9A96E]" />;
      case 'Heart':     return <Heart     className="w-4 h-4 text-[#C9A96E]" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#C9A96E]" />;
      case 'Sparkles':  return <Sparkles  className="w-4 h-4 text-[#C9A96E]" />;
      case 'Camera':    return <Camera    className="w-4 h-4 text-[#C9A96E]" />;
      default:          return <Camera    className="w-4 h-4 text-[#C9A96E]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="starting-rates"
      className="bg-[#161412] py-8 border-y border-[#C9A96E]/10 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rates-layout flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Quick Header */}
          <div className={`rates-header md:w-1/4 text-center md:text-left reveal-hidden ${isSectionVisible ? 'reveal-visible' : ''}`}>
            <span className="text-[10px] tracking-widest text-[#C9A96E] font-semibold uppercase font-sans block">
              Transparent Pricing
            </span>
            <h3 className="text-xl font-serif font-bold text-[#F5F0E8] tracking-wide">
              Starting Rates at a Glance
            </h3>
          </div>

          {/* Grid / Ticker Cards */}
          <div className="rates-grid md:w-3/4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 w-full">
            {STARTING_RATES.map((item, idx) => (
              <a
                key={idx}
                href="#pricing"
                style={{ transitionDelay: `${idx * 0.06}s` }}
                className={`group flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1B18] hover:bg-[#252018] border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300 shadow-sm hover:shadow-md text-center reveal-hidden ${isSectionVisible ? 'reveal-visible' : ''}`}
              >
                <div className="w-8 h-8 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-[11px] font-sans font-medium text-[#9C9180] group-hover:text-[#F5F0E8] line-clamp-1">
                  {item.category}
                </span>
                <span className="text-xs font-serif font-bold gold-text-gradient mt-0.5">
                  from {item.price}
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
