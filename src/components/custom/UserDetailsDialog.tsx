'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Eye, Calendar, MapPin, Phone, Mail, Shield, Crown, Coins } from 'lucide-react';
import { useDetailedUser } from '@/lib/hooks/useAdminActions';
import { DetailedUser } from '@/lib/types/users';

interface UserDetailsDialogProps {
  userId: string;
  children: React.ReactNode;
}

export function UserDetailsDialog({ userId, children }: UserDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, error } = useDetailedUser(userId);

  const user = data?.data?.user;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
          <DialogDescription>
            Detailed information and activity history for this user
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-destructive">Failed to load user details</p>
            <p className="text-sm text-muted-foreground mt-1">
              {error?.message || 'An error occurred'}
            </p>
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* User Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-sm">{user.firstName} {user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Username</label>
                    <p className="text-sm">@{user.userName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-sm flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Mobile</label>
                    <p className="text-sm flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {user.countryCode} {user.mobileNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    <p className="text-sm capitalize">{user.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.dob).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Location</label>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {user.location}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={user.isActive ? 'default' : 'secondary'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                    {user.isVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                  <Badge variant={user.isMobileVerified ? 'default' : 'secondary'}>
                    {user.isMobileVerified ? 'Mobile Verified' : 'Mobile Unverified'}
                  </Badge>
                  <Badge variant={user.isApproved ? 'default' : 'secondary'}>
                    {user.isApproved ? 'Approved' : 'Pending Approval'}
                  </Badge>
                  {user.isDeleted && (
                    <Badge variant="destructive">Deleted</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* User Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  User Roles
                </CardTitle>
                <CardDescription>
                  {user.userRoles.length} role(s) assigned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.userRoles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {role.role}
                        </Badge>
                        {role.isPrimary && (
                          <Badge variant="default" className="text-xs">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(role.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            {user.profiles.tipper && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    Tipper Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {user.profiles.tipper.karmaPoints}
                      </div>
                      <div className="text-sm text-muted-foreground">Karma Points</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {user.profiles.tipper.totalTipsGiven}
                      </div>
                      <div className="text-sm text-muted-foreground">Tips Given</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        ₹{user.profiles.tipper.totalAmountTipped}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Amount Tipped</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Business Profile */}
            {user.profiles.business && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Profile</CardTitle>
                  <CardDescription>
                    Business information for this user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Business profile details would be displayed here
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
