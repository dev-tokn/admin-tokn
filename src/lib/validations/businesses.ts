import { z } from 'zod';

// Get businesses validation schema
export const getBusinessesSchema = z.object({
  page: z.number().int().min(1, 'Page must be at least 1').default(1),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .default(10),
  status: z.enum(['verified', 'unverified']).optional(),
  search: z
    .string()
    .min(1, 'Search term must be at least 1 character')
    .max(100, 'Search term cannot exceed 100 characters')
    .optional(),
});

// Type inference from schema
export type GetBusinessesFormData = z.infer<typeof getBusinessesSchema>;
