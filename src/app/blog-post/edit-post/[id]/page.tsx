'use client';

import { useParams } from 'next/navigation';

import BlogPost from '@/app/blog-post/partials/blogPost';

const EditPost = () => {
  const { id } = useParams();

  return <BlogPost id={Number(id)} />;
};

export default EditPost;
