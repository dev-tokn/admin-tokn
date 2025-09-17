import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getBusinessesAction } from '@/lib/actions/businesses';

interface UseBusinessesQueryParams {
  page?: number;
  limit?: number;
  status?: 'verified' | 'unverified';
  search?: string;
}

export function useBusinessesQuery({
  page = 1,
  limit = 10,
  status,
  search,
}: UseBusinessesQueryParams = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ['businesses', { page, limit, status, search }],
    queryFn: () => getBusinessesAction({ page, limit, status, search }, token!),
    enabled: !!token, // Only run query if token is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
