'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import AvatarImage from '@/components/ui/avatarImage';
import { Button } from '@/components/ui/button';
import { Portal } from '@/components/ui/portal';
import { Textarea } from '@/components/ui/textarea';

import {
  CreateCommentVariables,
  useCreateComment,
} from '@/hooks/posts/useCreateComment';
import { formatDate } from '@/lib/utility';
import { Comment } from '@/models/comment';
import { Post } from '@/models/post';
import { User } from '@/models/user';
import { CommentsQueryKey } from '@/services/posts/getPostComment';
import { selectToken, selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

type CommentsProps = {
  post: Post;
  user: User | null;
  comments: Comment[];
  queryKeyComment: CommentsQueryKey;
};

const Comments = ({ post, user, comments, queryKeyComment }: CommentsProps) => {
  const router = useRouter();

  const currentUser = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const { createComment } = useCreateComment();

  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const handleModalComment = () => {
    setOpen((prev) => !prev);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      alert('You must login first');
      return router.push('/login');
    }

    const variables: CreateCommentVariables = {
      postId: post.id,
      payload: {
        content: comment,
      },
      queryKey: queryKeyComment,
      currentUser: currentUser!,
    };

    if (comment.trim()) {
      createComment(variables);
    }
    setComment('');
  };

  return (
    <>
      <div className='py-3 md:py-4'>
        {/* title comments */}
        <h2 className='md:display-xs-bold display-xl-bold'>
          Comments({comments.length})
        </h2>

        {/* user profile */}
        <div className='flex items-center gap-2 py-3'>
          {/* image profile */}
          <AvatarImage
            src={user?.avatarUrl || '/images/profile-dummy.jpg'}
            alt={post.author.name}
            width={40}
            height={40}
            className='cursor-pointer rounded-full'
          />

          {/* name profile */}
          <p className='text-xs-semibold md:text-sm-semibold text-neutral-900'>
            {post.author.name}
          </p>
        </div>

        {/* form comment */}
        <form onSubmit={handleOnSubmit} className='flex flex-col gap-3'>
          {/* comment text */}
          <label className='text-sm-semibold text-neutral-950'>
            Give your Comments
          </label>

          <Textarea
            placeholder='Enter your comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button type='submit' className='h-12 w-full self-end md:w-51'>
            Send
          </Button>
        </form>
      </div>

      {/* comment lists section */}
      {comments.length > 0 && (
        <div className='py-3 md:py-4'>
          <ul className='divide-y divide-neutral-300'>
            {comments.map(
              (item, index) =>
                index < 3 && (
                  <li
                    key={item.id}
                    className='py-3 first-of-type:pt-0 last-of-type:pb-0'
                  >
                    {/* comment */}
                    <div className='flex items-center gap-3'>
                      {/* image profile */}
                      <AvatarImage
                        src={
                          item.author.avatarUrl || '/images/profile-dummy.jpg'
                        }
                        alt={item.author.name}
                        width={40}
                        height={40}
                        className='shrink-0 cursor-pointer rounded-full object-cover md:h-12 md:w-12'
                      />

                      <div>
                        {/* name profile */}
                        <p className='text-xs-semibold md:text-sm-semibold text-neutral-900'>
                          {item.author.name}
                        </p>

                        {/* time of create post */}
                        <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* comment text */}
                    <p className='md:text-sm-regular text-xs-regular mt-2 text-neutral-900'>
                      {item.content}
                    </p>
                  </li>
                )
            )}
          </ul>
          {comments.length > 3 && (
            <Button
              variant='link'
              size='link'
              className='md:text-sm-semibold text-xs-semibold pt-3 md:pt-4'
              onClick={handleModalComment}
            >
              See All Comments
            </Button>
          )}
        </div>
      )}
      {open && (
        <ModalComment
          comments={comments}
          isOpen={open}
          onClose={handleModalComment}
        />
      )}
    </>
  );
};

export default Comments;

type ModalCommentProps = {
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
};

export const ModalComment = ({
  comments,
  isOpen,
  onClose,
}: ModalCommentProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        onClick={onClose}
        className='flex-center fixed inset-0 z-50 flex overflow-hidden bg-[rgba(10,13,18,0.6)] px-6'
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className='no-scrollbar bg-base-white h-[85vh] w-full divide-y divide-neutral-300 overflow-y-scroll rounded-2xl px-4 py-6 md:w-153.25 md:px-6'
        >
          <div className='pb-4 md:pb-5'>
            {/* title comments */}
            <div className='flex-between flex gap-2'>
              <h2 className='md:text-xl-bold text-md-bold'>
                Comments({comments.length})
              </h2>

              {/* close modal */}
              <button type='button' onClick={onClose}>
                <X className='size-6 cursor-pointer text-neutral-950' />
              </button>
            </div>

            {/* form comment */}
            <form className='flex flex-col gap-3 pt-4 md:pt-5'>
              {/* comment text */}
              <label className='text-sm-semibold text-neutral-950'>
                Give your Comments
              </label>

              <Textarea placeholder='Enter your comment' />

              <Button className='h-10 w-full self-end md:h-12 md:w-51'>
                Send
              </Button>
            </form>
          </div>

          {/* comment lists section */}
          <div className='pt-3'>
            <ul className='divide-y divide-neutral-300'>
              {comments.map((item) => (
                <li
                  key={item.id}
                  className='py-3 first-of-type:pt-0 last-of-type:pb-0'
                >
                  {/* comment */}
                  <div className='flex items-center gap-3'>
                    {/* image profile */}
                    <AvatarImage
                      src={item.author.avatarUrl || '/images/profile-dummy.jpg'}
                      alt={item.author.name}
                      width={40}
                      height={40}
                      className='cursor-pointer rounded-full md:h-12 md:w-12'
                    />

                    <div>
                      {/* name profile */}
                      <p className='text-xs-semibold md:text-sm-semibold text-neutral-900'>
                        {item.author.name}
                      </p>

                      {/* time of create post */}
                      <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* comment text */}
                  <p className='md:text-sm-regular text-xs-regular mt-2 text-neutral-900'>
                    {item.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Portal>
  );
};
