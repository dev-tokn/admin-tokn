'use client';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { verifyBusinessAction, unverifyBusinessAction } from '@/lib/actions/admin';
import { addUserRoleAction, getDetailedUserAction } from '@/lib/actions/users';
import { AddRoleRequest } from '@/lib/types/users';
import { toast } from 'sonner';

export function useVerifyBusiness() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: async (businessId: string) => {
      if (!token) throw new Error('No authentication token');
      return verifyBusinessAction(businessId, token);
    },
    onSuccess: data => {
      if (data.success) {
        toast.success(data.message);
        // Invalidate and refetch businesses data
        queryClient.invalidateQueries({ queryKey: ['businesses'] });
      } else {
        toast.error(data.message);
      }
    },
    onError: error => {
      toast.error(error.message || 'Failed to verify business');
    },
  });
}

export function useUnverifyBusiness() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: async (businessId: string) => {
      if (!token) throw new Error('No authentication token');
      return unverifyBusinessAction(businessId, token);
    },
    onSuccess: data => {
      if (data.success) {
        toast.success(data.message);
        // Invalidate and refetch businesses data
        queryClient.invalidateQueries({ queryKey: ['businesses'] });
      } else {
        toast.error(data.message);
      }
    },
    onError: error => {
      toast.error(error.message || 'Failed to unverify business');
    },
  });
}

export function useAddUserRole() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: async ({ userId, roleData }: { userId: string; roleData: AddRoleRequest }) => {
      if (!token) throw new Error('No authentication token');
      return addUserRoleAction(userId, roleData, token);
    },
    onSuccess: data => {
      if (data.success) {
        toast.success(data.message);
        // Invalidate and refetch users data
        queryClient.invalidateQueries({ queryKey: ['users'] });
      } else {
        toast.error(data.message);
      }
    },
    onError: error => {
      toast.error(error.message || 'Failed to add role');
    },
  });
}

export function useDetailedUser(userId: string) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ['detailedUser', userId],
    queryFn: async () => {
      if (!token) throw new Error('No authentication token');
      return getDetailedUserAction(userId, token);
    },
    enabled: !!token && !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
