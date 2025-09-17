# 🚀 Admin Tokn

## 🏗️ Architecture Overview

### Key Features

- ✅ TypeScript support
- ✅ Next.js 15+ with App Router
- ✅ Middleware-based authentication
- ✅ Server actions for API integration
- ✅ Zod validation
- ✅ Tailwind CSS + shadcn/ui components

### Stack for a modern, robust, and highly maintainable Next.js admin dashboard

- Framework: Next.js (with App Router)
- Language: TypeScript
- Authentication: Auth.js (with Credentials Provider)
- Data Fetching: TanStack Query
- UI Components: Shadcn/ui (with Tailwind CSS)
- Form Management: React Hook Form + Zod
- Code Quality: ESLint + Prettier

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
