import { Link } from 'react-router-dom';
import { Camera, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Camera className="w-12 h-12 text-[#ff3d00]" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-[#ff3d00] hover:bg-[#ff5722] text-white px-8 py-6 text-lg font-medium rounded-none">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
