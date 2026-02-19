export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  googleCalendarEventId?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: 'portrait',
    name: 'Portrait Session',
    duration: 60,
    price: 150,
    description: 'Professional portrait photography session'
  },
  {
    id: 'event',
    name: 'Event Coverage',
    duration: 180,
    price: 450,
    description: 'Full event photography coverage'
  },
  {
    id: 'product',
    name: 'Product Shoot',
    duration: 120,
    price: 300,
    description: 'Professional product photography'
  },
  {
    id: 'headshot',
    name: 'Headshot Session',
    duration: 30,
    price: 75,
    description: 'Quick professional headshots'
  }
];

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
];
