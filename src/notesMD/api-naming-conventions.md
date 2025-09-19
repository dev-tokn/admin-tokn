# 🎯 API Implementation Naming Convention Guide

## �� Context Schema

### Current Project Context
**Project**: Tokn Admin Dashboard  
**Purpose**: Admin dashboard to manage all system data, users, entities, and business partners  
**Scope**: 
- User management (admin, merchant, tippee, tipper roles)
- Business partner management (outlets, locations, verification)
- System administration and monitoring
- Role-based access control

### Context Definitions
| Context | Purpose | Scope |
|---------|---------|-------|
| `Admin` | System administration | Full CRUD operations, user management, business oversight |
| `Public` | Public-facing APIs | User registration, public profiles, non-sensitive data |
| `Internal` | Internal system operations | Analytics, data sync, background processes |
| `Partner` | Business partner operations | Outlet management, tippee/tipper operations |

---

## 🏗️ Core Naming Principles

### **Primary Rule**
Every interface, function, and hook should clearly indicate:
1. **What API endpoint** it's for
2. **What type** of data it represents  
3. **The context** (admin, public, internal, partner)
4. **The action** (get, create, update, delete)

### **Pattern Structure**
```
[Context][Endpoint][Type][Specificity]
```

---

##  Type Definitions

### **Response Interfaces**
```typescript
// Pattern: [Context][Endpoint]Response
export interface AdminGetAllUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminGetAllUsersUser[];
    pagination: PaginationInfo;
  };
}

export interface AdminGetBusinessPartnersResponse {
  success: boolean;
  message: string;
  data: {
    businesses: AdminGetBusinessPartnersBusiness[];
    pagination: PaginationInfo;
  };
}

export interface PublicGetUserProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: PublicUserProfile;
  };
}

export interface PartnerGetOutletDetailsResponse {
  success: boolean;
  message: string;
  data: {
    outlet: PartnerGetOutletDetailsOutlet;
  };
}
```

### **Data Model Interfaces**
```typescript
// Pattern: [Context][Endpoint][ModelType]
export interface AdminGetAllUsersUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userRoles: UserRole[];
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  // Note: business info not included in list view
}

export interface AdminGetUserDetailsUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userRoles: UserRole[];
  profiles: {
    tipper?: TipperProfile;
    business?: BusinessProfile | null;
  };
  // Note: includes detailed profile information
}

export interface AdminGetBusinessPartnersBusiness {
  id: string;
  legalName: string;
  brandName: string;
  businessType: string;
  isVerified: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PublicUserProfile {
  id: string;
  displayName: string;
  avatar?: string;
  // Note: only public-safe fields
}

export interface PartnerGetOutletDetailsOutlet {
  id: string;
  name: string;
  location: OutletLocation;
  tippees: TippeeInfo[];
  // Note: partner-specific outlet data
}
```

### **Request Interfaces**
```typescript
// Pattern: [Context][Endpoint]Request
export interface AdminGetAllUsersRequest {
  page: number;
  limit: number;
  status?: 'active' | 'inactive' | 'verified' | 'unverified' | 'approved' | 'pending';
  role?: string;
  search?: string;
}

export interface AdminCreateBusinessPartnerRequest {
  userId: string;
  legalName: string;
  brandName: string;
  businessType: string;
  entityType?: EntityType;
  gstNumber?: string;
  panNumber: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
}

export interface PublicCreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  mobileNumber: string;
}

export interface PartnerUpdateOutletRequest {
  outletId: string;
  name?: string;
  location?: OutletLocation;
  operatingHours?: OperatingHours;
}
```

---

## 🔍 Validation Schemas

```typescript
// Pattern: [Context][Endpoint][Type]Schema
export const adminGetAllUsersSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  status: z.enum(['active', 'inactive', 'verified', 'unverified', 'approved', 'pending']).optional(),
  role: z.string().optional(),
  search: z.string().min(1).max(100).optional(),
});

export const adminCreateBusinessPartnerSchema = z.object({
  userId: z.string().uuid(),
  legalName: z.string().min(1).max(255),
  brandName: z.string().min(1).max(255),
  businessType: z.string().min(1).max(100),
  entityType: z.enum(['individual', 'partnership', 'limited_liability', 'private_limited_company', 'limited_company']).optional(),
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const publicCreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  countryCode: z.string().regex(/^\+\d{1,4}$/),
  mobileNumber: z.string().regex(/^[0-9]{10}$/),
});

// Type inference
export type AdminGetAllUsersFormData = z.infer<typeof adminGetAllUsersSchema>;
export type AdminCreateBusinessPartnerFormData = z.infer<typeof adminCreateBusinessPartnerSchema>;
export type PublicCreateUserFormData = z.infer<typeof publicCreateUserSchema>;
```

---

## ⚡ API Action Functions

