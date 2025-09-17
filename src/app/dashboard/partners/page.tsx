'use client';

import { DataTable } from './(partnerTable)/partner-table';
import { columns } from './(partnerTable)/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBusinessesQuery } from '@/lib/hooks/useBusinessesQuery';

const PartnerList = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useBusinessesQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return (
      <div className="md:w-[80vw] lg:w-[80vw]">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to fetch businesses'}</AlertDescription>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  const businesses = data?.data?.businesses || [];

  return (
    <div className="flex justify-center">
      <div className="md:w-[80vw] p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Business Partners</CardTitle>
              <CardDescription>Manage and view all business partners in the system</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isRefetching}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={businesses} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerList;
