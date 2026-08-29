import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StartingRates } from './components/StartingRates';
import { AboutUs } from './components/AboutUs';
import { ServicesPricing } from './components/ServicesPricing';
import { AddOnsAlbums } from './components/AddOnsAlbums';
import { BookingProcess } from './components/BookingProcess';
// import { PortfolioGallery } from './components/PortfolioGallery';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import type { PricingPackage } from './data/photographyData';

export function App() {
  const [selectedPackageName, setSelectedPackageName] = useState<string>('');

  const handleSelectPackage = (pkg: PricingPackage, catTitle: string) => {
    setSelectedPackageName(`${pkg.name} (${catTitle})`);
  };

  const handleGeneralEnquiry = () => {
    setSelectedPackageName('');
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] text-[#F5F0E8] font-sans selection:bg-[#C9A96E]/25 selection:text-[#F5F0E8] overflow-x-hidden">
      
      {/* Sticky Navbar */}
      <Navbar onNavigateContact={handleGeneralEnquiry} />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onEnquireClick={handleGeneralEnquiry} />

        {/* 2. Starting Prices Strip */}
        <StartingRates />

        {/* 3. About & Why Choose Us */}
        <AboutUs />

        {/* 4. Services & Pricing Tabs */}
        <ServicesPricing onSelectPackage={handleSelectPackage} />

        {/* 5. Add-Ons & Album Showcase */}
        <AddOnsAlbums />

        {/* 6. 3-Step Booking Process */}
        <BookingProcess />

        {/* 7. Filterable Portfolio Gallery (Hidden, code preserved) */}
        {/* <PortfolioGallery /> */}

        {/* 8. Contact & Inquiry Section */}
        <ContactSection prefilledPackage={selectedPackageName} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

    </div>
  );
}

export default App;
