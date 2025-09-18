'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { verifyBusinessAction, unverifyBusinessAction } from '@/lib/actions/admin';
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
