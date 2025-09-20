'use server';

import { getUsersSchema } from '@/lib/validations/users';
import {
  GetUsersRequest,
  AdminGetAllUsersResponse,
  AddRoleRequest,
  AddRoleResponse,
  DetailedUserResponse,
  PendingUsersResponse,
  UpdateUserStatusRequest,
  UpdateUserStatusResponse,
  DeleteUserResponse,
  RemoveRoleResponse,
  GetUserRolesResponse,
  SetPrimaryRoleRequest,
  SetPrimaryRoleResponse,
  RestoreUserResponse,
} from '@/lib/types/users';

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

// Get pending users for approval
export async function getPendingUsersAction(token: string) {
  try {
    const url = `${API_BASE_URL}/admin/users/pending-approval`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'x-page': '1',
        'x-limit': '100',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to fetch pending users',
        errors: [],
      };
    }

    const data: PendingUsersResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: 'Pending users fetched successfully',
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch pending users',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Get pending users error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Update user status (active/inactive, verified/unverified)
export async function updateUserStatusAction(
  userId: string,
  statusData: UpdateUserStatusRequest,
  token: string
) {
  try {
    const url = `${API_BASE_URL}/admin/users/${userId}/status`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to update user status',
        errors: [],
      };
    }

    const data: UpdateUserStatusResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to update user status',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Update user status error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Delete user
export async function deleteUserAction(userId: string, token: string) {
  try {
    const url = `${API_BASE_URL}/admin/users/${userId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to delete user',
        errors: [],
      };
    }

    const data: DeleteUserResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: 'Failed to delete user',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Delete user error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Remove role from user
export async function removeUserRoleAction(userId: string, roleId: string, token: string) {
  try {
    const url = `${API_BASE_URL}/admin/users/${userId}/roles/${roleId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to remove role',
        errors: [],
      };
    }

    const data: RemoveRoleResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: 'Failed to remove role',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Remove user role error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Get all roles for a specific user
export async function getUserRolesAction(userId: string, token: string) {
  try {
    const url = `${API_BASE_URL}/admin/users/${userId}/roles`;

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
        message: errorData.message || 'Failed to fetch user roles',
        errors: [],
      };
    }

    const data: GetUserRolesResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch user roles',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Get user roles error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Set primary role for a user
export async function setPrimaryRoleAction(
  userId: string,
  roleData: SetPrimaryRoleRequest,
  token: string
) {
  try {
    const url = `${API_BASE_URL}/admin/users/${userId}/primary-role`;

    const response = await fetch(url, {
      method: 'PUT',
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
        message: errorData.message || 'Failed to set primary role',
        errors: [],
      };
    }

    const data: SetPrimaryRoleResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to set primary role',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Set primary role error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Restore a soft deleted user
export async function restoreUserAction(userId: string, token: string) {
  try {
    const url = `${API_BASE_URL}/admin/users/${userId}/restore`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to restore user',
        errors: [],
      };
    }

    const data: RestoreUserResponse = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: 'Failed to restore user',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Restore user error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}
