'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MoonLoader } from 'react-spinners';
import { z } from 'zod';

import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useCreatePost } from '@/hooks/posts/useCreatePost';
import { useGetMyPostsInfinite } from '@/hooks/posts/useGetMyPost';
import { useGetPostById } from '@/hooks/posts/useGetPostById';

import ImageZone from './imageZone';
import InputTags from './inputTags';
import TextEditor from './textEditor';

// Define the Zod schema for form validation
const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters' })
    .max(50, { message: 'Title must not exceed 50 characters' }),
  content: z
    .string()
    .min(500, { message: 'Content must be at least 500 characters' })
    .max(5000, { message: 'Content must not exceed 5000 characters' }),
  tags: z
    .array(z.string())
    .min(1, { message: 'At least one tag is required' })
    .max(6, { message: 'Maximum 6 tags allowed' }),
  image: z
    .instanceof(File, { message: 'Image is required' })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Image size must not exceed 5MB',
    }),
});

const BlogPost = ({ id }: { id?: number }) => {
  const router = useRouter();

  const editMode = !!id;

  const { createPost, isCreating } = useCreatePost();
  const { queryKeyMyPostInfinite } = useGetMyPostsInfinite();

  // Only fetch post data when in edit mode and id is available
  const { post, isFetching } = useGetPostById(
    // Only pass id when in edit mode
    editMode ? { id } : { id: 0 }
  );

  // Set up react-hook-form with zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  });

  // Show loading state when fetching post data in edit mode or creating post
  const isLoading = (editMode && isFetching) || isCreating;

  // Load post data into form when available (edit mode only)
  React.useEffect(() => {
    if (editMode && post) {
      // For edit mode, we need to exclude the image field from validation initially
      // since we can't directly set a File object from API data
      if (editMode) {
        form.reset({
          title: post.title,
          content: post.content,
          tags: post.tags || [],
        });
      }
    }
  }, [editMode, post, form]);

  // Handle form submission
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Log the data before submission

      if (editMode) {
        console.log('FORM DATA IN EDIT MODE:', {
          title: data.title,
          content: data.content,
          tags: data.tags,
          image: data.image.name,
        });
      } else {
        createPost({
          payload: data,
          queryKey: queryKeyMyPostInfinite,
        });
      }

      router.push('/profile');
    } catch (error) {
      console.error('Error submitting form:', error);
      console.error('Failed to submit the blog post:', error);
    }
  }
  return (
    <>
      <main className='profile-container'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='my-20 flex flex-col gap-5'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='!text-sm-semibold pb-1 text-neutral-950'>
                    Title
                  </FormLabel>
                  <Input
                    placeholder='Enter your title'
                    className='focus-visible:ring-primary-300 w-full rounded-xl border border-neutral-300 px-4 py-2.5 focus-visible:ring-2'
                    disabled={isLoading}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='!text-sm-semibold pb-1 text-neutral-950'>
                    Content
                  </FormLabel>
                  <TextEditor
                    onChange={(content) => field.onChange(content)}
                    initialContent={field.value}
                    disabled={isLoading}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='!text-sm-semibold pb-1 text-neutral-950'>
                    Cover Image
                  </FormLabel>
                  <ImageZone
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                    // Pass image URL from post data in edit mode
                    imageUrl={editMode && post ? post.imageUrl : undefined}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='!text-sm-semibold pb-1 text-neutral-950'>
                    Tags
                  </FormLabel>
                  <InputTags
                    tags={field.value}
                    setTags={field.onChange}
                    disabled={isLoading}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={isLoading}
              className='cursor-pointer self-end'
            >
              {isLoading ? (
                <MoonLoader size={20} />
              ) : editMode ? (
                'Save'
              ) : (
                'Finish'
              )}
            </Button>
          </form>
        </Form>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
