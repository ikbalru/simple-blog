import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { PostLikesUser } from '@/models/comment';
import { currentUser } from '@/models/user';
import { PostLikesQueryKey } from '@/services/posts/getPostLike';
import { updatePostLike } from '@/services/posts/postLikePostbyId';

export type UpdatePostLikeVariables = {
  postId: number;
  queryKey: PostLikesQueryKey;
  currentUser: currentUser;
};

export type UseUpdatePostLikeReturn = {
  updatePostLike: UseMutateAsyncFunction<
    void | PostLikesUser,
    Error,
    UpdatePostLikeVariables
  >;
  isUpdating: boolean;
  error: Error | null;
};

type MutationContext = {
  previousData: PostLikesUser[] | undefined;
};

export const useUpdatePostLike = (): UseUpdatePostLikeReturn => {
  const queryClient = useQueryClient();

  const updatePostLikeMutation = useMutation<
    void | PostLikesUser,
    Error,
    UpdatePostLikeVariables,
    MutationContext
  >({
    mutationFn: updatePostLike,

    onMutate: async ({ queryKey, currentUser }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<PostLikesUser[]>(queryKey);

      let updatedData: PostLikesUser[];

      if (previousData) {
        const findData =
          previousData.find((like) => like.id === currentUser.id) || null;

        if (findData) {
          updatedData = previousData.filter(
            (like) => like.id !== currentUser.id
          );
        } else {
          const newLike = {
            id: currentUser.id,
            name: currentUser.name,
            headline: currentUser.headline,
            avatarUrl: currentUser.avatarUrl,
          };

          updatedData = [...previousData, newLike];
        }

        queryClient.setQueryData(queryKey, updatedData);
      }

      return { previousData };
    },

    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(variables.queryKey, context.previousData);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: variables.queryKey });
    },
  });

  return {
    updatePostLike: updatePostLikeMutation.mutateAsync,
    isUpdating: updatePostLikeMutation.isPending,
    error: updatePostLikeMutation.error,
  };
};
