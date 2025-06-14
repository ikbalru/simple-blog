import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { CreatePost } from '@/models/post';

export type CreatePostPayload = {
  title: string;
  content: string;
  tags: string[];
  image: File;
};

type CreatePostParams = {
  payload: CreatePostPayload;
};

export const createPost: MutationFunction<
  CreatePost,
  CreatePostParams
> = async ({ payload }) => {
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('content', payload.content);
  payload.tags.forEach((tag) => formData.append('tags', tag));
  formData.append('image', payload.image);

  const response = await api.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
