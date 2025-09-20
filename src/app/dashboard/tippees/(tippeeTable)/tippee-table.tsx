'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable, DataTableConfig } from '@/components/ui/data-table';
import { Tippee } from '@/lib/types/tippees';
import { tippeeGlobalFilterFn } from '@/lib/utils/table-filters';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Tippee table configuration
const tippeeTableConfig: DataTableConfig<Tippee> = {
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

export function TippeeDataTable({ columns, data }: DataTableProps<Tippee, unknown>) {
  return <DataTable columns={columns} data={data} config={tippeeTableConfig} />;
}
