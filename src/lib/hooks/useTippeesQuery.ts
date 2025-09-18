'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getTippeesAction } from '@/lib/actions/tippees';

interface UseTippeesQueryParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'verified' | 'unverified';
  search?: string;
}

export function useTippeesQuery({
  page = 1,
  limit = 10,
  status,
  search,
}: UseTippeesQueryParams = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ['tippees', { page, limit, status, search }],
    queryFn: () => getTippeesAction({ page, limit, status, search }, token!),
    enabled: !!token, // Only run query if token is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
