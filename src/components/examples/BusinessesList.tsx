'use client';

import { useBusinessesQuery } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BusinessesList() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useBusinessesQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return (
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
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error?.message || 'Failed to fetch businesses'}</AlertDescription>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </Alert>
    );
  }

  return (
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
        {data?.success && data.data?.businesses ? (
          <div className="space-y-2">
            {data.data.businesses.map(business => (
              <div
                key={business.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{business.legalName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {business.brandName} • {business.businessType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {business.city}, {business.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {business.isVerified ? 'Verified' : 'Unverified'}
                    </p>
                    <p className="text-xs text-muted-foreground">GST: {business.gstNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No businesses found</p>
        )}
      </CardContent>
    </Card>
  );
}
