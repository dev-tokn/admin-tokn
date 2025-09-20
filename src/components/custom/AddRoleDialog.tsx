'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { User, Plus } from 'lucide-react';
import { useAddUserRole } from '@/lib/hooks/useAdminActions';
import { AVAILABLE_ROLES, AdminGetAllUsersUser } from '@/lib/types/users';

const addRoleSchema = z.object({
  role: z.enum(AVAILABLE_ROLES, {
    message: 'Please select a role',
  }),
  isPrimary: z.boolean(),
});

type AddRoleFormData = z.infer<typeof addRoleSchema>;

interface AddRoleDialogProps {
  user: AdminGetAllUsersUser;
  children: React.ReactNode;
}

export function AddRoleDialog({ user, children }: AddRoleDialogProps) {
  const [open, setOpen] = useState(false);
  const addUserRole = useAddUserRole();

  const form = useForm<AddRoleFormData>({
    resolver: zodResolver(addRoleSchema),
    defaultValues: {
      role: undefined,
      isPrimary: false,
    },
  });

  const onSubmit = async (data: AddRoleFormData) => {
    try {
      await addUserRole.mutateAsync({
        userId: user.id,
        roleData: data,
      });
      setOpen(false);
      form.reset();
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
    }
  };

  // Get existing roles to avoid duplicates
  const existingRoles = user.userRoles?.map(userRole => userRole.role) || [];
  const availableRoles = AVAILABLE_ROLES.filter(role => !existingRoles.includes(role));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Add Role to User
          </DialogTitle>
          <DialogDescription>
            Add a new role to{' '}
            <span className="font-medium">
              {user.firstName} {user.lastName}
            </span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableRoles.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          <p>All available roles have been assigned</p>
                        </div>
                      ) : (
                        availableRoles.map(role => (
                          <SelectItem key={role} value={role}>
                            <span className="capitalize">{role}</span>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrimary"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Primary Role</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Mark this as the user&apos;s primary role
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={addUserRole.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={addUserRole.isPending || availableRoles.length === 0}>
                {addUserRole.isPending ? (
                  <>
                    <Plus className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Role
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
