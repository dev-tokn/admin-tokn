'use server';

import { getTippeesSchema } from '@/lib/validations/tippees';
import { GetTippeesRequest, TippeesResponse } from '@/lib/types/tippees';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nkot.co.in';

// Get tippees with token from session
export async function getTippeesAction(params: GetTippeesRequest, token: string) {
  try {
    // Validate the parameters
    const validationResult = getTippeesSchema.safeParse(params);

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
    const url = `${API_BASE_URL}/admin/tippies${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

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
        message: errorData.message || 'Failed to fetch tippees',
        errors: [],
      };
    }

    const data: TippeesResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: 'Tippees fetched successfully',
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch tippees',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Get tippees error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}
