import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  headline: z.array(z.string()).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
});

export type User = z.infer<typeof userSchema>;

export type loginUser = Omit<User, 'id' | 'avatarUrl' | 'headline' | 'name'>;

export type registerUser = Omit<User, 'id' | 'avatarUrl' | 'headline'>;
