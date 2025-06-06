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

// export type Post = {
//   id: number;
//   title: string;
//   content: string;
//   tags: string[];
//   imageUrl: string;
//   author: {
//     id: number;
//     name: string;
//     email: string;
//   };
//   createdAt: string; // ISO 8601 timestamp
//   likes: number;
//   comments: number;
// };
