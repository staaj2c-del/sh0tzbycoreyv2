export interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  duration: string;
  deliveryTime: string;
}

export interface Service {
  id: string;
  name: string;
  category: 'videography' | 'photography' | 'editing' | 'design';
  icon: string;
  description: string;
  longDescription: string;
  packages: Package[];
  images: string[];
}

export const services: Service[] = [
  // VIDEOGRAPHY SERVICES
  {
    id: 'music-videos',
    name: 'Music Videos',
    category: 'videography',
    icon: 'Music',
    description: 'Cinematic music video production that brings your sound to life',
    longDescription: 'Professional music video production with high-quality equipment, creative direction, and post-production editing. From concept to final cut, we create visuals that match your artistic vision.',
    packages: [
      { 
        name: 'Basic', 
        price: '$500', 
        description: 'Perfect for emerging artists',
        duration: '4 hours',
        deliveryTime: '1 week',
        features: ['4-hour shoot', '1 location', 'Basic color correction', '1 revision', '1080p delivery'] 
      },
      { 
        name: 'Standard', 
        price: '$1,000', 
        description: 'Most popular choice',
        duration: '8 hours',
        deliveryTime: '2 weeks',
        features: ['8-hour shoot', '2 locations', 'Advanced color grading', '2 revisions', '4K delivery', 'Social media cuts'] 
      },
      { 
        name: 'Premium', 
        price: '$2,500', 
        description: 'Full cinematic experience',
        duration: 'Full day',
        deliveryTime: '3 weeks',
        features: ['Full day shoot', 'Multiple locations', 'Cinematic editing', 'Unlimited revisions', '4K + RAW delivery', 'VFX included', 'Behind the scenes'] 
      }
    ],
    images: []
  },
  {
    id: 'prom-homecoming',
    name: 'Prom & Homecoming',
    category: 'videography',
    icon: 'Calendar',
    description: 'Capture your special school events with cinematic style',
    longDescription: 'Professional coverage of prom, homecoming, and school events. We capture the excitement, the dances, and all the memorable moments.',
    packages: [
      { 
        name: 'Mini', 
        price: '$250', 
        description: 'Essential coverage',
        duration: '2 hours',
        deliveryTime: '3 days',
        features: ['2-hour coverage', 'Group photos', 'Highlight reel (3-5 min)', 'Digital delivery'] 
      },
      { 
        name: 'Full', 
        price: '$600', 
        description: 'Complete event coverage',
        duration: '4 hours',
        deliveryTime: '1 week',
        features: ['4-hour coverage', 'Individual & group shots', 'Full event video', 'Social media clips', 'Photo booth option'] 
      },
      { 
        name: 'Deluxe', 
        price: '$1,200', 
        description: 'Premium experience',
        duration: 'Full event',
        deliveryTime: '2 weeks',
        features: ['Full event coverage', 'Professional lighting', 'Same-day highlights', 'Photo booth included', 'Drone shots'] 
      }
    ],
    images: []
  },
  {
    id: 'sports-media',
    name: 'Sports Media',
    category: 'videography',
    icon: 'Camera',
    description: 'Dynamic sports coverage and athlete highlight reels',
    longDescription: 'High-energy sports videography for games, tournaments, and athlete recruitment videos. Fast-paced editing that captures the action.',
    packages: [
      { 
        name: 'Game Day', 
        price: '$45', 
        description: 'Single game coverage',
        duration: 'Per game',
        deliveryTime: '48 hours',
        features: ['Single game coverage', 'Highlight clips', 'Action shots', '48-hour delivery', 'Social media ready'] 
      },
      { 
        name: 'Season', 
        price: '$500', 
        description: 'Season package',
        duration: '10 games',
        deliveryTime: '1 week',
        features: ['10 games coverage', 'Player highlights', 'Team promo video', 'Social media package', 'Coach interviews'] 
      },
      { 
        name: 'Pro Athlete', 
        price: '$1,000', 
        description: 'Recruitment package',
        duration: 'Custom',
        deliveryTime: '2 weeks',
        features: ['Custom highlight reel', 'Multi-game coverage', 'Recruitment video', 'Professional graphics', 'Stats overlay'] 
      }
    ],
    images: []
  },
  {
    id: 'events',
    name: 'Events',
    category: 'videography',
    icon: 'Users',
    description: 'Comprehensive event videography for any occasion',
    longDescription: 'Full coverage of birthdays, anniversaries, graduations, and special celebrations. We capture the moments you will want to remember forever.',
    packages: [
      { 
        name: 'Essential', 
        price: '$500', 
        description: 'Basic coverage',
        duration: '3 hours',
        deliveryTime: '1 week',
        features: ['3-hour coverage', 'Event highlights', 'Digital gallery', 'Basic editing'] 
      },
      { 
        name: 'Complete', 
        price: '$1,000', 
        description: 'Full coverage',
        duration: '6 hours',
        deliveryTime: '2 weeks',
        features: ['6-hour coverage', 'Full event video', 'Photo & video combo', 'Quick turnaround', 'Interviews included'] 
      },
      { 
        name: 'Ultimate', 
        price: '$2,000', 
        description: 'Premium package',
        duration: 'All day',
        deliveryTime: '2 weeks',
        features: ['All-day coverage', 'Multiple cameras', 'Live streaming option', 'Premium editing', 'Same-day highlight'] 
      }
    ],
    images: []
  },
  {
    id: 'corporate-events',
    name: 'Corporate Events',
    category: 'videography',
    icon: 'Building2',
    description: 'Professional corporate video production',
    longDescription: 'Corporate event coverage, conferences, product launches, and company celebrations. Professional quality that represents your brand.',
    packages: [
      { 
        name: 'Basic', 
        price: '$800', 
        description: 'Conference recording',
        duration: '4 hours',
        deliveryTime: '1 week',
        features: ['4-hour coverage', 'Conference recording', 'Basic editing', 'Digital delivery', 'Audio capture'] 
      },
      { 
        name: 'Business', 
        price: '$1,500', 
        description: 'Full production',
        duration: 'Full day',
        deliveryTime: '1 week',
        features: ['Full day coverage', 'Interviews included', 'Branded graphics', '48-hour delivery', 'B-roll footage'] 
      },
      { 
        name: 'Enterprise', 
        price: '$3,500', 
        description: 'Premium corporate',
        duration: 'Multi-day',
        deliveryTime: '2 weeks',
        features: ['Multi-day coverage', 'Live streaming', 'Professional lighting', 'Same-day highlights', 'Post-event recap'] 
      }
    ],
    images: []
  },
  {
    id: 'weddings',
    name: 'Wedding Videography',
    category: 'videography',
    icon: 'Heart',
    description: 'Cinematic wedding films that tell your love story',
    longDescription: 'Beautiful wedding videography capturing every precious moment of your special day. From preparation to reception, we create a timeless film you will treasure.',
    packages: [
      { 
        name: 'Essential', 
        price: '$1,500', 
        description: 'Ceremony focus',
        duration: '6 hours',
        deliveryTime: '4 weeks',
        features: ['6-hour coverage', 'Ceremony & reception', 'Highlight film (10 min)', 'Digital delivery'] 
      },
      { 
        name: 'Classic', 
        price: '$3,000', 
        description: 'Full day coverage',
        duration: '10 hours',
        deliveryTime: '6 weeks',
        features: ['10-hour coverage', 'Preparation to reception', 'Full feature film (30 min)', 'Highlight reel', 'Drone footage'] 
      },
      { 
        name: 'Luxury', 
        price: '$5,500', 
        description: 'Cinematic experience',
        duration: 'Full day +',
        deliveryTime: '8 weeks',
        features: ['Unlimited coverage', '2 cinematographers', 'Cinematic film (45+ min)', 'Same-day edit', 'Engagement session included'] 
      }
    ],
    images: []
  },

  // PHOTOGRAPHY SERVICES
  {
    id: 'portrait-photography',
    name: 'Portrait Photography',
    category: 'photography',
    icon: 'User',
    description: 'Professional portraits that capture your personality',
    longDescription: 'High-quality portrait sessions for individuals, couples, and families. Studio or on-location with professional lighting and editing.',
    packages: [
      { 
        name: 'Mini Session', 
        price: '$200', 
        description: 'Quick portrait session',
        duration: '30 min',
        deliveryTime: '1 week',
        features: ['30-minute session', '1 outfit', '10 edited photos', 'Online gallery', '1 location'] 
      },
      { 
        name: 'Standard', 
        price: '$400', 
        description: 'Full portrait session',
        duration: '1.5 hours',
        deliveryTime: '2 weeks',
        features: ['90-minute session', '2-3 outfits', '25 edited photos', 'Online gallery', '2 locations', 'Print release'] 
      },
      { 
        name: 'Premium', 
        price: '$750', 
        description: 'Complete experience',
        duration: '3 hours',
        deliveryTime: '2 weeks',
        features: ['3-hour session', 'Unlimited outfits', '50+ edited photos', 'Online gallery', 'Multiple locations', 'Hair & makeup included'] 
      }
    ],
    images: []
  },
  {
    id: 'wedding-photography',
    name: 'Wedding Photography',
    category: 'photography',
    icon: 'Gem',
    description: 'Timeless wedding photos to cherish forever',
    longDescription: 'Comprehensive wedding photography capturing every emotion, detail, and special moment of your big day. Artistic and documentary style combined.',
    packages: [
      { 
        name: 'Essential', 
        price: '$1,800', 
        description: 'Key moments coverage',
        duration: '6 hours',
        deliveryTime: '4 weeks',
        features: ['6-hour coverage', '200+ edited photos', 'Online gallery', 'Print release', 'Ceremony & reception'] 
      },
      { 
        name: 'Complete', 
        price: '$3,500', 
        description: 'Full day coverage',
        duration: '10 hours',
        deliveryTime: '6 weeks',
        features: ['10-hour coverage', '500+ edited photos', 'Online gallery', 'Engagement session', 'Second photographer', 'Premium album'] 
      },
      { 
        name: 'Luxury', 
        price: '$6,000', 
        description: 'Ultimate package',
        duration: 'Full day +',
        deliveryTime: '8 weeks',
        features: ['Unlimited coverage', '2 photographers', '800+ edited photos', 'Engagement + bridal', 'Luxury album', 'Same-day slideshow'] 
      }
    ],
    images: []
  },
  {
    id: 'family-photography',
    name: 'Family Photography',
    category: 'photography',
    icon: 'Users',
    description: 'Beautiful family portraits to treasure',
    longDescription: 'Family photo sessions that capture the love and connection between family members. Fun, relaxed sessions with beautiful results.',
    packages: [
      { 
        name: 'Mini', 
        price: '$250', 
        description: 'Quick family session',
        duration: '30 min',
        deliveryTime: '1 week',
        features: ['30-minute session', 'Up to 5 people', '15 edited photos', 'Online gallery', 'Outdoor location'] 
      },
      { 
        name: 'Standard', 
        price: '$450', 
        description: 'Full family session',
        duration: '1 hour',
        deliveryTime: '2 weeks',
        features: ['1-hour session', 'Up to 8 people', '35 edited photos', 'Online gallery', '2 locations', 'Print release'] 
      },
      { 
        name: 'Extended', 
        price: '$700', 
        description: 'Large family groups',
        duration: '2 hours',
        deliveryTime: '2 weeks',
        features: ['2-hour session', 'Unlimited people', '60+ edited photos', 'Online gallery', 'Multiple locations', 'Group + individual shots'] 
      }
    ],
    images: []
  },
  {
    id: 'maternity-newborn',
    name: 'Maternity & Newborn',
    category: 'photography',
    icon: 'Baby',
    description: 'Capture the miracle of life',
    longDescription: 'Tender maternity and newborn photography sessions. Safe, comfortable environment for capturing these precious early moments.',
    packages: [
      { 
        name: 'Maternity', 
        price: '$350', 
        description: 'Pregnancy portraits',
        duration: '1 hour',
        deliveryTime: '2 weeks',
        features: ['1-hour session', '2 outfits', '20 edited photos', 'Online gallery', 'Partner included'] 
      },
      { 
        name: 'Newborn', 
        price: '$500', 
        description: 'Newborn session',
        duration: '2-3 hours',
        deliveryTime: '2 weeks',
        features: ['Studio session', 'Props included', '25 edited photos', 'Online gallery', 'Family shots included'] 
      },
      { 
        name: 'Bundle', 
        price: '$750', 
        description: 'Both sessions',
        duration: '2 sessions',
        deliveryTime: '3 weeks',
        features: ['Maternity + Newborn', '50+ total photos', 'Online gallery', 'Print release', 'Priority booking'] 
      }
    ],
    images: []
  },
  {
    id: 'event-photography',
    name: 'Event Photography',
    category: 'photography',
    icon: 'Sparkles',
    description: 'Professional event photography for any occasion',
    longDescription: 'Corporate events, birthday parties, graduations, and special celebrations captured with professional quality.',
    packages: [
      { 
        name: 'Essential', 
        price: '$400', 
        description: 'Basic coverage',
        duration: '2 hours',
        deliveryTime: '1 week',
        features: ['2-hour coverage', '100+ edited photos', 'Online gallery', 'Digital delivery'] 
      },
      { 
        name: 'Standard', 
        price: '$800', 
        description: 'Full coverage',
        duration: '4 hours',
        deliveryTime: '2 weeks',
        features: ['4-hour coverage', '250+ edited photos', 'Online gallery', 'Print release', 'Same-day previews'] 
      },
      { 
        name: 'Premium', 
        price: '$1,500', 
        description: 'All-inclusive',
        duration: '8 hours',
        deliveryTime: '2 weeks',
        features: ['8-hour coverage', '400+ edited photos', 'Online gallery', 'Second photographer', 'Rush delivery available'] 
      }
    ],
    images: []
  },
  {
    id: 'headshots',
    name: 'Professional Headshots',
    category: 'photography',
    icon: 'Camera',
    description: 'Corporate and creative headshots',
    longDescription: 'Professional headshots for LinkedIn, company websites, acting portfolios, and personal branding. Clean, polished results.',
    packages: [
      { 
        name: 'Quick', 
        price: '$150', 
        description: 'Fast headshot session',
        duration: '15 min',
        deliveryTime: '3 days',
        features: ['15-minute session', '1 look', '5 edited photos', 'Digital delivery', 'Studio lighting'] 
      },
      { 
        name: 'Professional', 
        price: '$300', 
        description: 'Full headshot session',
        duration: '45 min',
        deliveryTime: '1 week',
        features: ['45-minute session', '2-3 looks', '15 edited photos', 'Online gallery', 'Retouching included'] 
      },
      { 
        name: 'Team', 
        price: '$800', 
        description: 'Corporate team package',
        duration: 'Half day',
        deliveryTime: '1 week',
        features: ['Up to 10 people', '30 min per person', '5 photos each', 'Consistent editing', 'On-site option'] 
      }
    ],
    images: []
  },

  // EDITING & DESIGN
  {
    id: 'video-editing',
    name: 'Video Editing',
    category: 'editing',
    icon: 'Film',
    description: 'Professional video editing and post-production',
    longDescription: 'Transform your raw footage into polished, professional videos. Color grading, sound design, motion graphics, and more.',
    packages: [
      { 
        name: 'Basic', 
        price: '$200', 
        description: 'Simple editing',
        duration: 'Per project',
        deliveryTime: '3-5 days',
        features: ['Up to 5 minutes', 'Basic cuts', 'Color correction', '2 revisions', 'Music included'] 
      },
      { 
        name: 'Standard', 
        price: '$500', 
        description: 'Full editing',
        duration: 'Per project',
        deliveryTime: '1 week',
        features: ['Up to 15 minutes', 'Advanced editing', 'Color grading', 'Sound design', '5 revisions'] 
      },
      { 
        name: 'Cinematic', 
        price: '$1,200', 
        description: 'Premium post-production',
        duration: 'Per project',
        deliveryTime: '2 weeks',
        features: ['Unlimited length', 'Hollywood-style edit', 'VFX & motion graphics', 'Unlimited revisions', 'Rush delivery'] 
      }
    ],
    images: []
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    category: 'design',
    icon: 'Palette',
    description: 'Creative graphic design for all your needs',
    longDescription: 'Logo design, branding, marketing materials, social media graphics, and more. Creative designs that make an impact.',
    packages: [
      { 
        name: 'Starter', 
        price: '$150', 
        description: 'Basic design',
        duration: 'Per project',
        deliveryTime: '3-5 days',
        features: ['Logo design', '3 revisions', 'Source files', 'Social media kit'] 
      },
      { 
        name: 'Business', 
        price: '$400', 
        description: 'Brand package',
        duration: 'Per project',
        deliveryTime: '1 week',
        features: ['Brand identity', 'Business cards', 'Flyer design', 'Unlimited revisions'] 
      },
      { 
        name: 'Premium', 
        price: '$800', 
        description: 'Full branding',
        duration: 'Per project',
        deliveryTime: '2 weeks',
        features: ['Full brand package', 'Marketing materials', 'Website graphics', 'Priority support', 'Brand guidelines'] 
      }
    ],
    images: []
  }
];

export const getServicesByCategory = (category: Service['category']) => {
  return services.filter(service => service.category === category);
};

export const getServiceById = (id: string) => {
  return services.find(service => service.id === id);
};
