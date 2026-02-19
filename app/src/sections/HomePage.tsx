import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Video, Palette, ArrowRight, Star, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    quote: "Corey captured our wedding day perfectly. Every photo tells a story and brings back such beautiful memories.",
    name: "Jessica M.",
    service: "Wedding Photography"
  },
  {
    quote: "The music video exceeded all expectations. Professional, creative, and delivered on time. Highly recommend!",
    name: "Marcus T.",
    service: "Music Video"
  },
  {
    quote: "Our family photos came out amazing. Corey made the kids feel comfortable and captured genuine moments.",
    name: "Sarah K.",
    service: "Family Portraits"
  }
];

const features = [
  "Professional equipment and editing",
  "Fast turnaround times",
  "Affordable packages for every budget",
  "Creative direction and guidance",
  "High-quality final products"
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-white">sh0tzbycorey</a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-amber-500 font-medium">HOME</a>
              <a href="/services" className="text-zinc-400 hover:text-white transition-colors">SERVICES</a>
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
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-amber-500 font-medium tracking-wider mb-4">Professional Photo & Video</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">sh0tzbycorey</h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Capturing moments, creating memories. Professional photography and videography services for all your special events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/services')}
              variant="outline" 
              className="border-zinc-700 text-white hover:bg-zinc-800 px-8 py-6"
            >
              View Services
            </Button>
            <Button 
              onClick={() => navigate('/booking')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6"
            >
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-medium tracking-wider mb-2">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">SERVICES</span></h2>
            <p className="text-zinc-400 mt-4">From photography to videography, we offer a complete range of visual services</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-all group cursor-pointer" onClick={() => navigate('/services?category=videography')}>
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/30 transition-colors">
                  <Video className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Videography</h3>
                <p className="text-zinc-400">Music videos, events, weddings, and corporate films</p>
                <div className="flex items-center text-amber-500 mt-4 group-hover:gap-2 transition-all">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-all group cursor-pointer" onClick={() => navigate('/services?category=photography')}>
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/30 transition-colors">
                  <Camera className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Photography</h3>
                <p className="text-zinc-400">Portraits, weddings, family, and event photography</p>
                <div className="flex items-center text-amber-500 mt-4 group-hover:gap-2 transition-all">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-all group cursor-pointer" onClick={() => navigate('/services?category=editing')}>
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/30 transition-colors">
                  <Palette className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Editing & Design</h3>
                <p className="text-zinc-400">Video editing, color grading, and graphic design</p>
                <div className="flex items-center text-amber-500 mt-4 group-hover:gap-2 transition-all">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-500 font-medium tracking-wider mb-2">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                CAPTURING YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">MOMENTS</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                With years of experience in photography and videography, we bring creativity, professionalism, and passion to every project. Your vision is our mission.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center">
                <Camera className="w-32 h-32 text-amber-500/50" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                <div className="text-4xl font-bold text-amber-500 mb-2">500+</div>
                <div className="text-zinc-400">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-medium tracking-wider mb-2">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">WHAT CLIENTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">SAY</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-amber-500 text-sm">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            READY TO CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">SOMETHING AMAZING?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Book your session today and let's capture your special moments together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/booking')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6"
            >
              Book Now
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
