'use client';

import { useState, useCallback } from 'react';
import { getBusinessesAction } from '@/lib/actions/businesses';
import { GetBusinessesRequest, Business } from '@/lib/types/businesses';
import { useAuth } from '@/lib/auth';

interface UseBusinessesReturn {
  businesses: Business[];
  isLoading: boolean;
  error: string | null;
  fetchBusinesses: (params: GetBusinessesRequest) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useBusinesses(initialParams?: Partial<GetBusinessesRequest>): UseBusinessesReturn {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<GetBusinessesRequest>({
    page: 1,
    limit: 10,
    ...initialParams,
  });

  const { token } = useAuth();

  const fetchBusinesses = useCallback(async (params: GetBusinessesRequest) => {
    if (!token) {
      setError('No authentication token available');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getBusinessesAction(params, token);

      if (result.success && result.data) {
        setBusinesses(result.data.businesses);
        setCurrentParams(params);
      } else {
        setError(result.message || 'Failed to fetch businesses');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching businesses:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const refetch = useCallback(async () => {
    await fetchBusinesses(currentParams);
  }, [fetchBusinesses, currentParams]);

  return {
    businesses,
    isLoading,
    error,
    fetchBusinesses,
    refetch,
  };
}