```typescript
// Pattern: [action][Context][Endpoint]Action
export async function getAdminGetAllUsersAction(
  params: AdminGetAllUsersRequest,
  token: string
): Promise<ApiResponse<AdminGetAllUsersResponse>> {
  // Implementation
}

export async function createAdminBusinessPartnerAction(
  businessData: AdminCreateBusinessPartnerRequest,
  token: string
): Promise<ApiResponse<AdminCreateBusinessPartnerResponse>> {
  // Implementation
}

export async function getAdminUserDetailsAction(
  userId: string,
  token: string
): Promise<ApiResponse<AdminGetUserDetailsResponse>> {
  // Implementation
}

export async function updateAdminUserRoleAction(
  userId: string,
  roleData: AdminUpdateUserRoleRequest,
  token: string
): Promise<ApiResponse<AdminUpdateUserRoleResponse>> {
  // Implementation
}

export async function createPublicUserAction(
  userData: PublicCreateUserRequest
): Promise<ApiResponse<PublicCreateUserResponse>> {
  // Implementation
}

export async function getPartnerOutletDetailsAction(
  outletId: string,
  token: string
): Promise<ApiResponse<PartnerGetOutletDetailsResponse>> {
  // Implementation
}
```

---

##  React Hooks

```typescript
// Pattern: use[Action][Context][Endpoint]
export function useGetAdminGetAllUsers(params: AdminGetAllUsersParams) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ['admin', 'getAllUsers', params],
    queryFn: () => getAdminGetAllUsersAction(params, token!),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateAdminBusinessPartner() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: (businessData: AdminCreateBusinessPartnerRequest) =>
      createAdminBusinessPartnerAction(businessData, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'getBusinessPartners'] });
    },
  });
}

export function useGetAdminUserDetails(userId: string) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ['admin', 'getUserDetails', userId],
    queryFn: () => getAdminUserDetailsAction(userId, token!),
    enabled: !!token && !!userId,
  });
}

export function useUpdateAdminUserRole() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: ({ userId, roleData }: { userId: string; roleData: AdminUpdateUserRoleRequest }) =>
      updateAdminUserRoleAction(userId, roleData, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'getAllUsers'] });
    },
  });
}

export function useCreatePublicUser() {
  return useMutation({
    mutationFn: createPublicUserAction,
    onSuccess: (data) => {
      // Handle success
    },
  });
}

export function useGetPartnerOutletDetails(outletId: string) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ['partner', 'getOutletDetails', outletId],
    queryFn: () => getPartnerOutletDetailsAction(outletId, token!),
    enabled: !!token && !!outletId,
  });
}
```

---

## 🧩 Component Props Interfaces

```typescript
// Pattern: [ComponentName]Props
export interface AdminUserTableProps {
  users: AdminGetAllUsersUser[];
  onUserSelect: (user: AdminGetAllUsersUser) => void;
  onAddRole: (user: AdminGetAllUsersUser) => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export interface AdminBusinessPartnerFormProps {
  onSubmit: (data: AdminCreateBusinessPartnerFormData) => void;
  isLoading: boolean;
  selectedUserId?: string;
  onUserSelect: (userId: string) => void;
}

export interface AdminUserDetailsDialogProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface PublicUserProfileProps {
  user: PublicUserProfile;
  showContactInfo?: boolean;
  onEdit?: () => void;
}

export interface PartnerOutletCardProps {
  outlet: PartnerGetOutletDetailsOutlet;
  onEdit: (outletId: string) => void;
  onViewDetails: (outletId: string) => void;
}
```

---

## 📁 File Organization

```
src/
├── lib/
│   ├── types/
│   │   ├── admin-users.ts              # Admin user management types
│   │   ├── admin-business-partners.ts  # Admin business partner types
│   │   ├── public-users.ts             # Public user types
│   │   ├── partner-outlets.ts          # Partner outlet types
│   │   └── internal-analytics.ts       # Internal system types
│   ├── validations/
│   │   ├── admin-users.ts              # Admin user validations
│   │   ├── admin-business-partners.ts  # Admin business validations
│   │   ├── public-users.ts             # Public user validations
│   │   └── partner-outlets.ts          # Partner outlet validations
│   ├── actions/
│   │   ├── admin-users.ts              # Admin user actions
│   │   ├── admin-business-partners.ts  # Admin business actions
│   │   ├── public-users.ts             # Public user actions
│   │   └── partner-outlets.ts          # Partner outlet actions
│   └── hooks/
│       ├── useAdminUsers.ts            # Admin user hooks
│       ├── useAdminBusinessPartners.ts # Admin business hooks
│       ├── usePublicUsers.ts           # Public user hooks
│       └── usePartnerOutlets.ts        # Partner outlet hooks
├── components/
│   ├── admin/
│   │   ├── users/
│   │   │   ├── AdminUserTable.tsx
│   │   │   ├── AdminUserDetailsDialog.tsx
│   │   │   └── AdminAddRoleDialog.tsx
│   │   └── business-partners/
│   │       ├── AdminBusinessPartnerForm.tsx
│   │       └── AdminBusinessPartnerTable.tsx
│   ├── public/
│   │   └── users/
│   │       └── PublicUserProfile.tsx
│   └── partner/
│       └── outlets/
│           ├── PartnerOutletCard.tsx
│           └── PartnerOutletDetails.tsx
```

