import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type SearchPostsQueryKey = [
  string,
  {
    query: string;
    limit?: number;
    page?: number;
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
  SearchPostsQueryKey
> = async ({ queryKey }) => {
  const [path, { query, limit = 5, page = 1 }] = queryKey;

  const apiPath = `${path}`;

  const axiosRequestConfig: AxiosRequestConfig = {
    params: { query, limit, page },
  };

  const response = await api.get(apiPath, axiosRequestConfig);

  return response.data;
};
