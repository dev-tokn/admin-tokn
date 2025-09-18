'use server';

import { getBusinessesSchema } from '@/lib/validations/businesses';
import { GetBusinessesRequest, BusinessesResponse, CreateBusinessAdminRequest, CreateBusinessResponse } from '@/lib/types/businesses';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nkot.co.in';

// Get businesses with token from session
export async function getBusinessesAction(params: GetBusinessesRequest, token: string) {
  try {
    // Validate the parameters
    const validationResult = getBusinessesSchema.safeParse(params);

    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      };
    }

    const validatedParams = validationResult.data;

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (validatedParams.status) {
      queryParams.append('status', validatedParams.status);
    }

    if (validatedParams.search) {
      queryParams.append('search', validatedParams.search);
    }

    // Build URL with query parameters
    const url = `${API_BASE_URL}/admin/businesses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    // Make API call
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'x-page': validatedParams.page.toString(),
        'x-limit': validatedParams.limit.toString(),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to fetch businesses',
        errors: [],
      };
    }

    const data: BusinessesResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: 'Businesses fetched successfully',
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch businesses',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Get businesses error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Create business action
export async function createBusinessAction(businessData: CreateBusinessAdminRequest, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/businesses/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(businessData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to create business',
        errors: errorData.errors || [],
      };
    }

    const data: CreateBusinessResponse = await response.json();
    return {
      success: true,
      message: 'Business created successfully',
      data,
    };
  } catch (error) {
    console.error('Create business error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}
