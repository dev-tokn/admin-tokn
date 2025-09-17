// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format } from 'date-fns';
// import { CalendarDays, Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { cn, capitalizeText } from '@/lib/utils';

// const registerSchema = z.object({
//   first_name: z
//     .string()
//     .min(2, 'First name must be at least 2 characters')
//     .max(30, 'First name must be less than 30 characters')
//     .regex(/^[a-zA-Z\s]*$/, 'First name must contain only letters')
//     .trim(),
//   last_name: z
//     .string()
//     .min(2, 'Last name must be at least 2 characters')
//     .max(30, 'Last name must be less than 30 characters')
//     .regex(/^[a-zA-Z\s]*$/, 'First name must contain only letters')
//     .trim(),
//   dob: z.date().refine(date => {
//     const today = new Date();
//     const age = today.getFullYear() - date.getFullYear();
//     const monthDiff = today.getMonth() - date.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
//       return age - 1 >= 18;
//     }
//     return age >= 18;
//   }, 'You must be at least 18 years old'),
//   gender: z.enum(['male', 'female', 'other']),
//   email: z.email('Please enter a valid email address'),
//   mobile: z
//     .string()
//     .min(10, 'Mobile number must be at least 10 digits')
//     .max(10, 'Mobile number must be less than 10 digits'),
//   postal_code: z
//     .string()
//     .min(5, 'Postal code must be at least 5 characters')
//     .max(6, 'Postal code must be less than 5 characters'),
// });

// type RegisterFormValues = z.infer<typeof registerSchema>;

// const Register = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       first_name: '',
//       last_name: '',
//       dob: (() => {
//         const date = new Date();
//         date.setFullYear(date.getFullYear() - 25);
//         return date;
//       })(),
//       gender: undefined,
//       email: '',
//       mobile: '',
//       postal_code: '',
//     },
//   });

//   const onSubmit = async (data: RegisterFormValues) => {
//     setIsSubmitting(true);
//     console.log('Form data:', data);

//     // Simulate form submission for 5 seconds
//     setTimeout(() => {
//       setIsSubmitting(false);
//       // Handle actual form submission here
//       // Navigate to the signin page
//       window.location.href = '/signin';
//     }, 5000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <Card>
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
//             <CardDescription>Please fill in your information to register</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="first_name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="John"
//                             {...field}
//                             onBlur={e => {
//                               const capitalized = capitalizeText(e.target.value);
//                               field.onChange(capitalized);
//                             }}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="last_name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Doe"
//                             {...field}
//                             onBlur={e => {
//                               const capitalized = capitalizeText(e.target.value);
//                               field.onChange(capitalized);
//                             }}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="dob"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Date of Birth</FormLabel>
//                         <FormControl>
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <Button
//                                 variant="outline"
//                                 className={cn(
//                                   'w-full justify-start text-left font-normal bg-transparent',
//                                   !field.value && 'text-muted-foreground'
//                                 )}
//                               >
//                                 <CalendarDays className="mr-1 h-4 w-4" />
//                                 {field.value ? format(field.value, 'PPP') : <span>Birth date</span>}
//                               </Button>
//                             </PopoverTrigger>
//                             <PopoverContent
//                               className="w-auto overflow-hidden p-0"
//                               align="start"
//                               sideOffset={8}
//                             >
//                               <Calendar
//                                 mode="single"
//                                 selected={field.value}
//                                 onSelect={field.onChange}
//                                 defaultMonth={field.value}
//                                 initialFocus
//                                 disabled={date => {
//                                   const today = new Date();
//                                   const minDate = new Date();
//                                   const maxDate = new Date();
//                                   minDate.setFullYear(today.getFullYear() - 18);
//                                   maxDate.setFullYear(today.getFullYear() - 100);
//                                   return date > today || date < maxDate;
//                                 }}
//                                 captionLayout="dropdown"
//                               />
//                             </PopoverContent>
//                           </Popover>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="gender"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Gender</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select gender" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="male">Male</SelectItem>
//                             <SelectItem value="female">Female</SelectItem>
//                             <SelectItem value="other">Other</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input type="email" placeholder="john.doe@example.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="mobile"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Mobile</FormLabel>
//                         <FormControl>
//                           <Input placeholder="10 digit mobile number" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="postal_code"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Postal Code</FormLabel>
//                         <FormControl>
//                           <Input placeholder="12345" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isSubmitting}>
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Please Wait
//                     </>
//                   ) : (
//                     'Create Account'
//                   )}
//                 </Button>

//                 <div className="text-center">
//                   <p className="text-sm text-muted-foreground">
//                     Already have an account?{' '}
//                     <a
//                       href="/signin"
//                       className="text-primary hover:text-primary/80 font-medium transition-colors"
//                     >
//                       Sign In
//                     </a>
//                   </p>
//                 </div>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Register;
