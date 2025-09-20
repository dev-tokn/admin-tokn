'use client';

import { PendingUsersDataTable } from './(pendingTable)/pending-table';
import { columns } from './(pendingTable)/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePendingUsersQuery } from '@/lib/hooks/usePendingUsersQuery';

const PendingApproval = () => {
  const { data, isError, error, refetch, isRefetching } = usePendingUsersQuery();

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to fetch pending users'}</AlertDescription>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  const pendingUsers = data?.users || [];

  return (
    <div className="flex justify-center">
      <div className="md:w-[80vw] p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Pending User Approvals
              </CardTitle>
              <CardDescription>Review and approve users waiting for admin approval</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isRefetching}>
                <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <PendingUsersDataTable columns={columns} data={pendingUsers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PendingApproval;
