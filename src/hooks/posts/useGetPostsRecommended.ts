import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { Post } from '@/models/post';
import {
  getPostsRecommended,
  getPostsRecommendedInfinite,
  PostsRecommendedQueryKey,
} from '@/services/posts/getPostsRecommended';

type UseGetPostsRecommendedParams = {
  limit?: number;
  page?: number;
};

type UseGetPostsRecommendedReturn = {
  postsRecommended: Post[];
  total: number;
  currentPage: number;
  lastPage: number | null;
  isFetching: boolean;
  error: Error | null;
  queryKeyPostsRecommended: PostsRecommendedQueryKey;
};

export const useGetPostsRecommended = ({
  limit = 5,
  page = 1,
}: UseGetPostsRecommendedParams = {}): UseGetPostsRecommendedReturn => {
  const queryKeyPostsRecommended: PostsRecommendedQueryKey = [
    'posts',
    'recommended',
    { limit, page },
  ];

  const { data, error, isFetching } = useQuery({
    queryKey: queryKeyPostsRecommended,
    queryFn: getPostsRecommended,
  });

  const postsRecommended = data?.data ?? [];
  const total = data?.total ?? 0;
  const currentPage = data?.page ?? 1;
  const lastPage = data?.lastPage ?? null;

  return {
    postsRecommended,
    total,
    currentPage,
    lastPage,
    isFetching,
    error,
    queryKeyPostsRecommended,
  };
};

export const useGetPostsRecommendedInfinite = ({
  limit = 5,
}: UseGetPostsRecommendedParams = {}) => {
  const queryKeyPostInfinite: PostsRecommendedQueryKey = [
    'posts',
    'recommended',
    { limit },
  ];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: queryKeyPostInfinite,
    queryFn: getPostsRecommendedInfinite,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.lastPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const postsInfinite = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0].total ?? 0;

  return {
    postsInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    queryKeyPostInfinite,
    total,
  };
};
