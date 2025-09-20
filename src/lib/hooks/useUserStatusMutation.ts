'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserStatusAction } from '@/lib/actions/users';
import { UpdateUserStatusRequest } from '@/lib/types/users';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface UseUserStatusMutationResult {
  updateUserStatus: (userId: string, statusData: UpdateUserStatusRequest) => Promise<void>;
  isUpdating: boolean;
  error: Error | null;
}

export function useUserStatusMutation(): UseUserStatusMutationResult {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateUserStatus,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: async ({
      userId,
      statusData,
    }: {
      userId: string;
      statusData: UpdateUserStatusRequest;
    }) => {
      if (!session?.accessToken) {
        throw new Error('No access token available');
      }

      const result = await updateUserStatusAction(userId, statusData, session.accessToken);

      if (!result.success) {
        throw new Error(result.message || 'Failed to update user status');
      }

      return result.data;
    },
    onSuccess: () => {
      // Invalidate and refetch users queries
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });

      // Show success toast
      toast.success('User status updated successfully');
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error(error.message || 'Failed to update user status');
    },
  });

  const handleUpdateUserStatus = async (userId: string, statusData: UpdateUserStatusRequest) => {
    try {
      await updateUserStatus({ userId, statusData });
    } catch (error) {
      // Error is handled by the mutation's onError callback
      console.error('Update user status error:', error);
    }
  };

  return {
    updateUserStatus: handleUpdateUserStatus,
    isUpdating,
    error: error as Error | null,
  };
}
