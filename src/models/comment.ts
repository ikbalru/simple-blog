import z from 'zod';

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string().datetime(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    headline: z.string().nullable(),
    avatarUrl: z.string().nullable(),
  }),
});

export type Comment = z.infer<typeof commentSchema>;

export type CreateComment = Pick<Comment, 'content'>;

export type PostLikesUser = z.infer<typeof commentSchema.shape.author>;
