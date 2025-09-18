'use client';

import { Business } from '@/lib/types/businesses';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, User, Building2, Hash, Phone, Mail } from 'lucide-react';

interface BusinessHoverCardProps {
  business: Business;
  children: React.ReactNode;
}

export function BusinessHoverCard({ business, children }: BusinessHoverCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80" align="start">
        <div className="space-y-4">
          {/* Business Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <h4 className="font-semibold text-sm">{business.brandName}</h4>
            </div>
            <p className="text-xs text-muted-foreground">{business.legalName}</p>
            <div className="flex items-center gap-2">
              <Badge variant={business.isVerified ? 'default' : 'secondary'} className="text-xs">
                {business.isVerified ? 'Verified' : 'Unverified'}
              </Badge>
              <span className="text-xs text-muted-foreground">{business.businessType}</span>
            </div>
          </div>

          <Separator />

          {/* Tax Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash className="h-3 w-3" />
              <span className="text-xs font-medium">Tax Information</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">GST:</span>
                <span className="font-mono">{business.gstNumber || 'Not provided'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">PAN:</span>
                <span className="font-mono">{business.panNumber || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span className="text-xs font-medium">Location</span>
            </div>
            <div className="text-xs space-y-1">
              <p className="text-muted-foreground">{business.address}</p>
              <p>
                {business.city}, {business.state} {business.pincode}
              </p>
            </div>
          </div>

          <Separator />

          {/* Owner Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              <span className="text-xs font-medium">Owner</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold">
                {business.user.firstName} {business.user.lastName}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span className="truncate">{business.user.email}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>{business.user.mobileNumber}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge
                  variant={business.user.isActive ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {business.user.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <Badge
                  variant={business.user.isVerified ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {business.user.isVerified ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Created:</span>
              <span>{formatDate(business.createdAt)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Updated:</span>
              <span>{formatDate(business.updatedAt)}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
