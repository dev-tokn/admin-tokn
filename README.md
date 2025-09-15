# 🚀 Admin Tokn

## 📁 Project Structure

```
admin-tokn/
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── README.md
├── public/
│   └── favicon.ico
├── src/
│   ├── middleware.ts
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── (register)/
│   │   │   │   └── page.tsx
│   │   │   ├── reset/
│   │   │   │   └── page.tsx
│   │   │   └── signin/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── AppSideBar.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── NavBar.tsx
│   │   │   ├── page.tsx
│   │   │   └── partners/
│   │   │       ├── (partnerTable)/
│   │   │       │   ├── columns.tsx
│   │   │       │   └── partner-table.tsx
│   │   │       ├── add/
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   ├── global-error.tsx
│   │   ├── global-not-found.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── custom/
│   │   │   ├── BackButton.tsx
│   │   │   ├── ModeToggle.tsx
│   │   │   └── RememberMe.tsx
│   │   ├── providers/
│   │   │   └── Theme-Provider.tsx
│   │   └── ui/
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── tabs.tsx
│   │       └── tooltip.tsx
│   ├── hooks/
│   │   └── use-mobile.ts
│   └── lib/
│       ├── actions/
│       │   ├── auth.ts
│       │   └── index.ts
│       ├── auth/
│       │   ├── auth.tsx
│       │   └── index.ts
│       ├── types/
│       │   ├── auth.ts
│       │   └── index.ts
│       ├── utils.ts
│       └── validations/
│           ├── auth.ts
│           └── index.ts
└── node_modules/
    └── [dependencies]
```

## 🏗️ Architecture Overview

### Core Files

- **`src/middleware.ts`** - Next.js middleware for route protection and token management
- **`src/lib/types/index.ts`** - TypeScript type definitions
- **`src/lib/validations/auth.ts`** - Zod validation schemas
- **`src/lib/actions/index.ts`** - Server actions exports

### App Structure

- **`src/app/(auth)/`** - Authentication pages (signin, reset, register)
- **`src/app/dashboard/`** - Protected dashboard area
- **`src/components/`** - Reusable UI components

### Key Features

- ✅ TypeScript support
- ✅ Next.js 14+ with App Router
- ✅ Middleware-based authentication
- ✅ Server actions for API integration
- ✅ Zod validation
- ✅ Tailwind CSS + shadcn/ui components
