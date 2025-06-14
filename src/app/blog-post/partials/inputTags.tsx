'use client';

import { X } from 'lucide-react';
import React from 'react';

import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

interface InputTagsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  disabled?: boolean;
}

const InputTags = ({ tags, setTags, disabled = false }: InputTagsProps) => {
  const [tagDelete, setTagDelete] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  // input tag base on enter
  const handleInputTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();

    if (e.key === 'Backspace' && value === '' && tags.length !== 0) {
      setTagDelete(true);
    }

    if (
      (e.key === 'Backspace' || e.key === 'Enter') &&
      value === '' &&
      tagDelete
    ) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      setTagDelete(false);
    }

    if (e.key !== 'Backspace' && value === '' && tagDelete) {
      setTagDelete(false);
    }

    if (e.key === 'Enter' && value !== '') {
      // Prevent form submission when adding tag with Enter
      e.preventDefault();

      // Always allow adding tags - Zod will handle validation
      setTags([...tags, value]);
      e.currentTarget.value = '';
    }
  };

  // remove tag
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-xl border px-4 py-2.5 transition-colors',
        isFocused ? 'border-primary-300' : 'border-neutral-300'
      )}
    >
      {tags.map((tag, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center gap-2 rounded-md border border-neutral-300 px-2 text-neutral-900',
            tagDelete && 'last-of-type:border-red-500'
          )}
        >
          <span>{tag}</span>
          <button type='button' onClick={() => handleRemoveTag(index)}>
            <X className='size-3 cursor-pointer' />
          </button>
        </div>
      ))}

      <Input
        id='tag'
        placeholder='Enter your tags'
        onKeyDown={handleInputTag}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className='placeholder:text-sm-regular w-fit flex-grow !text-neutral-950 placeholder:text-neutral-500'
      />
    </div>
  );
};

export default InputTags;
