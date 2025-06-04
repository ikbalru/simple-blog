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

import { useGetUserProfile } from '@/hooks/users/useGetUserProfile';
import { cn } from '@/lib/utils';
import { postLogin } from '@/services/auth/login';
import { login } from '@/store/redux/auth/auth.slice';
import { useAppDispatch } from '@/store/redux/store';

const loginFormSchema = z.object({
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
});

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [unauthorized, setUnauthorized] = React.useState(false);

  const [userMail, setUserMail] = React.useState<string>('');
  const [token, setToken] = React.useState<string>('');
  const { user, isFetching } = useGetUserProfile({ email: userMail });

  // Store user data in Redux when available
  React.useEffect(() => {
    if (user && !isFetching && token) {
      dispatch(login({ user, token }));
      router.replace('/');
    }
  }, [user, isFetching, dispatch, token, router]);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setIsLoading(true);
      const { token } = await postLogin({ payload: values });
      if (token) {
        setToken(token);
        setUserMail(values.email); // This will trigger user profile fetch
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setUnauthorized(true);
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
      <div className='shadow-card w-86.25 space-y-5 overflow-hidden rounded-xl border border-neutral-200 p-6 md:w-90'>
        {/* tilte */}
        <p className='text-xl-bold text-neutral-900'>Sign In</p>

        {unauthorized && (
          <p className='text-xs-regular text-[#EE1D52]'>
            * Email or password is incorrect
          </p>
        )}

        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
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

            <Button disabled={isLoading} className='h-12 w-full'>
              {isLoading ? <MoonLoader size={16} color='#fff' /> : 'Login'}
            </Button>
          </form>
        </Form>
        <p className='text-sm-regular text-center text-neutral-950'>
          Don&apos;t have an account?{' '}
          <span className='text-primary-300 text-sm-semibold hover:text-primary-200 cursor-pointer'>
            <Link href='/register'>Register</Link>
          </span>
        </p>
      </div>
    </main>
  );
};

export default LoginForm;
