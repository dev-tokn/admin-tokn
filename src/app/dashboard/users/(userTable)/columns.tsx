import { ColumnDef } from '@tanstack/react-table';
import { AdminGetAllUsersUser } from '@/lib/types/users';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal, Trash2, RotateCcw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { AddRoleDialog } from '@/components/custom/AddRoleDialog';
import { UserDetailsDialog } from '@/components/custom/UserDetailsDialog';
import { UserStatusDialog } from '@/components/ui/user-status-dialog';
import { DeleteUserDialog } from '@/components/ui/delete-user-dialog';
import { RemoveRoleDialog } from '../../../../components/ui/remove-role-dialog';
import { RestoreUserDialog } from '@/components/ui/restore-user-dialog';

export const columns: ColumnDef<AdminGetAllUsersUser>[] = [
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
            <UserDetailsDialog userId={user.id}>
              <DropdownMenuItem onSelect={e => e.preventDefault()}>View Profile</DropdownMenuItem>
            </UserDetailsDialog>

            <UserStatusDialog user={user}>
              <DropdownMenuItem onSelect={e => e.preventDefault()}>Update Status</DropdownMenuItem>
            </UserStatusDialog>
            <DropdownMenuSeparator />
            <AddRoleDialog user={user}>
              <DropdownMenuItem onSelect={e => e.preventDefault()}>Add Role</DropdownMenuItem>
            </AddRoleDialog>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Remove Role</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {user.userRoles && user.userRoles.length > 0 ? (
                  user.userRoles.map(role => (
                    <RemoveRoleDialog key={role.id} user={user} role={role}>
                      <DropdownMenuItem onSelect={e => e.preventDefault()}>
                        <Badge variant="outline" className="mr-2 text-xs">
                          {role.role}
                          {role.isPrimary && <span className="ml-1 text-xs text-primary">★</span>}
                        </Badge>
                      </DropdownMenuItem>
                    </RemoveRoleDialog>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No roles to remove</DropdownMenuItem>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <RestoreUserDialog user={user}>
              <DropdownMenuItem onSelect={e => e.preventDefault()} className="text-orange-600">
                <RotateCcw className="mr-2 h-4 w-4" />
                Restore user
              </DropdownMenuItem>
            </RestoreUserDialog>
            <DeleteUserDialog user={user}>
              <DropdownMenuItem onSelect={e => e.preventDefault()} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete user
              </DropdownMenuItem>
            </DeleteUserDialog>
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
    accessorKey: 'userRoles',
    header: 'Roles',
    cell: ({ row }) => {
      const userRoles = row.getValue('userRoles') as AdminGetAllUsersUser['userRoles'];

      if (!userRoles || userRoles.length === 0) {
        return <span className="text-muted-foreground text-sm">No roles</span>;
      }

      return (
        <div className="flex flex-col gap-1">
          {userRoles.map(userRole => (
            <Badge key={userRole.id} variant="outline" className="text-xs">
              {userRole.role}
              {userRole.isPrimary && <span className="ml-1 text-xs text-primary">★</span>}
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
        <div className="flex flex-col gap-1">
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
  // Removed business column as it's not available in GET /admin/users response
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
