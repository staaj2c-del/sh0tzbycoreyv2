import { useState } from 'react';
import { Camera, Video, Play, X, ExternalLink } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  category: 'photography' | 'videography';
  type: 'wedding' | 'portrait' | 'event' | 'music' | 'sports' | 'corporate';
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  { id: 1, title: 'Smith Wedding', category: 'photography', type: 'wedding', description: 'Beautiful outdoor wedding ceremony' },
  { id: 2, title: 'Urban Beats - Music Video', category: 'videography', type: 'music', description: 'Hip-hop music video downtown' },
  { id: 3, title: 'Corporate Headshots', category: 'photography', type: 'corporate', description: 'Professional team photos' },
  { id: 4, title: 'Johnson Family', category: 'photography', type: 'portrait', description: 'Family portrait session' },
  { id: 5, title: 'Championship Game', category: 'videography', type: 'sports', description: 'High school basketball finals' },
  { id: 6, title: 'Gala Night', category: 'photography', type: 'event', description: 'Charity gala event coverage' },
  { id: 7, title: 'Sunset Love', category: 'videography', type: 'wedding', description: 'Wedding highlight reel' },
  { id: 8, title: 'Newborn Session', category: 'photography', type: 'portrait', description: 'Baby photography session' },
  { id: 9, title: 'Product Launch', category: 'videography', type: 'corporate', description: 'Tech company product reveal' },
  { id: 10, title: 'Senior Portraits', category: 'photography', type: 'portrait', description: 'High school senior photos' },
  { id: 11, title: 'Concert Coverage', category: 'videography', type: 'music', description: 'Live concert recording' },
  { id: 12, title: 'Birthday Celebration', category: 'photography', type: 'event', description: '50th birthday party' },
];

const filters = [
  { id: 'all', label: 'All Work' },
  { id: 'photography', label: 'Photography' },
  { id: 'videography', label: 'Videography' },
];

const typeFilters = [
  { id: 'all', label: 'All Types' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'event', label: 'Events' },
  { id: 'music', label: 'Music' },
  { id: 'sports', label: 'Sports' },
  { id: 'corporate', label: 'Corporate' },
];

export default function Portfolio() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = portfolioItems.filter(item => {
    const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
    const typeMatch = typeFilter === 'all' || item.type === typeFilter;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#ff3d00] text-sm tracking-[0.3em] mb-4 uppercase">Our Work</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">PORTFOLIO</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse through our collection of photography and videography work
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setCategoryFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  categoryFilter === filter.id
                    ? 'bg-[#ff3d00] text-white'
                    : 'bg-[#111111] text-gray-400 border border-white/10 hover:border-[#ff3d00]/50 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="hidden md:block w-px bg-white/10"></div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {typeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setTypeFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  typeFilter === filter.id
                    ? 'bg-[#ff3d00] text-white'
                    : 'bg-[#111111] text-gray-400 border border-white/10 hover:border-[#ff3d00]/50 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-[4/3] bg-[#111111] border border-white/10 overflow-hidden cursor-pointer hover:border-[#ff3d00]/50 transition-all duration-300"
            >
              {/* Placeholder Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                {item.category === 'videography' ? (
                  <Video className="w-20 h-20 text-white/10" />
                ) : (
                  <Camera className="w-20 h-20 text-white/10" />
                )}
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-black/60 text-xs uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              
              {/* Type Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-[#ff3d00]/80 text-xs uppercase tracking-wider">
                  {item.type}
                </span>
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
                <div className="mt-4 flex items-center gap-2 text-[#ff3d00]">
                  {item.category === 'videography' ? (
                    <><Play className="w-4 h-4" /> Watch Video</>
                  ) : (
                    <><ExternalLink className="w-4 h-4" /> View Gallery</>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No items match your filters.</p>
          </div>
        )}

        {/* Load More */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 border border-white/20 hover:border-[#ff3d00] hover:text-[#ff3d00] transition-colors text-sm uppercase tracking-wider">
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-[#111111] border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
              {selectedItem.category === 'videography' ? (
                <Video className="w-32 h-32 text-white/10" />
              ) : (
                <Camera className="w-32 h-32 text-white/10" />
              )}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 flex items-center justify-center hover:bg-[#ff3d00] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#ff3d00] text-xs uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <span className="px-3 py-1 bg-white/10 text-xs uppercase tracking-wider">
                  {selectedItem.type}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">{selectedItem.title}</h2>
              <p className="text-gray-400 mb-8">{selectedItem.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0a0a0a] p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Client</p>
                  <p className="font-semibold">Private</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Date</p>
                  <p className="font-semibold">2024</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Location</p>
                  <p className="font-semibold">Local</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Service</p>
                  <p className="font-semibold">{selectedItem.category}</p>
                </div>
              </div>
              
              <a 
                href="/booking" 
                className="inline-block px-8 py-4 bg-[#ff3d00] hover:bg-[#ff5722] text-white font-medium transition-colors"
              >
                Book Similar Service
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
