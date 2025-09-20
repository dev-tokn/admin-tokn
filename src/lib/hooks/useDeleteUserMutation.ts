'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { deleteUserAction } from '@/lib/actions/users';
import { toast } from 'sonner';

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) {
        throw new Error('No authentication token available');
      }
      return deleteUserAction(userId, token);
    },
    onSuccess: data => {
      if (data.success) {
        // Invalidate and refetch users queries
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
        toast.success(data.message || 'User deleted successfully');
      } else {
        toast.error(data.message || 'Failed to delete user');
      }
    },
    onError: error => {
      console.error('Delete user error:', error);
      toast.error('An unexpected error occurred while deleting user');
    },
  });
}
