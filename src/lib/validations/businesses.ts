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

// Create business validation schema
export const createBusinessSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  legalName: z.string().min(1, 'Legal name is required'),
  brandName: z.string().min(1, 'Brand name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  entityType: z
    .enum([
      'individual',
      'partnership',
      'limited_liability',
      'private_limited_company',
      'limited_company',
    ])
    .optional(),
  gstNumber: z.string().optional(),
  panNumber: z.string().min(1, 'PAN number is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Type inference from schema
export type GetBusinessesFormData = z.infer<typeof getBusinessesSchema>;
