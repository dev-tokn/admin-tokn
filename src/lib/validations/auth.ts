import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(15, 'Password must not exceed 15 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain uppercase, lowercase, number and special character'
  );

const countryCodeSchema = z.string().regex(/^\+[1-9]\d{1,14}$/, 'Invalid country code format');

const mobileNumberSchema = z.string().regex(/^[0-9]{10,15}$/, 'Mobile number must be 10-15 digits');

const userNameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(50, 'Username must not exceed 50 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores');

export const loginSchema = z
  .object({
    email: z.string().email().optional(),
    countryCode: countryCodeSchema.optional(),
    mobileNumber: mobileNumberSchema.optional(),
    userName: userNameSchema.optional(),
    password: z.string().min(1, 'Password is required'),
  })
  .refine(
    data => data.email || (data.countryCode && data.mobileNumber) || data.userName,
    'Either email, mobile number with country code, or username is required'
  );

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  userName: userNameSchema,
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  dob: z.string().optional(),
  location: z.string().max(255).optional(),
  email: z.string().email().optional(),
  password: passwordSchema,
  countryCode: countryCodeSchema,
  mobileNumber: mobileNumberSchema,
  role: z.enum(['tipper', 'merchant']),
});

export const forgotPasswordSchema = z
  .object({
    email: z.string().email().optional(),
    countryCode: countryCodeSchema.optional(),
    mobileNumber: mobileNumberSchema.optional(),
    userName: userNameSchema.optional(),
  })
  .refine(
    data => data.email || (data.countryCode && data.mobileNumber) || data.userName,
    'Either email, mobile number with country code, or username is required'
  );

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
});

export const sendOTPSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  countryCode: countryCodeSchema,
  mobileNumber: mobileNumberSchema,
});

export const verifyOTPSchema = z.object({
  countryCode: countryCodeSchema,
  mobileNumber: mobileNumberSchema,
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^[0-9]+$/, 'OTP must contain only numbers'),
});

export const usernameCheckSchema = z.object({
  userName: userNameSchema,
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type SendOTPFormData = z.infer<typeof sendOTPSchema>;
export type VerifyOTPFormData = z.infer<typeof verifyOTPSchema>;
export type UsernameCheckFormData = z.infer<typeof usernameCheckSchema>;
