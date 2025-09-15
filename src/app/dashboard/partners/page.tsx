'use client';

import { DataTable } from './(partnerTable)/partner-table';
import { columns } from './(partnerTable)/columns';
import { useBusinesses } from '@/lib/hooks/useBusinesses';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const PartnerList = () => {
  const { businesses, isLoading, error, fetchBusinesses } = useBusinesses({
    page: 1,
    limit: 10,
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchBusinesses({
      page: 1,
      limit: 10,
    });
  }, [fetchBusinesses]);

  if (isLoading) {
    return (
      <div className="container mx-auto md:w-[60vw] lg:w-[80vw] p-4 space-y-4">
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

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto md:w-[60vw] lg:w-[80vw] p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Business Partners</CardTitle>
          <CardDescription>Manage and view all business partners in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={businesses} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerList;
