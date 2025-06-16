'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import NotFound from '@/components/ui/notFound';
import PostCard from '@/components/ui/postCard';
import SearchBar from '@/components/ui/searchBar';

import { useIntersectionObserver } from '@/hooks/general/useIntersectionObserver';
import { useSearchPosts } from '@/hooks/posts/useSearchPosts';

const SearchContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const querySearch = searchParams.get('query') || '';

  const {
    postsSearch,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useSearchPosts({
    query: querySearch,
    limit: 5,
  });

  const { containerRef, lastElementRef } = useIntersectionObserver<
    HTMLLIElement,
    HTMLUListElement
  >({
    callback: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const capitalize = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* main content */}

      {/* title */}
      <main className='custom-container'>
        <section className='mt-20 lg:mt-32'>
          <h1 className='display-sm-bold hidden text-neutral-900 lg:block'>
            Result for “{capitalize(querySearch)}”
          </h1>

          <SearchBar className='block lg:hidden' />

          {/* first loading data */}
          {isLoading && (
            <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
              Please wait while data being load...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
              Error loading posts: {error.message}
            </p>
          )}

          {postsSearch.length > 0 ? (
            // search result
            <ul className='mt-4 lg:mt-6' ref={containerRef}>
              {postsSearch.map((post, index) => (
                <li
                  key={post.id}
                  ref={index === postsSearch.length - 1 ? lastElementRef : null}
                  className='border-b border-neutral-300 py-4 md:py-6'
                >
                  <PostCard {...post} />
                </li>
              ))}
              {!isFetchingNextPage && !hasNextPage && (
                <p className='text-xs-regular md:text-sm-regular mx-auto mt-5 mb-10 text-center text-neutral-400'>
                  You have reached the end of the list.
                </p>
              )}
            </ul>
          ) : (
            // not found search
            <NotFound
              title='No results found'
              subtitle='Try using different keywords'
              buttonLabel='Back To Home'
              onClick={() => router.push('/')}
            />
          )}

          {/* fetching other data */}
          {isFetchingNextPage && (
            <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
              Load More...
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

const Search = () => {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default Search;
