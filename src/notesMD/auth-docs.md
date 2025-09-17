// lib/types/auth.ts
export interface User {
id: string;
firstName: string;
lastName: string;
userName: string;
mobileNumber: string;
countryCode: string;
email: string;
gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
dob?: string;
location?: string;
roles: string[];
isActive: boolean;
isVerified: boolean;
isMobileVerified: boolean;
isApproved: boolean;
createdAt: string;
updatedAt: string;
}

export interface LoginRequest {
email?: string;
countryCode?: string;
mobileNumber?: string;
userName?: string;
password: string;
}

export interface LoginResponse {
user: User;
token: string;
}

export interface RegisterRequest {
firstName: string;
lastName: string;
userName: string;
gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
dob?: string;
location?: string;
email?: string;
password: string;
countryCode: string;
mobileNumber: string;
role: 'tipper' | 'merchant';
}

export interface RegisterResponse {
user: User;
token: string;
requiresApproval: boolean;
}

export interface ForgotPasswordRequest {
email?: string;
countryCode?: string;
mobileNumber?: string;
userName?: string;
}

export interface ResetPasswordRequest {
newPassword: string;
}

export interface SendOTPRequest {
firstName: string;
lastName: string;
countryCode: string;
mobileNumber: string;
}

export interface VerifyOTPRequest {
countryCode: string;
mobileNumber: string;
otp: string;
}

export interface UsernameCheckResponse {
userName: string;
isAvailable: boolean;
message: string;
}

// lib/validations/auth.ts
import { z } from 'zod';

const passwordSchema = z
.string()
.min(8, 'Password must be at least 8 characters')
.max(15, 'Password must not exceed 15 characters')
.regex(
/^(?=._[a-z])(?=._[A-Z])(?=._\d)(?=._[@$!%*?&])[A-Za-z\d@$!%*?&]/,
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

// lib/actions/auth.ts
('use server');

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
loginSchema,
registerSchema,
forgotPasswordSchema,
resetPasswordSchema,
sendOTPSchema,
verifyOTPSchema,
usernameCheckSchema,
} from '@/lib/validations/auth';
import type {
LoginRequest,
LoginResponse,
RegisterRequest,
RegisterResponse,
ForgotPasswordRequest,
ResetPasswordRequest,
SendOTPRequest,
VerifyOTPRequest,
UsernameCheckResponse,
} from '@/lib/types/auth';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.nkot.co.in';

interface ApiResponse<T> {
success: boolean;
message: string;
data?: T;
}

// Helper function to make API calls
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
const url = `${API_BASE_URL}${endpoint}`;

const defaultHeaders = {
'Content-Type': 'application/json',
};

try {
const response = await fetch(url, {
...options,
headers: {
...defaultHeaders,
...options.headers,
},
});

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }

    return data;

} catch (error) {
console.error(`API call to ${endpoint} failed:`, error);
throw error;
}
}

// Get auth token from cookies
function getAuthToken(): string | null {
const cookieStore = cookies();
return cookieStore.get('auth-token')?.value || null;
}

// Set auth token in cookies
function setAuthToken(token: string) {
const cookieStore = cookies();
cookieStore.set('auth-token', token, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
maxAge: 60 _ 60 _ 24 \* 7, // 7 days
});
}

// Remove auth token from cookies
function removeAuthToken() {
const cookieStore = cookies();
cookieStore.delete('auth-token');
}

export async function loginAction(formData: FormData) {
const rawData = {
email: formData.get('email') as string,
countryCode: formData.get('countryCode') as string,
mobileNumber: formData.get('mobileNumber') as string,
userName: formData.get('userName') as string,
password: formData.get('password') as string,
};

// Remove empty fields
const cleanData = Object.fromEntries(
Object.entries(rawData).filter(([_, value]) => value && value.trim() !== '')
);

try {
const validatedData = loginSchema.parse(cleanData);

    const response = await apiCall<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    if (response.success && response.data?.token) {
      setAuthToken(response.data.token);
      revalidatePath('/dashboard');
      return { success: true, data: response.data };
    }

    return { success: false, error: response.message || 'Login failed' };

} catch (error) {
if (error instanceof z.ZodError) {
return {
success: false,
error: 'Validation failed',
fieldErrors: error.flatten().fieldErrors,
};
}
return { success: false, error: 'Login failed. Please try again.' };
}
}

