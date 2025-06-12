import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User } from '@/models/user';
import { updateProfile } from '@/services/posts/updateProfile';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    // Using optimistic update to immediately update UI
    onMutate: async ({ payload }) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ['user'] });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData<User>(['user']);

      // Optimistically update the user in the cache
      if (previousUser) {
        queryClient.setQueryData<User>(['user'], {
          ...previousUser,
          name: payload.name || previousUser.name,
          headline: payload.headline || previousUser.headline,
          // For avatar, we can't immediately update with the File object
          // but we could create a temporary URL if we wanted to show preview
          // avatarUrl: payload.avatar ? URL.createObjectURL(payload.avatar) : previousUser.avatarUrl,
        });
      }

      // Return the snapshot so we can rollback if something goes wrong
      return { previousUser };
    },
    // If the mutation fails, use the context we returned above to roll back
    onError: (err, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user'], context.previousUser);
      }
      console.error('Error updating profile:', err);
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
