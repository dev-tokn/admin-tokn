'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { restoreUserAction } from '@/lib/actions/users';
import { toast } from 'sonner';

export function useRestoreUserMutation() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) {
        throw new Error('No authentication token available');
      }
      return restoreUserAction(userId, token);
    },
    onSuccess: data => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
        toast.success(data.message || 'User restored successfully');
      } else {
        toast.error(data.message || 'Failed to restore user');
      }
    },
    onError: error => {
      console.error('Restore user error:', error);
      toast.error('An unexpected error occurred while restoring user');
    },
  });
}
