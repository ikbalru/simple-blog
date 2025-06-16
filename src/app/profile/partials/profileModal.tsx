'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MoonLoader } from 'react-spinners';
import * as z from 'zod';

import AvatarImage from '@/components/ui/avatarImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Portal } from '@/components/ui/portal';

import { useUpdateProfile } from '@/hooks/posts/useUpdateProfile';
import { selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

interface ModalEditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// Define Zod schema for profile update
const profileSchema = z.object({
  name: z.string().min(3, 'Name is required').optional(),
  headline: z.string().optional(),
  avatar: z
    .instanceof(FileList)
    .refine(
      (files) => files?.length === 0 || files?.length === 1,
      'Please upload one file'
    )
    .refine(
      (files) => files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB`
    )
    .refine(
      (files) =>
        files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, and .png formats are supported'
    )
    .optional(),
});

export const ModalEditProfile = ({
  isOpen,
  onClose,
}: ModalEditProfileProps) => {
  const user = useAppSelector(selectUser);
  const [avatarPreview, setAvatarPreview] = React.useState<string>(
    user?.avatarUrl || '/images/profile-dummy.jpg'
  );

  // Use our optimistic update profile hook
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || 'Guest',
      headline: user?.headline || 'No Headline',
    },
  });

  const avatarFile = watch('avatar');

  // Update avatar preview when file is selected
  React.useEffect(() => {
    if (avatarFile?.[0]) {
      const file = avatarFile[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [avatarFile]);

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      // Prepare the payload for the mutation
      const payload = {
        name: data.name,
        headline: data.headline,
        avatar: data.avatar?.[0] || null,
      };

      // Call the mutation with optimistic updates
      await updateProfileMutation.mutateAsync({ payload });

      // Log success message
      console.log('Profile updated successfully');

      // Close modal on success
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        onClick={onClose}
        className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[rgba(10,13,18,0.6)] px-6'
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className='w-full max-w-[495px] overflow-hidden rounded-2xl bg-white px-4 py-6 md:px-6'
        >
          <div className='flex items-center justify-between'>
            <h3 className='text-xl font-semibold text-neutral-950'>
              Edit Profile
            </h3>
            <button type='button' onClick={onClose}>
              <X className='h-6 w-6 cursor-pointer text-neutral-950' />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-5'>
            <div className='relative mx-auto w-fit'>
              <label htmlFor='avatar' className='cursor-pointer'>
                <Image
                  src='/icons/camera-icon.svg'
                  alt='camera'
                  width={24}
                  height={24}
                  className='absolute bottom-0 left-1/2 translate-x-4 translate-y-1'
                />
                <AvatarImage
                  src={avatarPreview}
                  alt='profile'
                  width={80}
                  height={80}
                  className='mx-auto shrink-0 overflow-hidden rounded-full object-cover'
                />
              </label>
              <input
                id='avatar'
                type='file'
                accept='image/png,image/jpeg,image/jpg'
                className='hidden'
                disabled={isSubmitting}
                {...register('avatar')}
              />
              {errors.avatar && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.avatar.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor='name'
                className='mb-1 block text-sm font-semibold text-neutral-950'
              >
                Name
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='Enter your name'
                disabled={isSubmitting}
                className='w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-neutral-950 placeholder:text-neutral-500'
                {...register('name')}
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor='headline'
                className='mb-1 block text-sm font-semibold text-neutral-950'
              >
                Profile Headline
              </Label>
              <Input
                id='headline'
                type='text'
                placeholder='Enter your headline'
                disabled={isSubmitting}
                className='w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-neutral-950 placeholder:text-neutral-500'
                {...register('headline')}
              />
              {errors.headline && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.headline.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              disabled={isSubmitting}
              className='h-12 w-full bg-blue-500 text-white hover:bg-blue-600'
            >
              {isSubmitting ? (
                <MoonLoader size={16} color='#fff' />
              ) : (
                'Update Profile'
              )}
            </Button>
          </form>
        </div>
      </div>
    </Portal>
  );
};
