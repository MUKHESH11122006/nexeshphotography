import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO, SERVICE_CATEGORIES } from '../data/photographyData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContactSectionProps {
  prefilledPackage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledPackage }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding Photography',
    eventDate: '',
    location: '',
    packagePreference: prefilledPackage || '',
    message: ''
  });

  useEffect(() => {
    if (prefilledPackage) {
      setFormData(prev => ({ ...prev, packagePreference: prefilledPackage }));
    }
  }, [prefilledPackage]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [headerRef, isHeaderVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [gridRef, isGridVisible]     = useScrollReveal<HTMLDivElement>({ threshold: 0.08, delay: 80 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed.');
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-[#0C0B0A] border border-[#C9A96E]/15 focus:border-[#C9A96E]/60 text-sm text-[#F5F0E8] placeholder-[#4A4540] focus:outline-none transition-colors";

  return (
    <section id="contact" className="py-24 bg-[#0C0B0A] relative">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 reveal-hidden ${isHeaderVisible ? 'reveal-visible' : ''}`}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold font-sans mb-3 block">
            Start a Conversation
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F0E8] tracking-tight mb-4">
            "{STUDIO_INFO.closingQuote}"
          </h2>
          <p className="text-[#9C9180] font-sans text-base sm:text-lg">
            We are based in Coimbatore and available across Tamil Nadu & South India. Let's discuss your dates, custom deliverables, and vision.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start reveal-hidden ${isGridVisible ? 'reveal-visible' : ''}`}
        >
          
          {/* Studio Contact Info + Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="glass-panel p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-2">
                Studio Contact Details
              </h3>
              <p className="text-sm text-[#9C9180] font-sans">
                Reach out directly via phone, WhatsApp, email, or visit our studio in Coimbatore.
              </p>

              <div className="space-y-4 pt-2">
                
                {/* Phone / WhatsApp */}
                <a
                  href={`https://wa.me/919994878151?text=Hi%20NEXESH%20Photography!%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-[#1E1B18] hover:bg-[#252018] border border-[#25D366]/20 hover:border-[#25D366]/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#9C9180] block">
                      Phone / WhatsApp
                    </span>
                    <span className="text-lg font-mono font-bold text-[#F5F0E8] group-hover:text-[#25D366] transition-colors tracking-wide">
                      {STUDIO_INFO.phone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-[#1E1B18] hover:bg-[#252018] border border-[#C9A96E]/12 hover:border-[#C9A96E]/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#9C9180] block">
                      Email Enquiry
                    </span>
                    <span className="text-sm font-sans font-medium text-[#F5F0E8] group-hover:text-[#C9A96E] transition-colors">
                      {STUDIO_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Studio Location */}
                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#1E1B18] border border-[#C9A96E]/10">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#9C9180] block">
                      Studio Address
                    </span>
                    <span className="text-sm font-sans font-medium text-[#F5F0E8]">
                      {STUDIO_INFO.location}
                    </span>
                    <span className="text-xs text-[#9C9180] block mt-0.5 font-sans">
                      {STUDIO_INFO.address}
                    </span>
                  </div>
                </div>

                {/* Instagram */}
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-[#1E1B18] hover:bg-[#252018] border border-[#C9A96E]/12 hover:border-[#C9A96E]/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#9C9180] block">
                      Instagram Portfolio
                    </span>
                    <span className="text-sm font-sans font-bold text-[#F5F0E8] group-hover:text-[#C9A96E] transition-colors">
                      {STUDIO_INFO.instagram}
                    </span>
                  </div>
                </a>

              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-[#C9A96E]/15 shadow-md h-64 relative bg-[#161412]">
              <iframe
                title="NEXESH Photography Coimbatore Studio Map"
                src={STUDIO_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(0.7) brightness(0.5)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-3 left-3 bg-[#0C0B0A]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C9A96E]/20 text-[11px] text-[#F5F0E8] font-sans flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>Coimbatore, Tamil Nadu</span>
              </div>
            </div>

          </div>

          {/* Booking / Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl shadow-lg shadow-black/30 relative">
              
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F0E8] mb-2">
                  Send an Event Inquiry
                </h3>
                <p className="text-sm text-[#9C9180] font-sans">
                  Fill out your event details below to receive a personalized quote and check availability.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 px-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[#C9A96E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#F5F0E8]">
                    Inquiry Received!
                  </h4>
                  <p className="text-sm text-[#9C9180] font-sans max-w-md mx-auto">
                    Thank you, <strong className="text-[#F5F0E8]">{formData.name}</strong>. Our team will review your event date ({formData.eventDate || 'TBD'}) and reach out on {formData.phone || formData.email} within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        eventType: 'Wedding Photography',
                        eventDate: '',
                        location: '',
                        packagePreference: '',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#1E1B18] hover:bg-[#252018] text-xs font-sans uppercase font-semibold text-[#F5F0E8] border border-[#C9A96E]/20"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#9C9180] mb-2 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Ramakrishnan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#9C9180] mb-2 font-medium">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#9C9180] mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#9C9180] mb-2 font-medium">
                        Event Location / Hall
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. RS Puram, Coimbatore"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Event Type & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#9C9180] mb-2 font-medium">
                        Category of Event *
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className={inputCls}
                      >
                        {SERVICE_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.title} className="bg-[#161412] text-[#F5F0E8]">
                            {cat.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#9C9180] mb-2 font-medium">
                        Event Date (Tentative ok)
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Package Preference */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#9C9180] mb-2 font-medium">
                      Preferred Package / Budget Tier
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Wedding Standard, Birthday Basic, Corporate Premium"
                      value={formData.packagePreference}
                      onChange={(e) => setFormData({ ...formData, packagePreference: e.target.value })}
                      className={inputCls}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#9C9180] mb-2 font-medium">
                      Tell Us About Your Celebration
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention expected hours, venue, or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={inputCls}
                    ></textarea>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#C9A96E] hover:bg-[#E8C98A] text-[#0C0B0A] font-semibold text-xs uppercase tracking-widest transition-all shadow-md shadow-black/20 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Booking Enquiry</span>
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="text-xs text-red-400 font-sans text-center bg-red-900/20 border border-red-500/30 px-4 py-2 rounded-xl">
                      {error}
                    </p>
                  )}

                  <p className="text-[11px] text-center text-[#4A4540] font-sans">
                    We respect your privacy. No spam — only direct responses from NEXESH studio team.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
