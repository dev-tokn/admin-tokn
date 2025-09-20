'use client';

import { UserDataTable } from './(userTable)/user-table';
import { columns } from './(userTable)/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUsersQuery } from '@/lib/hooks/useUsersQuery';

const UsersList = () => {
  const { data, isError, error, refetch, isRefetching } = useUsersQuery({
    page: 1,
    limit: 10,
  });

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to fetch users'}</AlertDescription>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  const users = data?.data?.users || [];

  return (
    <div className="flex justify-center">
      <div className="md:w-[80vw] p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage and view all users in the system</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isRefetching}>
                <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
              </Button>
              {/* <Button asChild>
                <Link href="/dashboard/users/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Link>
              </Button> */}
            </div>
          </CardHeader>
          <CardContent>
            <UserDataTable columns={columns} data={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersList;
