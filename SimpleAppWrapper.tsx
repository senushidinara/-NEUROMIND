'use client';

interface SimpleAppWrapperProps {
  children: React.ReactNode;
}

export default function SimpleAppWrapper({ children }: SimpleAppWrapperProps) {
  return <>{children}</>;
}
