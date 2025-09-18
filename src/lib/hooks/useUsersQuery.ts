'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getUsersAction } from '@/lib/actions/users';

interface UseUsersQueryParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'verified' | 'unverified' | 'approved' | 'pending';
  role?: string;
  search?: string;
}

export function useUsersQuery({
  page = 1,
  limit = 10,
  status,
  role,
  search,
}: UseUsersQueryParams = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ['users', { page, limit, status, role, search }],
    queryFn: () => getUsersAction({ page, limit, status, role, search }, token!),
    enabled: !!token, // Only run query if token is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