export async function registerAction(formData: FormData) {
const rawData = Object.fromEntries(formData.entries()) as any;

try {
const validatedData = registerSchema.parse(rawData);

    const response = await apiCall<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    if (response.success && response.data?.token) {
      setAuthToken(response.data.token);

      if (response.data.requiresApproval) {
        redirect('/pending-approval');
      } else {
        revalidatePath('/dashboard');
        redirect('/dashboard');
      }
    }

    return { success: false, error: response.message || 'Registration failed' };

} catch (error) {
if (error instanceof z.ZodError) {
return {
success: false,
error: 'Validation failed',
fieldErrors: error.flatten().fieldErrors,
};
}
return { success: false, error: 'Registration failed. Please try again.' };
}
}

export async function logoutAction() {
const token = getAuthToken();

if (token) {
try {
await apiCall('/auth/logout', {
method: 'POST',
headers: {
Authorization: `Bearer ${token}`,
},
});
} catch (error) {
console.error('Logout API call failed:', error);
// Continue with local logout even if API call fails
}
}

removeAuthToken();
revalidatePath('/');
redirect('/login');
}

export async function forgotPasswordAction(formData: FormData) {
const rawData = {
email: formData.get('email') as string,
countryCode: formData.get('countryCode') as string,
mobileNumber: formData.get('mobileNumber') as string,
userName: formData.get('userName') as string,
};

// Remove empty fields
const cleanData = Object.fromEntries(
Object.entries(rawData).filter(([_, value]) => value && value.trim() !== '')
);

try {
const validatedData = forgotPasswordSchema.parse(cleanData);

    const response = await apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };

} catch (error) {
if (error instanceof z.ZodError) {
return {
success: false,
error: 'Validation failed',
fieldErrors: error.flatten().fieldErrors,
};
}
return { success: false, error: 'Request failed. Please try again.' };
}
}

export async function resetPasswordAction(token: string, formData: FormData) {
const rawData = {
newPassword: formData.get('newPassword') as string,
};

try {
const validatedData = resetPasswordSchema.parse(rawData);

    const response = await apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(validatedData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.success) {
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message };

} catch (error) {
if (error instanceof z.ZodError) {
return {
success: false,
error: 'Validation failed',
fieldErrors: error.flatten().fieldErrors,
};
}
return { success: false, error: 'Password reset failed. Please try again.' };
}
}

export async function sendOTPAction(formData: FormData) {
const rawData = Object.fromEntries(formData.entries()) as any;

try {
const validatedData = sendOTPSchema.parse(rawData);

    const response = await apiCall('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };

} catch (error) {
if (error instanceof z.ZodError) {
return {
success: false,
error: 'Validation failed',
fieldErrors: error.flatten().fieldErrors,
};
}
return { success: false, error: 'Failed to send OTP. Please try again.' };
}
}

export async function verifyOTPAction(formData: FormData) {
const rawData = Object.fromEntries(formData.entries()) as any;

try {
const validatedData = verifyOTPSchema.parse(rawData);

    const response = await apiCall('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };

} catch (error) {
if (error instanceof z.ZodError) {
return {
success: false,
error: 'Validation failed',
fieldErrors: error.flatten().fieldErrors,
};
}
return { success: false, error: 'OTP verification failed. Please try again.' };
}
}

export async function checkUsernameAvailabilityAction(userName: string) {
try {
const validatedData = usernameCheckSchema.parse({ userName });

    const response = await apiCall<UsernameCheckResponse>(
      `/auth/check-username/${validatedData.userName}`
    );

    return {
      success: response.success,
      data: response.data,
    };

} catch (error) {
if (error instanceof z.ZodError) {
return {
success: false,
error: 'Invalid username format',
};
}
return { success: false, error: 'Failed to check username availability' };
}
}
