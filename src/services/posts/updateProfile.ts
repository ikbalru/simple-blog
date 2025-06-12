import { MutationFunction } from '@tanstack/react-query';

import { api } from '@/lib/api/axios';
import { User } from '@/models/user';

type UpdateProfilePayload = {
  name?: string;
  headline?: string;
  avatar?: File | null;
};

type UpdateProfileParams = {
  payload: UpdateProfilePayload;
};

export const updateProfile: MutationFunction<
  User,
  UpdateProfileParams
> = async ({ payload }) => {
  const formData = new FormData();

  if (payload.name) {
    formData.append('name', payload.name);
  }

  if (payload.headline) {
    formData.append('headline', payload.headline);
  }

  if (payload.avatar) {
    formData.append('avatar', payload.avatar);
  }

  const response = await api.patch('/users/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
