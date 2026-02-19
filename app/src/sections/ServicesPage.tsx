import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Video, Palette, Music, Users, Sparkles, Building2, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const serviceCategories = [
  {
    id: 'videography',
    icon: Video,
    title: 'Videography',
    description: 'Professional video production for all your needs',
    services: [
      { name: 'Music Videos', icon: Music, price: 'Starting at $500', description: 'Cinematic music videos that bring your sound to life' },
      { name: 'Event Coverage', icon: Sparkles, price: 'Starting at $400', description: 'Full coverage of weddings, parties, and corporate events' },
      { name: 'Wedding Films', icon: Heart, price: 'Starting at $1,200', description: 'Beautiful wedding films that capture your special day' },
      { name: 'Corporate Videos', icon: Building2, price: 'Starting at $600', description: 'Professional videos for businesses and brands' }
    ]
  },
  {
    id: 'photography',
    icon: Camera,
    title: 'Photography',
    description: 'Stunning photography for every occasion',
    services: [
      { name: 'Portrait Sessions', icon: Users, price: 'Starting at $150', description: 'Professional portraits for individuals and families' },
      { name: 'Wedding Photography', icon: Heart, price: 'Starting at $800', description: 'Complete wedding day coverage' },
      { name: 'Family Photos', icon: Users, price: 'Starting at $200', description: 'Beautiful family portraits in studio or location' },
      { name: 'Event Photography', icon: Sparkles, price: 'Starting at $300', description: 'Coverage of all your special events' }
    ]
  },
  {
    id: 'editing',
    icon: Palette,
    title: 'Editing & Design',
    description: 'Post-production and creative design services',
    services: [
      { name: 'Video Editing', icon: Video, price: 'Starting at $200', description: 'Professional editing with color grading and effects' },
      { name: 'Color Grading', icon: Palette, price: 'Starting at $150', description: 'Cinematic color correction and grading' },
      { name: 'Photo Retouching', icon: Camera, price: 'Starting at $50', description: 'Professional photo editing and retouching' },
      { name: 'Graphic Design', icon: Sparkles, price: 'Starting at $100', description: 'Custom graphics, logos, and promotional materials' }
    ]
  }
];

export function ServicesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'videography';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const currentCategory = serviceCategories.find(cat => cat.id === activeCategory) || serviceCategories[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-white">sh0tzbycorey</a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-zinc-400 hover:text-white transition-colors">HOME</a>
              <a href="/services" className="text-amber-500 font-medium">SERVICES</a>
              <a href="/portfolio" className="text-zinc-400 hover:text-white transition-colors">PORTFOLIO</a>
              <a href="/booking" className="text-zinc-400 hover:text-white transition-colors">BOOKING</a>
              <a href="/contact" className="text-zinc-400 hover:text-white transition-colors">CONTACT</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com/@sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-amber-500 font-medium tracking-wider mb-4">What We Offer</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">SERVICES</span>
          </h1>
          <p className="text-xl text-zinc-400">
            From concept to completion, we provide professional photo and video services tailored to your vision.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all ${
                    activeCategory === category.id
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-500'
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{currentCategory.title}</h2>
            <p className="text-zinc-400">{currentCategory.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {currentCategory.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-all group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                        <Icon className="w-7 h-7 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white">{service.name}</h3>
                          <span className="text-amber-500 font-medium">{service.price}</span>
                        </div>
                        <p className="text-zinc-400 mb-4">{service.description}</p>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Professional quality guaranteed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Session?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Get in touch today and let's discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/booking')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6"
            >
              Book Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/contact')}
              variant="outline" 
              className="border-zinc-700 text-white hover:bg-zinc-800 px-8 py-6"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <a href="/" className="text-2xl font-bold text-white">sh0tzbycorey</a>
              <p className="text-zinc-500 mt-2">Photos & Films by sh0tzbycorey™</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="/" className="text-zinc-400 hover:text-white transition-colors">HOME</a>
              <a href="/services" className="text-zinc-400 hover:text-white transition-colors">SERVICES</a>
              <a href="/portfolio" className="text-zinc-400 hover:text-white transition-colors">PORTFOLIO</a>
              <a href="/booking" className="text-zinc-400 hover:text-white transition-colors">BOOKING</a>
              <a href="/contact" className="text-zinc-400 hover:text-white transition-colors">CONTACT</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com/@sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
            <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} sh0tzbycorey. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
