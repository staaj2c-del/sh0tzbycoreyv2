import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Camera, Play, ArrowRight } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'Summer Wedding',
    category: 'photography',
    type: 'Wedding Photography',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    description: 'Beautiful outdoor wedding ceremony captured in golden hour light.'
  },
  {
    id: 2,
    title: 'Urban Music Video',
    category: 'videography',
    type: 'Music Video',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'Cinematic music video shot in downtown locations.'
  },
  {
    id: 3,
    title: 'Family Portraits',
    category: 'photography',
    type: 'Portrait Session',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    description: 'Natural family portraits in a park setting.'
  },
  {
    id: 4,
    title: 'Corporate Event',
    category: 'videography',
    type: 'Event Coverage',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    description: 'Annual company gala and awards ceremony.'
  },
  {
    id: 5,
    title: 'Product Shoot',
    category: 'photography',
    type: 'Product Photography',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    description: 'Professional product photography for e-commerce.'
  },
  {
    id: 6,
    title: 'Birthday Celebration',
    category: 'videography',
    type: 'Event Coverage',
    image: 'https://images.unsplash.com/photo-1530103862676-de3c9a59aa38?w=800&h=600&fit=crop',
    description: 'Milestone birthday party with friends and family.'
  }
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'photography', label: 'Photography' },
  { id: 'videography', label: 'Videography' }
];

export function PortfolioPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-white">sh0tzbycorey</a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-zinc-400 hover:text-white transition-colors">HOME</a>
              <a href="/services" className="text-zinc-400 hover:text-white transition-colors">SERVICES</a>
              <a href="/portfolio" className="text-amber-500 font-medium">PORTFOLIO</a>
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
          <p className="text-amber-500 font-medium tracking-wider mb-4">Our Work</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">PORTFOLIO</span>
          </h1>
          <p className="text-xl text-zinc-400">
            A showcase of our best photography and videography projects.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full border transition-all ${
                  activeCategory === category.id
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-500'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-all cursor-pointer overflow-hidden group"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.category === 'videography' ? 'bg-red-500/80' : 'bg-amber-500/80'
                    }`}>
                      {item.category === 'videography' ? (
                        <Play className="w-5 h-5 text-white fill-white" />
                      ) : (
                        <Camera className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-amber-500 text-sm font-medium">{item.type}</p>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Like What You <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">See?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Let's create something amazing together. Book your session today.
          </p>
          <Button 
            onClick={() => navigate('/booking')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6"
          >
            Book a Session
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
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

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
          {selectedItem && (
            <div>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-amber-500 text-sm font-medium">{selectedItem.type}</p>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
              <p className="text-zinc-400">{selectedItem.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
