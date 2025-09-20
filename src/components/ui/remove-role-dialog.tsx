'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, UserMinus } from 'lucide-react';
import { useRemoveRoleMutation } from '@/lib/hooks/useRemoveRoleMutation';
import { AdminGetAllUsersUser, UserRole } from '@/lib/types/users';

interface RemoveRoleDialogProps {
  user: AdminGetAllUsersUser;
  role: UserRole;
  children: React.ReactNode;
}

export function RemoveRoleDialog({ user, role, children }: RemoveRoleDialogProps) {
  const [open, setOpen] = useState(false);
  const removeRoleMutation = useRemoveRoleMutation();

  const handleRemoveRole = async () => {
    try {
      await removeRoleMutation.mutateAsync({
        userId: user.id,
        roleId: role.id,
      });
      setOpen(false);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Remove role failed:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Remove Role
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to remove the{' '}
            <Badge variant="secondary" className="mx-1">
              {role.role}
            </Badge>{' '}
            role from{' '}
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-800">
                <p className="font-medium mb-1">Role Removal Details</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>
                    Role:{' '}
                    <Badge variant="outline" className="ml-1">
                      {role.role}
                    </Badge>
                  </li>
                  <li>Primary Role: {role.isPrimary ? 'Yes' : 'No'}</li>
                  <li>User will lose access to {role.role} features</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={removeRoleMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleRemoveRole}
            disabled={removeRoleMutation.isPending}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {removeRoleMutation.isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Removing...
              </>
            ) : (
              <>
                <UserMinus className="mr-2 h-4 w-4" />
                Remove Role
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
