import React from 'react';
import { MessageSquare, CalendarCheck, Image, ArrowRight, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const BookingProcess: React.FC = () => {
  const [headerRef, isHeaderVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [stepsRef, areStepsVisible]  = useScrollReveal<HTMLDivElement>({ threshold: 0.1, delay: 80 });
  const [ctaRef, isCtaVisible]       = useScrollReveal<HTMLDivElement>({ threshold: 0.2, delay: 120 });

  const steps = [
    {
      number: '01',
      title: 'Enquire',
      icon: <MessageSquare className="w-7 h-7" />,
      description: 'Share your event date, location in Coimbatore or Tamil Nadu, and preferred package tier with us via our quick form or WhatsApp.',
      highlight: 'Instant Response within 2 Hours'
    },
    {
      number: '02',
      title: 'Confirm',
      icon: <CalendarCheck className="w-7 h-7" />,
      description: 'Lock your date securely with a small booking advance advance, choose optional add-ons, and align on timeline priorities.',
      highlight: 'Guaranteed Calendar Reservation'
    },
    {
      number: '03',
      title: 'Deliver',
      icon: <Image className="w-7 h-7" />,
      description: 'Receive color-graded high-resolution photos, reels, and premium handcrafted photo albums strictly within your agreed timeline.',
      highlight: 'Same-Day Previews Available'
    }
  ];

  return (
    <section id="process" className="py-24 bg-[#0C0B0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 reveal-hidden ${isHeaderVisible ? 'reveal-visible' : ''}`}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold font-sans mb-3 block">
            Seamless & Stress-Free
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F0E8] tracking-tight mb-4">
            How Booking Works in <span className="gold-text-gradient italic">3 Simple Steps</span>
          </h2>
          <p className="text-[#9C9180] font-sans text-base sm:text-lg">
            From initial inquiry to final album unboxing — clear timelines, no surprises.
          </p>
        </div>

        {/* Timeline Grid */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/25 to-transparent -translate-y-12 z-0"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 0.15}s` }}
              className={`glass-panel p-8 rounded-3xl relative z-10 flex flex-col justify-between hover:border-[#C9A96E]/35 transition-all duration-300 group reveal-hidden ${areStepsVisible ? 'reveal-visible' : ''}`}
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/25 flex items-center justify-center group-hover:scale-110 transition-transform text-[#C9A96E]">
                    {React.cloneElement(step.icon, { className: 'w-7 h-7 text-[#C9A96E]' })}
                  </div>
                  <span className="font-serif text-4xl font-bold text-[#2A2520] group-hover:text-[#C9A96E]/40 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-[#9C9180] font-sans leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C9A96E]/12 flex items-center text-xs text-[#C9A96E] font-semibold font-sans">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                <span>{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className={`mt-16 text-center reveal-hidden ${isCtaVisible ? 'reveal-visible' : ''}`}
        >
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#C9A96E] hover:bg-[#E8C98A] text-[#0C0B0A] font-semibold text-xs uppercase tracking-widest transition-all shadow-md shadow-black/25"
          >
            <span>Start Your Booking Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
