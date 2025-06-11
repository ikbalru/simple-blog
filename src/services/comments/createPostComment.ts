import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { CreateComment, Comment } from '@/models/comment';

type CreateCommentParams = {
  postId: number;
  payload: CreateComment;
};

export const createPostComment: MutationFunction<
  Comment,
  CreateCommentParams
> = async ({ postId, payload }) => {
  const response = await api.post(`/comments/${postId}`, payload);

  return response.data;
};
