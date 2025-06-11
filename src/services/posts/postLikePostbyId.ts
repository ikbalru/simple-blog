import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { PostLikesUser } from '@/models/comment';

type updatePostLikeParams = {
  postId: number;
};

export const updatePostLike: MutationFunction<
  PostLikesUser,
  updatePostLikeParams
> = async ({ postId }) => {
  const response = await api.post(`/posts/${postId}/like`);

  console.log(response.data);

  return response.data;
};
