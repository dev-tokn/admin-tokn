import { z } from 'zod';

// Signin validation schema
export const signinSchema = z
  .object({
    email: z.email('Please enter a valid email address').optional(),
    countryCode: z
      .string()
      .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid country code (e.g., +1, +91)')
      .optional(),
    mobileNumber: z
      .string()
      .regex(/^[0-9]{10,15}$/, 'Please enter a valid mobile number (10-15 digits)')
      .optional(),
    userName: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username must be less than 50 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
      .optional(),
    password: z.string().min(1, 'Password is required'),
  })
  .refine(data => data.email || (data.countryCode && data.mobileNumber) || data.userName, {
    message: 'Please provide either email, mobile number with country code, or username',
    path: ['email'],
  })
  .refine(
    data => !(data.countryCode && !data.mobileNumber) && !(data.mobileNumber && !data.countryCode),
    {
      message: 'Both country code and mobile number are required for mobile authentication',
      path: ['mobileNumber'],
    }
  );

// Type inference from schema
export type SigninFormData = z.infer<typeof signinSchema>;
