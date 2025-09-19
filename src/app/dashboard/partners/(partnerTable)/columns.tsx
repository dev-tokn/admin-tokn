import { ColumnDef } from '@tanstack/react-table';
import { Business } from '@/lib/types/businesses';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Info, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useVerifyBusiness, useUnverifyBusiness } from '@/lib/hooks/useAdminActions';
import { BusinessHoverCard } from './BusinessHoverCard';

// Separate component for the actions cell
function ActionsCell({ business }: { business: Business }) {
  const verifyBusiness = useVerifyBusiness();
  const unverifyBusiness = useUnverifyBusiness();

  const handleVerify = () => {
    verifyBusiness.mutate(business.id);
  };

  const handleUnverify = () => {
    unverifyBusiness.mutate(business.id);
  };

  const isVerifying = verifyBusiness.isPending || unverifyBusiness.isPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isVerifying}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(business.id)}>
          Copy business ID
        </DropdownMenuItem>

        {business.isVerified ? (
          <DropdownMenuItem
            onClick={handleUnverify}
            disabled={isVerifying}
            className="text-orange-600 font-medium"
          >
            Mark as unverified
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={handleVerify}
            disabled={isVerifying}
            className="text-green-600 font-medium"
          >
            Mark as verified
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-red-600">Delete business</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Business>[] = [
  {
    id: 'actions',
    enableHiding: false,
    header: () => {
      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const business = row.original;
      return <ActionsCell business={business} />;
    },
  },
  {
    accessorKey: 'legalName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0"
        >
          Business Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const business = row.original;
      return (
        <BusinessHoverCard business={business}>
          <div className="flex text-sm flex-col cursor-pointer hover:bg-muted/50 rounded p-1 -m-1 transition-colors">
            <div className="font-medium flex flex-row items-center gap-2">
              <Info className="h-4 w-4" />
              {business.brandName}
            </div>
            <div className="text-muted-foreground">{business.legalName}</div>
          </div>
        </BusinessHoverCard>
      );
    },
  },
  {
    accessorKey: 'businessType',
    header: 'Type',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('businessType')}</div>;
    },
  },
  {
    accessorKey: 'gstNumber',
    header: 'GST Number',
    cell: ({ row }) => {
      const gstNumber = row.getValue('gstNumber') as string;
      return gstNumber ? (
        <div className="font-mono text-sm">{gstNumber}</div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'panNumber',
    header: 'PAN Number',
    cell: ({ row }) => {
      const panNumber = row.getValue('panNumber') as string;
      return panNumber ? (
        <div className="font-mono text-sm">{panNumber}</div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'address',
    header: 'Location',
    cell: ({ row }) => {
      const business = row.original;
      return (
        <div className="flex flex-col">
          <div className="text-sm">
            {business.city}, {business.state}
          </div>
          <div className="text-xs text-muted-foreground">{business.pincode}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'user',
    header: 'Owner',
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex flex-col">
          <div className="font-medium">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'isVerified',
    header: 'Status',
    cell: ({ row }) => {
      const isVerified = row.getValue('isVerified') as boolean;
      return (
        <Badge variant={isVerified ? 'default' : 'secondary'}>
          {isVerified ? 'Verified' : 'Unverified'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return <div className="text-sm">{date.toLocaleDateString()}</div>;
    },
  },
];
