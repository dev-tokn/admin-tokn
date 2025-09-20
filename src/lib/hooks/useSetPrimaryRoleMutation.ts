'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { setPrimaryRoleAction } from '@/lib/actions/users';
import { toast } from 'sonner';

export function useSetPrimaryRoleMutation() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: string }) => {
      if (!token) {
        throw new Error('No authentication token available');
      }
      return setPrimaryRoleAction(userId, { roleId }, token);
    },
    onSuccess: data => {
      if (data.success) {
        // Invalidate and refetch user roles queries
        queryClient.invalidateQueries({ queryKey: ['userRoles'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
        toast.success(data.message || 'Primary role set successfully');
      } else {
        toast.error(data.message || 'Failed to set primary role');
      }
    },
    onError: error => {
      console.error('Set primary role error:', error);
      toast.error('An unexpected error occurred while setting primary role');
    },
  });
}
