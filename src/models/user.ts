import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  headline: z.string().nullable(),
  avatarUrl: z.string().nullable(),
});

export const userUpdatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export type User = z.infer<typeof userSchema>;

export type userUpdatePassword = z.infer<typeof userUpdatePasswordSchema>;

export type loginUser = Omit<User, 'id' | 'avatarUrl' | 'headline' | 'name'>;

export type registerUser = Omit<User, 'id' | 'avatarUrl' | 'headline'>;

export type postLikeUser = Omit<User, 'email' | 'password'>;

export type currentUser = Omit<User, 'password'>;

export type profileUpdate = Omit<User, 'password' | 'email' | 'id'>;
