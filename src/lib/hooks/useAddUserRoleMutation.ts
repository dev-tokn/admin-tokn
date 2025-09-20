'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { addUserRoleAction } from '@/lib/actions/users';
import { toast } from 'sonner';
import { AddRoleRequest } from '@/lib/types/users';

export function useAddUserRoleMutation() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: async ({ userId, roleData }: { userId: string; roleData: AddRoleRequest }) => {
      if (!token) {
        throw new Error('No authentication token available');
      }
      return addUserRoleAction(userId, roleData, token);
    },
    onSuccess: data => {
      if (data.success) {
        // Invalidate and refetch user roles queries
        queryClient.invalidateQueries({ queryKey: ['userRoles'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
        toast.success(data.message || 'Role added successfully');
      } else {
        toast.error(data.message || 'Failed to add role');
      }
    },
    onError: error => {
      console.error('Add user role error:', error);
      toast.error('An unexpected error occurred while adding role');
    },
  });
}
