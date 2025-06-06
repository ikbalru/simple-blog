import { QueryFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type GetPostByIdQueryKey = [
  string,
  string,
  {
    id: number;
  },
];

export const GetPostById: QueryFunction<Post, GetPostByIdQueryKey> = async ({
  queryKey,
}) => {
  const [path, subPath, { id }] = queryKey;

  const apiPath = `/${path}/${subPath}/${id}`;

  const response = await api.get(apiPath);

  return response.data;
};
