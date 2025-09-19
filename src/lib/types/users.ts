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
  userRoles: UserRole[];
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

// User data structure returned by GET /admin/users endpoint
export interface AdminGetAllUsersUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  userName: string;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  userRoles: UserRole[];
  createdAt: string;
  updatedAt: string;
  // Note: business information is not included in GET /admin/users response
}

// Detailed user interface - matches the detailed user API response
export interface DetailedUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  dob: string;
  profilePicture: string | null;
  location: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  isActive: boolean;
  isVerified: boolean;
  isMobileVerified: boolean;
  isApproved: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userRoles: UserRole[];
  profiles: {
    tipper?: TipperProfile;
    business?: BusinessProfile | null;
  };
}

// User role interface
export interface UserRole {
  id: string;
  userId: string;
  role: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipper profile interface
export interface TipperProfile {
  id: string;
  userId: string;
  karmaPoints: number;
  totalTipsGiven: number;
  totalAmountTipped: string;
  createdAt: string;
  updatedAt: string;
}

// Business profile interface
export interface BusinessProfile {
  id: string;
  userId: string;
  // Add other business profile fields as needed
  createdAt: string;
  updatedAt: string;
}

// Response structure for GET /admin/users endpoint
export interface AdminGetAllUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminGetAllUsersUser[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
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

// Detailed user response interface
export interface DetailedUserResponse {
  success: boolean;
  message: string;
  data: {
    user: DetailedUser;
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

// Add role request interface
export interface AddRoleRequest {
  role: string;
  isPrimary: boolean;
}

// Add role response interface
export interface AddRoleResponse {
  success: boolean;
  message: string;
  data: {
    userRole: {
      id: string;
      role: string;
      isPrimary: boolean;
      createdAt: string;
    };
  };
}

// Available roles
export const AVAILABLE_ROLES = ['admin', 'tippee', 'tipper', 'moderator', 'support'] as const;

export type AvailableRole = (typeof AVAILABLE_ROLES)[number];
