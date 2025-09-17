// lib/types/user.ts
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  dob?: string;
  profilePicture?: string;
  location?: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  isVerified: boolean;
  isMobileVerified: boolean;
  isActive: boolean;
  isApproved: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  userRoles: UserRole[];
  profiles: {
    tipper?: any;
    tippie?: any;
    business?: any;
  };
}

export interface UserRole {
  id: string;
  userId: string;
  role: 'tipper' | 'tippie' | 'merchant' | 'admin';
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  userName?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  dob?: string;
  location?: string;
  email?: string;
  countryCode?: string;
  mobileNumber?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UploadResponse {
  key: string;
  url: string;
  size: number;
  contentType: string;
  originalName: string;
  purpose: string;
}

// lib/types/communication.ts
export interface CommunicationPreference {
  id: string;
  channel: 'sms' | 'email' | 'whatsapp' | 'push_notification' | 'in_app';
  isEnabled: boolean;
  priority: number;
  settings: Record<string, any>;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  timezone?: string;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly' | 'never';
  notificationTypes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePreferenceRequest {
  isEnabled?: boolean;
  priority?: number;
  settings?: Record<string, any>;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  timezone?: string;
  frequency?: 'immediate' | 'hourly' | 'daily' | 'weekly' | 'never';
  notificationTypes?: string[];
}

export interface UpdateMultiplePreferencesRequest {
  preferences: Array<{
    channel: 'sms' | 'email' | 'whatsapp' | 'push_notification' | 'in_app';
    isEnabled?: boolean;
    priority?: number;
    settings?: Record<string, any>;
    quietHoursStart?: string;
    quietHoursEnd?: string;
    timezone?: string;
    frequency?: 'immediate' | 'hourly' | 'daily' | 'weekly' | 'never';
    notificationTypes?: string[];
  }>;
}

// lib/validations/user.ts
import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(15, 'Password must not exceed 15 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain uppercase, lowercase, number and special character'
  );

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100).optional(),
  lastName: z.string().min(1, 'Last name is required').max(100).optional(),
  userName: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  dob: z.string().optional(),
  location: z.string().max(255).optional(),
  email: z.string().email('Invalid email format').optional(),
  countryCode: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Invalid country code format')
    .optional(),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, 'Mobile number must be 10-15 digits')
    .optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

// lib/validations/communication.ts
import { z } from 'zod';

const channelSchema = z.enum(['sms', 'email', 'whatsapp', 'push_notification', 'in_app']);
const frequencySchema = z.enum(['immediate', 'hourly', 'daily', 'weekly', 'never']);
const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const updatePreferenceSchema = z.object({
  isEnabled: z.boolean().optional(),
  priority: z
    .number()
    .min(1, 'Priority must be at least 1')
    .max(10, 'Priority cannot exceed 10')
    .optional(),
  settings: z.record(z.any()).optional(),
  quietHoursStart: z.string().regex(timePattern, 'Invalid time format (HH:MM)').optional(),
  quietHoursEnd: z.string().regex(timePattern, 'Invalid time format (HH:MM)').optional(),
  timezone: z.string().optional(),
  frequency: frequencySchema.optional(),
  notificationTypes: z.array(z.string()).optional(),
});

export const singlePreferenceUpdateSchema = z
  .object({
    channel: channelSchema,
    isEnabled: z.boolean().optional(),
    priority: z.number().min(1).max(10).optional(),
    settings: z.record(z.any()).optional(),
    quietHoursStart: z.string().regex(timePattern).optional(),
    quietHoursEnd: z.string().regex(timePattern).optional(),
    timezone: z.string().optional(),
    frequency: frequencySchema.optional(),
    notificationTypes: z.array(z.string()).optional(),
  })
  .required({ channel: true });

export const updateMultiplePreferencesSchema = z.object({
  preferences: z.array(singlePreferenceUpdateSchema).min(1, 'At least one preference is required'),
});

export const channelParamSchema = z.object({
  channel: channelSchema,
});

// lib/actions/user.ts
('use server');

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { updateProfileSchema, changePasswordSchema } from '@/lib/validations/user';
import type {
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UploadResponse,
} from '@/lib/types/user';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.nkot.co.in';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

function getAuthToken(): string | null {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value || null;
}

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

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

export async function getUserProfileAction() {
  try {
    const response = await apiCall<{ user: UserProfile }>('/user/profile');

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch user profile' };
  }
}

