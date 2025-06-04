'use client';

import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '@/components/layout/navbar';
import PostCard from '@/components/ui/postCard';

import { useSearchPosts } from '@/hooks/posts/useSearchPosts';
import { Post } from '@/models/post';
import { selectSearchQuery } from '@/store/redux/search/search.selector';

const Search = ({ searchParams }: { searchParams: { queryParam: string } }) => {
  const query = useSelector(selectSearchQuery);

  const [filterPosts, setFilterPosts] = React.useState<Post[]>([]);

  const querySearch = searchParams.queryParam ?? query;

  const { postsSearch } = useSearchPosts({
    query: querySearch,
  });

  React.useEffect(() => {
    setFilterPosts(postsSearch);
  }, [postsSearch]);

  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* main content */}

      {/* title */}
      <h1 className='display-sm-bold mt-32 hidden text-neutral-900 md:block'>
        Result for {'Frontend Development'}
      </h1>

      {/* search result */}
      {filterPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}

      {/* not found search */}
      {/* <div className='flex-center flex h-[100vh] flex-col'>
        <Image
          src='/icons/document-icon.svg'
          alt='post-document'
          width={118}
          height={135}
          className='pointer-events-none'
        />
        <p className='text-sm-semibold mt-6 text-neutral-950'>
          No results found
        </p>
        <p className='text-sm-regular mt-1 text-neutral-950'>
          Try using different keywords
        </p>
        <Button
          className='mt-6 h-11 w-50 cursor-pointer md:h-12 md:w-93'
          onClick={() => {
            router.push('/');
          }}
        >
          Back To Home
        </Button>
      </div> */}
    </>
  );
};

export default Search;
