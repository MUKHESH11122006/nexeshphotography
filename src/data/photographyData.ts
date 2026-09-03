export interface PricingPackage {
  id: string;
  name: string;
  category: 'wedding' | 'small-event' | 'birthday' | 'baby-shower' | 'corporate';
  coverage: string;
  deliverables: string[];
  price: string;
  popular?: boolean;
  tagline?: string;
}

export interface ServiceCategory {
  id: 'wedding' | 'small-event' | 'birthday' | 'baby-shower' | 'corporate';
  title: string;
  subtitle: string;
  badge: string;
  note?: string;
  packages: PricingPackage[];
}

export interface AddOnItem {
  name: string;
  price: string;
  description?: string;
}

export interface AlbumOption {
  id: string;
  title: string;
  sheets: string;
  pages: string;
  description: string;
  features: string[];
  idealFor: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'weddings' | 'portraits' | 'birthdays' | 'baby-shower' | 'corporate';
  categoryLabel: string;
  imageUrl: string;
  location?: string;
  caption: string;
}

export interface StartingRate {
  category: string;
  price: string;
  iconName: string;
}

export const STUDIO_INFO = {
  name: "NEXESH Photography",
  tagline: "Frames That Last Forever",
  closingQuote: "Let's turn your moments into memories.",
  location: "Coimbatore, Tamil Nadu",
  address: "Race Course / RS Puram, Coimbatore, Tamil Nadu 641018",
  phone: "+91 99948 78151",
  email: "nexeshphotography@gmail.com",
  instagram: "@nexeshphotography",
  instagramUrl: "https://instagram.com/nexeshphotography",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44173167191!2d76.90100346083398!3d11.011701550269379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const STARTING_RATES: StartingRate[] = [
  { category: "Portrait Session", price: "₹1,499", iconName: "User" },
  { category: "Birthday Party", price: "₹2,500", iconName: "Cake" },
  { category: "Small Function", price: "₹2,500", iconName: "Home" },
  { category: "Baby Shower", price: "₹3,000", iconName: "Heart" },
  { category: "Corporate Event", price: "₹4,000", iconName: "Briefcase" },
  { category: "Engagement", price: "₹5,000", iconName: "Sparkles" },
  { category: "Wedding", price: "₹8,000", iconName: "Camera" },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "wedding",
    title: "Wedding Photography",
    subtitle: "Cinematic, candid and timeless coverage for your grand day in Tamil Nadu",
    badge: "Most Requested",
    packages: [
      {
        id: "wed-basic",
        name: "Wedding Basic",
        category: "wedding",
        coverage: "4–5 hours",
        deliverables: [
          "150+ Edited High-Res Photos",
          "Traditional & Candid Coverage",
          "Digital Cloud Drive Delivery",
          "Color Graded & Retouched",
          "Online Password Protected Gallery"
        ],
        price: "₹8,000 – ₹12,000"
      },
      {
        id: "wed-standard",
        name: "Wedding Standard",
        category: "wedding",
        coverage: "8–10 hours",
        popular: true,
        tagline: "★ Most Popular",
        deliverables: [
          "300+ Edited High-Res Photos",
          "Balanced Candid + Traditional Storytelling",
          "Family & Group Photo Session Included",
          "1 Cinematic Highlight Video Reel",
          "20–30 Sheet Premium Flush Mount Album",
          "High-Resolution Cloud & Pen Drive Delivery"
        ],
        price: "₹18,000 – ₹25,000"
      },
      {
        id: "wed-premium",
        name: "Wedding Premium",
        category: "wedding",
        coverage: "Full Day Coverage",
        deliverables: [
          "500+ Edited High-Res Photos",
          "Cinematic Wedding Film Highlights",
          "Social Media Teaser / Instagram Reel",
          "30–40 Sheet Premium Handcrafted Album",
          "Dedicated Candid & Main Photographers",
          "Same-Day Sneak Peek Photos (10-15 Shots)"
        ],
        price: "₹30,000 – ₹45,000"
      },
      {
        id: "wed-complete",
        name: "Wedding Complete",
        category: "wedding",
        coverage: "2 Days (Pre-Wedding / Muhurtham & Reception)",
        deliverables: [
          "700+ Edited High-Res Photos",
          "Full Photo & Multi-Cam Video Coverage",
          "Cinematic Teaser & Full Length Film",
          "Premium 40-Sheet Album + Parent Copy",
          "Drone / Aerial Videography (Location Permitting)",
          "Priority 1-Week Digital Express Delivery"
        ],
        price: "₹45,000 – ₹70,000+"
      }
    ]
  },
  {
    id: "small-event",
    title: "Small Functions & Ceremonies",
    subtitle: "Housewarming, Engagement, Naming Ceremony, Ear-Piercing & Family Gatherings",
    badge: "Traditional & Family",
    note: "Covers housewarming (Grihapravesam), engagement (Nischayathartham), ear-piercing (Kadhukuthu), naming ceremony, anniversary, temple rituals & intimate family functions.",
    packages: [
      {
        id: "se-basic",
        name: "Small Event Basic",
        category: "small-event",
        coverage: "2 hours",
        deliverables: [
          "50+ Edited Photos",
          "Ritual & Stage Coverage",
          "Digital Drive Delivery within 3 Days"
        ],
        price: "₹2,500 – ₹3,500"
      },
      {
        id: "se-standard",
        name: "Small Event Standard",
        category: "small-event",
        coverage: "4 hours",
        popular: true,
        tagline: "★ Recommended",
        deliverables: [
          "100+ Edited Photos",
          "Candid Moments + Traditional Stage Photos",
          "Comprehensive Family & Group Portraits",
          "Digital Delivery + Selected Retouched Prints"
        ],
        price: "₹5,000 – ₹7,000"
      },
      {
        id: "se-premium",
        name: "Small Event Premium",
        category: "small-event",
        coverage: "6 hours",
        deliverables: [
          "200+ Edited Photos",
          "Candid & Traditional Coverage",
          "30-45 Sec Event Highlight Video Reel",
          "15–20 Sheet Printed Photo Album",
          "Cloud Drive + Fast Delivery"
        ],
        price: "₹8,000 – ₹12,000"
      }
    ]
  },
  {
    id: "birthday",
    title: "Birthday Celebrations",
    subtitle: "Vibrant candid moments, decor details and milestone memories for all ages",
    badge: "Joyful Celebrations",
    packages: [
      {
        id: "bday-basic",
        name: "Birthday Basic",
        category: "birthday",
        coverage: "2 hours",
        deliverables: [
          "50+ Edited Photos",
          "Cake Cutting & Guest Smiles",
          "High-Res Digital Cloud Delivery"
        ],
        price: "₹2,500 – ₹3,500"
      },
      {
        id: "bday-standard",
        name: "Birthday Standard",
        category: "birthday",
        coverage: "3–4 hours",
        popular: true,
        tagline: "★ Party Favorite",
        deliverables: [
          "100+ Edited Photos",
          "Candid Playful Shots + Family/Group Photos",
          "Decor & Ambiance Close-ups",
          "30-Second Instagram Reel Clip",
          "Fast Cloud Delivery"
        ],
        price: "₹4,500 – ₹6,500"
      },
      {
        id: "bday-premium",
        name: "Birthday Premium",
        category: "birthday",
        coverage: "5–6 hours",
        deliverables: [
          "200+ Edited Photos",
          "Complete Party & Decor Storytelling",
          "1 Cinematic Highlight Reel",
          "10–15 Sheet Custom Printed Memory Album",
          "Same-Day 10 Highlight Photos for Socials"
        ],
        price: "₹7,500 – ₹10,000"
      }
    ]
  },
  {
    id: "baby-shower",
    title: "Baby Shower / Seemantham",
    subtitle: "Warm, emotional maternal portraits & traditional blessings in Tamil customs",
    badge: "Special Tamil Traditions",
    note: "For Tamil functions such as Seemantham & Valaikappu, family blessings and elder group portraits are given special priority.",
    packages: [
      {
        id: "bs-basic",
        name: "Baby Shower Basic",
        category: "baby-shower",
        coverage: "2 hours",
        deliverables: [
          "60+ Edited Photos",
          "Ritual Blessings & Stage Photography",
          "Digital Cloud Drive Delivery"
        ],
        price: "₹3,000 – ₹4,000"
      },
      {
        id: "bs-standard",
        name: "Baby Shower Standard",
        category: "baby-shower",
        coverage: "3–4 hours",
        popular: true,
        tagline: "★ Most Loved",
        deliverables: [
          "120+ Edited Photos",
          "Candid Emotional Moments & Decor Details",
          "Dedicated Family & Elder Group Portrait Session",
          "30-Second Aesthetic Video Reel"
        ],
        price: "₹5,000 – ₹7,000"
      },
      {
        id: "bs-premium",
        name: "Baby Shower Premium",
        category: "baby-shower",
        coverage: "5–6 hours",
        deliverables: [
          "200+ Edited Photos",
          "Full Ceremony Candid + Traditional Coverage",
          "Cinematic Event Highlight Reel",
          "15–20 Sheet Premium Keepsake Album",
          "Priority 5-Day Delivery"
        ],
        price: "₹8,000 – ₹12,000"
      }
    ]
  },
  {
    id: "corporate",
    title: "Corporate Events & Summits",
    subtitle: "Sharp, professional documentation, keynotes, networking & quick digital turnarounds",
    badge: "Fast Delivery Focus",
    note: "Corporate clients value fast, professional documentation, high-resolution media press kits, and priority quick turnaround.",
    packages: [
      {
        id: "corp-basic",
        name: "Corporate Basic",
        category: "corporate",
        coverage: "2 hours",
        deliverables: [
          "75+ Edited Photos",
          "Keynote & Podium Documentation",
          "Express Digital Cloud Delivery (24-48 Hours)"
        ],
        price: "₹4,000 – ₹6,000"
      },
      {
        id: "corp-standard",
        name: "Corporate Standard",
        category: "corporate",
        coverage: "4 hours",
        popular: true,
        tagline: "★ Business Choice",
        deliverables: [
          "150+ Edited Photos",
          "Speakers, VVIP Guests, Networking & Group Photos",
          "High-Res Press Ready Images",
          "Priority 24-Hour Digital Delivery"
        ],
        price: "₹7,000 – ₹10,000"
      },
      {
        id: "corp-premium",
        name: "Corporate Premium",
        category: "corporate",
        coverage: "8 hours (Full Day)",
        deliverables: [
          "300+ Edited Photos",
          "Complete Multi-Session Event Coverage",
          "Executive Group Portraits & Team Headshots",
          "1-Min Corporate Event Highlight Video Reel",
          "Same-Day Media Kit Sneak Peek (20 Photos)"
        ],
        price: "₹12,000 – ₹18,000"
      }
    ]
  }
];

