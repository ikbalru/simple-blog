import { useQuery } from '@tanstack/react-query';

import { Comment } from '@/models/comment';
import { CommentsQueryKey, getComments } from '@/services/posts/getPostComment';

type useGetPostCommentParams = {
  postId: number;
};

type useGetPostCommentReturn = {
  comments: Comment[];
  isFetching: boolean;
  error: Error | null;
  queryKeyComments: CommentsQueryKey;
};

export const useGetPostComment = ({
  postId,
}: useGetPostCommentParams): useGetPostCommentReturn => {
  const queryKeyComments: CommentsQueryKey = ['posts', { postId }, 'comments'];

  const { data, isFetching, error } = useQuery({
    queryKey: queryKeyComments,
    queryFn: getComments,
  });

  const comments = data || [];

  return {
    comments,
    isFetching,
    error,
    queryKeyComments,
  };
};
