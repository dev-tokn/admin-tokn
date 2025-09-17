# NextAuth.js Setup

This project uses NextAuth.js v5 with a custom credentials provider that integrates with your existing API.

## Configuration

### Authentication Provider

- **Type**: Credentials Provider
- **API Integration**: Uses your existing `/auth/login` endpoint
- **Session Strategy**: JWT-based sessions
- **Session Duration**: 7 days

### API Integration

- **Base URL**: `https://api.nkot.co.in`
- **Login Endpoint**: `/auth/login`
- **Logout Endpoint**: `/auth/logout`
- **Token Storage**: JWT tokens stored in NextAuth.js session

## File Structure

```
src/lib/auth/
├── types.ts          # NextAuth.js type extensions
├── api.ts            # API integration functions
├── utils.ts          # Authentication utilities
├── index.ts          # Main exports
└── README.md         # This file

src/lib/actions/
└── auth.ts           # NextAuth.js configuration

src/lib/validations/
└── auth.ts           # Zod schemas for validation
```

## Usage Examples

### Server-Side Authentication

```tsx
import { requireAuth, requireRole } from '@/lib/auth';

// Require authentication
export default async function ProtectedPage() {
  const session = await requireAuth();
  return <div>Welcome {session.user.firstName}!</div>;
}

// Require specific role
export default async function AdminPage() {
  const session = await requireRole(['admin']);
  return <div>Admin content</div>;
}
```

### Client-Side Authentication

```tsx
'use client';
import { useAuth } from '@/lib/hooks';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <p>Welcome {user?.firstName}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using with TanStack Query

```tsx
'use client';
import { useBusinessesQuery } from '@/lib/hooks';

function BusinessesList() {
  const { data, isLoading, error } = useBusinessesQuery({
    page: 1,
    limit: 10,
    status: 'verified',
  });

  // Query automatically uses the session token
  // No need to pass token manually
}
```

## Authentication Flow

1. **Login**: User submits credentials via `/signin` page
2. **Validation**: Credentials are validated using Zod schemas
3. **API Call**: NextAuth.js calls your `/auth/login` endpoint
4. **Session Creation**: JWT token and user data stored in session
5. **Middleware**: Routes are protected based on session status
6. **API Requests**: TanStack Query automatically includes auth token

## Available Hooks

### `useAuth()`

- `user`: Current user data
- `session`: Full session object
- `isAuthenticated`: Boolean auth status
- `isLoading`: Loading state
- `logout()`: Logout function

### `useBusinessesQuery(params)`

- Automatically uses session token
- Parameters: `page`, `limit`, `status`, `search`
- Returns: `data`, `isLoading`, `error`, `refetch`

## Server Actions

### `requireAuth()`

- Redirects to `/signin` if not authenticated
- Returns session data

### `requireRole(roles)`

- Requires specific user roles
- Redirects to `/unauthorized` if insufficient permissions

### `getServerSession()`

- Gets current session without redirects
- Returns `null` if not authenticated

## Middleware

The middleware automatically:

- Protects `/dashboard/*` routes
- Redirects authenticated users away from auth pages
- Handles route-based authentication

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://api.nkot.co.in
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Customization

### Adding New Roles

1. Update the `User` interface in `types.ts`
2. Add role checks in `utils.ts`
3. Use `requireRole()` in server components

### Adding New API Endpoints

1. Create functions in `api.ts`
2. Add validation schemas in `validations/auth.ts`
3. Create TanStack Query hooks in `hooks/`

### Custom Session Data

1. Extend the `Session` interface in `types.ts`
2. Update the JWT callback in `auth.ts`
3. Access via `session.user.customField`

## Security Features

- ✅ JWT token validation
- ✅ Automatic token refresh
- ✅ Secure cookie storage
- ✅ CSRF protection
- ✅ Role-based access control
- ✅ Route protection middleware
- ✅ API token injection

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Check API endpoint URL
   - Verify credentials format
   - Check network connectivity

2. **Session not persisting**
   - Verify `NEXTAUTH_SECRET` is set
   - Check cookie settings
   - Ensure HTTPS in production

3. **API calls failing**
   - Verify token is being passed correctly
   - Check API endpoint authentication
   - Verify token hasn't expired

### Debug Mode

Enable NextAuth.js debug mode:

```env
NEXTAUTH_DEBUG=true
```

This will log detailed authentication information to the console.
