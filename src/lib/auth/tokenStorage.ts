'use client';

const DEV_TOKEN_KEY = 'dev_jwt_token';

export const tokenStorage = {
  // Store token in sessionStorage for development
  setDevToken: (token: string) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      sessionStorage.setItem(DEV_TOKEN_KEY, token);
    }
  },
};
