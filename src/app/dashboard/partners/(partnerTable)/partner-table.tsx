'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable, DataTableConfig } from '@/components/ui/data-table';
import { Business } from '@/lib/types/businesses';
import { businessGlobalFilterFn } from '@/lib/utils/table-filters';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Business table configuration
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

export function BusinessDataTable({ columns, data }: DataTableProps<Business, unknown>) {
  return <DataTable columns={columns} data={data} config={businessTableConfig} />;
}
