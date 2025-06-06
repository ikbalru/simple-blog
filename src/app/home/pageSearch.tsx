'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/ui/postCard';
import SearchBar from '@/components/ui/searchBar';

import { useIntersectionObserver } from '@/hooks/general/useIntersectionObserver';
import { useSearchPosts } from '@/hooks/posts/useSearchPosts';

const Search = () => {
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
            </ul>
          ) : (
            // not found search
            <div className='flex-center flex h-[100vh] flex-col'>
              <Image
                src='/icons/document-icon.svg'
                alt='post-document'
                width={118}
                height={135}
                className='pointer-events-none'
              />
              <p className='text-sm-semibold mt-6 text-neutral-950'>
                No results found
              </p>
              <p className='text-sm-regular mt-1 text-neutral-950'>
                Try using different keywords
              </p>
              <Button
                className='mt-6 h-11 w-50 cursor-pointer md:h-12 md:w-93'
                onClick={() => {
                  router.push('/');
                }}
              >
                Back To Home
              </Button>
            </div>
          )}

          {/* first loading data */}
          {isLoading && (
            <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
              Please wait while data being load...
            </p>
          )}

          {/* fetching other data */}
          {isFetchingNextPage && (
            <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
              Load More...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
              Error loading posts: {error.message}
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Search;

// search post.ts:
import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type SearchPostsQueryKey = [
  string,
  string,
  {
    query: string;
    limit?: number;
  },
];

export type SearchPostsResponse = {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
};

export const SearchPosts: QueryFunction<
  SearchPostsResponse,
  SearchPostsQueryKey,
  number
> = async ({ queryKey, pageParam = 1 }) => {
  const [path, subPath, { query, limit }] = queryKey;

  const apiPath = `/${path}/${subPath}`;

  const axiosRequestConfig: AxiosRequestConfig = {
    params: { query, limit, page: pageParam },
  };

  const response = await api.get(apiPath, axiosRequestConfig);
  console.log('axios: ', response.data);

  return response.data;
};

// useSearchPosts.ts
('use client');

import { useInfiniteQuery } from '@tanstack/react-query';

import { SearchPosts, SearchPostsQueryKey } from '@/services/posts/searchPosts';

type UseSearchPostsParams = {
  query: string;
  limit?: number;
};

// type UseSearchPostsReturn = {
//   postsSearch: Post[];
//   fetchNextPage: () => Promise<unknown>;
//   hasNextPage: boolean;
//   isFetchingNextPage: boolean;
//   isLoading: boolean;
//   error: Error | null;
//   queryKeySearchPosts: SearchPostsQueryKey;
// };

export const useSearchPosts = ({ query, limit = 5 }: UseSearchPostsParams) => {
  const queryKeySearchPosts: SearchPostsQueryKey = [
    'posts',
    'search',
    {
      query: query.trim(),
      limit,
    },
  ];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: queryKeySearchPosts,
    queryFn: SearchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.lastPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!query.trim(), // Only fetch when query is defined and not empty
  });

  const postsSearch = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    postsSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    queryKeySearchPosts,
  };
};
