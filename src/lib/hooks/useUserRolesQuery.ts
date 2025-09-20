'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getUserRolesAction } from '@/lib/actions/users';

export function useUserRolesQuery(userId: string) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ['userRoles', userId],
    queryFn: async () => {
      if (!token) {
        throw new Error('No authentication token available');
      }
      return getUserRolesAction(userId, token);
    },
    enabled: !!token && !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
