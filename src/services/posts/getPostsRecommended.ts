'use client';

import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type PostsRecommendedQueryKey = [
  string,
  {
    limit?: number;
    page?: number;
  },
];

export type PostsRecommendedResponse = {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
};

export const getPostsRecommended: QueryFunction<
  PostsRecommendedResponse,
  PostsRecommendedQueryKey
> = async ({ queryKey }) => {
  const [path, { limit = 10, page = 1 }] = queryKey;

  const apiPath = `${path}`;

  const axiosRequestConfig: AxiosRequestConfig = {
    params: { limit, page },
  };

  const response = await api.get(apiPath, axiosRequestConfig);

  return response.data;
};
