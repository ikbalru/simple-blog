import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getMyPostInfinite,
  GetMyPostQueryKey,
} from '@/services/posts/getMyPost';

type UseGetPostsMyPostParams = {
  limit?: number;
  page?: number;
};

export const useGetMyPostsInfinite = ({
  limit = 5,
}: UseGetPostsMyPostParams = {}) => {
  const queryKeyMyPostInfinite: GetMyPostQueryKey = [
    'posts',
    'my-posts',
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
    queryKey: queryKeyMyPostInfinite,
    queryFn: getMyPostInfinite,
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
    queryKeyMyPostInfinite,
    total,
  };
};
