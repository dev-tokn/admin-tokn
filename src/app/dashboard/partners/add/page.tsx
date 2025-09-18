'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBusinessSchema } from '@/lib/validations/businesses';
import { useCreateBusiness } from '@/lib/hooks/useBusinessCreation';
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
import { ArrowLeft, Building2, MapPin } from 'lucide-react';
import { CreateBusinessAdminRequest } from '@/lib/types/businesses';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

const AddPartner = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const createBusiness = useCreateBusiness();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<CreateBusinessAdminRequest>({
    resolver: zodResolver(createBusinessSchema),
    mode: 'onChange', // Enable real-time validation
    defaultValues: {
      userId: '', // Will be set when session loads
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

  // Set userId when session is available
  useEffect(() => {
    if (session?.user?.id) {
      setValue('userId', session.user.id);
    }
  }, [session?.user?.id, setValue]);

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
    console.log('Form submitted with data:', data);
    console.log('Form errors:', errors);
    console.log('Form is valid:', isValid);

    // Check if user ID is available
    if (!data.userId) {
      toast.error('User ID is required. Please ensure you are logged in.');
      return;
    }

    // Clean the data to remove empty optional fields
    const cleanedData = cleanFormData(data);
    console.log('Cleaned data for API:', cleanedData);

    setIsSubmitting(true);
    try {
      console.log('Calling createBusiness.mutateAsync...');
      const result = await createBusiness.mutateAsync(cleanedData);
      console.log('Create business result:', result);

      // The success toast is handled in the hook's onSuccess callback
      // Only redirect if the mutation was successful
      if (result.success) {
        // Add a small delay to let the user see the success toast
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

  // Safe error display function
  const getErrorSummary = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return 'None';

    return errorFields
      .map(field => {
        const error = errors[field as keyof typeof errors];
        return `${field}: ${error?.message || 'Invalid'}`;
      })
      .join(', ');
  };

  // Debug: Log form state
  console.log('Current form errors:', errors);
  console.log('Form is valid:', isValid);
  console.log('Session user ID:', session?.user?.id);
  console.log('Session status:', status);
  console.log('Current userId value:', watch('userId'));

  // Show loading state while session is loading
  if (status === 'loading') {
    return (
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading...</p>
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

  return (
    <div className="container mx-auto max-w-4xl p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Add New Business Partner</h1>
          <p className="text-muted-foreground">Create a new business partner in the system</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* User ID Field (Hidden but required) */}
        <div className="hidden">
          <Input {...register('userId')} value={session?.user?.id || ''} />
        </div>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Business Information
            </CardTitle>
            <CardDescription>Enter the business details</CardDescription>
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
                <Input id="brandName" {...register('brandName')} placeholder="Enter brand name" />
                {errors.brandName && (
                  <p className="text-sm text-red-500">{errors.brandName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Input
                  id="businessType"
                  {...register('businessType')}
                  placeholder="Enter business type"
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
                    <SelectItem value="private_limited_company">Private Limited Company</SelectItem>
                    <SelectItem value="limited_company">Limited Company</SelectItem>
                  </SelectContent>
                </Select>
                {errors.entityType && (
                  <p className="text-sm text-red-500">{errors.entityType.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Information</CardTitle>
            <CardDescription>Enter tax-related details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Input id="panNumber" {...register('panNumber')} placeholder="Enter PAN number" />
                {errors.panNumber && (
                  <p className="text-sm text-red-500">{errors.panNumber.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
            <CardDescription>Enter the business address (optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register('address')} placeholder="Enter complete address" />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
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
                {errors.pincode && <p className="text-sm text-red-500">{errors.pincode.message}</p>}
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
                  placeholder="Enter latitude (optional)"
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
                  placeholder="Enter longitude (optional)"
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
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Creating...' : 'Create Business'}
          </Button>
        </div>
      </form>

      {/* Debug Information */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Information:</h3>
          <p>Form Valid: {isValid ? 'Yes' : 'No'}</p>
          <p>User ID: {session?.user?.id || 'Not available'}</p>
          <p>Session Status: {status}</p>
          <p>Current userId Value: {watch('userId') || 'Empty'}</p>
          <p>Errors: {getErrorSummary()}</p>
          <p>Is Submitting: {isSubmitting ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default AddPartner;
