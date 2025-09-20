# 🎯 Reusable DataTable Component Guide

_Created: September 19, 2025_  
_Version: 1.0_  
_Maintained by: Development Team_

## 📋 Overview

The `DataTable` component is a comprehensive, reusable table solution built on TanStack Table that provides consistent functionality across all admin dashboard sections. It standardizes search, pagination, sorting, column visibility, and actions.

## 🚀 Key Benefits

### **Consistency**

- Uniform look and feel across all tables
- Standardized search, pagination, and filtering behavior
- Consistent action buttons and column management

### **Maintainability**

- Single source of truth for table functionality
- Easy to update features across all tables
- Centralized bug fixes and improvements

### **Developer Experience**

- Simple configuration-based setup
- Type-safe implementation
- Extensive customization options

### **Performance**

- Optimized rendering with TanStack Table
- Efficient pagination and filtering
- Minimal re-renders

---

## 🏗️ Architecture

### **Core Component**

- **Location**: `src/components/ui/data-table.tsx`
- **Dependencies**: TanStack Table, shadcn/ui components
- **TypeScript**: Fully typed with generics

### **Filter Functions**

- **Location**: `src/lib/utils/table-filters.ts`
- **Purpose**: Entity-specific search logic
- **Examples**: `businessGlobalFilterFn`, `userGlobalFilterFn`

### **Table Implementations**

- **Location**: `src/app/dashboard/*/table.tsx`
- **Pattern**: Configuration-based wrapper components

---

## 📖 Usage Guide

### **Basic Implementation**

```tsx
import { DataTable, DataTableConfig } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

// Define your data type
interface MyDataType {
  id: string;
  name: string;
  email: string;
}

// Define your columns
const columns: ColumnDef<MyDataType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

// Configure the table
const tableConfig: DataTableConfig<MyDataType> = {
  searchPlaceholder: 'Search items...',
  enablePagination: true,
  pageSize: 10,
  actions: {
    addButton: {
      label: 'Add New Item',
      href: '/dashboard/items/add',
    },
  },
};

// Use the component
function MyTable({ data }: { data: MyDataType[] }) {
  return <DataTable columns={columns} data={data} config={tableConfig} />;
}
```

### **Advanced Configuration**

```tsx
const advancedConfig: DataTableConfig<MyDataType> = {
  // Search configuration
  searchPlaceholder: 'Search by name, email, or role...',
  globalFilterFn: customFilterFunction,

  // Pagination configuration
  enablePagination: true,
  pageSize: 20,

  // Sorting configuration
  enableSorting: true,

  // Column visibility
  enableColumnVisibility: true,

  // Actions
  actions: {
    addButton: {
      label: 'Add New User',
      href: '/dashboard/users/add',
    },
    customActions: (
      <div className="flex gap-2">
        <Button variant="outline">Export</Button>
        <Button variant="outline">Import</Button>
      </div>
    ),
  },

  // Empty state
  emptyStateMessage: 'No users found. Create your first user!',

  // Styling
  className: 'my-custom-class',
};
```

---

## ⚙️ Configuration Options

### **DataTableConfig Interface**

```typescript
interface DataTableConfig<TData> {
  // Search configuration
  searchPlaceholder?: string; // Default: 'Search...'
  globalFilterFn?: GlobalFilterFn<TData>; // Custom search logic

  // Pagination configuration
  enablePagination?: boolean; // Default: true
  pageSize?: number; // Default: 10

  // Sorting configuration
  enableSorting?: boolean; // Default: true

  // Column visibility configuration
  enableColumnVisibility?: boolean; // Default: true

  // Actions configuration
  actions?: {
    addButton?: {
      label: string;
      href: string;
    };
    customActions?: React.ReactNode;
  };

  // Empty state configuration
  emptyStateMessage?: string; // Default: 'No results.'

  // Styling configuration
  className?: string; // Additional CSS classes
}
```

---

## 🔍 Search & Filtering

### **Default Search Behavior**

- Searches across all string fields in the data
- Case-insensitive matching
- Real-time filtering as you type

### **Custom Filter Functions**

```typescript
// Business-specific search
export const businessGlobalFilterFn: GlobalFilterFn<Business> = (row, columnId, value) => {
  const business = row.original as Business;
  const searchValue = value.toLowerCase();

  return (
    business.legalName?.toLowerCase().includes(searchValue) ||
    business.brandName?.toLowerCase().includes(searchValue) ||
    business.businessType?.toLowerCase().includes(searchValue)
  );
};

// User-specific search
export const userGlobalFilterFn: GlobalFilterFn<AdminGetAllUsersUser> = (row, columnId, value) => {
  const user = row.original as AdminGetAllUsersUser;
  const searchValue = value.toLowerCase();

  return (
    user.firstName?.toLowerCase().includes(searchValue) ||
    user.lastName?.toLowerCase().includes(searchValue) ||
    user.email?.toLowerCase().includes(searchValue) ||
    user.userRoles?.some(role => role.role.toLowerCase().includes(searchValue))
  );
};
```

---

## 📊 Pagination

### **Features**

- Configurable page sizes (10, 20, 30, 40, 50)
- First/Previous/Next/Last navigation
- Current page indicator
- Row count display

### **Configuration**

```typescript
const config: DataTableConfig<MyType> = {
  enablePagination: true, // Enable/disable pagination
  pageSize: 20, // Default page size
};
```

---

## 👁️ Column Visibility

