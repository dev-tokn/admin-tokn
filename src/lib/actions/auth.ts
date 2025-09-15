'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signinSchema } from '@/lib/validations';
import { SigninRequest, SigninResponse } from '@/lib/types';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nkot.co.in';

// Signin server action
export async function signinAction(formData: FormData) {
  try {
    // Extract form data
    const rawData = {
      email: formData.get('email') as string,
      countryCode: formData.get('countryCode') as string,
      mobileNumber: formData.get('mobileNumber') as string,
      userName: formData.get('userName') as string,
      password: formData.get('password') as string,
    };

    // Remove empty strings and convert to proper types
    const cleanData = Object.fromEntries(
      Object.entries(rawData).filter(([_, value]) => value !== null && value !== '')
    );

    // Validate the data
    const validationResult = signinSchema.safeParse(cleanData);

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

    const validatedData = validationResult.data;

    // Prepare API request
    const apiRequest: SigninRequest = {
      password: validatedData.password,
    };

    // Add authentication method (only one should be present due to validation)
    if (validatedData.email) {
      apiRequest.email = validatedData.email;
    } else if (validatedData.countryCode && validatedData.mobileNumber) {
      apiRequest.countryCode = validatedData.countryCode;
      apiRequest.mobileNumber = validatedData.mobileNumber;
    } else if (validatedData.userName) {
      apiRequest.userName = validatedData.userName;
    }

    // Make API call
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Login failed',
        errors: [],
      };
    }

    const data: SigninResponse = await response.json();

    if (data.success) {
      // Store token in cookie
      const cookieHeader = `auth_token=${data.data.token}; Path=/; Max-Age=${7 * 24 * 60 * 60}; HttpOnly; Secure; SameSite=Strict`;

      // Store user data in cookie (for server-side access)
      const userCookieHeader = `user_data=${encodeURIComponent(JSON.stringify(data.data.user))}; Path=/; Max-Age=${7 * 24 * 60 * 60}; HttpOnly; Secure; SameSite=Strict`;

      // Return success with headers to set cookies
      return {
        success: true,
        message: data.message,
        data: data.data,
        headers: {
          'Set-Cookie': [cookieHeader, userCookieHeader],
        },
      };
    } else {
      return {
        success: false,
        message: data.message || 'Login failed',
        errors: [],
      };
    }
  } catch (error) {
    console.error('Signin error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: [],
    };
  }
}

// Helper function to handle signin with redirect
export async function signinWithRedirect(formData: FormData) {
  const result = await signinAction(formData);

  if (result.success) {
    // Redirect to dashboard on success
    redirect('/dashboard');
  }

  // Return result for error handling
  return result;
}
