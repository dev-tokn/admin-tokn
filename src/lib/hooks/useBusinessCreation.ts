'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { createBusinessAction } from '@/lib/actions/businesses';
import { CreateBusinessAdminRequest } from '@/lib/types/businesses';
import { toast } from 'sonner';

interface ApiError {
  field: string;
  message: string;
}

export function useCreateBusiness() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: async (businessData: CreateBusinessAdminRequest) => {
      if (!token) throw new Error('No authentication token');
      return createBusinessAction(businessData, token);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        // Invalidate and refetch businesses data
        queryClient.invalidateQueries({ queryKey: ['businesses'] });
      } else {
        toast.error(data.message);
        if (data.errors && data.errors.length > 0) {
          data.errors.forEach((error: ApiError) => {
            toast.error(`${error.field}: ${error.message}`);
          });
        }
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create business');
    },
  });
}
