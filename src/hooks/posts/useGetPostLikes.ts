import { useQuery } from '@tanstack/react-query';

import { postLikeUser } from '@/models/user';
import { PostLikesQueryKey, getPostLikes } from '@/services/posts/getPostLike';

type useGetPostLikeParams = {
  postId: number;
};

type useGetPostLikeReturn = {
  likes: postLikeUser[];
  isFetching: boolean;
  error: Error | null;
  queryKeyPostLikes: PostLikesQueryKey;
};

export const useGetPostLike = ({
  postId,
}: useGetPostLikeParams): useGetPostLikeReturn => {
  const queryKeyPostLikes: PostLikesQueryKey = ['posts', { postId }, 'likes'];

  const { data, isFetching, error } = useQuery({
    queryKey: queryKeyPostLikes,
    queryFn: getPostLikes,
  });

  const likes = data || [];

  return {
    likes,
    isFetching,
    error,
    queryKeyPostLikes,
  };
};
