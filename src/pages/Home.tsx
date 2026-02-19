import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, ArrowRight, Star, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredServices = [
  {
    icon: <Video className="w-8 h-8" />,
    title: 'Videography',
    description: 'Music videos, events, weddings, and corporate films',
    link: '/services?category=videography'
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: 'Photography',
    description: 'Portraits, weddings, family, and event photography',
    link: '/services?category=photography'
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: 'Editing & Design',
    description: 'Video editing, color grading, and graphic design',
    link: '/services?category=editing'
  }
];

const testimonials = [
  {
    name: 'Jessica M.',
    service: 'Wedding Photography',
    text: 'Corey captured our wedding day perfectly. Every photo tells a story and brings back such beautiful memories.',
    rating: 5
  },
  {
    name: 'Marcus T.',
    service: 'Music Video',
    text: 'The music video exceeded all expectations. Professional, creative, and delivered on time. Highly recommend!',
    rating: 5
  },
  {
    name: 'Sarah K.',
    service: 'Family Portraits',
    text: 'Our family photos came out amazing. Corey made the kids feel comfortable and captured genuine moments.',
    rating: 5
  }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a00] to-[#0a0a0a]"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff3d00]/10 rounded-full blur-[100px] animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ff6b00]/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255, 61, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 61, 0, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-[#ff3d00] text-sm md:text-base tracking-[0.3em] mb-4 uppercase">Professional Photo & Video</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">sh0tzbycorey</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Capturing moments, creating memories. Professional photography and videography services for all your special events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button className="bg-[#ff3d00] hover:bg-[#ff5722] text-white px-8 py-6 text-lg font-medium rounded-none animate-pulse-glow">
                  View Services
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" className="border-white/30 hover:border-[#ff3d00] hover:text-[#ff3d00] text-white px-8 py-6 text-lg font-medium rounded-none bg-transparent">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#ff3d00] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[#ff3d00] text-sm tracking-[0.3em] mb-4 uppercase">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              OUR <span className="gradient-text">SERVICES</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From photography to videography, we offer a complete range of visual services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group relative bg-[#111111] border border-white/10 hover:border-[#ff3d00]/50 p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff3d00]/0 to-[#ff3d00]/0 group-hover:from-[#ff3d00]/5 group-hover:to-transparent transition-all duration-300"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#ff3d00] group-hover:bg-[#ff3d00]/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#ff3d00] transition-colors">{service.title}</h3>
                  <p className="text-gray-500 mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-[#ff3d00] text-sm font-medium">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-[#ff3d00] text-sm tracking-[0.3em] mb-4 uppercase">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                CAPTURING YOUR <span className="gradient-text">MOMENTS</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                With years of experience in photography and videography, we bring creativity, professionalism, and passion to every project. Your vision is our mission.
              </p>
              
              <div className="space-y-4">
                {[
                  'Professional equipment and editing',
                  'Fast turnaround times',
                  'Affordable packages for every budget',
                  'Creative direction and guidance',
                  'High-quality final products'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#ff3d00]/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#ff3d00]" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/booking">
                  <Button className="bg-[#ff3d00] hover:bg-[#ff5722] text-white px-8 py-6 text-lg font-medium rounded-none">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a Session
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-lg border border-white/10 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-white/10" />
                </div>
                <div className="aspect-square bg-gradient-to-br from-[#ff3d00]/20 to-[#ff6b00]/10 rounded-lg border border-[#ff3d00]/20 flex items-center justify-center">
                  <Video className="w-16 h-16 text-[#ff3d00]/30" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-gradient-to-br from-[#ff6b00]/10 to-[#ff3d00]/20 rounded-lg border border-[#ff3d00]/20 flex items-center justify-center">
                  <Star className="w-16 h-16 text-[#ff3d00]/30" />
                </div>
                <div className="aspect-[3/4] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-lg border border-white/10 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[#ff3d00] text-sm tracking-[0.3em] mb-4 uppercase">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              WHAT CLIENTS <span className="gradient-text">SAY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-white/10 p-8 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#ff3d00] fill-[#ff3d00]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-[#ff3d00] text-sm">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080808]">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            READY TO CREATE <span className="gradient-text">SOMETHING AMAZING?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Book your session today and let's capture your special moments together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-[#ff3d00] hover:bg-[#ff5722] text-white px-10 py-6 text-lg font-medium rounded-none animate-pulse-glow">
                Book Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/30 hover:border-[#ff3d00] hover:text-[#ff3d00] text-white px-10 py-6 text-lg font-medium rounded-none bg-transparent">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
