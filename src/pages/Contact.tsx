import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#ff3d00] text-sm tracking-[0.3em] mb-4 uppercase">Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">CONTACT</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question or want to discuss a project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-8">Let's Talk</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ff3d00]/10 rounded-lg flex items-center justify-center text-[#ff3d00]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-400">hello@sh0tzbycorey.com</p>
                  <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ff3d00]/10 rounded-lg flex items-center justify-center text-[#ff3d00]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-400">(555) 123-4567</p>
                  <p className="text-gray-500 text-sm">Mon-Sat, 9am-7pm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ff3d00]/10 rounded-lg flex items-center justify-center text-[#ff3d00]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-gray-400">Available for travel</p>
                  <p className="text-gray-500 text-sm">Based in your city</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ff3d00]/10 rounded-lg flex items-center justify-center text-[#ff3d00]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-400">Monday - Saturday</p>
                  <p className="text-gray-500 text-sm">9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/sh0tzbycorey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#111111] border border-white/10 flex items-center justify-center hover:border-[#ff3d00] hover:text-[#ff3d00] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com/@sh0tzbycorey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#111111] border border-white/10 flex items-center justify-center hover:border-[#ff3d00] hover:text-[#ff3d00] transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#111111] border border-white/10 p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#ff3d00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-[#ff3d00]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="pricing">Pricing Question</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="general">General Question</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none transition-colors resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-[#ff3d00] hover:bg-[#ff5722] text-white py-6 text-lg font-medium rounded-none"
                >
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Quick answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How far in advance should I book?',
                a: 'We recommend booking at least 2-4 weeks in advance for regular sessions, and 2-3 months for weddings and large events.'
              },
              {
                q: 'What is your cancellation policy?',
                a: 'Deposits are non-refundable. Reschedules require 24 hours notice. No-shows forfeit the deposit.'
              },
              {
                q: 'How long until I receive my photos/videos?',
                a: 'Turnaround time varies by package. Standard delivery is 1-2 weeks, with rush options available.'
              },
              {
                q: 'Do you travel for events?',
                a: 'Yes! We are available for travel. Travel fees may apply for locations outside our local area.'
              },
              {
                q: 'Can I request specific shots or styles?',
                a: 'Absolutely! We encourage clients to share their vision and any specific requests before the shoot.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept Credit/Debit cards, PayPal, Cash App, and Apple Pay. A 50% deposit is required to book.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[#111111] border border-white/10 p-6">
                <h3 className="font-semibold mb-2 text-[#ff3d00]">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
