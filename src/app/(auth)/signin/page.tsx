'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signinAction } from '@/lib/actions';
import { signinSchema, type SigninFormData } from '@/lib/validations';
import { useAuth, useIsAuthenticated } from '@/lib/auth';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { login } = useAuth();
  const isAuthenticated = useIsAuthenticated();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const form = useForm<SigninFormData>({
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
      setRememberMe(true);
      setTimeout(() => {
        form.setFocus('password');
      }, 100);
    }
  }, [form, isClient]);

  const onSubmit = (data: SigninFormData) => {
    startTransition(async () => {
      try {
        // Create FormData for server action
        const formData = new FormData();
        formData.append('email', data.email || '');
        formData.append('password', data.password);

        // Add remember me to form data
        formData.append('rememberMe', rememberMe.toString());

        // Handle remember me in localStorage
        if (rememberMe) {
          localStorage.setItem('remember', 'true');
          localStorage.setItem('email', data.email || '');
        } else {
          localStorage.removeItem('remember');
          localStorage.removeItem('email');
        }

        // Call server action
        const result = await signinAction(formData);

        if (result.success && result.data) {
          // Update global auth state (uses sessionStorage for token and user data)
          login(result.data.user, result.data.token);

          // Show success message
          toast.success(result.message || 'Login successful!', {
            description: `Welcome back, ${result.data.user.firstName}!`,
            duration: 3000,
          });

          // Redirect to dashboard
          router.push('/dashboard');
        } else {
          // Show error message
          toast.error(result.message || 'Login failed', {
            description: result.errors?.[0]?.message || 'Please check your credentials',
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Signin error:', error);
        toast.error('An unexpected error occurred', {
          description: 'Please try again later',
          duration: 5000,
        });
      }
    });
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md space-y-8">
        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
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

                <Button type="submit" className="w-full h-11" disabled={isPending}>
                  <LogIn className="w-4 h-4 mr-2" />
                  {isPending ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
