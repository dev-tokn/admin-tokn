import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      userName: string;
      mobileNumber: string;
      countryCode: string;
      email?: string;
      gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
      dob?: string;
      location?: string;
      roles: string[];
      isActive: boolean;
      isVerified: boolean;
      isMobileVerified: boolean;
      isApproved: boolean;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession['user'];
    accessToken: string;
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    firstName: string;
    lastName: string;
    userName: string;
    mobileNumber: string;
    countryCode: string;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    dob?: string;
    location?: string;
    roles: string[];
    isActive: boolean;
    isVerified: boolean;
    isMobileVerified: boolean;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      userName: string;
      mobileNumber: string;
      countryCode: string;
      email?: string;
      gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
      dob?: string;
      location?: string;
      roles: string[];
      isActive: boolean;
      isVerified: boolean;
      isMobileVerified: boolean;
      isApproved: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginRequest {
  email?: string;
  countryCode?: string;
  mobileNumber?: string;
  userName?: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    mobileNumber: string;
    countryCode: string;
    email: string;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    dob?: string;
    location?: string;
    roles: string[];
    isActive: boolean;
    isVerified: boolean;
    isMobileVerified: boolean;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

// Credentials provider types
export interface CredentialsInput {
  email?: string;
  countryCode?: string;
  mobileNumber?: string;
  userName?: string;
  password: string;
}
