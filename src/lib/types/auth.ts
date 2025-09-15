// User interface - matches API response exactly
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: string;
  countryCode: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  isMobileVerified: boolean;
  isActive: boolean;
  isApproved: boolean;
  lastLoginAt?: Date;
}

// Signin request interface
export interface SigninRequest {
  email?: string;
  countryCode?: string;
  mobileNumber?: string;
  userName?: string;
  password: string;
}

// Signin response interface
export interface SigninResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Auth response type
export type AuthResponse = SigninResponse;