---

## 🎯 Context-Specific Examples

### **Admin Context** - System Administration
- `AdminGetAllUsers*` - Admin dashboard user list
- `AdminGetUserDetails*` - Admin detailed user view  
- `AdminCreateBusinessPartner*` - Admin business creation
- `AdminUpdateUserRole*` - Admin role management
- `AdminGetSystemStats*` - Admin analytics dashboard

### **Public Context** - Public-Facing APIs
- `PublicGetUserProfile*` - Public user profile
- `PublicCreateUser*` - Public user registration
- `PublicUpdateProfile*` - Public profile updates
- `PublicGetBusinessList*` - Public business directory

### **Partner Context** - Business Partner Operations
- `PartnerGetOutletDetails*` - Partner outlet management
- `PartnerCreateTippee*` - Partner tippee creation
- `PartnerUpdateOutlet*` - Partner outlet updates
- `PartnerGetAnalytics*` - Partner performance metrics

### **Internal Context** - Internal System Operations
- `InternalGetUserStats*` - Internal user analytics
- `InternalSyncUserData*` - Internal data synchronization
- `InternalProcessPayments*` - Internal payment processing
- `InternalGenerateReports*` - Internal reporting

---

## 📊 Quick Reference Table

| Type | Pattern | Example | Context |
|------|---------|---------|---------|
| Response | `[Context][Endpoint]Response` | `AdminGetAllUsersResponse` | Admin user list |
| Data Model | `[Context][Endpoint][Model]` | `AdminGetAllUsersUser` | Admin user data |
| Request | `[Context][Endpoint]Request` | `AdminGetAllUsersRequest` | Admin user filters |
| Schema | `[Context][Endpoint]Schema` | `adminGetAllUsersSchema` | Admin user validation |
| Action | `[action][Context][Endpoint]Action` | `getAdminGetAllUsersAction` | Admin user API call |
| Hook | `use[Action][Context][Endpoint]` | `useGetAdminGetAllUsers` | Admin user React hook |
| Props | `[ComponentName]Props` | `AdminUserTableProps` | Admin user table props |

---

## ✅ Benefits of This Pattern

### **Immediate Clarity**
- `AdminGetAllUsersUser` vs `AdminGetUserDetailsUser` - clear distinction
- `PublicUserProfile` vs `AdminGetAllUsersUser` - context is obvious
- `PartnerGetOutletDetailsOutlet` vs `AdminGetBusinessPartnersBusiness` - purpose is clear

### **No Confusion**
- Each interface has a unique, descriptive name
- Context prevents naming conflicts
- Endpoint specificity eliminates ambiguity

### **Easy Maintenance**
- Find all related code by searching for the pattern
- Refactoring becomes straightforward
- New team members understand immediately

### **Self-Documenting**
- Code becomes its own documentation
- API structure is clear from naming
- Business logic is evident from context

### **Scalable Architecture**
- Works for any number of endpoints
- Supports multiple contexts seamlessly
- Grows with the application

---

## 🚀 Implementation Checklist

When implementing a new API endpoint:

- [ ] **Define Context**: Admin, Public, Partner, or Internal?
- [ ] **Identify Endpoint**: What API endpoint is this for?
- [ ] **Create Response Interface**: `[Context][Endpoint]Response`
- [ ] **Create Data Model**: `[Context][Endpoint][Model]`
- [ ] **Create Request Interface**: `[Context][Endpoint]Request`
- [ ] **Create Validation Schema**: `[Context][Endpoint]Schema`
- [ ] **Create API Action**: `[action][Context][Endpoint]Action`
- [ ] **Create React Hook**: `use[Action][Context][Endpoint]`
- [ ] **Create Component Props**: `[ComponentName]Props`
- [ ] **Update File Organization**: Place in appropriate context folder
- [ ] **Add Documentation**: Update this guide with new patterns

---

## 📝 Notes

- **Always use the full pattern** - don't abbreviate for convenience
- **Be consistent** - if you start with a pattern, stick to it
- **Document exceptions** - if you must deviate, document why
- **Review regularly** - ensure team adherence to patterns
- **Update this guide** - add new patterns as they emerge

---

*Last Updated: [Current Date]*  
*Version: 1.0*  
*Maintained by: Development Team*
```

This comprehensive guide provides:

1. **Context Schema** - Clear definition of what we're working on
2. **Complete Naming Patterns** - For all types of code
3. **Real Examples** - Based on our current Tokn admin dashboard
4. **File Organization** - How to structure the codebase
5. **Implementation Checklist** - Step-by-step guide for new features
6. **Quick Reference** - Easy lookup table
7. **Benefits Explanation** - Why this approach works

This will serve as our single source of truth for naming conventions across all future projects! 🎯
