'use server';

import { getUsersSchema } from '@/lib/validations/users';
import { GetUsersRequest, AdminGetAllUsersResponse, AddRoleRequest, AddRoleResponse, DetailedUserResponse } from '@/lib/types/users';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nkot.co.in';

// Get users with token from session
export async function getUsersAction(params: GetUsersRequest, token: string) {
  try {
    // Validate the parameters
    const validationResult = getUsersSchema.safeParse(params);

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

    if (validatedParams.role) {
      queryParams.append('role', validatedParams.role);
    }

    if (validatedParams.search) {
      queryParams.append('search', validatedParams.search);
    }

    // Build URL with query parameters
    const url = `${API_BASE_URL}/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

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
        message: errorData.message || 'Failed to fetch users',
        errors: [],
      };
    }

    const data: AdminGetAllUsersResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: 'Users fetched successfully',
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch users',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Get users error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Get detailed user information
export async function getDetailedUserAction(userId: string, token: string) {
  try {
    const url = `${API_BASE_URL}/admin/users/${userId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to fetch user details',
        errors: [],
      };
    }

    const data: DetailedUserResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch user details',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Get detailed user error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Add role to user
export async function addUserRoleAction(userId: string, roleData: AddRoleRequest, token: string) {
  try {
    const url = `${API_BASE_URL}/admin/users/${userId}/roles`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to add role',
        errors: [],
      };
    }

    const data: AddRoleResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to add role',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Add user role error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}
