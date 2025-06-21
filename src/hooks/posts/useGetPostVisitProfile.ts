import { useInfiniteQuery } from '@tanstack/react-query';

import {
  GetPostVisitProfile,
  VisitProfileQueryKey,
} from '@/services/posts/getPostVisitProfile';

type UseGetPostVisitParams = {
  userId: number;
  limit?: number;
};

export const useGetPostVisitProfile = ({
  userId,
  limit = 5,
}: UseGetPostVisitParams) => {
  const queryKeyPostVisitInfinite: VisitProfileQueryKey = [
    'posts',
    'by-user',
    { userId },
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
    queryKey: queryKeyPostVisitInfinite,
    queryFn: GetPostVisitProfile,
    initialPageParam: 1,
    getNextPageParam: (pages) => {
      if (pages.page < pages.lastPage) {
        return pages.page + 1;
      }
      return null;
    },
  });

  console.log('profile: ', data);

  const postsVisitProfile = data?.pages.flatMap((page) => page.data) ?? [];
  const userVisitProfile = data?.pages[0].user ?? null;
  const total = data?.pages[0].total ?? 0;

  return {
    postsVisitProfile,
    userVisitProfile,
    total,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    queryKeyPostVisitInfinite,
  };
};
