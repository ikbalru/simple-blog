import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Eye, EyeClosed } from 'lucide-react';
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

import { UseUpdatePassword } from '@/hooks/users/useUpdatePassword';
import { cn } from '@/lib/utils';
import { logout } from '@/store/redux/auth/auth.slice';
import { useAppDispatch } from '@/store/redux/store';

const changePasswordFormSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: 'Current Password is required',
      })
      .min(1, 'Current Password is required'),
    newPassword: z
      .string({
        required_error: 'New Password is required',
      })
      .min(1, 'New Password is required'),
    confirmPassword: z.string({
      required_error: 'Confirm New Password is required',
    }),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ChangePassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { updatePassword, isUpdating } = UseUpdatePassword();

  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState(false);

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    try {
      const success = await updatePassword({ payload: values });
      console.log(success);
      if (success) {
        alert(
          'Password updated successfully, you will redirected to login page'
        );
        dispatch(logout());
        router.push('/login');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setCurrentPassword(true);
      }
    }
  }

  return (
    <section className='w-full max-w-134.5 p-4 md:p-5'>
      {/* form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          {/* current password */}
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field, fieldState }) => (
              <FormItem>
                {currentPassword && (
                  <p className='text-xs-regular pb-5 text-[#EE1D52]'>
                    * Current password is incorrect
                  </p>
                )}
                <FormLabel className='text-sm-semibold pb-1 text-neutral-950'>
                  Current Password
                </FormLabel>
                <div
                  className={cn(
                    'flex-between flex rounded-xl border px-4 py-2.5',
                    fieldState.error ? 'border-[#EE1D52]' : 'border-neutral-300'
                  )}
                >
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder='Enter current password'
                    disabled={isUpdating}
                    {...field}
                    className='text-sm-regular text-neutral-950 placeholder:text-neutral-500'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className='cursor-pointer'
                    type='button'
                  >
                    {showCurrentPassword ? (
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

          {/* new password */}
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className='text-sm-semibold pb-1 text-neutral-950'>
                  New Password
                </FormLabel>
                <div
                  className={cn(
                    'flex-between flex rounded-xl border px-4 py-2.5',
                    fieldState.error ? 'border-[#EE1D52]' : 'border-neutral-300'
                  )}
                >
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder='Enter new password'
                    disabled={isUpdating}
                    {...field}
                    className='text-sm-regular text-neutral-950 placeholder:text-neutral-500'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className='cursor-pointer'
                    type='button'
                  >
                    {showNewPassword ? (
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

          {/* confirm new password */}
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className='text-sm-semibold pb-1 text-neutral-950'>
                  Confirm New Password
                </FormLabel>
                <div
                  className={cn(
                    'flex-between flex rounded-xl border px-4 py-2.5',
                    fieldState.error ? 'border-[#EE1D52]' : 'border-neutral-300'
                  )}
                >
                  <Input
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    placeholder='Enter confirm new password'
                    disabled={isUpdating}
                    {...field}
                    className='text-sm-regular text-neutral-950 placeholder:text-neutral-500'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                    className='cursor-pointer'
                    type='button'
                  >
                    {showConfirmNewPassword ? (
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

          <Button type='submit' disabled={isUpdating} className='h-12 w-full'>
            {isUpdating ? (
              <MoonLoader size={16} color='#fff' />
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ChangePassword;
