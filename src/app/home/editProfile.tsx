import { X, ThumbsUp, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import AvatarImage from '@/components/ui/avatarImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Portal } from '@/components/ui/portal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetPostComment } from '@/hooks/posts/useGetPostComment';
import { useGetPostLike } from '@/hooks/posts/useGetPostLikes';
import { selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

interface ModalStatisticsProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface ModalDeleteProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface ModalEditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalStatistics = ({
  postId,
  isOpen,
  onClose,
}: ModalStatisticsProps) => {
  const { likes } = useGetPostLike({
    postId,
  });

  const { comments } = useGetPostComment({
    postId,
  });

  if (!isOpen) return null;

  // format date function
  const formatDate = (createdAt: string | Date | undefined) => {
    if (!createdAt) return '';
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };

  return (
    <Portal>
      {/* overlay */}
      <div
        onClick={onClose}
        className='flex-center fixed inset-0 z-50 flex overflow-hidden bg-[rgba(10,13,18,0.6)] px-6'
      >
        {/* start modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className='no-scrollbar bg-base-white h-[85vh] w-full overflow-y-scroll rounded-2xl px-4 py-6 md:w-153.25 md:px-6'
        >
          <div className='flex-between flex items-center'>
            <h3 className='text-md-bold md:text-xl-bold text-neutral-950'>
              Statistics
            </h3>
            <button type='button' onClick={onClose}>
              <X className='size-6 cursor-pointer text-neutral-950' />
            </button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue='like' orientation='horizontal'>
            <TabsList>
              <TabsTrigger value='like' className='flex-center flex gap-1'>
                <ThumbsUp className='size-5' />
                Like
              </TabsTrigger>
              <TabsTrigger value='comment' className='flex-center flex gap-1'>
                <MessageSquare className='size-5' />
                Comment
              </TabsTrigger>
            </TabsList>

            {/* Content Like */}
            <TabsContent value='like'>
              <p className='text-sm-bold md:text-lg-bold py-3 text-neutral-950 md:py-5'>
                Like({likes.length})
              </p>

              <ul className='divide-y divide-neutral-300'>
                {likes.map((like) => (
                  <li
                    key={like.id}
                    className='flex items-center gap-2 py-3 first-of-type:pt-0 last-of-type:pb-0 md:gap-3'
                  >
                    {/* image profile */}
                    <AvatarImage
                      src={like.avatarUrl || '/images/profile-dummy.jpg'}
                      alt='profile'
                      width={40}
                      height={40}
                      className='shrink-0 cursor-pointer rounded-full md:h-12 md:w-12'
                    />

                    <div>
                      {/* name profile */}
                      <p className='text-xs-bold md:text-sm-bold text-neutral-900'>
                        {like.name}
                      </p>
                      {/* accupation */}
                      <p className='text-xs-regular md:text-sm-regular text-neutral-900'>
                        {like.headline}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>

            {/* Content Comment */}
            <TabsContent value='comment'>
              <p className='text-sm-bold md:text-lg-bold py-3 text-neutral-950 md:py-5'>
                Comment({comments.length})
              </p>
              <ul className='divide-y divide-neutral-300'>
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className='py-3 first-of-type:pt-0 last-of-type:pb-0'
                  >
                    {/* image profile */}
                    <div className='flex items-center gap-2 md:gap-3'>
                      <AvatarImage
                        src={
                          comment.author.avatarUrl ||
                          '/images/profile-dummy.jpg'
                        }
                        alt='profile'
                        width={40}
                        height={40}
                        className='shrink-0 cursor-pointer rounded-full md:h-12 md:w-12'
                      />

                      <div>
                        {/* name profile */}
                        <p className='text-xs-bold md:text-sm-bold text-neutral-900'>
                          {comment.author.name}
                        </p>
                        {/* accupation */}
                        <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>

                    <p className='text-xs-regular md:text-sm-regular pt-2 text-neutral-900'>
                      {comment.content}
                    </p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Portal>
  );
};

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDelete = ({ isOpen, onClose }: ModalDeleteProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      {/* overlay */}
      <div
        onClick={onClose}
        className='flex-center fixed inset-0 z-50 flex overflow-hidden bg-[rgba(10,13,18,0.6)] px-6'
      >
        {/* start modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className='no-scrollbar bg-base-white w-full overflow-y-scroll rounded-2xl px-4 py-6 md:w-153.25 md:px-6'
        >
          {/* header */}
          <div className='flex-between flex items-center'>
            <h3 className='text-md-bold md:text-xl-bold text-neutral-950'>
              Delete
            </h3>
            <button type='button' onClick={onClose}>
              <X className='size-6 cursor-pointer text-neutral-950' />
            </button>
          </div>

          {/* content */}
          <p className='md:text-md-regular text-sm-regular py-4 text-neutral-600 md:py-6'>
            Are you sure to delete?
          </p>

          {/* action */}
          <div className='item-center flex justify-end'>
            <Button
              variant='noOutline'
              className='!text-sm-semibold h-12 w-42.75'
            >
              Cancel
            </Button>
            <Button variant='destructive' className='h-12 w-42.75'>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export const ModalEditProfile = ({
  isOpen,
  onClose,
}: ModalEditProfileProps) => {
  const user = useAppSelector(selectUser);

  if (!isOpen) return null;

  return (
    <Portal>
      {/* overlay */}
      <div
        onClick={onClose}
        className='flex-center fixed inset-0 z-50 flex overflow-hidden bg-[rgba(10,13,18,0.6)] px-6'
      >
        {/* start modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className='no-scrollbar bg-base-white w-full overflow-y-scroll rounded-2xl px-4 py-6 md:w-123.75 md:px-6'
        >
          {/* header */}
          <div className='flex-between flex items-center'>
            <h3 className='text-md-bold md:text-xl-bold text-neutral-950'>
              Edit Profile
            </h3>
            <button type='button' onClick={onClose}>
              <X className='size-6 cursor-pointer text-neutral-950' />
            </button>
          </div>

          {/* form */}
          <form className='space-y-5'>
            {/* avatar */}
            <div className='relative mx-auto w-fit cursor-pointer'>
              <Image
                src='/icons/camera-icon.svg'
                alt='camera'
                width={24}
                height={24}
                className='absolute bottom-0 left-1/2 translate-x-4 translate-y-1'
              />
              <AvatarImage
                src={user?.avatarUrl || '/images/profile-dummy.jpg'}
                alt='profile'
                width={80}
                height={80}
                className='mx-auto shrink-0 rounded-full'
              />

              <Input type='file' className='hidden' />
            </div>

            <div>
              {/* name */}
              <Label className='!text-sm-semibold pb-1 text-neutral-950'>
                Name
              </Label>
              <Input
                type='text'
                placeholder='Enter your name'
                value={user?.name || 'Guest'}
                className='text-sm-regular rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-950 placeholder:text-neutral-500'
              />
            </div>

            {/* headline */}
            <div>
              <Label className='!text-sm-semibold pb-1 text-neutral-950'>
                Profile Headline
              </Label>
              <Input
                type='text'
                placeholder='Enter your headline'
                value={user?.headline || 'No Headline'}
                className='text-sm-regular rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-950 placeholder:text-neutral-500'
              />
            </div>

            {/* action */}
            <Button type='submit' className='h-12 w-full'>
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </Portal>
  );
};
