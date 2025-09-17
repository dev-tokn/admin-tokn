// Export all auth utilities
export { auth, signIn, signOut, handlers } from '@/lib/actions/auth';
export * from './api';
export * from './utils';

// Re-export commonly used functions
export { getServerSession, requireAuth, requireRole } from './utils';
export { loginUser, logoutUser, verifyToken } from './api';
