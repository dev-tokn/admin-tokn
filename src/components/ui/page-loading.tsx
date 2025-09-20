'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PageLoadingProps {
  children: React.ReactNode;
  minLoadingTime?: number; // in milliseconds
  className?: string;
}

export function PageLoading({ children, minLoadingTime = 800, className = '' }: PageLoadingProps) {
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
      <div className={`flex justify-center ${className}`}>
        <div className="md:w-[80vw] p-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!showContent) {
    return null;
  }

  return <>{children}</>;
}

// Specialized loading components for different page types
export function TablePageLoading({
  children,
  className = '',
}: Omit<PageLoadingProps, 'minLoadingTime'>) {
  return (
    <PageLoading minLoadingTime={800} className={className}>
      {children}
    </PageLoading>
  );
}

export function FormPageLoading({
  children,
  className = '',
}: Omit<PageLoadingProps, 'minLoadingTime'>) {
  return (
    <PageLoading minLoadingTime={600} className={className}>
      {children}
    </PageLoading>
  );
}

export function DashboardPageLoading({
  children,
  className = '',
}: Omit<PageLoadingProps, 'minLoadingTime'>) {
  return (
    <PageLoading minLoadingTime={400} className={className}>
      {children}
    </PageLoading>
  );
}
