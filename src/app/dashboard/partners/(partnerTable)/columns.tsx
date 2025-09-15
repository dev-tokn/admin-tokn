import { ColumnDef } from '@tanstack/react-table';
import { Business } from '@/lib/types/businesses';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<Business>[] = [
  {
    accessorKey: 'legalName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Business Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const business = row.original;
      return (
        <div className="flex flex-col">
          <div className="font-medium">{business.legalName}</div>
          <div className="text-sm text-muted-foreground">{business.brandName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'businessType',
    header: 'Type',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('businessType')}</div>;
    },
  },
  {
    accessorKey: 'gstNumber',
    header: 'GST Number',
    cell: ({ row }) => {
      const gstNumber = row.getValue('gstNumber') as string;
      return gstNumber ? (
        <div className="font-mono text-sm">{gstNumber}</div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'panNumber',
    header: 'PAN Number',
    cell: ({ row }) => {
      const panNumber = row.getValue('panNumber') as string;
      return panNumber ? (
        <div className="font-mono text-sm">{panNumber}</div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'address',
    header: 'Location',
    cell: ({ row }) => {
      const business = row.original;
      return (
        <div className="flex flex-col">
          <div className="text-sm">
            {business.city}, {business.state}
          </div>
          <div className="text-xs text-muted-foreground">{business.pincode}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'user',
    header: 'Owner',
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex flex-col">
          <div className="font-medium">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'isVerified',
    header: 'Status',
    cell: ({ row }) => {
      const isVerified = row.getValue('isVerified') as boolean;
      return (
        <Badge variant={isVerified ? 'default' : 'secondary'}>
          {isVerified ? 'Verified' : 'Unverified'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return <div className="text-sm">{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const business = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(business.id)}>
              Copy business ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>
              {business.isVerified ? 'Mark as unverified' : 'Mark as verified'}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete business</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