export const ADD_ONS = {
  birthday: [
    { name: "Extra Coverage Hour", price: "₹1,000 – ₹1,500 / hr", description: "Extend shoot time beyond package limits" },
    { name: "Additional Social Media Reel", price: "₹500 – ₹1,000", description: "Custom edited 30-60s vertical video reel with music" },
    { name: "Album Upgrade", price: "from ₹2,000", description: "Upgrade sheet count or add premium hardbound cover" }
  ],
  corporate: [
    { name: "Short Event Highlight Reel", price: "₹1,500 – ₹3,000", description: "Dynamic video summary for social media & PR" },
    { name: "Same-Day Selected Photos", price: "₹2,000+", description: "15-20 edited photos delivered by midnight for press/socials" },
    { name: "Extra Assistant Photographer", price: "₹3,000 – ₹6,000", description: "Multi-angle coverage for simultaneous breakouts" },
    { name: "Dedicated Videographer", price: "₹5,000 – ₹10,000+", description: "Full HD video recording & post-event editing" }
  ]
};

export const ALBUM_OPTIONS: AlbumOption[] = [
  {
    id: "digital",
    title: "Digital Cloud Package",
    sheets: "0 Sheets",
    pages: "0 Pages",
    description: "Eco-friendly, instant access cloud delivery. Perfect for clients who want high-resolution digital files for social sharing.",
    features: [
      "Full Resolution Color-Graded Photos",
      "Private Google Drive / Cloud Link",
      "Web-Optimized & Print-Ready Copies",
      "Lifetime Access Backup"
    ],
    idealFor: "Basic event coverage & fast digital sharing",
    badge: "Eco & Fast"
  },
  {
    id: "standard",
    title: "Standard Story Album",
    sheets: "20–25 Sheets",
    pages: "40–50 Pages",
    description: "Beautiful flush mount album with sturdy lay-flat pages. Crisp color printing that brings your event to life.",
    features: [
      "20 to 25 Heavyweight Sheets (Lay-flat)",
      "Vibrant Laminated Gloss or Matte Finish",
      "Custom Graphic Photo Cover Design",
      "Protective Presentation Box Included"
    ],
    idealFor: "Birthdays, Baby Showers & Small Functions",
    badge: "Popular Classic"
  },
  {
    id: "premium",
    title: "Premium Handcrafted Wedding Album",
    sheets: "30–40 Sheets",
    pages: "60–80 Pages",
    description: "Luxury heirloom wedding album with thick photographic thermal sheets, rich metallic accents, custom embossing, and velvet pouch.",
    features: [
      "30 to 40 Thick Flush-Mount Photographic Sheets",
      "Choice of Velvet, Leatherette, or Acrylic Cover",
      "Gold/Silver Foil Name Embossing on Cover",
      "Waterproof & Tear-Proof Lamination",
      "Matching Carrying Case / Wooden Box"
    ],
    idealFor: "Grand Weddings & Muhurtham Keepsakes",
    badge: "Luxury Heirloom"
  }
];

