import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Video, Instagram, Youtube, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { path: '/', label: 'HOME' },
  { path: '/services', label: 'SERVICES' },
  { path: '/portfolio', label: 'PORTFOLIO' },
  { path: '/booking', label: 'BOOKING' },
  { path: '/contact', label: 'CONTACT' },
];

export default function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Video className="w-8 h-8 text-[#ff3d00]" />
              <span className="text-xl font-bold tracking-wider">sh0tzbycorey</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'text-[#ff3d00]' 
                      : 'hover:text-[#ff3d00]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <a href="https://instagram.com/sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff3d00] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff3d00] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'text-[#ff3d00]' 
                      : 'hover:text-[#ff3d00]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <a href="https://instagram.com/sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff3d00] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff3d00] transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Video className="w-6 h-6 text-[#ff3d00]" />
              <span className="text-lg font-bold tracking-wider">sh0tzbycorey</span>
            </Link>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} sh0tzbycorey. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff3d00] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@sh0tzbycorey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff3d00] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-white/5">
            <p className="text-gray-600 text-sm">Photos & Films by sh0tzbycorey™</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
