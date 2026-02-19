import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passcode) {
      toast.error('Please enter the passcode');
      return;
    }

    setIsSubmitting(true);

    // Simulate a small delay for security
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(passcode);
    
    if (success) {
      toast.success('Access granted!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid passcode. Please try again.');
      setPasscode('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-zinc-400 hover:text-white hover:bg-zinc-800/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Booking
        </Button>

        <Card className="bg-zinc-900/90 border-zinc-800 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Admin Access
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Enter the passcode to access the admin dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="passcode" className="text-zinc-300 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  Passcode
                </Label>
                <div className="relative">
                  <Input
                    id="passcode"
                    type={showPasscode ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter passcode..."
                    className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-amber-500 focus:ring-amber-500/20 pr-12"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPasscode ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6 shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/30"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  'Access Dashboard'
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <p className="text-xs text-center text-zinc-500">
                This area is restricted to authorized personnel only. 
                Unauthorized access attempts will be logged.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-sm mt-8">
          Shotz by Corey &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
