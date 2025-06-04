'use client';

import { useQuery } from '@tanstack/react-query';

import { Post } from '@/models/post';
import { SearchPosts, SearchPostsQueryKey } from '@/services/posts/searchPosts';

type UseSearchPostsParams = {
  query: string;
  limit?: number;
  page?: number;
};

type UseSearchPostsReturn = {
  postsSearch: Post[];
  total: number;
  currentPage: number;
  lastPage: number | null;
  isFetching: boolean;
  error: Error | null;
  queryKeySearchPosts: SearchPostsQueryKey;
};

export const useSearchPosts = ({
  query,
  limit = 5,
  page = 1,
}: UseSearchPostsParams): UseSearchPostsReturn => {
  const queryKeySearchPosts: SearchPostsQueryKey = [
    '/posts/search',
    {
      query,
      limit,
      page,
    },
  ];

  const { data, error, isFetching } = useQuery({
    queryKey: queryKeySearchPosts,
    queryFn: SearchPosts,
    enabled: !!query, // Only fetch when search is defined
  });

  const postsSearch = data?.data ?? [];
  const total = data?.total ?? 0;
  const currentPage = data?.page ?? 1;
  const lastPage = data?.lastPage ?? null;

  return {
    postsSearch,
    total,
    currentPage,
    lastPage,
    isFetching,
    error,
    queryKeySearchPosts,
  };
};
