'use client';

import { DataTable } from './(tippeeTable)/tippee-table';
import { columns } from './(tippeeTable)/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTippeesQuery } from '@/lib/hooks/useTippeesQuery';
import Link from 'next/link';

const TippeesList = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useTippeesQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="md:w-[80vw] p-4">
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
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to fetch tippees'}</AlertDescription>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  const tippees = data?.data?.tippees || [];

  return (
    <div className="flex justify-center">
      <div className="md:w-[80vw] p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Tippees</CardTitle>
              <CardDescription>Manage and view all tippees in the system</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isRefetching}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button asChild>
                <Link href="/dashboard/tippees/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tippee
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={tippees} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TippeesList;
