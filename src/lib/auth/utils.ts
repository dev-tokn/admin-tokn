import { auth } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
import { Session, User } from 'next-auth';

// Server-side auth utilities
export async function getServerSession() {
  return await auth();
}

export async function requireAuth() {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return session;
}

export async function requireRole(requiredRoles: string[]) {
  const session = await requireAuth();

  if (!session.user.roles.some(role => requiredRoles.includes(role))) {
    redirect('/unauthorized');
  }

  return session;
}

// Client-side auth utilities
export function getAuthHeaders(session: Session | null) {
  if (!session?.accessToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${session.accessToken}`,
  };
}

// Role checking utilities
export function hasRole(userRoles: string[], requiredRoles: string[]): boolean {
  return requiredRoles.some(role => userRoles.includes(role));
}

export function hasAnyRole(userRoles: string[], requiredRoles: string[]): boolean {
  return userRoles.some(role => requiredRoles.includes(role));
}

export function hasAllRoles(userRoles: string[], requiredRoles: string[]): boolean {
  return requiredRoles.every(role => userRoles.includes(role));
}

// User utilities
export function getUserDisplayName(user: User | null): string {
  if (!user) return 'User';

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.userName) {
    return user.userName;
  }
  if (user.email) {
    return user.email;
  }
  return 'User';
}

export function getUserInitials(user: User | null): string {
  if (!user) return 'U';

  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  if (user.userName) {
    return user.userName.substring(0, 2).toUpperCase();
  }
  if (user.email) {
    return user.email.substring(0, 2).toUpperCase();
  }
  return 'U';
}
