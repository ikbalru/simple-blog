import { QueryFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type GetPostByIdQueryKey = [
  string,
  {
    id: number;
  },
];

export const GetPostById: QueryFunction<Post, GetPostByIdQueryKey> = async ({
  queryKey,
}) => {
  const [path, { id }] = queryKey;

  const apiPath = `/${path}/${id}`;

  const response = await api.get(apiPath);

  return response.data;
};
