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
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check localStorage for saved email and remember me preference on component mount
  useEffect(() => {
    if (!isClient) return;

    const savedEmail = localStorage.getItem('email');
    const savedRememberMe = localStorage.getItem('remember');

    if (savedEmail && savedRememberMe === 'true') {
      form.setValue('email', savedEmail);
      setRememberMe(true); // Restore the checkbox state
      // Set focus to password field after a short delay to ensure form is rendered
      setTimeout(() => {
        form.setFocus('password');
      }, 100);
    }
  }, [form, isClient]);

  const onSubmit = async (data: SigninFormValues) => {
    setIsSubmitting(true);
    console.log('Form data:', data);

    // Handle remember me only after successful authentication
    if (rememberMe) {
      localStorage.setItem('remember', 'true');
      localStorage.setItem('email', data.email);
    } else {
      localStorage.removeItem('remember');
      localStorage.removeItem('email');
    }

    // Simulate signin process for 3 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to dashboard after successful signin
      window.location.href = '/dashboard';
    }, 3000);

    // Handle actual signin logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="h-11 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center items-center align-middle gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please Wait
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <a
                      href="/register"
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Register
                    </a>
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Forgot Password?{' '}
                    <a
                      href="/reset"
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Reset
                    </a>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