### **Features**

- Toggle column visibility via dropdown
- Persistent state across page refreshes
- All columns hideable except required ones

### **Usage**

- Automatically enabled with `enableColumnVisibility: true`
- Dropdown appears in the top-right corner
- Shows all columns that can be hidden

---

## 🎯 Actions

### **Add Button**

```typescript
actions: {
  addButton: {
    label: 'Add New Business',
    href: '/dashboard/partners/add',
  },
}
```

### **Custom Actions**

```typescript
actions: {
  customActions: (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleExport}>
        Export CSV
      </Button>
      <Button variant="outline" onClick={handleBulkDelete}>
        Bulk Delete
      </Button>
    </div>
  ),
}
```

---

## 📝 Implementation Examples

### **Business Partners Table**

```typescript
const businessTableConfig: DataTableConfig<Business> = {
  searchPlaceholder: 'Search businesses...',
  globalFilterFn: businessGlobalFilterFn,
  enablePagination: true,
  pageSize: 10,
  enableSorting: true,
  enableColumnVisibility: true,
  actions: {
    addButton: {
      label: 'Add New Business',
      href: '/dashboard/partners/add',
    },
  },
  emptyStateMessage: 'No businesses found.',
};
```

### **Users Table**

```typescript
const userTableConfig: DataTableConfig<AdminGetAllUsersUser> = {
  searchPlaceholder: 'Search users...',
  globalFilterFn: userGlobalFilterFn,
  enablePagination: true,
  pageSize: 10,
  enableSorting: true,
  enableColumnVisibility: true,
  actions: {
    addButton: {
      label: 'Add New User',
      href: '/dashboard/users/add',
    },
  },
  emptyStateMessage: 'No users found.',
};
```

### **Tippees Table**

```typescript
const tippeeTableConfig: DataTableConfig<any> = {
  searchPlaceholder: 'Search tippees...',
  globalFilterFn: tippeeGlobalFilterFn,
  enablePagination: true,
  pageSize: 10,
  enableSorting: true,
  enableColumnVisibility: true,
  actions: {
    addButton: {
      label: 'Add New Tippee',
      href: '/dashboard/tippees/add',
    },
  },
  emptyStateMessage: 'No tippees found.',
};
```

---

## 🎨 Styling & Customization

### **CSS Classes**

- Uses Tailwind CSS for styling
- Consistent with shadcn/ui design system
- Responsive design for mobile and desktop

### **Custom Styling**

```typescript
const config: DataTableConfig<MyType> = {
  className: 'my-custom-table-class',
  // ... other config
};
```

### **Theme Integration**

- Automatically adapts to light/dark themes
- Consistent with admin dashboard design
- Accessible color contrast

---

## 🚀 Migration Guide

### **From Old Table Components**

1. **Replace imports**:

   ```typescript
   // Old
   import { DataTable } from './old-table';

   // New
   import { DataTable, DataTableConfig } from '@/components/ui/data-table';
   ```

2. **Create configuration**:

   ```typescript
   const tableConfig: DataTableConfig<YourType> = {
     // ... configuration
   };
   ```

3. **Update component usage**:

   ```typescript
   // Old
   <DataTable columns={columns} data={data} />

   // New
   <DataTable columns={columns} data={data} config={tableConfig} />
   ```

---

## 🔧 Troubleshooting

### **Common Issues**

#### **Search Not Working**

- Check if `globalFilterFn` is properly configured
- Ensure data fields are accessible in the filter function
- Verify search placeholder is set

#### **Pagination Issues**

- Ensure `enablePagination: true` is set
- Check if `pageSize` is a valid number
- Verify data array is not empty

#### **Column Visibility Not Working**

- Ensure `enableColumnVisibility: true` is set
- Check if columns have proper `id` properties
- Verify columns are not marked as non-hideable

#### **Actions Not Appearing**

- Check if `actions` configuration is properly set
- Verify `href` paths are correct
- Ensure buttons have proper styling

---

## 📈 Performance Considerations

### **Optimizations**

- Virtual scrolling for large datasets (future enhancement)
- Memoized filter functions
- Efficient re-rendering with TanStack Table
- Lazy loading for pagination

### **Best Practices**

- Use appropriate page sizes (10-50 rows)
- Implement proper loading states
- Debounce search input (future enhancement)
- Cache filter results when possible

---

## 🔮 Future Enhancements

### **Planned Features**

- [ ] Virtual scrolling for large datasets
- [ ] Advanced filtering (date ranges, multi-select)
- [ ] Export functionality (CSV, Excel)
- [ ] Bulk operations (select all, bulk actions)
- [ ] Column resizing
- [ ] Row selection with checkboxes
- [ ] Inline editing capabilities
- [ ] Search debouncing
- [ ] Keyboard navigation
- [ ] Accessibility improvements

### **Configuration Additions**

- [ ] Custom empty state components
- [ ] Loading state configuration
- [ ] Error state handling
- [ ] Custom pagination components
- [ ] Theme customization options

---

## 📚 Related Documentation

- [API Naming Conventions](./api-naming-conventions.md)
- [API Documentation Plan](./api-docs-plan-reference.md)
- [TanStack Table Documentation](https://tanstack.com/table/latest)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

_Last Updated: September 19, 2025_  
_Version: 1.0_  
_Maintained by: Development Team_

This guide provides everything needed to implement and maintain consistent DataTable components across the Tokn admin dashboard! 🎯
