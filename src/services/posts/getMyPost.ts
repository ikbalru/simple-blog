import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type GetMyPostQueryKey = [
  string,
  string,
  {
    limit?: number;
    page?: number;
  },
];

export type GetMyPostResponse = {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
};

export const getMyPostInfinite: QueryFunction<
  GetMyPostResponse,
  GetMyPostQueryKey,
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
