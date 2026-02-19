import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Music, Calendar, Camera, Users, Building2, Heart, Vote, Palette, Film,
  Sparkles, User, Baby, Gem, Check, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { services, type Service, type Package } from '@/data/services';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Music, Calendar, Camera, Users, Building2, Heart, Vote, Palette, Film,
  Sparkles, User, Baby, Gem
};

type Category = 'all' | 'videography' | 'photography' | 'editing' | 'design';

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'videography', label: 'Videography' },
  { id: 'photography', label: 'Photography' },
  { id: 'editing', label: 'Video Editing' },
  { id: 'design', label: 'Graphic Design' },
];

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category') as Category;
    if (category && categories.some(c => c.id === category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsServiceDialogOpen(true);
  };

  const handlePackageClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsServiceDialogOpen(false);
    setIsPackageDialogOpen(true);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <Camera className="w-6 h-6" />;
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#ff3d00] text-sm tracking-[0.3em] mb-4 uppercase">Our Offerings</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            OUR <span className="gradient-text">SERVICES</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional photography, videography, and creative services tailored to your needs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#ff3d00] text-white'
                  : 'bg-[#111111] text-gray-400 border border-white/10 hover:border-[#ff3d00]/50 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="group relative bg-[#111111] border border-white/10 hover:border-[#ff3d00]/50 p-6 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff3d00]/0 to-[#ff3d00]/0 group-hover:from-[#ff3d00]/5 group-hover:to-transparent transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-[#ff3d00]/10 rounded-lg flex items-center justify-center text-[#ff3d00] group-hover:bg-[#ff3d00]/20 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{service.category}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#ff3d00] transition-colors">{service.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#ff3d00] font-semibold">
                    From {service.packages[0].price}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-400 group-hover:text-[#ff3d00] transition-colors">
                    View <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No services found in this category.</p>
          </div>
        )}
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#ff3d00]/10 rounded-lg flex items-center justify-center text-[#ff3d00]">
                    {getIcon(selectedService.icon)}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold">{selectedService.name}</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      {selectedService.longDescription}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#ff3d00] mb-4">Choose Your Package</h3>
                <div className="space-y-4">
                  {selectedService.packages.map((pkg, index) => (
                    <div 
                      key={index} 
                      onClick={() => handlePackageClick(pkg)}
                      className="bg-[#0a0a0a] border border-white/10 p-6 hover:border-[#ff3d00]/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold">{pkg.name}</h4>
                          <p className="text-gray-500 text-sm">{pkg.description}</p>
                        </div>
                        <span className="text-2xl font-bold text-[#ff3d00]">{pkg.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {pkg.duration}
                        </span>
                        <span>Delivery: {pkg.deliveryTime}</span>
                      </div>
                      
                      <ul className="space-y-2">
                        {pkg.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-2 text-gray-400 text-sm">
                            <Check className="w-4 h-4 text-[#ff3d00]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button className="w-full mt-4 bg-[#ff3d00] hover:bg-[#ff5722] text-white rounded-none">
                        Select This Package
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Package Booking Dialog */}
      <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white max-w-xl">
          {selectedService && selectedPackage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Book {selectedService.name}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedPackage.name} Package - {selectedPackage.price}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 space-y-4">
                <div className="bg-[#0a0a0a] p-4 border border-white/10">
                  <h4 className="font-semibold mb-2">Package Details</h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    {selectedPackage.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#ff3d00]" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Ready to book? Click below to proceed to checkout.</p>
                  <a 
                    href={`/booking?service=${selectedService.id}&package=${selectedPackage.name}`}
                    onClick={() => setIsPackageDialogOpen(false)}
                  >
                    <Button className="w-full bg-[#ff3d00] hover:bg-[#ff5722] text-white py-6 text-lg font-medium rounded-none">
                      Proceed to Booking
                    </Button>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
