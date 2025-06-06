import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import { Input } from './input';

const SearchBar = ({ className }: { className?: string }) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'hidden h-12 w-full rounded-xl border border-neutral-300 px-4 py-2.5 lg:block lg:w-93.25',
        className
      )}
    >
      <div className='flex items-center gap-2'>
        <button type='submit' aria-label='Search'>
          <Search className='size-6 cursor-pointer text-neutral-500' />
        </button>
        <Input
          type='search'
          placeholder='Search'
          className='focus:outline-none'
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
