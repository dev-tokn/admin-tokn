'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface FormLoadingProps {
  children: React.ReactNode;
  minLoadingTime?: number; // in milliseconds
  className?: string;
}

export function FormLoading({ children, minLoadingTime = 600, className = '' }: FormLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay to ensure smooth transition
      setTimeout(() => setShowContent(true), 100);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  if (isLoading) {
    return (
      <div className={`container mx-auto max-w-2xl p-4 ${className}`}>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form fields skeleton */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            {/* Submit button skeleton */}
            <div className="pt-4">
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showContent) {
    return null;
  }

  return <>{children}</>;
}
