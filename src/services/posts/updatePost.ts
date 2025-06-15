import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { Post } from '@/models/post';

export type UpdatePostPayload = {
  title: string;
  content: string;
  tags: string[];
  image: File;
};

type UpdatePostParams = {
  payload: UpdatePostPayload;
  id: number;
};

// update response using Post because after update will be directed to list of user post
export const updatePost: MutationFunction<Post, UpdatePostParams> = async ({
  payload,
  id,
}) => {
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('content', payload.content);
  payload.tags.forEach((tag) => formData.append('tags', tag));
  formData.append('image', payload.image);

  const response = await api.patch(`/posts/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
