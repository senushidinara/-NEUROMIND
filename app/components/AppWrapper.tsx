'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [showSplash, setShowSplash] = useState(true); // Enabled for full experience
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // Always show splash for better user experience
      // Force dismiss splash screen after 8 seconds max
      const forceTimeout = setTimeout(() => {
        setShowSplash(false);
      }, 8000);

      return () => clearTimeout(forceTimeout);
    } catch (error) {
      console.error('Error in AppWrapper:', error);
      setHasError(true);
      setShowSplash(false);
    }
  }, []);

  const handleSplashFinish = () => {
    try {
      setShowSplash(false);
    } catch (error) {
      console.error('Error finishing splash:', error);
      setShowSplash(false);
    }
  };

  if (hasError) {
    return <>{children}</>;
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <>{children}</>;
}
