import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const phoneNumber = "+91 99948 78151";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=Hi%20NEXESH%20Photography!%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5D] rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
