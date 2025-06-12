'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { Post } from '@/models/post';
import { SearchPosts, SearchPostsQueryKey } from '@/services/posts/searchPosts';

type UseSearchPostsParams = {
  query: string;
  limit?: number;
};

type UseSearchPostsReturn = {
  postsSearch: Post[];
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  error: Error | null;
  queryKeySearchPosts: SearchPostsQueryKey;
};

export const useSearchPosts = ({
  query,
  limit = 5,
}: UseSearchPostsParams): UseSearchPostsReturn => {
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
