'use client';

import { useQuery } from '@tanstack/react-query';

import { Post } from '@/models/post';
import {
  getPostsMostLiked,
  PostsMostLikedQueryKey,
} from '@/services/posts/getPostsMostLiked';

type UseGetPostsMostLikedParams = {
  limit?: number;
  page?: number;
};

type UseGetPostsMostLikedReturn = {
  postsMostLiked: Post[];
  total: number;
  currentPage: number;
  lastPage: number | null;
  isFetching: boolean;
  error: Error | null;
  queryKeyPostsMostLiked: PostsMostLikedQueryKey;
};

export const useGetPostsMostLiked = ({
  limit = 3,
  page = 1,
}: UseGetPostsMostLikedParams = {}): UseGetPostsMostLikedReturn => {
  const queryKeyPostsMostLiked: PostsMostLikedQueryKey = [
    'posts',
    'most-liked',
    { limit, page },
  ];

  const { data, isFetching, error } = useQuery({
    queryKey: queryKeyPostsMostLiked,
    queryFn: getPostsMostLiked,
  });

  const postsMostLiked = data?.data ?? [];
  const total = data?.total ?? 0;
  const currentPage = data?.page ?? 1;
  const lastPage = data?.lastPage ?? null;

  return {
    postsMostLiked,
    total,
    currentPage,
    lastPage,
    isFetching,
    error,
    queryKeyPostsMostLiked,
  };
};
