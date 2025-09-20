'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable, DataTableConfig } from '@/components/ui/data-table';
import { AdminGetAllUsersUser } from '@/lib/types/users';
import { userGlobalFilterFn } from '@/lib/utils/table-filters';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// User table configuration
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

export function UserDataTable({ columns, data }: DataTableProps<AdminGetAllUsersUser, unknown>) {
  return <DataTable columns={columns} data={data} config={userTableConfig} />;
}
