import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/lib/types/users';
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

export const columns: ColumnDef<User>[] = [
  {
    id: 'actions',
    enableHiding: false,
    header: () => {
      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex text-sm flex-col">
          <div className="font-medium">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-muted-foreground">@{user.userName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const email = row.getValue('email') as string;
      return <div className="text-sm">{email}</div>;
    },
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Mobile',
    cell: ({ row }) => {
      const mobile = row.getValue('mobileNumber') as string;
      return <div className="text-sm">{mobile}</div>;
    },
  },
  {
    accessorKey: 'roles',
    header: 'Roles',
    cell: ({ row }) => {
      const roles = row.getValue('roles') as string[] | undefined;
      const rolesArray = Array.isArray(roles) ? roles : [];

      if (rolesArray.length === 0) {
        return <span className="text-muted-foreground text-sm">No roles</span>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {rolesArray.map((role, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {role}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      const isVerified = row.original.isVerified;
      const isApproved = row.original.isApproved;
      return (
        <div className="flex flex-wrap gap-1">
          <Badge variant={isActive ? 'default' : 'secondary'}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
          <Badge variant={isVerified ? 'default' : 'secondary'}>
            {isVerified ? 'Verified' : 'Unverified'}
          </Badge>
          <Badge variant={isApproved ? 'default' : 'secondary'}>
            {isApproved ? 'Approved' : 'Pending'}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'business',
    header: 'Business',
    cell: ({ row }) => {
      const business = row.original.business;
      return business ? (
        <div className="text-sm">
          <div className="font-medium">{business.brandName}</div>
          <div className="text-muted-foreground">{business.businessType}</div>
        </div>
      ) : (
        <span className="text-muted-foreground">No business</span>
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
];
