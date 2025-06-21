import z from 'zod';

export const authorSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  headline: z.string().nullable(),
  avatarUrl: z.string().nullable(),
});

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string().url(),
  author: authorSchema,
  createdAt: z.string().datetime(),
  likes: z.number(),
  comments: z.number(),
});

export type PostComplete = z.infer<typeof postSchema>;

export type Post = Omit<PostComplete, 'author'> & {
  author: Omit<PostComplete['author'], 'headline' | 'avatarUrl'>;
};

// Type for creating a new post with simplified author field
// Uses TypeScript utility types to derive from the Post type
export type CreatePost = Omit<PostComplete, 'author'> & {
  author: Pick<PostComplete['author'], 'id'>;
};
