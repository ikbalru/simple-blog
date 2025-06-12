import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getPostsMyPostInfinite,
  PostsMyPostQueryKey,
} from '@/services/posts/getMyPost';

type UseGetPostsMyPostParams = {
  limit?: number;
  page?: number;
};

export const useGetPostsMyPostInfinite = ({
  limit = 5,
}: UseGetPostsMyPostParams = {}) => {
  const queryKeyMyPostInfinite: PostsMyPostQueryKey = [
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
    queryFn: getPostsMyPostInfinite,
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
