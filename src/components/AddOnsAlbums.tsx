import React from 'react';
import { ADD_ONS, ALBUM_OPTIONS } from '../data/photographyData';
import { BookOpen, PlusCircle, CheckCircle, Sparkles, AlertCircle, HardDrive } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AddOnsAlbums: React.FC = () => {
  const [albumHeaderRef, isAlbumHeaderVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [albumCardsRef, areAlbumCardsVisible]   = useScrollReveal<HTMLDivElement>({ threshold: 0.1, delay: 80 });
  const [addOnHeaderRef, isAddOnHeaderVisible]  = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [addOnCardsRef, areAddOnCardsVisible]   = useScrollReveal<HTMLDivElement>({ threshold: 0.1, delay: 80 });

  return (
    <section id="albums" className="py-24 bg-[#0C0B0A] relative border-t border-[#C9A96E]/10">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A96E]/3 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =============== ALBUM OPTIONS =============== */}
        <div className="mb-24">
          <div
            ref={albumHeaderRef}
            className={`text-center max-w-3xl mx-auto mb-16 reveal-hidden ${isAlbumHeaderVisible ? 'reveal-visible' : ''}`}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold font-sans mb-3 block">
              Physical & Digital Heirlooms
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F0E8] tracking-tight mb-4">
              Album & <span className="gold-text-gradient italic">Delivery Showcase</span>
            </h2>
            <p className="text-[#9C9180] font-sans text-base sm:text-lg">
              From crisp high-resolution digital cloud links to handcrafted flush-mount photographic albums that last generations.
            </p>
          </div>

          {/* Album Cards */}
          <div ref={albumCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ALBUM_OPTIONS.map((album, idx) => (
              <div
                key={album.id}
                style={{ transitionDelay: `${idx * 0.12}s` }}
                className={`glass-panel rounded-3xl p-8 flex flex-col justify-between hover:border-[#C9A96E]/35 transition-all duration-300 relative group reveal-hidden ${areAlbumCardsVisible ? 'reveal-visible' : ''}`}
              >
                {album.badge && (
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#C9A96E]/12 border border-[#C9A96E]/35 text-[#C9A96E] text-[10px] font-sans font-semibold uppercase tracking-wider">
                    {album.badge}
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/10 flex items-center justify-center mb-6 text-[#C9A96E] group-hover:scale-110 transition-transform">
                    {album.id === 'digital' ? <HardDrive className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-2">
                    {album.title}
                  </h3>

                  <div className="text-sm font-serif font-semibold gold-text-gradient mb-4">
                    {album.sheets} ({album.pages})
                  </div>

                  <p className="text-sm text-[#9C9180] font-sans leading-relaxed mb-6">
                    {album.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#F5F0E8] font-sans block mb-2">
                      Key Album Details:
                    </span>
                    {album.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs text-[#9C9180] font-sans">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C9A96E] mr-2 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C9A96E]/10">
                  <span className="text-[11px] text-[#9C9180] font-sans font-medium">
                    Ideal For: {album.idealFor}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Note */}
          <div className="mt-8 p-4 rounded-2xl bg-[#161412] border border-[#C9A96E]/12 text-xs text-[#9C9180] flex items-center justify-center space-x-2 text-center max-w-2xl mx-auto font-sans">
            <AlertCircle className="w-4 h-4 text-[#C9A96E] shrink-0" />
            <span>Note: Sheet vs. page count can vary by vendor — always confirm exact layout options with our team.</span>
          </div>
        </div>

        {/* =============== ADD-ONS =============== */}
        <div>
          <div
            ref={addOnHeaderRef}
            className={`text-center max-w-3xl mx-auto mb-12 reveal-hidden ${isAddOnHeaderVisible ? 'reveal-visible' : ''}`}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold font-sans mb-3 block">
              Tailor Your Package
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#F5F0E8] tracking-tight mb-3">
              Optional <span className="gold-text-gradient italic">Service Add-Ons</span>
            </h3>
            <p className="text-sm sm:text-base text-[#9C9180] font-sans">
              Enhance any base package with extra hours, dedicated videographers, Instagram reels, or express same-day delivery.
            </p>
          </div>

          <div ref={addOnCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Birthday & Family */}
            <div
              style={{ transitionDelay: '0s' }}
              className={`glass-panel p-8 rounded-3xl reveal-hidden ${areAddOnCardsVisible ? 'reveal-visible' : ''}`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#C9A96E]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#F5F0E8]">Birthday & Family Add-Ons</h4>
                  <span className="text-xs text-[#9C9180] font-sans">Custom upgrades for celebrations</span>
                </div>
              </div>

              <div className="space-y-4">
                {ADD_ONS.birthday.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#1E1B18] border border-[#C9A96E]/10 flex items-center justify-between gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-[#F5F0E8] font-sans">{item.name}</h5>
                      <p className="text-xs text-[#9C9180] font-sans">{item.description}</p>
                    </div>
                    <span className="text-sm font-serif font-bold gold-text-gradient whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate & Media */}
            <div
              style={{ transitionDelay: '0.12s' }}
              className={`glass-panel p-8 rounded-3xl reveal-hidden ${areAddOnCardsVisible ? 'reveal-visible' : ''}`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center">
                  <PlusCircle className="w-5 h-5 text-[#C9A96E]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#F5F0E8]">Corporate & Media Add-Ons</h4>
                  <span className="text-xs text-[#9C9180] font-sans">Priority media turnarounds & team scaling</span>
                </div>
              </div>

              <div className="space-y-4">
                {ADD_ONS.corporate.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#1E1B18] border border-[#C9A96E]/10 flex items-center justify-between gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-[#F5F0E8] font-sans">{item.name}</h5>
                      <p className="text-xs text-[#9C9180] font-sans">{item.description}</p>
                    </div>
                    <span className="text-sm font-serif font-bold gold-text-gradient whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
