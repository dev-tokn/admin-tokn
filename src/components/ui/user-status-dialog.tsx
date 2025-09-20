'use client';

import { useState } from 'react';
import { AdminGetAllUsersUser } from '@/lib/types/users';
import { useUserStatusMutation } from '@/lib/hooks/useUserStatusMutation';
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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Loader2 } from 'lucide-react';

interface UserStatusDialogProps {
  user: AdminGetAllUsersUser;
  children: React.ReactNode;
}

export function UserStatusDialog({ user, children }: UserStatusDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(user.isActive);
  const [isVerified, setIsVerified] = useState(user.isVerified);
  const { updateUserStatus, isUpdating } = useUserStatusMutation();

  const handleSave = async () => {
    await updateUserStatus(user.id, {
      isActive,
      isVerified,
    });
    setIsOpen(false);
  };

  const hasChanges = isActive !== user.isActive || isVerified !== user.isVerified;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Update User Status
          </DialogTitle>
          <DialogDescription>
            Update the status for{' '}
            <strong>
              {user.firstName} {user.lastName}
            </strong>{' '}
            (@{user.userName})
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 min-w-0">
              <Label htmlFor="isActive" className="text-base">
                Account Status
              </Label>
              <div className="text-sm text-muted-foreground min-h-[1.25rem]">
                {isActive ? 'User can log in now' : 'User account is disabled'}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
                disabled={isUpdating}
              />
              <Badge variant={isActive ? 'success' : 'destructive'}>
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 min-w-0">
              <Label htmlFor="isVerified" className="text-base">
                Verification Status
              </Label>
              <div className="text-sm text-muted-foreground min-h-[1.25rem]">
                {isVerified
                  ? 'User identity has been verified'
                  : 'User identity needs verification'}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Switch
                id="isVerified"
                checked={isVerified}
                onCheckedChange={setIsVerified}
                disabled={isUpdating}
              />
              <Badge variant={isVerified ? 'success' : 'destructive'}>
                {isVerified ? 'Verified' : 'Unverified'}
              </Badge>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isUpdating}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isUpdating}>
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