export const FEATURE_CARDS = [
  {
    icon: "Sparkles",
    title: "Candid + Traditional",
    description: "Every package blends organic candid storytelling with classic, well-lit posed family coverage."
  },
  {
    icon: "ShieldCheck",
    title: "Transparent Pricing",
    description: "Straightforward package rates with clear deliverable counts — absolutely no hidden fees."
  },
  {
    icon: "CloudDownload",
    title: "Digital + Album Delivery",
    description: "High-speed Google Cloud delivery standard across all packages, with optional printed heirlooms."
  },
  {
    icon: "Clock",
    title: "Flexible Hours",
    description: "Packages scale effortlessly from intimate 2-hour sessions to multi-day, multi-photographer celebrations."
  },
  {
    icon: "Zap",
    title: "Quick Turnaround",
    description: "Same-day preview highlights for social media available as a fast add-on service."
  },
  {
    icon: "Users",
    title: "Family-First Coverage",
    description: "Dedicated focus on parents, elders, and extended family group portraits in all standard tiers."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Tamil Muhurtham Warmth",
    category: "weddings",
    categoryLabel: "Wedding",
    imageUrl: "/assets/portfolio/weddings/tamil-muhurtham-warmth.jpg",
    location: "Coimbatore Convention Center",
    caption: "Joyous laughter during traditional flower rituals."
  },
  {
    id: "2",
    title: "Intimate Bride Candid",
    category: "weddings",
    categoryLabel: "Wedding",
    imageUrl: "/assets/portfolio/weddings/intimate-bride-candid.jpg",
    location: "RS Puram, Coimbatore",
    caption: "Graceful saree portrait before the reception."
  },
  {
    id: "3",
    title: "Couples Sunlit Portrait",
    category: "portraits",
    categoryLabel: "Portrait",
    imageUrl: "/assets/portfolio/portraits/couples-sunlit-portrait.jpg",
    location: "Isha Foundation / Foothills",
    caption: "Golden hour romance captured with natural light."
  },
  {
    id: "4",
    title: "Seemantham Blessings",
    category: "baby-shower",
    categoryLabel: "Baby Shower",
    imageUrl: "/assets/portfolio/baby-shower/seemantham-blessings.jpg",
    location: "Peelamedu, Coimbatore",
    caption: "Bangle ceremony smiles surrounded by maternal warmth."
  },
  {
    id: "5",
    title: "1st Birthday Joy",
    category: "birthdays",
    categoryLabel: "Birthday",
    imageUrl: "/assets/portfolio/birthdays/1st-birthday-joy.jpg",
    location: "Race Course, Coimbatore",
    caption: "Whimsical balloon decor & pure childhood excitement."
  },
  {
    id: "6",
    title: "Tech Summit Keynote",
    category: "corporate",
    categoryLabel: "Corporate",
    imageUrl: "/assets/portfolio/corporate/tech-summit-keynote.jpg",
    location: "TIDEL Park, Coimbatore",
    caption: "Sharp keynote presentation & audience engagement."
  },
  {
    id: "7",
    title: "Nischayathartham Ring Exchange",
    category: "weddings",
    categoryLabel: "Wedding",
    imageUrl: "/assets/portfolio/weddings/nischayathartham-ring-exchange.jpg",
    location: "Avinashi Road Hall",
    caption: "Pre-wedding engagement ceremony highlights."
  },
  {
    id: "8",
    title: "Solo Outdoor Portrait",
    category: "portraits",
    categoryLabel: "Portrait",
    imageUrl: "/assets/portfolio/portraits/solo-outdoor-portrait.jpg",
    location: "Valparai Hills",
    caption: "Expressive portrait highlighting subtle mood and personality."
  },
  {
    id: "9",
    title: "Executive Networking Summit",
    category: "corporate",
    categoryLabel: "Corporate",
    imageUrl: "/assets/portfolio/corporate/executive-networking-summit.jpg",
    location: "Radisson Blu, Coimbatore",
    caption: "Leadership group interactions and dynamic discussions."
  }
];

export const TESTIMONIALS = [
  {
    name: "Karthik & Ananya R.",
    event: "Wedding in Coimbatore",
    comment: "NEXESH Photography captured our Tamil wedding muhurtham so beautifully! Their team was humble, punctual, and delivered candid shots that made our parents cry with happiness.",
    rating: 5
  },
  {
    name: "Dr. Meenakshi Sundaram",
    event: "Seemantham Ceremony",
    comment: "We hired NEXESH for my daughter's Seemantham in Race Course. Their patience with elderly relatives and attention to traditional rituals was outstanding.",
    rating: 5
  },
  {
    name: "Sanjay Kumar",
    event: "Corporate Product Launch",
    comment: "Fast, crisp delivery! We received selected press photos the same evening for our press release. Highly professional team in Coimbatore.",
    rating: 5
  }
];
