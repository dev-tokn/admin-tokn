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
import { AlertTriangle, Star } from 'lucide-react';
import { useSetPrimaryRoleMutation } from '@/lib/hooks/useSetPrimaryRoleMutation';

interface SetPrimaryRoleDialogProps {
  userId: string;
  roleId: string;
  children: React.ReactNode;
}

export function SetPrimaryRoleDialog({ userId, roleId, children }: SetPrimaryRoleDialogProps) {
  const [open, setOpen] = useState(false);
  const setPrimaryRoleMutation = useSetPrimaryRoleMutation();

  const handleSetPrimary = async () => {
    try {
      await setPrimaryRoleMutation.mutateAsync({
        userId,
        roleId,
      });
      setOpen(false);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Set primary role failed:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-600">
            <Star className="h-5 w-5" />
            Set Primary Role
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to set this role as the primary role for this user? The current
            primary role will be changed to secondary.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Primary Role Change</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>This role will become the user&apos;s primary role</li>
                  <li>The current primary role will be changed to secondary</li>
                  <li>Only one role can be primary at a time</li>
                  <li>This change will affect user permissions and access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={setPrimaryRoleMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSetPrimary}
            disabled={setPrimaryRoleMutation.isPending}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            {setPrimaryRoleMutation.isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Setting...
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                Set as Primary
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
