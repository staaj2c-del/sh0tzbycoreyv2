import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Clock, User, Mail, Phone, MessageSquare, 
  Check, ChevronRight, ChevronLeft,
  Lock, Shield, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services, getServiceById, type Service, type Package } from '@/data/services';

interface BookingData {
  serviceId: string;
  packageName: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  paymentMethod: 'card' | 'paypal' | 'cashapp' | 'applepay';
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Pay securely with your card' },
  { id: 'paypal', name: 'PayPal', icon: 'P', description: 'Fast and secure checkout' },
  { id: 'cashapp', name: 'Cash App', icon: '$', description: 'Pay with Cash App' },
  { id: 'applepay', name: 'Apple Pay', icon: '🍎', description: 'Quick Apple Pay checkout' },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceId: '',
    packageName: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    paymentMethod: 'card'
  });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const serviceId = searchParams.get('service');
    const packageName = searchParams.get('package');
    
    if (serviceId) {
      const service = getServiceById(serviceId);
      if (service) {
        setSelectedService(service);
        setBookingData(prev => ({ ...prev, serviceId }));
        
        if (packageName) {
          const pkg = service.packages.find(p => p.name === packageName);
          if (pkg) {
            setSelectedPackage(pkg);
            setBookingData(prev => ({ ...prev, packageName }));
          }
        }
      }
    }
  }, [searchParams]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setBookingData(prev => ({ ...prev, serviceId: service.id, packageName: '' }));
    setSelectedPackage(null);
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setBookingData(prev => ({ ...prev, packageName: pkg.name }));
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const calculateDeposit = () => {
    if (!selectedPackage) return 0;
    const price = parseInt(selectedPackage.price.replace(/[^0-9]/g, ''));
    return Math.round(price * 0.5);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedService && selectedPackage;
      case 2:
        return bookingData.date && bookingData.time;
      case 3:
        return bookingData.name && bookingData.email && bookingData.phone;
      case 4:
        return bookingData.paymentMethod;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    // Here you would integrate with your payment processor
    console.log('Booking submitted:', bookingData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-[#ff3d00]/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-[#ff3d00]" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-gray-400 text-lg mb-8">
            Thank you for booking with sh0tzbycorey. We've sent a confirmation email to {bookingData.email}.
          </p>
          <div className="bg-[#111111] border border-white/10 p-8 mb-8 text-left">
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            <div className="space-y-3 text-gray-400">
              <p><span className="text-white">Service:</span> {selectedService?.name}</p>
              <p><span className="text-white">Package:</span> {selectedPackage?.name}</p>
              <p><span className="text-white">Date:</span> {bookingData.date}</p>
              <p><span className="text-white">Time:</span> {bookingData.time}</p>
              <p><span className="text-white">Deposit Paid:</span> ${calculateDeposit()}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            A 50% deposit has been charged. The remaining balance is due before the final delivery.
          </p>
          <a href="/" className="inline-block px-8 py-4 bg-[#ff3d00] hover:bg-[#ff5722] text-white font-medium transition-colors">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#ff3d00] text-sm tracking-[0.3em] mb-4 uppercase">Book Your Session</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">BOOKING</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select your service, choose a date, and complete your booking in minutes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s ? 'bg-[#ff3d00] text-white' : 'bg-[#111111] text-gray-500 border border-white/10'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {index < 3 && (
                <div className={`w-16 md:w-24 h-1 mx-2 ${
                  step > s ? 'bg-[#ff3d00]' : 'bg-[#111111]'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-center gap-4 md:gap-16 mb-12 text-xs md:text-sm text-gray-500">
          <span className={step >= 1 ? 'text-white' : ''}>Service</span>
          <span className={step >= 2 ? 'text-white' : ''}>Date & Time</span>
          <span className={step >= 3 ? 'text-white' : ''}>Your Info</span>
          <span className={step >= 4 ? 'text-white' : ''}>Payment</span>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Select a Service</h2>
            
            {!selectedService ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="bg-[#111111] border border-white/10 hover:border-[#ff3d00]/50 p-6 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">{service.name}</h3>
                        <p className="text-gray-500 text-sm">{service.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !selectedPackage ? (
              <div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="text-[#ff3d00] mb-4 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to services
                </button>
                <h3 className="text-xl font-semibold mb-4">{selectedService.name}</h3>
                <p className="text-gray-400 mb-6">{selectedService.longDescription}</p>
                
                <div className="space-y-4">
                  {selectedService.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      onClick={() => handlePackageSelect(pkg)}
                      className="bg-[#111111] border border-white/10 hover:border-[#ff3d00]/50 p-6 cursor-pointer transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{pkg.name}</h4>
                          <p className="text-gray-500 text-sm">{pkg.description}</p>
                        </div>
                        <span className="text-2xl font-bold text-[#ff3d00]">{pkg.price}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {pkg.duration}
                        </span>
                        <span>Delivery: {pkg.deliveryTime}</span>
                      </div>
                      <ul className="space-y-1">
                        {pkg.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                            <Check className="w-4 h-4 text-[#ff3d00]" /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && selectedService && selectedPackage && (
          <div>
            <button 
              onClick={() => setStep(1)}
              className="text-[#ff3d00] mb-4 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-semibold mb-2">Choose Date & Time</h2>
            <p className="text-gray-400 mb-6">{selectedService.name} - {selectedPackage.name}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-3">Select Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#111111] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleInputChange('time', time)}
                      className={`p-3 text-sm border transition-all ${
                        bookingData.time === time
                          ? 'border-[#ff3d00] bg-[#ff3d00]/10 text-[#ff3d00]'
                          : 'border-white/10 hover:border-[#ff3d00]/50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <div>
            <button 
              onClick={() => setStep(2)}
              className="text-[#ff3d00] mb-4 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-1" /> Full Name *
                </label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-[#111111] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-1" /> Email *
                </label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-[#111111] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 inline mr-1" /> Phone *
                </label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full bg-[#111111] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" /> Additional Notes
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any special requests or details..."
                  rows={4}
                  className="w-full bg-[#111111] border border-white/10 p-4 text-white focus:border-[#ff3d00] focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && selectedPackage && (
          <div>
            <button 
              onClick={() => setStep(3)}
              className="text-[#ff3d00] mb-4 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-semibold mb-6">Payment</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="bg-[#111111] border border-white/10 p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Service</span>
                    <span>{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Package</span>
                    <span>{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time</span>
                    <span>{bookingData.time}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-400">Total Price</span>
                      <span className="font-semibold">{selectedPackage.price}</span>
                    </div>
                  </div>
                  <div className="bg-[#ff3d00]/10 border border-[#ff3d00]/30 p-4">
                    <div className="flex justify-between text-[#ff3d00]">
                      <span>Deposit Due Now (50%)</span>
                      <span className="font-bold">${calculateDeposit()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-start gap-3 text-sm text-gray-400">
                  <Shield className="w-5 h-5 text-[#ff3d00] flex-shrink-0 mt-0.5" />
                  <p>Your payment is secure. The remaining balance will be due before final delivery.</p>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => handleInputChange('paymentMethod', method.id)}
                      className={`bg-[#111111] border p-4 cursor-pointer transition-all ${
                        bookingData.paymentMethod === method.id
                          ? 'border-[#ff3d00]'
                          : 'border-white/10 hover:border-[#ff3d00]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                          bookingData.paymentMethod === method.id ? 'bg-[#ff3d00]' : 'bg-[#1a1a1a]'
                        }`}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{method.name}</h4>
                          <p className="text-gray-500 text-sm">{method.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          bookingData.paymentMethod === method.id ? 'border-[#ff3d00]' : 'border-gray-500'
                        }`}>
                          {bookingData.paymentMethod === method.id && (
                            <div className="w-2.5 h-2.5 bg-[#ff3d00] rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>Secure SSL encrypted payment</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          {step > 1 ? (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="border-white/30 hover:border-[#ff3d00] text-white px-8 py-6 rounded-none bg-transparent"
            >
              <ChevronLeft className="w-5 h-5 mr-2" /> Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-[#ff3d00] hover:bg-[#ff5722] text-white px-8 py-6 rounded-none disabled:opacity-50"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="bg-[#ff3d00] hover:bg-[#ff5722] text-white px-8 py-6 rounded-none disabled:opacity-50"
            >
              <Zap className="w-5 h-5 mr-2" /> Pay Deposit & Book
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
