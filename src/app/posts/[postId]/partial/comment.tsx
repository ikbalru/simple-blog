'use client';

import { X } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Portal } from '@/components/ui/portal';
import { Textarea } from '@/components/ui/textarea';

import { Post } from '@/models/post';

const comment: any = [
  {
    id: 1,
    name: 'Clarissa',
    createdAt: '2025-06-07T11:24:25.000Z',
    comment: 'This is a comment',
  },
  {
    id: 2,
    name: 'Marco',
    createdAt: '2025-06-07T11:24:25.000Z',
    comment:
      'TExactly what I needed to read today. Frontend is evolving so fast!',
  },
  {
    id: 3,
    name: 'John Doe',
    createdAt: '2025-06-07T11:24:25.000Z',
    comment: '"Great breakdown! You made complex ideas sound simple."',
  },
  {
    id: 4,
    name: 'John Doe',
    createdAt: '2025-06-07T11:24:25.000Z',
    comment: '"Great breakdown! You made complex ideas sound simple."',
  },
];

type CommentsProps = {
  post: Post;
  formatDate: (createdAt: string | Date | undefined) => string;
};

const Comments = ({ post, formatDate }: CommentsProps) => {
  const [open, setOpen] = React.useState(false);

  const handleModalComment = () => {
    console.log('modal comment');
    setOpen((prev) => !prev);
  };

  return (
    <>
      <section className='py-3 md:py-4'>
        {/* title comments */}
        <h2 className='md:display-xs-bold display-xl-bold'>
          Comments({post.comments})
        </h2>

        {/* user profile */}
        <div className='flex items-center gap-2 py-3'>
          {/* image profile */}
          <div className='h-7.5 w-7.5 shrink-0 overflow-hidden rounded-full bg-neutral-400 md:h-10 md:w-10'></div>

          {/* name profile */}
          <p className='text-xs-semibold md:text-sm-semibold text-neutral-900'>
            {post.author.name}
          </p>
        </div>

        {/* form comment */}
        <form className='flex flex-col gap-3'>
          {/* comment text */}
          <label className='text-sm-semibold text-neutral-950'>
            Give your Comments
          </label>

          <Textarea placeholder='Enter your comment' />

          <Button className='h-12 w-full self-end md:w-51'>Send</Button>
        </form>
      </section>

      {/* comment lists section */}
      {comment.length > 0 && (
        <section className='py-3 md:py-4'>
          <ul className='divide-y divide-neutral-300'>
            {comment.map(
              (item: any, index: number) =>
                index < 3 && (
                  <li
                    key={item.id}
                    className='py-3 first-of-type:pt-0 last-of-type:pb-0'
                  >
                    {/* comment */}
                    <div className='flex items-center gap-3'>
                      {/* image profile */}
                      <div className='h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-400 md:h-12 md:w-12'></div>

                      <div>
                        {/* name profile */}
                        <p className='text-xs-semibold md:text-sm-semibold text-neutral-900'>
                          {item.name}
                        </p>

                        {/* time of create post */}
                        <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* comment text */}
                    <p className='md:text-sm-regular text-xs-regular mt-2 text-neutral-900'>
                      {item.comment}
                    </p>
                  </li>
                )
            )}
          </ul>
          {comment.length > 3 && (
            <Button
              variant='link'
              size='link'
              className='md:text-sm-semibold text-xs-semibold pt-3 md:pt-4'
              onClick={handleModalComment}
            >
              See All Comments
            </Button>
          )}
        </section>
      )}
      {open && (
        <ModalComment
          post={post}
          formatDate={formatDate}
          isOpen={open}
          onClose={handleModalComment}
        />
      )}
    </>
  );
};

export default Comments;

type ModalCommentProps = CommentsProps & {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalComment = ({
  post,
  formatDate,
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
            <div className='flex items-center justify-between gap-2'>
              <h2 className='md:text-xl-bold text-md-bold'>
                Comments({post.comments})
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
              {comment.map((item: any) => (
                <li
                  key={item.id}
                  className='py-3 first-of-type:pt-0 last-of-type:pb-0'
                >
                  {/* comment */}
                  <div className='flex items-center gap-3'>
                    {/* image profile */}
                    <div className='h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-400 md:h-12 md:w-12'></div>

                    <div>
                      {/* name profile */}
                      <p className='text-xs-semibold md:text-sm-semibold text-neutral-900'>
                        {item.name}
                      </p>

                      {/* time of create post */}
                      <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* comment text */}
                  <p className='md:text-sm-regular text-xs-regular mt-2 text-neutral-900'>
                    {item.comment}
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
