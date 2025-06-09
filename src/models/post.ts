import z from 'zod';

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string().url(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }),
  createdAt: z.string().datetime(),
  likes: z.number(),
  comments: z.number(),
});

export type Post = z.infer<typeof postSchema>;
