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
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useDeleteUserMutation } from '@/lib/hooks/useDeleteUserMutation';
import { AdminGetAllUsersUser } from '@/lib/types/users';

interface DeleteUserDialogProps {
  user: AdminGetAllUsersUser;
  children: React.ReactNode;
}

export function DeleteUserDialog({ user, children }: DeleteUserDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteUserMutation = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(user.id);
      setOpen(false);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Delete user failed:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>{' '}
            ({user.email})? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Warning: This action is permanent</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>All user data will be permanently deleted</li>
                  <li>All associated roles will be removed</li>
                  <li>This action cannot be reversed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteUserMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteUserMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteUserMutation.isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

