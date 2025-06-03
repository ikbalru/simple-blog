'use client';

// import Footer from '@/components/layout/footer';
import Image from 'next/image';

import Navbar from '@/components/layout/navbar';
import PostCard from '@/components/ui/postCard';

import { posts, postsLiked } from '@/app/home/dummyData';

interface Post {
  author: { name: string };
  createdAt: string;
  imageUrl: string;
  title: string;
  tags: string[];
  content: string;
  likes: number;
  comments: number;
}

const Home = () => {
  return (
    <div className='h-[150vh]'>
      <Navbar />

      <main className='custom-container mt-10 overflow-hidden'>
        <div className='grid grid-cols-1 lg:grid-cols-[minmax(auto,50.4rem)_auto_18.5rem]'>
          <div className='pr-0 lg:pr-4'>
            <p className='text-xl-bold md:display-sm-bold mb-4 text-neutral-900 md:mb-6'>
              Recommend For You
            </p>

            {posts.map((post) => (
              <div
                key={post.id}
                className='border-b border-neutral-300 py-4 first-of-type:pt-0 md:py-6'
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>

          {/* divider */}
          <div className='mt-4.5 mb-6 h-1.5 w-[calc(100%+10%)] justify-self-center bg-neutral-300 lg:mt-0 lg:mb-0 lg:block lg:h-full lg:w-px'></div>

          <div className='pl-0 lg:pl-4'>
            <p className='text-xl-bold md:display-sm-bold mb-4 text-neutral-900 lg:mb-5'>
              Most Liked
            </p>
            <div className='divide-y divide-neutral-300'>
              {postsLiked.map((post) => (
                <div key={post.id} className='py-4 first-of-type:pt-0 md:py-5'>
                  <Aside {...post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

// export default HomePage;

const Aside: React.FC<Post> = ({ title, content, likes, comments }) => {
  return (
    <aside className='w-full'>
      <p className='text-md-bold text-neutral-900'>{title}</p>
      <p className='text-xs-regular md:text-sm-regular mt-1 line-clamp-2 text-neutral-900'>
        {content}
      </p>
      {/* engagement post */}
      <div className='mt-3 flex items-center gap-3 md:mt-4 md:gap-5'>
        {/* like */}
        <div className='flex items-center gap-1.5'>
          <Image src='/icons/like-icon.svg' alt='like' width={20} height={20} />
          <p className='text-sm-regular text-neutral-600'>{likes}</p>
        </div>

        {/* comment */}
        <div className='flex items-center gap-1.5'>
          <Image
            src='/icons/comment-icon.svg'
            alt='comment'
            width={20}
            height={20}
          />
          <p className='text-sm-regular text-neutral-600'>{comments}</p>
        </div>
      </div>
    </aside>
  );
};

export default Home;
