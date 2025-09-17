// lib/types/business.ts
export interface Business {
  id: string;
  userId: string;
  legalName: string;
  brandName: string;
  businessType: string;
  entityType:
    | 'individual'
    | 'partnership'
    | 'limited_liability'
    | 'private_limited_company'
    | 'limited_company';
  gstNumber?: string;
  panNumber: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  outletCount?: number;
  totalRevenue?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Outlet {
  id: string;
  businessId: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  pictures?: string[];
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
  business?: Business;
}

export interface Tippie {
  id: string;
  userId: string;
  outletId: string;
  businessId: string;
  designation:
    | 'waiter'
    | 'bartender'
    | 'barista'
    | 'delivery_person'
    | 'driver'
    | 'valet'
    | 'bellhop'
    | 'housekeeper'
    | 'masseur'
    | 'hair_stylist'
    | 'beauty_therapist'
    | 'fitness_trainer'
    | 'instructor'
    | 'performer'
    | 'artist'
    | 'craftsman'
    | 'technician'
    | 'other';
  vpa?: string;
  isKYCVerified: boolean;
  totalTipsReceived: number;
  totalAmountReceived: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    mobileNumber: string;
    isActive: boolean;
    isVerified: boolean;
  };
  qrCode?: {
    id: string;
    code: string;
    isActive: boolean;
  };
}

