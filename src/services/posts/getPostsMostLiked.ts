import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type PostsMostLikedQueryKey = [
  string,
  string,
  {
    limit?: number;
    page?: number;
  },
];

export type PostsMostLikedResponse = {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
};

export const getPostsMostLiked: QueryFunction<
  PostsMostLikedResponse,
  PostsMostLikedQueryKey
> = async ({ queryKey }) => {
  const [path, subPath, { limit = 3, page = 1 }] = queryKey;

  const apiPath = `/${path}/${subPath}`;

  const axiosRequestConfig: AxiosRequestConfig = {
    params: { limit, page },
  };

  const response = await api.get(apiPath, axiosRequestConfig);

  return response.data;
};
