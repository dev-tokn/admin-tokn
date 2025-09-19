# 🎯 Tokn Admin Dashboard - API Documentation & Implementation Plan

_Created: September 17, 2025_  
_Last Updated: [Current Date]_  
_Version: 2.0_  
_Maintained by: Development Team_

## 📋 Project Context Schema

### **Current Project: Tokn Admin Dashboard**

**Purpose**: Admin dashboard to manage all system data, users, entities, and business partners  
**Scope**:

- User management (admin, merchant, tippee, tipper roles)
- Business partner management (outlets, locations, verification)
- System administration and monitoring
- Role-based access control
- API integration and data management

### **Context Definitions**

| Context    | Purpose                     | Scope                                                     |
| ---------- | --------------------------- | --------------------------------------------------------- |
| `Admin`    | System administration       | Full CRUD operations, user management, business oversight |
| `Public`   | Public-facing features      | User registration, public profiles, business listings     |
| `Partner`  | Business partner operations | Outlet management, tippee assignment, partner analytics   |
| `Internal` | Internal system operations  | Data sync, reporting, system maintenance                  |

---

## ️ Project Structure

Based on the OpenAPI specification, here's the recommended folder structure for organizing API services:

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

---

## 🎯 Service Categories Identified

1. **Admin Services** - User management, business verification, outlet management
2. **Authentication Services** - Login, register, password management, OTP
3. **Business Services** - Business profiles, outlets, tippies management
4. **Communication Services** - Notification preferences
5. **Tippie Services** - KYC uploads, public tippie info
6. **User Services** - Profile management, password changes
7. **Upload Services** - File upload configurations

---

## 📁 Files to Create

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

| Type       | Pattern                             | Example                     | Context                |
| ---------- | ----------------------------------- | --------------------------- | ---------------------- |
| Response   | `[Context][Endpoint]Response`       | `AdminGetAllUsersResponse`  | Admin user list        |
| Data Model | `[Context][Endpoint][Model]`        | `AdminGetAllUsersUser`      | Admin user data        |
| Request    | `[Context][Endpoint]Request`        | `AdminGetAllUsersRequest`   | Admin user filters     |
| Schema     | `[Context][Endpoint]Schema`         | `adminGetAllUsersSchema`    | Admin user validation  |
| Action     | `[action][Context][Endpoint]Action` | `getAdminGetAllUsersAction` | Admin user API call    |
| Hook       | `use[Action][Context][Endpoint]`    | `useGetAdminGetAllUsers`    | Admin user React hook  |
| Props      | `[ComponentName]Props`              | `AdminUserTableProps`       | Admin user table props |

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

## 📝 Key Implementation Notes

### **API Response as Single Source of Truth**

- Always match interfaces to actual API responses
- Don't assume data structure from other endpoints
- Each endpoint has its own unique response structure
- Update UI to match API response, not the other way around

### **Naming Convention Rules**

- **Always use the full pattern** - don't abbreviate for convenience
- **Be consistent** - if you start with a pattern, stick to it
- **Document exceptions** - if you must deviate, document why
- **Review regularly** - ensure team adherence to patterns
- **Update this guide** - add new patterns as they emerge

### **Context-Specific Considerations**

- **Admin Context**: Full CRUD operations, system oversight
- **Public Context**: Limited data exposure, user-friendly interfaces
- **Partner Context**: Business-focused operations, outlet management
- **Internal Context**: System operations, data processing

---

## 🔄 Integration with Naming Conventions

This document works in conjunction with `api-naming-conventions.md` to provide:

1. **This document**: Project-specific implementation plan and structure
2. **Naming conventions**: Universal patterns and best practices

Both documents should be maintained and updated as the project evolves.

---

_Last Updated: [Current Date]_  
_Version: 2.0_  
_Maintained by: Development Team_

This comprehensive guide provides:

1. **Project Context** - Clear definition of what we're working on
2. **File Organization** - How to structure the codebase
3. **Service Categories** - Logical grouping of API services
4. **Implementation Plan** - Step-by-step guide for new features
5. **Quick Reference** - Easy lookup table
6. **Benefits Explanation** - Why this approach works
7. **Integration Notes** - How it works with naming conventions

This will serve as our implementation roadmap for the Tokn admin dashboard! 🎯
