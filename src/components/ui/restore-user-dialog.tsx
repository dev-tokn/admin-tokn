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
import { useRestoreUserMutation } from '@/lib/hooks';
import { User } from '@/lib/types/users';
import { RotateCcw, Loader2 } from 'lucide-react';

interface RestoreUserDialogProps {
  user: User | null;
  children: React.ReactNode;
}

export function RestoreUserDialog({ user, children }: RestoreUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const restoreUserMutation = useRestoreUserMutation();

  const handleRestore = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await restoreUserMutation.mutateAsync(user.id);
      setOpen(false);
    } catch {
      // Error handling is done in the mutation hook
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-orange-500" />
            Restore User Account
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to restore this user account? This will make the user active again
            and they will be able to access the platform.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-2">
            <div>
              <span className="font-medium">Name:</span>{' '}
              <span className="text-muted-foreground">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div>
              <span className="font-medium">Email:</span>{' '}
              <span className="text-muted-foreground">{user.email}</span>
            </div>
            <div>
              <span className="font-medium">Username:</span>{' '}
              <span className="text-muted-foreground">{user.userName}</span>
            </div>
            <div>
              <span className="font-medium">Status:</span>{' '}
              <span className="text-muted-foreground">
                {user.isActive ? 'Active' : 'Inactive'} •{' '}
                {user.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleRestore}
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                Restore User
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
