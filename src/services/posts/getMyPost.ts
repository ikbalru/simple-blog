import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type PostsMyPostQueryKey = [
  string,
  string,
  {
    limit?: number;
    page?: number;
  },
];

export type PostsMyPostResponse = {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
};

export const getPostsMyPostInfinite: QueryFunction<
  PostsMyPostResponse,
  PostsMyPostQueryKey,
  number
> = async ({ queryKey, pageParam = 1 }) => {
  const [path, subPath, { limit }] = queryKey;

  const apiPath = `/${path}/${subPath}`;

  const axiosRequestConfig: AxiosRequestConfig = {
    params: { limit, page: pageParam },
  };

  const response = await api.get(apiPath, axiosRequestConfig);

  return response.data;
};
