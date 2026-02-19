import { useState, useEffect, useCallback } from 'react';

const ADMIN_PASSCODE = 'Corey$r8100';
const AUTH_STORAGE_KEY = 'shotz_admin_auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously authenticated in this session
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((passcode: string): boolean => {
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}
