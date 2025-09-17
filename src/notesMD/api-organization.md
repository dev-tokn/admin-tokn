# Next.js API Organization Structure - Gemini on 17092025

Based on the OpenAPI specification, here's the recommended folder structure for organizing API services:

## Project Structure

```
src/
├── lib/
│   ├── actions/          # Server Actions
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── business/
│   │   ├── communication/
│   │   ├── tippie/
│   │   ├── user/
│   │   └── upload/
│   ├── validations/      # Zod Schemas
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── business/
│   │   ├── communication/
│   │   ├── tippie/
│   │   ├── user/
│   │   └── upload/
│   └── types/           # TypeScript Types
│       ├── admin/
│       ├── auth/
│       ├── business/
│       ├── communication/
│       ├── tippie/
│       ├── user/
│       ├── upload/
│       └── common.ts    # Shared types
```

## Service Categories Identified

1. **Admin Services** - User management, business verification, outlet management
2. **Authentication Services** - Login, register, password management, OTP
3. **Business Services** - Business profiles, outlets, tippies management
4. **Communication Services** - Notification preferences
5. **Tippie Services** - KYC uploads, public tippie info
6. **User Services** - Profile management, password changes
7. **Upload Services** - File upload configurations

## Files to Create

### Admin Services

- `admin-users.ts` - User management (CRUD, approval, roles)
- `admin-businesses.ts` - Business verification and management
- `admin-outlets.ts` - Outlet management
- `admin-tippies.ts` - Tippie management and assignment

### Auth Services

- `auth.ts` - Login, register, logout, password management
- `otp.ts` - OTP sending and verification
- `username.ts` - Username availability checking

### Business Services

- `businesses.ts` - Business CRUD operations
- `outlets.ts` - Outlet management within businesses
- `tippies.ts` - Tippie management within outlets
- `uploads.ts` - Business-related file uploads

### Communication Services

- `preferences.ts` - Communication preference management

### Tippie Services

- `kyc.ts` - KYC document uploads
- `public.ts` - Public tippie information

### User Services

- `profile.ts` - User profile management
- `uploads.ts` - User file uploads

### Upload Services

- `config.ts` - Upload configuration
