// Tippee interface - matches actual API response
export interface Tippee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  userName: string;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
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

// Tippees response interface - matches actual API response
export interface TippeesResponse {
  success: boolean;
  message: string;
  data: {
    tippees: Tippee[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Get tippees request parameters
export interface GetTippeesParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'verified' | 'unverified';
  search?: string;
}

// Get tippees request with validation
export interface GetTippeesRequest {
  page: number;
  limit: number;
  status?: 'active' | 'inactive' | 'verified' | 'unverified';
  search?: string;
}
