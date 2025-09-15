// Business interface - matches actual API response
export interface Business {
  id: string;
  legalName: string;
  brandName: string;
  businessType: string;
  gstNumber?: string;
  panNumber?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isVerified: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    mobileNumber: string;
    isActive: boolean;
    isVerified: boolean;
    isApproved: boolean;
    createdAt: string; // ISO date string
  };
}

// Businesses response interface - matches actual API response
export interface BusinessesResponse {
  success: boolean;
  data: {
    businesses: Business[];
  };
}

// Get businesses request parameters
export interface GetBusinessesParams {
  page?: number;
  limit?: number;
  status?: 'verified' | 'unverified';
  search?: string;
}

// Get businesses request with validation
export interface GetBusinessesRequest {
  page: number;
  limit: number;
  status?: 'verified' | 'unverified';
  search?: string;
}
