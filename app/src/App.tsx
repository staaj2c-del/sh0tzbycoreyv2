import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { HomePage } from '@/sections/HomePage';
import { ServicesPage } from '@/sections/ServicesPage';
import { PortfolioPage } from '@/sections/PortfolioPage';
import { BookingPage } from '@/sections/BookingPage';
import { ContactPage } from '@/sections/ContactPage';
import { AdminPage } from '@/sections/AdminPage';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid #27272a',
          },
        }}
      />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Admin Page */}
        <Route path="/admin" element={<AdminPage />} />
        
        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
