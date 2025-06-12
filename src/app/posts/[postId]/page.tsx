'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import AvatarImage from '@/components/ui/avatarImage';
import PostCard from '@/components/ui/postCard';
import SafeImage from '@/components/ui/safeImage';

import { useGetPostById } from '@/hooks/posts/useGetPostById';
import { useGetPostComment } from '@/hooks/posts/useGetPostComment';
import { useGetPostLike } from '@/hooks/posts/useGetPostLikes';
import { useGetPostsRecommended } from '@/hooks/posts/useGetPostsRecommended';
import { useUpdatePostLike } from '@/hooks/posts/usePostLikePostById';
import { useGetUserProfile } from '@/hooks/users/useGetUserProfile';
import { selectToken, selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

import Comments from './partial/comment';

const random = Math.floor(Math.random() * 10) + 1;

const PostbyId = () => {
  const params = useParams();

  const {
    post,
    isFetching: isFetchingPost,
    error: errorPost,
  } = useGetPostById({
    id: Number(params.postId),
  });
  const { user } = useGetUserProfile({
    email: post?.author.email || '',
  });
  const {
    comments,
    queryKeyComments,
    isFetching: isFetchingComment,
    error: errorComment,
  } = useGetPostComment({
    postId: Number(params.postId),
  });
  const { likes, queryKeyPostLikes } = useGetPostLike({
    postId: Number(params.postId),
  });
  const {
    postsRecommended,
    isFetching: isFetchingRecommended,
    error: errorRecommended,
  } = useGetPostsRecommended({ page: random, limit: 2 });

  const { updatePostLike } = useUpdatePostLike();
  const currentUser = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  // filter like Post for current user
  const LikedPost = likes.find((like) => like.id === currentUser?.id) || null;

  // filter another Post
  const anotherPost = postsRecommended.filter(
    (post) => post.id !== Number(params.postId)
  );

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

  const handleLikePost = () => {
    if (!token) {
      alert('You must login first');
      return;
    }
    updatePostLike({
      postId: Number(params.postId),
      queryKey: queryKeyPostLikes,
      currentUser: currentUser!,
    });
  };

  return (
    <>
      <Navbar />
      <main className='mx-auto mt-20 max-w-208 divide-y divide-neutral-300 px-4 md:mt-32'>
        {post && (
          <>
            {/* content post */}
            <section className='pb-3 md:pb-4'>
              {/* title */}
              <h1 className='display-sm-bold md:display-lg-bold text-neutral-900'>
                {post.title}
              </h1>

              {/* tag */}
              <ul className='mt-3 flex h-7 flex-wrap gap-x-2 overflow-hidden md:mt-4'>
                {post.tags.map((tag, index) => (
                  <li
                    key={index}
                    className='h-full rounded-md border border-neutral-300 px-2 py-0.5'
                  >
                    <p className='text-xs-regular text-neutral-900'>{tag}</p>
                  </li>
                ))}
              </ul>

              {/* post account */}
              <div className='mt-3 flex items-center gap-3 md:mt-4'>
                {/* profile */}
                <div className='flex items-center gap-2'>
                  {/* image profile */}
                  <AvatarImage
                    src={user?.avatarUrl || '/images/profile-dummy.jpg'}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className='cursor-pointer rounded-full'
                  />

                  {/* name profile */}
                  <p className='text-xs-regular md:text-sm-medium text-neutral-900'>
                    {post.author.name}
                  </p>

                  {/* divider */}
                  <div className='aspect-square w-1 rounded-full bg-neutral-400'></div>

                  {/* time of create post */}
                  <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>

              {/* fetching */}
              {isFetchingPost && (
                <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
                  Please wait while data being load...
                </p>
              )}
              {/* Error */}
              {errorPost && (
                <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
                  Error loading posts: {errorPost.message}
                </p>
              )}
            </section>

            {/* engagement post */}
            <section className='flex items-center gap-3 py-3 md:gap-5 md:py-4'>
              {/* like */}
              <div className='flex items-center gap-1.5'>
                <button onClick={handleLikePost}>
                  <Image
                    src={
                      LikedPost
                        ? '/icons/like-active-icon.svg'
                        : '/icons/like-icon.svg'
                    }
                    alt='like'
                    width={20}
                    height={20}
                    className='shrink-0 cursor-pointer'
                  />
                </button>
                <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                  {likes.length}
                </p>
              </div>

              {/* comment */}
              <div className='flex items-center gap-1.5'>
                <Link href='#comments'>
                  <Image
                    src='/icons/comment-icon.svg'
                    alt='comment'
                    width={20}
                    height={20}
                    className='shrink-0 cursor-pointer'
                  />
                </Link>
                <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                  {comments.length}
                </p>
              </div>
            </section>

            {/* content */}
            <section className='py-3 md:py-4'>
              {/* hero Image */}
              <div className='relative mb-3 aspect-[1/1] w-full overflow-hidden rounded-sm md:mb-4 md:aspect-[16/9]'>
                <SafeImage
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes='100%'
                />
              </div>
              <article className='prose prose-neutral prose-base max-w-none'>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </article>
            </section>

            {/* comments section */}
            <section id='comments'>
              <Comments
                post={post}
                comments={comments}
                user={user}
                formatDate={formatDate}
                queryKeyComment={queryKeyComments}
              />

              {/* Loading */}
              {isFetchingComment && (
                <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
                  Please wait while data being load...
                </p>
              )}
              {/* Error */}
              {errorComment && (
                <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
                  Error loading posts: {errorComment.message}
                </p>
              )}
            </section>

            {/* related posts */}
            <section className='pt-3 md:pt-4'>
              <h2 className='text-xl-bold md:display-xs-bold pb-3 md:pb-4'>
                Another Posts
              </h2>
              {/* postcard */}
              {anotherPost.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}

              {/* Loading */}
              {isFetchingRecommended && (
                <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
                  Please wait while data being load...
                </p>
              )}
              {/* Error */}
              {errorRecommended && (
                <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
                  Error loading posts: {errorRecommended.message}
                </p>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default PostbyId;
