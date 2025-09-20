'use client';

import { BusinessDataTable } from './(partnerTable)/partner-table';
import { columns } from './(partnerTable)/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBusinessesQuery } from '@/lib/hooks/useBusinessesQuery';

const PartnerList = () => {
  const { data, isError, error, refetch, isRefetching } = useBusinessesQuery({
    page: 1,
    limit: 10,
  });

  if (isError) {
    return (
      <div className="container mx-auto p-2">
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
    <div>
      <div className="md:w-[80vw] px-4 py-2">
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="pb-2 text-xl">Business Partners</CardTitle>
                <CardDescription>
                  Manage and view all business partners in the system
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isRefetching}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BusinessDataTable columns={columns} data={businesses} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerList;
