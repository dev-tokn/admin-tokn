// lib/types/admin.ts
export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: string;
  countryCode: string;
  email: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  dob?: string;
  profilePicture?: string;
  location?: string;
  isActive: boolean;
  isVerified: boolean;
  isMobileVerified: boolean;
  isApproved: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  userRoles: UserRole[];
  profiles?: {
    tipper?: any;
    tippie?: any;
    business?: any;
  };
}

export interface UserRole {
  id: string;
  userId: string;
  role: 'admin' | 'tipper' | 'tippie' | 'merchant';
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBusiness {
  id: string;
  legalName: string;
  brandName: string;
  businessType: string;
  entityType: string;
  gstNumber?: string;
  panNumber: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    isActive: boolean;
    isVerified: boolean;
  };
}

export interface AdminOutlet {
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
  createdAt: string;
  updatedAt: string;
  business: AdminBusiness;
}

export interface AdminTippie {
  id: string;
  userId: string;
  outletId: string;
  businessId: string;
  designation: string;
  vpa?: string;
  isKYCVerified: boolean;
  totalTipsReceived: number;
  totalAmountReceived: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: AdminUser;
  outlet: AdminOutlet;
}

// Request/Response Types
export interface CreateBusinessAdminRequest {
  userId: string;
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

export interface CreateOutletAdminRequest {
  businessId: string;
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

export interface CreateTippieAdminRequest {
  outletId: string;
  designation: string;
  firstName: string;
  lastName: string;
  userName: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  dob: string;
  location?: string;
  email?: string;
  countryCode: string;
  mobileNumber: string;
}

export interface CreateTipperAdminRequest {
  firstName: string;
  lastName: string;
  userName: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  dob: string;
  location?: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
}

export interface UpdateUserStatusRequest {
  isActive?: boolean;
  isVerified?: boolean;
}

export interface UpdateUserApprovalRequest {
  isApproved: boolean;
  isActive?: boolean;
}

export interface AddUserRoleRequest {
  role: 'admin' | 'tipper' | 'tippie' | 'merchant';
  isPrimary?: boolean;
}

export interface SetPrimaryRoleRequest {
  role: 'admin' | 'tipper' | 'tippie' | 'merchant';
}

export interface VerifyBusinessRequest {
  isVerified: boolean;
}

// lib/validations/admin.ts
import { z } from 'zod';

const roleSchema = z.enum(['admin', 'tipper', 'tippie', 'merchant']);
const genderSchema = z.enum(['male', 'female', 'other', 'prefer_not_to_say']);
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

// User Management Schemas
export const createBusinessAdminSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
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

export const createOutletAdminSchema = z.object({
  businessId: z.string().uuid('Invalid business ID format'),
  name: z.string().min(2, 'Outlet name must be at least 2 characters').max(200),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  phone: z.string().min(10).max(15).optional(),
  email: z.string().email('Invalid email format').optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const createTippieAdminSchema = z.object({
  outletId: z.string().uuid('Invalid outlet ID format'),
  designation: designationSchema,
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  userName: z.string().min(3, 'Username must be at least 3 characters').max(30),
  gender: genderSchema,
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  location: z.string().max(100).optional(),
  email: z.string().email('Invalid email format').optional(),
  countryCode: z.string().max(5),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits').max(15),
});

export const createTipperAdminSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  userName: z.string().min(3, 'Username must be at least 3 characters').max(30),
  gender: genderSchema,
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  location: z.string().max(100).optional(),
  email: z.string().email('Invalid email format'),
  countryCode: z.string().max(5),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits').max(15),
});

export const updateUserStatusSchema = z.object({
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
});

export const updateUserApprovalSchema = z.object({
  isApproved: z.boolean(),
  isActive: z.boolean().optional(),
});

export const addUserRoleSchema = z.object({
  role: roleSchema,
  isPrimary: z.boolean().default(false).optional(),
});

export const setPrimaryRoleSchema = z.object({
  role: roleSchema,
});

export const verifyBusinessSchema = z.object({
  isVerified: z.boolean(),
});

export const updateOutletStatusSchema = z.object({
  isActive: z.boolean(),
});

export const updateTippieStatusSchema = z.object({
  isActive: z.boolean(),
});

export const assignTippieOutletSchema = z.object({
  outletId: z.string().uuid('Invalid outlet ID format'),
});

export const updateVPASchema = z.object({
  vpa: z.string().max(255, 'VPA must not exceed 255 characters'),
});

// Pagination and Filter Schemas
export const userFiltersSchema = z.object({
  role: roleSchema.optional(),
  status: z.enum(['active', 'inactive']).optional(),
  search: z.string().min(1).max(100).optional(),
});

export const businessFiltersSchema = z.object({
  status: z.enum(['verified', 'unverified']).optional(),
  search: z.string().min(1).max(100).optional(),
});

export const outletFiltersSchema = z.object({
  status: z.enum(['active', 'inactive']).optional(),
  businessId: z.string().uuid().optional(),
  search: z.string().min(1).max(100).optional(),
});

export const tippieFiltersSchema = z.object({
  status: z.enum(['active', 'inactive']).optional(),
  outletId: z.string().uuid().optional(),
  businessId: z.string().uuid().optional(),
  search: z.string().min(1).max(100).optional(),
});

// lib/actions/admin/users.ts
('use server');

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import {
  updateUserStatusSchema,
  updateUserApprovalSchema,
  addUserRoleSchema,
  setPrimaryRoleSchema,
  userFiltersSchema,
} from '@/lib/validations/admin';
import type {
  AdminUser,
  UpdateUserStatusRequest,
  UpdateUserApprovalRequest,
  AddUserRoleRequest,
  SetPrimaryRoleRequest,
} from '@/lib/types/admin';

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

async function adminApiCall<T>(
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
    console.error(`Admin API call to ${endpoint} failed:`, error);
    throw error;
  }
}

// User Management Actions

export async function getAdminUsersAction(
  page?: number,
  limit?: number,
  filters?: { role?: string; status?: string; search?: string }
) {
  try {
    const headers: HeadersInit = {};
    const params = new URLSearchParams();

    if (page) headers['x-page'] = page.toString();
    if (limit) headers['x-limit'] = limit.toString();

    if (filters) {
      const validatedFilters = userFiltersSchema.parse(filters);
      if (validatedFilters.role) params.append('role', validatedFilters.role);
      if (validatedFilters.status) params.append('status', validatedFilters.status);
      if (validatedFilters.search) params.append('search', validatedFilters.search);
    }

    const queryString = params.toString();
    const endpoint = `/admin/users${queryString ? `?${queryString}` : ''}`;

    const response = await adminApiCall<{ users: AdminUser[] }>(endpoint, {
      method: 'GET',
      headers,
    });

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch users' };
  }
}

export async function getPendingApprovalUsersAction(page?: number, limit?: number) {
  try {
    const headers: HeadersInit = {};

    if (page) headers['x-page'] = page.toString();
    if (limit) headers['x-limit'] = limit.toString();

    const response = await adminApiCall<{ users: AdminUser[] }>('/admin/users/pending-approval', {
      method: 'GET',
      headers,
    });

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch pending approval users' };
  }
}

export async function getAdminUserAction(userId: string) {
  try {
    const response = await adminApiCall<{ user: AdminUser }>(`/admin/users/${userId}`);

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch user details' };
  }
}

export async function updateUserStatusAction(userId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string booleans to actual booleans
  if (rawData.isActive === 'true') rawData.isActive = true;
  if (rawData.isActive === 'false') rawData.isActive = false;
  if (rawData.isVerified === 'true') rawData.isVerified = true;
  if (rawData.isVerified === 'false') rawData.isVerified = false;

  try {
    const validatedData = updateUserStatusSchema.parse(rawData);

    const response = await adminApiCall(`/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/admin/users');
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update user status' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update user status' };
  }
}

export async function updateUserApprovalAction(userId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string booleans to actual booleans
  if (rawData.isApproved === 'true') rawData.isApproved = true;
  if (rawData.isApproved === 'false') rawData.isApproved = false;
  if (rawData.isActive === 'true') rawData.isActive = true;
  if (rawData.isActive === 'false') rawData.isActive = false;

  try {
    const validatedData = updateUserApprovalSchema.parse(rawData);

    const response = await adminApiCall(`/admin/users/${userId}/approve`, {
      method: 'PUT',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/admin/users');
      revalidatePath('/admin/users/pending-approval');
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update user approval' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update user approval' };
  }
}

export async function deleteUserAction(userId: string) {
  try {
    const response = await adminApiCall(`/admin/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.success) {
      revalidatePath('/admin/users');
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to delete user' };
  } catch (error) {
    return { success: false, error: 'Failed to delete user' };
  }
}

export async function restoreUserAction(userId: string) {
  try {
    const response = await adminApiCall(`/admin/users/${userId}/restore`, {
      method: 'PUT',
    });

    if (response.success) {
      revalidatePath('/admin/users');
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to restore user' };
  } catch (error) {
    return { success: false, error: 'Failed to restore user' };
  }
}

// User Role Management Actions

export async function getUserRolesAction(userId: string) {
  try {
    const response = await adminApiCall(`/admin/users/${userId}/roles`);

    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch user roles' };
  }
}

export async function addUserRoleAction(userId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string boolean to actual boolean
  if (rawData.isPrimary === 'true') rawData.isPrimary = true;
  if (rawData.isPrimary === 'false') rawData.isPrimary = false;

  try {
    const validatedData = addUserRoleSchema.parse(rawData);

    const response = await adminApiCall(`/admin/users/${userId}/roles`, {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/admin/users');
      return { success: true, data: response.data, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to add user role' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to add user role' };
  }
}

export async function removeUserRoleAction(userId: string, roleId: string) {
  try {
    const response = await adminApiCall(`/admin/users/${userId}/roles/${roleId}`, {
      method: 'DELETE',
    });

    if (response.success) {
      revalidatePath('/admin/users');
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to remove user role' };
  } catch (error) {
    return { success: false, error: 'Failed to remove user role' };
  }
}

export async function setPrimaryRoleAction(userId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  try {
    const validatedData = setPrimaryRoleSchema.parse(rawData);

    const response = await adminApiCall(`/admin/users/${userId}/primary-role`, {
      method: 'PUT',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/admin/users');
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to set primary role' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to set primary role' };
  }
}

// lib/actions/admin/businesses.ts
('use server');

import { revalidatePath } from 'next/cache';
import {
  createBusinessAdminSchema,
  verifyBusinessSchema,
  businessFiltersSchema,
} from '@/lib/validations/admin';
import type {
  AdminBusiness,
  CreateBusinessAdminRequest,
  VerifyBusinessRequest,
} from '@/lib/types/admin';

export async function getAdminBusinessesAction(
  page?: number,
  limit?: number,
  filters?: { status?: string; search?: string }
) {
  try {
    const headers: HeadersInit = {};
    const params = new URLSearchParams();

    if (page) headers['x-page'] = page.toString();
    if (limit) headers['x-limit'] = limit.toString();

    if (filters) {
      const validatedFilters = businessFiltersSchema.parse(filters);
      if (validatedFilters.status) params.append('status', validatedFilters.status);
      if (validatedFilters.search) params.append('search', validatedFilters.search);
    }

    const queryString = params.toString();
    const endpoint = `/admin/businesses${queryString ? `?${queryString}` : ''}`;

    const response = await adminApiCall<{ businesses: AdminBusiness[] }>(endpoint, {
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

export async function createBusinessAdminAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string numbers to actual numbers
  if (rawData.latitude) rawData.latitude = parseFloat(rawData.latitude);
  if (rawData.longitude) rawData.longitude = parseFloat(rawData.longitude);

  try {
    const validatedData = createBusinessAdminSchema.parse(rawData);

    const response = await adminApiCall<{ business: AdminBusiness }>('/admin/businesses/create', {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/admin/businesses');
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

export async function verifyBusinessAction(businessId: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as any;

  // Convert string boolean to actual boolean
  if (rawData.isVerified === 'true') rawData.isVerified = true;
  if (rawData.isVerified === 'false') rawData.isVerified = false;

  try {
    const validatedData = verifyBusinessSchema.parse(rawData);

    const response = await adminApiCall(`/admin/businesses/${businessId}/verify`, {
      method: 'PUT',
      body: JSON.stringify(validatedData),
    });

    if (response.success) {
      revalidatePath('/admin/businesses');
      return { success: true, message: response.message };
    }

    return { success: false, error: response.message || 'Failed to update business verification' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return { success: false, error: 'Failed to update business verification' };
  }
}
