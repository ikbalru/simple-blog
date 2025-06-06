import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type SearchPostsQueryKey = [
  string,
  string,
  {
    query: string;
    limit?: number;
  },
];

export type SearchPostsResponse = {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
};

export const SearchPosts: QueryFunction<
  SearchPostsResponse,
  SearchPostsQueryKey,
  number
> = async ({ queryKey, pageParam = 1 }) => {
  const [path, subPath, { query, limit }] = queryKey;

  const apiPath = `/${path}/${subPath}`;

  const axiosRequestConfig: AxiosRequestConfig = {
    params: { query, limit, page: pageParam },
  };

  const response = await api.get(apiPath, axiosRequestConfig);
  console.log('axios: ', response.data);

  return response.data;
};
