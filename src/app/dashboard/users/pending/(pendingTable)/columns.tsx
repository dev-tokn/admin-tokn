'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PendingUser } from '@/lib/types/users';
import { CheckCircle, XCircle, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<PendingUser>[] = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-sm text-muted-foreground">@{user.userName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-sm">{user.email}</span>
          <span className="text-xs text-muted-foreground">
            {user.countryCode} {user.mobileNumber}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'userRoles',
    header: 'Roles',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-wrap gap-1">
          {user.userRoles.map(userRole => (
            <Badge key={userRole.id} variant="outline" className="text-xs">
              {userRole.role}
              {userRole.isPrimary && <span className="ml-1 text-primary">*</span>}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'isVerified',
    header: 'Status',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {user.isVerified ? (
              <Badge variant="default" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                <XCircle className="h-3 w-3 mr-1" />
                Unverified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {user.isMobileVerified ? (
              <Badge variant="outline" className="text-xs">
                Mobile Verified
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                Mobile Unverified
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Requested',
    cell: ({ row }) => {
      const user = row.original;
      const date = new Date(user.createdAt);
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">{date.toLocaleTimeString()}</div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
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
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve User
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <XCircle className="mr-2 h-4 w-4" />
              Reject User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
