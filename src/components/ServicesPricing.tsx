import React from 'react';
import { SERVICE_CATEGORIES } from '../data/photographyData';
import type { PricingPackage } from '../data/photographyData';
import { Check, Star, Clock, Sparkles, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServicesPricingProps {
  onSelectPackage?: (pkg: PricingPackage, catName: string) => void;
  selectedCategoryTab?: string;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ onSelectPackage, selectedCategoryTab }) => {
  const [activeTab, setActiveTab] = React.useState<string>(selectedCategoryTab || 'wedding');

  React.useEffect(() => {
    if (selectedCategoryTab) {
      setActiveTab(selectedCategoryTab);
    }
  }, [selectedCategoryTab]);

  const [headerRef, isHeaderVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [tabsRef, areTabsVisible]   = useScrollReveal<HTMLDivElement>({ threshold: 0.1, delay: 60 });
  const [cardsRef, areCardsVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.08, delay: 100 });

  const currentCategory = SERVICE_CATEGORIES.find((cat) => cat.id === activeTab) || SERVICE_CATEGORIES[0];

  const handleEnquire = (pkg: PricingPackage) => {
    if (onSelectPackage) {
      onSelectPackage(pkg, currentCategory.title);
    }
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#0C0B0A] relative">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#C9A96E]/4 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-12 reveal-hidden ${isHeaderVisible ? 'reveal-visible' : ''}`}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold font-sans mb-3 block">
            Transparent Investment
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F0E8] tracking-tight mb-4">
            Services & <span className="gold-text-gradient italic">Package Rates</span>
          </h2>
          <p className="text-[#9C9180] font-sans text-base sm:text-lg">
            Straightforward pricing tailored to your celebration scale. Select a category below to explore deliverables and coverage details.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          ref={tabsRef}
          className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 reveal-hidden ${areTabsVisible ? 'reveal-visible' : ''}`}
        >
          {SERVICE_CATEGORIES.map((category) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all duration-300 flex items-center space-x-2 ${
                  isActive
                    ? 'bg-[#C9A96E] text-[#0C0B0A] shadow-lg shadow-black/25 scale-105'
                    : 'bg-[#161412] text-[#9C9180] border border-[#C9A96E]/15 hover:border-[#C9A96E]/40 hover:text-[#F5F0E8]'
                }`}
              >
                <span>{category.title.split(' ')[0]} {category.id === 'small-event' ? 'Functions' : category.id === 'baby-shower' ? 'Shower' : ''}</span>
                {isActive && <Sparkles className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        {/* Active Category Meta Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 p-6 rounded-2xl bg-[#161412] border border-[#C9A96E]/15">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C9A96E]/12 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-2 font-sans">
            <span>{currentCategory.badge}</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-2">
            {currentCategory.title}
          </h3>
          <p className="text-sm text-[#9C9180] font-sans">
            {currentCategory.subtitle}
          </p>

          {currentCategory.note && (
            <div className="mt-4 pt-4 border-t border-[#C9A96E]/10 text-xs text-[#9C9180] flex items-start justify-center space-x-2 text-left font-sans bg-[#1E1B18]/60 p-3 rounded-xl border-l-2 border-[#C9A96E]/50">
              <Info className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
              <span>{currentCategory.note}</span>
            </div>
          )}
        </div>

        {/* Package Cards Grid */}
        <div
          key={activeTab}
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(currentCategory.packages.length, 4)} gap-8 items-stretch`}
        >
          {currentCategory.packages.map((pkg, idx) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                style={{ transitionDelay: `${idx * 0.1}s` }}
                className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 reveal-hidden ${areCardsVisible ? 'reveal-visible' : ''} ${
                  isPopular
                    ? 'bg-[#161412] border-2 border-[#C9A96E]/50 shadow-lg shadow-black/40 transform -translate-y-2'
                    : 'bg-[#161412] border border-[#C9A96E]/12 hover:border-[#C9A96E]/30 hover:bg-[#1E1B18]'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C9A96E] text-[#0C0B0A] font-sans font-bold text-[11px] uppercase tracking-widest shadow-md flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-[#0C0B0A]" />
                    <span>{pkg.tagline || '★ Most Popular'}</span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h4 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-1">
                      {pkg.name}
                    </h4>
                    <div className="flex items-center text-xs text-[#9C9180] font-sans mt-2">
                      <Clock className="w-3.5 h-3.5 text-[#C9A96E] mr-1.5" />
                      <span>{pkg.coverage}</span>
                    </div>
                  </div>

                  <div className="mb-6 p-4 rounded-2xl bg-[#0C0B0A] border border-[#C9A96E]/12">
                    <span className="text-xs uppercase tracking-wider text-[#9C9180] block mb-1 font-sans">
                      Investment
                    </span>
                    <div className="text-2xl sm:text-3xl font-serif font-bold gold-text-gradient">
                      {pkg.price}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-xs uppercase tracking-widest text-[#F5F0E8] font-semibold font-sans block mb-2">
                      Included Deliverables:
                    </span>
                    {pkg.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start text-xs sm:text-sm text-[#9C9180] font-sans leading-snug">
                        <div className="w-4 h-4 rounded-full bg-[#C9A96E]/15 flex items-center justify-center shrink-0 mr-2.5 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#C9A96E]" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleEnquire(pkg)}
                    className={`w-full py-3.5 rounded-full font-sans font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isPopular
                        ? 'bg-[#C9A96E] text-[#0C0B0A] hover:bg-[#E8C98A] shadow-md shadow-black/20'
                        : 'bg-transparent hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#0C0B0A] border border-[#C9A96E]/35'
                    }`}
                  >
                    <span>Enquire This Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-12 text-center text-xs text-[#9C9180] font-sans flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
          <span>All packages include initial consultation, image retouching, and cloud backup. Custom multi-day packages available on request.</span>
        </div>

      </div>
    </section>
  );
};
