import { ApiResponse, LoginRequest, LoginResponse } from '@/lib/types/auth';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.nkot.co.in';

// Helper function to make API calls
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
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

// Login function for NextAuth.js credentials provider
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse | null> {
  try {
    // Remove empty fields
    const cleanData = Object.fromEntries(
      Object.entries(credentials).filter(([, value]) => value && value.toString().trim() !== '')
    );

    const response = await apiCall<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(cleanData),
    });

    if (response.success && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
}

// Logout function
export async function logoutUser(token: string): Promise<boolean> {
  try {
    await apiCall('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error('Logout API call failed:', error);
    return false;
  }
}

// Verify token function
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await apiCall('/auth/verify', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.success;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}
