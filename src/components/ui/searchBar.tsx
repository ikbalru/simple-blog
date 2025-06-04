import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { setSearchQuery } from '@/store/redux/search/search.slice';
import { useAppDispatch } from '@/store/redux/store';

import { Input } from './input';

type SearchBarProps = {
  value: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ value }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSubmit = () => {
    router.push(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <div className='hidden h-12 w-93.25 items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 lg:flex'>
      <button onClick={handleSubmit}>
        <Search className='size-6 cursor-pointer text-neutral-500' />
      </button>
      <Input
        type='search'
        placeholder='Search'
        className='focus:outline-none'
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
