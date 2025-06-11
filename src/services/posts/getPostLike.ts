import { QueryFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { postLikeUser } from '@/models/user';

export type PostLikesQueryKey = [
  string,
  {
    postId: number;
  },
  string,
];

export const getPostLikes: QueryFunction<
  postLikeUser[],
  PostLikesQueryKey
> = async ({ queryKey }) => {
  const [path, { postId }, subPath] = queryKey;

  const apiPath = `/${path}/${postId}/${subPath}`;

  const response = await api.get(apiPath);

  return response.data;
};
