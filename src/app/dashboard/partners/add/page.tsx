'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBusinessSchema } from '@/lib/validations/businesses';
import { useCreateBusiness } from '@/lib/hooks/useBusinessCreation';
import { useUsersQuery } from '@/lib/hooks/useUsersQuery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Building2, MapPin, User, Store } from 'lucide-react';
import { CreateBusinessAdminRequest } from '@/lib/types/businesses';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const AddPartner = () => {
  const router = useRouter();
  const { status } = useSession();
  const createBusiness = useCreateBusiness();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  // Fetch users with merchant role
  const { data: usersData, isLoading: usersLoading } = useUsersQuery({
    page: 1,
    limit: 100,
    role: 'merchant', // Filter for users with merchant role
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<CreateBusinessAdminRequest>({
    resolver: zodResolver(createBusinessSchema),
    mode: 'onChange',
    defaultValues: {
      userId: '',
      legalName: '',
      brandName: '',
      businessType: '',
      entityType: undefined,
      gstNumber: '',
      panNumber: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      latitude: undefined,
      longitude: undefined,
    },
  });

  // Update userId when selected user changes
  useEffect(() => {
    if (selectedUserId) {
      setValue('userId', selectedUserId);
    }
  }, [selectedUserId, setValue]);

  // Function to clean the data before sending
  const cleanFormData = (data: CreateBusinessAdminRequest): CreateBusinessAdminRequest => {
    const cleaned: CreateBusinessAdminRequest = {
      userId: data.userId,
      legalName: data.legalName,
      brandName: data.brandName,
      businessType: data.businessType,
      panNumber: data.panNumber,
    };

    // Only add optional fields if they have values
    if (data.entityType) {
      cleaned.entityType = data.entityType;
    }

    if (data.gstNumber && data.gstNumber.trim() !== '') {
      cleaned.gstNumber = data.gstNumber;
    }

    if (data.address && data.address.trim() !== '') {
      cleaned.address = data.address;
    }

    if (data.city && data.city.trim() !== '') {
      cleaned.city = data.city;
    }

    if (data.state && data.state.trim() !== '') {
      cleaned.state = data.state;
    }

    if (data.pincode && data.pincode.trim() !== '') {
      cleaned.pincode = data.pincode;
    }

    if (data.latitude !== undefined && data.latitude !== null) {
      cleaned.latitude = data.latitude;
    }

    if (data.longitude !== undefined && data.longitude !== null) {
      cleaned.longitude = data.longitude;
    }

    return cleaned;
  };

  const onSubmit = async (data: CreateBusinessAdminRequest) => {
    // Check if user ID is available
    if (!data.userId) {
      toast.error('Please select a merchant user for this business.');
      return;
    }

    // Clean the data to remove empty optional fields
    const cleanedData = cleanFormData(data);

    setIsSubmitting(true);
    try {
      const result = await createBusiness.mutateAsync(cleanedData);

      if (result.success) {
        setTimeout(() => {
          router.push('/dashboard/partners');
        }, 1500);
      } else {
        toast.error(result.message || 'Failed to create business');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEntityTypeChange = (value: string) => {
    setValue('entityType', value as CreateBusinessAdminRequest['entityType']);
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  // Show loading state while session is loading
  if (status === 'loading' || usersLoading) {
    return (
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading merchants...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-4">
            You must be logged in to create a business partner.
          </p>
          <Button onClick={() => router.push('/signin')}>Go to Sign In</Button>
        </div>
      </div>
    );
  }

  const users = usersData?.data?.users || [];
  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="container mx-auto max-w-4xl p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Add New Business Partner</h1>
              <p className="text-muted-foreground">Create a new business for a merchant user</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Merchant Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Select Merchant
                </CardTitle>
                <CardDescription>Choose a merchant user who will own this business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="userSelect">Merchant User *</Label>
                  <Select onValueChange={handleUserSelect} value={selectedUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Search and select a merchant..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {users.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          <Store className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No merchant users found</p>
                          <p className="text-sm">
                            Users need the &quot;merchant&quot; role to create businesses
                          </p>
                        </div>
                      ) : (
                        users.map(user => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {user.firstName} {user.lastName}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  @{user.userName} • {user.email}
                                </span>
                              </div>
                              <div className="flex gap-1 ml-2">
                                {user.roles?.map((role, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {role}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {errors.userId && <p className="text-sm text-red-500">{errors.userId.message}</p>}

                  {/* Selected User Info */}
                  {selectedUser && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium text-sm">Selected Merchant:</span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">
                          {selectedUser.firstName} {selectedUser.lastName}
                        </p>
                        <p className="text-muted-foreground">
                          @{selectedUser.userName} • {selectedUser.email}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {selectedUser.roles?.map((role, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>
                  Enter the business details for{' '}
                  {selectedUser
                    ? `${selectedUser.firstName} ${selectedUser.lastName}`
                    : 'the selected merchant'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="legalName">Legal Name *</Label>
                    <Input
                      id="legalName"
                      {...register('legalName')}
                      placeholder="Enter legal business name"
                    />
                    {errors.legalName && (
                      <p className="text-sm text-red-500">{errors.legalName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandName">Brand Name *</Label>
                    <Input
                      id="brandName"
                      {...register('brandName')}
                      placeholder="Enter brand name"
                    />
                    {errors.brandName && (
                      <p className="text-sm text-red-500">{errors.brandName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Input
                      id="businessType"
                      {...register('businessType')}
                      placeholder="e.g., Coffee Shop, Restaurant, Retail Store"
                    />
                    {errors.businessType && (
                      <p className="text-sm text-red-500">{errors.businessType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entityType">Entity Type</Label>
                    <Select onValueChange={handleEntityTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select entity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="limited_liability">Limited Liability</SelectItem>
                        <SelectItem value="private_limited_company">
                          Private Limited Company
                        </SelectItem>
                        <SelectItem value="limited_company">Limited Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input
                      id="gstNumber"
                      {...register('gstNumber')}
                      placeholder="Enter GST number (optional)"
                    />
                    {errors.gstNumber && (
                      <p className="text-sm text-red-500">{errors.gstNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number *</Label>
                    <Input
                      id="panNumber"
                      {...register('panNumber')}
                      placeholder="Enter PAN number"
                    />
                    {errors.panNumber && (
                      <p className="text-sm text-red-500">{errors.panNumber.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Information
                </CardTitle>
                <CardDescription>Enter the business location details (optional)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    {...register('address')}
                    placeholder="Enter business address"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register('city')} placeholder="Enter city" />
                    {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" {...register('state')} placeholder="Enter state" />
                    {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" {...register('pincode')} placeholder="Enter pincode" />
                    {errors.pincode && (
                      <p className="text-sm text-red-500">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      {...register('latitude', { valueAsNumber: true })}
                      placeholder="Enter latitude"
                    />
                    {errors.latitude && (
                      <p className="text-sm text-red-500">{errors.latitude.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      {...register('longitude', { valueAsNumber: true })}
                      placeholder="Enter longitude"
                    />
                    {errors.longitude && (
                      <p className="text-sm text-red-500">{errors.longitude.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !isValid || !selectedUserId}>
                {isSubmitting ? 'Creating...' : 'Create Business'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPartner;