export interface CreateBusinessRequest {
  legalName: string;
  brandName: string;
  businessType: string;
  entityType?:
    | 'individual'
    | 'partnership'
    | 'limited_liability'
    | 'private_limited_company'
    | 'limited_company';
  gstNumber?: string;
  panNumber: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateBusinessRequest {
  legalName?: string;
  brandName?: string;
  businessType?: string;
  entityType?:
    | 'individual'
    | 'partnership'
    | 'limited_liability'
    | 'private_limited_company'
    | 'limited_company';
  gstNumber?: string;
  panNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateOutletRequest {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateTippieRequest {
  firstName: string;
  lastName: string;
  userName: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  dob: string;
  location?: string;
  designation:
    | 'waiter'
    | 'bartender'
    | 'barista'
    | 'delivery_person'
    | 'driver'
    | 'valet'
    | 'bellhop'
    | 'housekeeper'
    | 'masseur'
    | 'hair_stylist'
    | 'beauty_therapist'
    | 'fitness_trainer'
    | 'instructor'
    | 'performer'
    | 'artist'
    | 'craftsman'
    | 'technician'
    | 'other';
  email?: string;
  countryCode?: string;
  mobileNumber: string;
}

export interface UpdateVPARequest {
  vpa: string;
}

// lib/validations/business.ts
import { z } from 'zod';

const entityTypeSchema = z
  .enum([
    'individual',
    'partnership',
    'limited_liability',
    'private_limited_company',
    'limited_company',
  ])
  .default('individual');

const designationSchema = z.enum([
  'waiter',
  'bartender',
  'barista',
  'delivery_person',
  'driver',
  'valet',
  'bellhop',
  'housekeeper',
  'masseur',
  'hair_stylist',
  'beauty_therapist',
  'fitness_trainer',
  'instructor',
  'performer',
  'artist',
  'craftsman',
  'technician',
  'other',
]);

export const createBusinessSchema = z.object({
  legalName: z.string().min(2, 'Legal name must be at least 2 characters').max(200),
  brandName: z.string().min(2, 'Brand name must be at least 2 characters').max(200),
  businessType: z.string().max(50, 'Business type must not exceed 50 characters'),
  entityType: entityTypeSchema.optional(),
  gstNumber: z.string().max(20).optional(),
  panNumber: z.string().max(20, 'PAN number must not exceed 20 characters'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const updateBusinessSchema = z.object({
  legalName: z.string().min(2).max(200).optional(),
  brandName: z.string().min(2).max(200).optional(),
  businessType: z.string().max(50).optional(),
  entityType: entityTypeSchema.optional(),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const createOutletSchema = z.object({
  name: z.string().min(2, 'Outlet name must be at least 2 characters').max(100),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const updateOutletSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const createTippieSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  userName: z.string().min(3, 'Username must be at least 3 characters').max(30),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format'),
  location: z.string().max(100).optional(),
  designation: designationSchema,
  email: z.string().email().optional(),
  countryCode: z.string().max(5).default('+91').optional(),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits').max(15),
});

export const updateVPASchema = z.object({
  vpa: z.string().max(255, 'VPA must not exceed 255 characters'),
});

export const businessIdSchema = z.object({
  businessId: z.string().uuid('Invalid business ID format'),
});

export const outletIdSchema = z.object({
  outletId: z.string().uuid('Invalid outlet ID format'),
});

export const tippieIdSchema = z.object({
  tippieId: z.string().uuid('Invalid tippie ID format'),
});

// lib/actions/business.ts
('use server');

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import {
  createBusinessSchema,
  updateBusinessSchema,
  createOutletSchema,
  updateOutletSchema,
  createTippieSchema,
  updateVPASchema,
  businessIdSchema,
  outletIdSchema,
  tippieIdSchema,
} from '@/lib/validations/business';
import type {
  Business,
  Outlet,
  Tippie,
  CreateBusinessRequest,
  UpdateBusinessRequest,
  CreateOutletRequest,
  CreateTippieRequest,
  UpdateVPARequest,
} from '@/lib/types/business';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.nkot.co.in';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Get auth token from cookies
function getAuthToken(): string | null {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value || null;
}

// Helper function to make authenticated API calls
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

// Business Management Actions

export async function getBusinessesAction(page?: number, limit?: number) {
  try {
    const headers: HeadersInit = {};

    if (page) headers['x-page'] = page.toString();
    if (limit) headers['x-limit'] = limit.toString();

    const response = await apiCall<Business[]>('/businesses', {
      method: 'GET',
      headers,
    });

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch businesses' };
  }
}

export async function createBusinessAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string numbers to actual numbers
  if (rawData.latitude) rawData.latitude = parseFloat(rawData.latitude);
  if (rawData.longitude) rawData.longitude = parseFloat(rawData.longitude);

  try {
    const validatedData = createBusinessSchema.parse(rawData);

    const response = await apiCall<Business>('/businesses', {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/dashboard/businesses');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to create business' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to create business' };
  }
}

export async function getBusinessProfileAction(businessId: string) {
  try {
    const validatedData = businessIdSchema.parse({ businessId });

    const response = await apiCall<Business>(`/businesses/${validatedData.businessId}/profile`);

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid business ID' };
    }
    return { success: false, error: 'Failed to fetch business profile' };
  }
}

export async function updateBusinessProfileAction(businessId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string numbers to actual numbers and remove empty strings
  Object.keys(rawData).forEach(key => {
    if (rawData[key] === '') {
      delete rawData[key];
    } else if (key === 'latitude' || key === 'longitude') {
      rawData[key] = parseFloat(rawData[key]);
    }
  });

  try {
    const businessValidation = businessIdSchema.parse({ businessId });
    const validatedData = updateBusinessSchema.parse(rawData);

    const response = await apiCall<Business>(
      `/businesses/${businessValidation.businessId}/profile`,
      {
        method: 'PUT',
        body: JSON.stringify(validatedData),
      }
    );

    if (response.success) {
      revalidatePath(`/dashboard/businesses/${businessId}`);
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update business' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update business profile' };
  }
}

// Outlet Management Actions

export async function getOutletsAction(businessId: string, page?: number, limit?: number) {
  try {
    const businessValidation = businessIdSchema.parse({ businessId });
    const headers: HeadersInit = {};

    if (page) headers['x-page'] = page.toString();
    if (limit) headers['x-limit'] = limit.toString();

    const response = await apiCall<Outlet[]>(
      `/businesses/${businessValidation.businessId}/outlets`,
      {
        method: 'GET',
        headers,
      }
    );

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid business ID' };
    }
    return { success: false, error: 'Failed to fetch outlets' };
  }
}

export async function createOutletAction(businessId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string numbers to actual numbers and remove empty strings
  Object.keys(rawData).forEach(key => {
    if (rawData[key] === '') {
      delete rawData[key];
    } else if (key === 'latitude' || key === 'longitude') {
      rawData[key] = parseFloat(rawData[key]);
    }
  });

  try {
    const businessValidation = businessIdSchema.parse({ businessId });
    const validatedData = createOutletSchema.parse(rawData);

    const response = await apiCall<Outlet>(`/businesses/${businessValidation.businessId}/outlets`, {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath(`/dashboard/businesses/${businessId}/outlets`);
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to create outlet' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to create outlet' };
  }
}

export async function updateOutletAction(businessId: string, outletId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string numbers to actual numbers and remove empty strings
  Object.keys(rawData).forEach(key => {
    if (rawData[key] === '') {
      delete rawData[key];
    } else if (key === 'latitude' || key === 'longitude') {
      rawData[key] = parseFloat(rawData[key]);
    }
  });

  try {
    const businessValidation = businessIdSchema.parse({ businessId });
    const outletValidation = outletIdSchema.parse({ outletId });
    const validatedData = updateOutletSchema.parse(rawData);

    const response = await apiCall<Outlet>(
      `/businesses/${businessValidation.businessId}/outlets/${outletValidation.outletId}`,
      {
        method: 'PUT',
        body: JSON.stringify(validatedData),
      }
    );

    if (response.success) {
      revalidatePath(`/dashboard/businesses/${businessId}/outlets`);
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update outlet' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update outlet' };
  }
}

// Tippie Management Actions

export async function getTippiesAction(
  businessId: string,
  outletId: string,
  page?: number,
  limit?: number
) {
  try {
    const businessValidation = businessIdSchema.parse({ businessId });
    const outletValidation = outletIdSchema.parse({ outletId });
    const headers: HeadersInit = {};

    if (page) headers['x-page'] = page.toString();
    if (limit) headers['x-limit'] = limit.toString();

    const response = await apiCall<Tippie[]>(
      `/businesses/${businessValidation.businessId}/outlets/${outletValidation.outletId}/tippies`,
      {
        method: 'GET',
        headers,
      }
    );

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid business or outlet ID' };
    }
    return { success: false, error: 'Failed to fetch tippies' };
  }
}

export async function createTippieAction(businessId: string, outletId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  try {
    const businessValidation = businessIdSchema.parse({ businessId });
    const outletValidation = outletIdSchema.parse({ outletId });
    const validatedData = createTippieSchema.parse(rawData);

    const response = await apiCall<Tippie>(
      `/businesses/${businessValidation.businessId}/outlets/${outletValidation.outletId}/tippies`,
      {
        method: 'POST',
        body: JSON.stringify(validatedData),
      }
    );

    if (response.success) {
      revalidatePath(`/dashboard/businesses/${businessId}/outlets/${outletId}/tippies`);
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to create tippie' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to create tippie' };
  }
}

export async function updateTippieVPAAction(tippieId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  try {
    const tippieValidation = tippieIdSchema.parse({ tippieId });
    const validatedData = updateVPASchema.parse(rawData);

    const response = await apiCall<Tippie>(`/businesses/tippies/${tippieValidation.tippieId}/vpa`, {
      method: 'PUT',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/dashboard/tippies');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update VPA' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update VPA' };
  }
}

export async function removeTippieVPAAction(tippieId: string) {
  try {
    const tippieValidation = tippieIdSchema.parse({ tippieId });

    const response = await apiCall(`/businesses/tippies/${tippieValidation.tippieId}/vpa`, {
      method: 'DELETE',
    });

    if (response.success) {
      revalidatePath('/dashboard/tippies');
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to remove VPA' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid tippie ID' };
    }
    return { success: false, error: 'Failed to remove VPA' };
  }
}

// File Upload Actions

export async function uploadOutletPictureAction(outletId: string, formData: FormData) {
  try {
    const outletValidation = outletIdSchema.parse({ outletId });
    const token = getAuthToken();

    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    const response = await fetch(
      `${API_BASE_URL}/businesses/upload/outlet-picture/${outletValidation.outletId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // FormData for file upload
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    if (data.success) {
      revalidatePath('/dashboard/outlets');
      return { success: true, data: data.data, message: data.message };
    }

    return { success: false, error: data.message || 'Upload failed' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid outlet ID' };
    }
    return { success: false, error: 'Failed to upload outlet picture' };
  }
}

export async function removeOutletPictureAction(outletId: string, fileKey: string) {
  try {
    const outletValidation = outletIdSchema.parse({ outletId });

    const response = await apiCall(
      `/businesses/upload/outlet-picture/${outletValidation.outletId}/${fileKey}`,
      {
        method: 'DELETE',
      }
    );

    if (response.success) {
      revalidatePath('/dashboard/outlets');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to remove picture' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid outlet ID' };
    }
    return { success: false, error: 'Failed to remove outlet picture' };
  }
}
