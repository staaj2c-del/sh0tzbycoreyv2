import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle, Phone, Mail, User, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SERVICES, TIME_SLOTS } from '@/types/booking';
import { useBookings } from '@/hooks/useBookings';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { toast } from 'sonner';

export function BookingPage() {
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const { addEventToCalendar, isSignedIn } = useGoogleCalendar();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.service) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the booking
      const booking = addBooking(formData);
      
      // If Google Calendar is connected, add the event
      if (isSignedIn) {
        const eventId = await addEventToCalendar(booking);
        if (eventId) {
          toast.success('Booking added to Google Calendar!');
        }
      }
      
      setShowSuccess(true);
      toast.success('Booking submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        notes: ''
      });
      setSelectedDate(undefined);
    } catch (error) {
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setFormData(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }));
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-zinc-900/80 border-zinc-800">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-zinc-400 mb-8">
              Thank you for your booking. We've sent a confirmation to your email.
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => setShowSuccess(false)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                Make Another Booking
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <a href="/portfolio" className="text-zinc-400 hover:text-white transition-colors">PORTFOLIO</a>
              <a href="/booking" className="text-amber-500 font-medium">BOOKING</a>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <p className="text-amber-500 font-medium tracking-wider mb-2">Book Your Session</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let's Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Something Amazing</span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Ready to capture your special moments? Book a photography or videography session with us 
                and let's create something amazing together.
              </p>
            </div>

            {/* Services */}
            <div className="grid gap-4">
              <h3 className="text-xl font-semibold text-white mb-4">Our Services</h3>
              {SERVICES.map((service) => (
                <Card key={service.id} className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{service.name}</h4>
                      <p className="text-sm text-zinc-500">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-500">${service.price}</p>
                      <p className="text-xs text-zinc-500">{service.duration} min</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-6 text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="text-sm">bookings@shotzbycorey.com</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <Card className="bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Book Your Session</CardTitle>
              <CardDescription className="text-zinc-400">
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                    className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500"
                  />
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-zinc-300">Select Service *</Label>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                  >
                    <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {SERVICES.map((service) => (
                        <SelectItem 
                          key={service.id} 
                          value={service.name}
                          className="text-white hover:bg-zinc-800"
                        >
                          {service.name} - ${service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label className="text-zinc-300">
                    <CalendarIcon className="w-4 h-4 inline mr-2" />
                    Preferred Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-zinc-950 border-zinc-800 text-white hover:bg-zinc-800",
                          !selectedDate && "text-zinc-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="bg-zinc-900"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-zinc-300">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Preferred Time *
                  </Label>
                  <Select 
                    value={formData.time} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
                  >
                    <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 max-h-60">
                      {TIME_SLOTS.map((time) => (
                        <SelectItem 
                          key={time} 
                          value={time}
                          className="text-white hover:bg-zinc-800"
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-zinc-300">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special requests or questions..."
                    className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500 min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Now'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

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
