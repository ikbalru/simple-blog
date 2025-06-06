'use client';

// import Footer from '@/components/layout/footer';
import Image from 'next/image';
import React from 'react';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import PostCard from '@/components/ui/postCard';

import { useGetPostsMostLiked } from '@/hooks/posts/useGetPostsMostLiked';
import { useGetPostsRecommended } from '@/hooks/posts/useGetPostsRecommended';
import { Post } from '@/models/post';

const Home = () => {
  const limitItem = 5;
  const [currentPage, setCurrentPage] = React.useState(3);

  const {
    postsRecommended,
    isFetching: isFetchingRecommended,
    total,
    error: errorRecommended,
  } = useGetPostsRecommended({
    page: currentPage,
    limit: limitItem,
  });
  const {
    postsMostLiked,
    isFetching: isFetchingMostLiked,
    error: errorMostLiked,
  } = useGetPostsMostLiked({ limit: 3 });

  return (
    <>
      <Navbar />

      <main className='custom-container mt-22 overflow-hidden lg:mt-32'>
        <section className='grid grid-cols-1 lg:grid-cols-[minmax(auto,50.4rem)_auto_18.5rem]'>
          <div className='pr-0 lg:pr-4'>
            <h1 className='text-xl-bold md:display-sm-bold text-neutral-900'>
              Recommend For You
            </h1>

            <ul>
              {postsRecommended.map((post) => (
                <li
                  key={post.id}
                  className='border-b border-neutral-300 py-4 md:py-6'
                >
                  <PostCard {...post} />
                </li>
              ))}
            </ul>

            <PaginationSection
              totalPosts={total}
              postsPerPage={limitItem}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

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
          </div>

          {/* divider lg*/}
          <div
            className='hidden justify-self-center bg-neutral-300 lg:mt-0 lg:mb-0 lg:block lg:w-px'
            style={{
              height: `calc((${postsRecommended.length} * 20.25rem) + 3.3rem)`,
            }}
          ></div>

          {/* divider mobile */}
          <div className='h-1.5 w-[calc(100%+10%)] justify-self-center bg-neutral-300 lg:hidden'></div>

          <aside className='pl-0 lg:pl-4'>
            <h2 className='text-xl-bold md:display-xs-bold mb-4 text-neutral-900 max-lg:mt-6 lg:mb-5'>
              Most Liked
            </h2>
            <ul className='divide-y divide-neutral-300'>
              {postsMostLiked.map((post) => (
                <li key={post.id} className='py-4 first-of-type:pt-0 md:py-5'>
                  <Aside {...post} />
                </li>
              ))}
            </ul>

            {/* Loading */}
            {isFetchingMostLiked && (
              <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
                Please wait while data being load...
              </p>
            )}

            {/* Error */}
            {errorMostLiked && (
              <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
                Error loading posts: {errorMostLiked.message}
              </p>
            )}
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;

const Aside: React.FC<Post> = ({ title, content, likes, comments }) => {
  return (
    <article className='w-full'>
      <p className='text-md-bold text-neutral-900'>{title}</p>
      <p className='text-xs-regular md:text-sm-regular mt-1 line-clamp-2 text-neutral-900'>
        {content}
      </p>
      {/* engagement post */}
      <div className='mt-3 flex items-center gap-3 md:mt-4 md:gap-5'>
        {/* like */}
        <div className='flex items-center gap-1.5'>
          <Image src='/icons/like-icon.svg' alt='like' width={20} height={20} />
          <p className='text-sm-regular text-neutral-600'>{likes}</p>
        </div>

        {/* comment */}
        <div className='flex items-center gap-1.5'>
          <Image
            src='/icons/comment-icon.svg'
            alt='comment'
            width={20}
            height={20}
          />
          <p className='text-sm-regular text-neutral-600'>{comments}</p>
        </div>
      </div>
    </article>
  );
};

// Helper function untuk membuat range angka
const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  // single page data
  const totalPageCount = Math.ceil(totalPosts / postsPerPage);

  const getPageNumbersToDisplay = (): (number | string)[] => {
    const siblingCount = 1;
    const maxVisiblePages = 7;

    // page total <= visible page
    if (totalPageCount <= maxVisiblePages) {
      return range(1, totalPageCount);
    }

    // page number included elipsis
    const pagesInEndsPatternBlock = maxVisiblePages - 2;

    // model page number [1,2,3,4,5,...,N]
    const firstViewThreshold = pagesInEndsPatternBlock - siblingCount;

    // model page number [1,...,N-4,N-3,N-2,N-1,N]
    const lastViewThreshold =
      totalPageCount - (pagesInEndsPatternBlock - siblingCount) + 1;

    // currentPage <= 4 (index)
    // model page number [1, 2, 3, 4, 5, ..., 10])
    if (currentPage <= firstViewThreshold) {
      const startPages = range(1, pagesInEndsPatternBlock);
      return [...startPages, 'ellipsis_right', totalPageCount];
    }

    // currentPage >= 7 (index)
    // model page number [1, ..., 6, 7, 8, 9, 10]
    if (currentPage >= lastViewThreshold) {
      const endPages = range(
        totalPageCount - pagesInEndsPatternBlock + 1,
        totalPageCount
      );
      return [1, 'ellipsis_left', ...endPages];
    }

    // model page number [1, ..., 4, 5, 6, ..., 10]
    const middleStart = currentPage - siblingCount;
    const middleEnd = currentPage + siblingCount;
    const middlePages = range(middleStart, middleEnd);
    return [
      1,
      'ellipsis_left',
      ...middlePages,
      'ellipsis_right',
      totalPageCount,
    ];
  };

  if (totalPageCount <= 1) return null;

  const pageElements = getPageNumbersToDisplay();

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {pageElements.map((pageOrEllipsis, idx) => {
            if (typeof pageOrEllipsis === 'string') {
              return <PaginationEllipsis key={`${pageOrEllipsis}-${idx}`} />;
            } else {
              return (
                <PaginationItem key={pageOrEllipsis}>
                  <PaginationLink
                    href='#'
                    isActive={currentPage === pageOrEllipsis}
                    onClick={() => setCurrentPage(pageOrEllipsis)}
                  >
                    {pageOrEllipsis}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={handleNextPage}
              disabled={currentPage === totalPageCount}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
