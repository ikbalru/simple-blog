'use client';

import { useQuery } from '@tanstack/react-query';

import { Post } from '@/models/post';
import {
  getPostsRecommended,
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
  limit = 10,
  page = 1,
}: UseGetPostsRecommendedParams = {}): UseGetPostsRecommendedReturn => {
  const queryKeyPostsRecommended: PostsRecommendedQueryKey = [
    '/posts/recommended',
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
