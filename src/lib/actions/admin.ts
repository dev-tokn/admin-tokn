'use server';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nkot.co.in';

// Verify business action
export async function verifyBusinessAction(businessId: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/businesses/${businessId}/verify`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isVerified: true,
      }),
    });
    console.log(`${API_BASE_URL}/admin/businesses/${businessId}/verify`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to verify business',
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Business verified successfully',
      data,
    };
  } catch (error) {
    console.error('Verify business error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

// Unverify business action
export async function unverifyBusinessAction(businessId: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/businesses/${businessId}/verify`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isVerified: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Failed to unverify business',
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Business unverified successfully',
      data,
    };
  } catch (error) {
    console.error('Unverify business error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}
