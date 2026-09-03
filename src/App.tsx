import { useState } from 'react';
import { AboutUs } from './components/AboutUs';
import { AddOnsAlbums } from './components/AddOnsAlbums';
import { BookingProcess } from './components/BookingProcess';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ServicesPricing } from './components/ServicesPricing';
import { StartingRates } from './components/StartingRates';
import type { PricingPackage } from './data/photographyData';

export function App() {
  const [prefilledPackage, setPrefilledPackage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('wedding');

  const scrollToContact = (packageName?: string) => {
    setPrefilledPackage(packageName || '');
    requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleCategorySelectFromHero = (catId: string) => {
    setSelectedCategory(catId);
    requestAnimationFrame(() => {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handlePackageSelect = (pkg: PricingPackage, categoryName: string) => {
    scrollToContact(`${categoryName} - ${pkg.name}`);
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] text-[#F5F0E8]">
      <Navbar onNavigateContact={scrollToContact} />
      <main>
        <Hero 
          onEnquireClick={() => scrollToContact()} 
          onCategorySelect={handleCategorySelectFromHero}
        />
        <StartingRates />
        <AboutUs />
        <ServicesPricing 
          selectedCategoryTab={selectedCategory}
          onSelectPackage={handlePackageSelect} 
        />
        <AddOnsAlbums />
        <BookingProcess />
        <ContactSection prefilledPackage={prefilledPackage} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;

