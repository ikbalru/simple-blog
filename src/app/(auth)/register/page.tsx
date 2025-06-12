'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MoonLoader } from 'react-spinners';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';
import { postRegister } from '@/services/auth/register';

const registerFormSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be at most 50 characters long')
      .refine((value) => value.trim() !== '', 'Name is required'),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Please enter a valid email address'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, 'Password is required'),
    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [accountExists, setAccountExists] = React.useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: undefined,
      confirmPassword: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      setIsLoading(true);
      const { email } = await postRegister({ payload: values });
      if (email) {
        alert('Account created successfully');
        router.push('/login');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setAccountExists(true);
        } else {
          console.log(error.response?.data);
        }
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className='custom-container flex-center flex h-[100vh]'>
      <section className='shadow-card w-86.25 space-y-5 overflow-hidden rounded-xl border border-neutral-200 p-6 md:w-90'>
        {/* tilte */}
        <h1 className='text-xl-bold text-neutral-900'>Sign In</h1>

        {accountExists && (
          <p className='text-xs-regular text-[#EE1D52]'>
            * Email already registered
          </p>
        )}

        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            {/* name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='text-sm-semibold text-neutral-950'>
                    Name
                  </FormLabel>
                  <div
                    className={cn(
                      'rounded-xl border border-neutral-300 px-4 py-2.5',
                      fieldState.error
                        ? 'border-[#EE1D52]'
                        : 'border-neutral-300'
                    )}
                  >
                    <Input
                      type='text'
                      placeholder='Enter your name'
                      disabled={isLoading}
                      {...field}
                      className='text-sm-regular text-neutral-950 placeholder:text-neutral-500'
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='text-sm-semibold text-neutral-950'>
                    Email
                  </FormLabel>
                  <div
                    className={cn(
                      'rounded-xl border border-neutral-300 px-4 py-2.5',
                      fieldState.error
                        ? 'border-[#EE1D52]'
                        : 'border-neutral-300'
                    )}
                  >
                    <Input
                      type='email'
                      placeholder='Enter your email'
                      disabled={isLoading}
                      {...field}
                      className='text-sm-regular text-neutral-950 placeholder:text-neutral-500'
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='text-sm-semibold text-neutral-950'>
                    Password
                  </FormLabel>
                  <div
                    className={cn(
                      'flex-between flex rounded-xl border px-4 py-2.5',
                      fieldState.error
                        ? 'border-[#EE1D52]'
                        : 'border-neutral-300'
                    )}
                  >
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter your password'
                      disabled={isLoading}
                      {...field}
                      className='text-sm-regular text-neutral-950 placeholder:text-neutral-500'
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setShowPassword((prev) => !prev)}
                      className='cursor-pointer'
                      type='button'
                    >
                      {showPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeClosed size={20} />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* confirm password */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='text-sm-semibold text-neutral-950'>
                    Confirm Password
                  </FormLabel>
                  <div
                    className={cn(
                      'flex-between flex rounded-xl border px-4 py-2.5',
                      fieldState.error
                        ? 'border-[#EE1D52]'
                        : 'border-neutral-300'
                    )}
                  >
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Enter your confirm password'
                      disabled={isLoading}
                      {...field}
                      className='text-sm-regular text-neutral-950 placeholder:text-neutral-500'
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className='cursor-pointer'
                      type='button'
                    >
                      {showConfirmPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeClosed size={20} />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isLoading} className='h-12 w-full'>
              {isLoading ? <MoonLoader size={16} color='#fff' /> : 'Register'}
            </Button>
          </form>
        </Form>
        <p className='text-sm-regular text-center text-neutral-950'>
          Already have an account?{' '}
          <span className='text-primary-300 text-sm-bold hover:text-primary-200 cursor-pointer'>
            <Link href='/login'>Login</Link>
          </span>
        </p>
      </section>
    </main>
  );
};

export default RegisterForm;
