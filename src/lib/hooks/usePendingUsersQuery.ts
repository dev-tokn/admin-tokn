'use client';

import { useQuery } from '@tanstack/react-query';
import { getPendingUsersAction } from '@/lib/actions/users';
import { PendingUser } from '@/lib/types/users';
import { useSession } from 'next-auth/react';

interface UsePendingUsersQueryResult {
  data: {
    users: PendingUser[];
  } | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRefetching: boolean;
}

export function usePendingUsersQuery(): UsePendingUsersQueryResult {
  const { data: session } = useSession();

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: async () => {
      if (!session?.accessToken) {
        throw new Error('No access token available');
      }

      const result = await getPendingUsersAction(session.accessToken);

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch pending users');
      }

      return result.data;
    },
    enabled: !!session?.accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    data: data || null,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
    isRefetching,
  };
}
