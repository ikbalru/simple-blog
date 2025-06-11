import { QueryFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { Comment } from '@/models/comment';

export type CommentsQueryKey = [
  string,
  {
    postId: number;
  },
  string,
];

export const getComments: QueryFunction<Comment[], CommentsQueryKey> = async ({
  queryKey,
}) => {
  const [path, { postId }, subPath] = queryKey;

  const apiPath = `/${path}/${postId}/${subPath}`;

  const response = await api.get(apiPath);

  return response.data;
};
