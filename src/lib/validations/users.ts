import { z } from 'zod';

// Get users validation schema
export const getUsersSchema = z.object({
  page: z.number().int().min(1, 'Page must be at least 1').default(1),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .default(10),
  status: z
    .enum(['active', 'inactive', 'verified', 'unverified', 'approved', 'pending'])
    .optional(),
  role: z.string().min(1, 'Role must be at least 1 character').optional(),
  search: z
    .string()
    .min(1, 'Search term must be at least 1 character')
    .max(100, 'Search term cannot exceed 100 characters')
    .optional(),
});

// Set primary role validation schema
export const setPrimaryRoleSchema = z.object({
  roleId: z.string().min(1, 'Role ID is required'),
});

// Type inference from schemas
export type GetUsersFormData = z.infer<typeof getUsersSchema>;
export type SetPrimaryRoleFormData = z.infer<typeof setPrimaryRoleSchema>;
