'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable, DataTableConfig } from '@/components/ui/data-table';
import { PendingUser } from '@/lib/types/users';
import { pendingUserGlobalFilterFn } from '@/lib/utils/table-filters';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Pending users table configuration
const pendingUsersTableConfig: DataTableConfig<PendingUser> = {
  searchPlaceholder: 'Search pending users...',
  globalFilterFn: pendingUserGlobalFilterFn,
  enablePagination: true,
  pageSize: 10,
  enableSorting: true,
  enableColumnVisibility: true,
  actions: {
    addButton: {
      label: 'Add New User',
      href: '/dashboard/users/pending',
    },
  },
  emptyStateMessage: 'No pending users found.',
};

export function PendingUsersDataTable({ columns, data }: DataTableProps<PendingUser, unknown>) {
  return <DataTable columns={columns} data={data} config={pendingUsersTableConfig} />;
}
