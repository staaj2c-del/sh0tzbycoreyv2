import { useState, useEffect, useCallback } from 'react';
import type { Booking } from '@/types/booking';

const STORAGE_KEY = 'shotz_bookings';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBookings(parsed);
      } catch (e) {
        console.error('Failed to parse bookings:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever bookings change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    }
  }, [bookings, isLoaded]);

  const addBooking = useCallback((bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  }, []);

  const updateBooking = useCallback((id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    ));
  }, []);

  const deleteBooking = useCallback((id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  }, []);

  const getBookingById = useCallback((id: string) => {
    return bookings.find(booking => booking.id === id);
  }, [bookings]);

  const getBookingsByDate = useCallback((date: string) => {
    return bookings.filter(booking => booking.date === date);
  }, [bookings]);

  return {
    bookings,
    isLoaded,
    addBooking,
    updateBooking,
    deleteBooking,
    getBookingById,
    getBookingsByDate
  };
}
