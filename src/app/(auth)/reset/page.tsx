'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Smartphone, Send } from 'lucide-react';
import Link from 'next/link';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const mobileSchema = z.object({
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type MobileFormValues = z.infer<typeof mobileSchema>;

export default function ResetPassword() {
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const mobileForm = useForm<MobileFormValues>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobile: '',
    },
  });

  const onEmailSubmit = (data: EmailFormValues) => {
    console.log('Email reset data:', data);
    // Handle email reset logic here
  };

  const onMobileSubmit = (data: MobileFormValues) => {
    console.log('Mobile reset data:', data);
    // Handle mobile reset logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>Choose how you want to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 mt-6">
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-11">
                      <Send className="w-4 h-4 mr-2" />
                      Send Reset Link
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-4 mt-6">
                <Form {...mobileForm}>
                  <form onSubmit={mobileForm.handleSubmit(onMobileSubmit)} className="space-y-4">
                    <FormField
                      control={mobileForm.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Mobile Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter your mobile number"
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-11">
                      <Send className="w-4 h-4 mr-2" />
                      Send Reset Code
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
            <div className="mt-6 text-center space-y-4">
              <div className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link
                  href="/signin"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </div>

              {/* feature not implemented for admin dashboard */}
              {/* <div className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Register
                </Link>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