export async function updateUserProfileAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Remove empty strings
  Object.keys(rawData).forEach(key => {
    if (rawData[key] === '') {
      delete rawData[key];
    }
  });

  try {
    const validatedData = updateProfileSchema.parse(rawData);

    const response = await apiCall<{ user: UserProfile }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/dashboard/profile');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update profile' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function changePasswordAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  try {
    const validatedData = changePasswordSchema.parse(rawData);

    const response = await apiCall('/user/change-password', {
      method: 'PUT',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to change password' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to change password' };
  }
}

export async function uploadProfilePictureAction(formData: FormData) {
  try {
    const token = getAuthToken();

    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    const response = await fetch(`${API_BASE_URL}/user/upload/profile-picture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // FormData for file upload
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    if (data.success) {
      revalidatePath('/dashboard/profile');
      return { success: true, data: data.data, message: data.message };
    }

    return { success: false, error: data.message || 'Upload failed' };
  } catch (error) {
    return { success: false, error: 'Failed to upload profile picture' };
  }
}

// lib/actions/communication.ts
('use server');

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import {
  updatePreferenceSchema,
  updateMultiplePreferencesSchema,
  channelParamSchema,
} from '@/lib/validations/communication';
import type {
  CommunicationPreference,
  UpdatePreferenceRequest,
  UpdateMultiplePreferencesRequest,
} from '@/lib/types/communication';

function getAuthToken(): string | null {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value || null;
}

async function communicationApiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

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
    console.error(`Communication API call to ${endpoint} failed:`, error);
    throw error;
  }
}

export async function getCommunicationPreferencesAction() {
  try {
    const response = await communicationApiCall<{ preferences: CommunicationPreference[] }>(
      '/communication/preferences'
    );

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch communication preferences' };
  }
}

export async function getChannelPreferenceAction(channel: string) {
  try {
    const validatedChannel = channelParamSchema.parse({ channel });

    const response = await communicationApiCall<{ preference: CommunicationPreference }>(
      `/communication/preferences/${validatedChannel.channel}`
    );

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid channel' };
    }
    return { success: false, error: 'Failed to fetch channel preference' };
  }
}

export async function updateChannelPreferenceAction(channel: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string booleans to actual booleans
  if (rawData.isEnabled === 'true') rawData.isEnabled = true;
  if (rawData.isEnabled === 'false') rawData.isEnabled = false;

  // Convert string numbers to actual numbers
  if (rawData.priority) rawData.priority = parseInt(rawData.priority, 10);

  // Parse notification types if it's a JSON string
  if (rawData.notificationTypes && typeof rawData.notificationTypes === 'string') {
    try {
      rawData.notificationTypes = JSON.parse(rawData.notificationTypes);
    } catch {
      // If parsing fails, treat as empty array
      rawData.notificationTypes = [];
    }
  }

  // Remove empty strings
  Object.keys(rawData).forEach(key => {
    if (rawData[key] === '') {
      delete rawData[key];
    }
  });

  try {
    const channelValidation = channelParamSchema.parse({ channel });
    const validatedData = updatePreferenceSchema.parse(rawData);

    const response = await communicationApiCall<{ preference: CommunicationPreference }>(
      `/communication/preferences/${channelValidation.channel}`,
      {
        method: 'PUT',
        body: JSON.stringify(validatedData),
      }
    );

    if (response.success) {
      revalidatePath('/dashboard/communication');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update preference' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update channel preference' };
  }
}

export async function updateMultiplePreferencesAction(formData: FormData) {
  const preferencesData = formData.get('preferences') as string;

  try {
    const parsedData = JSON.parse(preferencesData);
    const validatedData = updateMultiplePreferencesSchema.parse(parsedData);

    const response = await communicationApiCall<{ preferences: CommunicationPreference[] }>(
      '/communication/preferences',
      {
        method: 'PUT',
        body: JSON.stringify(validatedData),
      }
    );

    if (response.success) {
      revalidatePath('/dashboard/communication');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update preferences' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update preferences' };
  }
}

export async function toggleChannelAction(channel: string) {
  try {
    const validatedChannel = channelParamSchema.parse({ channel });

    const response = await communicationApiCall<{ preference: CommunicationPreference }>(
      `/communication/preferences/${validatedChannel.channel}/toggle`,
      {
        method: 'PATCH',
      }
    );

    if (response.success) {
      revalidatePath('/dashboard/communication');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to toggle channel' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid channel' };
    }
    return { success: false, error: 'Failed to toggle channel' };
  }
}

export async function resetPreferencesToDefaultAction() {
  try {
    const response = await communicationApiCall<{ preferences: CommunicationPreference[] }>(
      '/communication/preferences/reset',
      {
        method: 'POST',
      }
    );

    if (response.success) {
      revalidatePath('/dashboard/communication');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to reset preferences' };
  } catch (error) {
    return { success: false, error: 'Failed to reset preferences to default' };
  }
}
