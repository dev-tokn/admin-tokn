// User interface - matches actual API response
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  userName: string;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  roles: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  profile?: {
    id: string;
    bio?: string;
    avatar?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  business?: {
    id: string;
    legalName: string;
    brandName: string;
    businessType: string;
    isVerified: boolean;
  };
}

// Users response interface - matches actual API response
export interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Get users request parameters
export interface GetUsersParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'verified' | 'unverified' | 'approved' | 'pending';
  role?: string;
  search?: string;
}

// Get users request with validation
export interface GetUsersRequest {
  page: number;
  limit: number;
  status?: 'active' | 'inactive' | 'verified' | 'unverified' | 'approved' | 'pending';
  role?: string;
  search?: string;
}
