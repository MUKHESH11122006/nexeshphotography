import React from 'react';
import { Sparkles, ShieldCheck, CloudDownload, Clock, Zap, Users, CheckCircle2 } from 'lucide-react';
import { FEATURE_CARDS } from '../data/photographyData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutUs: React.FC = () => {
  const [headerRef, isHeaderVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [cardsRef, areCardsVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1, delay: 80 });
  const [bannerRef, isBannerVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15, delay: 100 });

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':     return <Sparkles     className="w-6 h-6 text-[#C9A96E]" />;
      case 'ShieldCheck':  return <ShieldCheck  className="w-6 h-6 text-[#C9A96E]" />;
      case 'CloudDownload':return <CloudDownload className="w-6 h-6 text-[#C9A96E]" />;
      case 'Clock':        return <Clock        className="w-6 h-6 text-[#C9A96E]" />;
      case 'Zap':          return <Zap          className="w-6 h-6 text-[#C9A96E]" />;
      case 'Users':        return <Users        className="w-6 h-6 text-[#C9A96E]" />;
      default:             return <Sparkles     className="w-6 h-6 text-[#C9A96E]" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-[#0C0B0A] relative overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C9A96E]/4 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A96E]/3 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 reveal-hidden ${isHeaderVisible ? 'reveal-visible' : ''}`}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold font-sans mb-3 block">
            About NEXESH Photography
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F0E8] tracking-tight mb-6">
            Preserving Your Most Cherished Stories with <span className="gold-text-gradient italic">Artistic Integrity</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9C9180] font-sans leading-relaxed">
            Based in Coimbatore, Tamil Nadu, <strong className="text-[#F5F0E8] font-medium">NEXESH Photography</strong> is a photography studio founded on a simple philosophy: every milestone deserves genuine, emotive coverage. We blend natural candid storytelling with classic posed coverage — ensuring every quiet glance, grand ritual, and warm family embrace is preserved in frames that last forever.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURE_CARDS.map((card, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 0.1}s` }}
              className={`glass-panel glass-panel-hover p-8 rounded-2xl relative group reveal-hidden ${areCardsVisible ? 'reveal-visible' : ''}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {getFeatureIcon(card.icon)}
              </div>

              <h3 className="text-xl font-serif font-bold text-[#F5F0E8] mb-3 group-hover:text-[#C9A96E] transition-colors">
                {card.title}
              </h3>

              <p className="text-sm text-[#9C9180] font-sans leading-relaxed">
                {card.description}
              </p>

              <div className="mt-6 pt-4 border-t border-[#C9A96E]/12 flex items-center text-xs text-[#C9A96E] font-medium font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                <span>Standard in NEXESH Packages</span>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Philosophy Banner */}
        <div
          ref={bannerRef}
          className={`mt-16 p-8 sm:p-12 rounded-3xl bg-[#161412] border border-[#C9A96E]/15 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-black/40 reveal-hidden ${isBannerVisible ? 'reveal-visible' : ''}`}
        >
          <div className="md:w-2/3">
            <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-semibold block mb-2 font-sans">
              Our Promise to You
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F0E8] mb-3">
              "No Rush, No Hidden Costs — Just Honest Photography."
            </h3>
            <p className="text-sm sm:text-base text-[#9C9180] font-sans">
              Whether it's a 2-hour intimate Seemantham in RS Puram or a 2-day grand Tamil Wedding in Peelamedu, our team works with patience, warmth, and artistic precision.
            </p>
          </div>

          <div className="md:w-1/3 flex justify-center md:justify-end">
            <a
              href="#pricing"
              className="px-6 py-3.5 rounded-full bg-[#C9A96E] text-[#0C0B0A] font-semibold text-xs uppercase tracking-widest hover:bg-[#E8C98A] transition-all shadow-md shadow-black/20 whitespace-nowrap"
            >
              Explore Package Rates
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
