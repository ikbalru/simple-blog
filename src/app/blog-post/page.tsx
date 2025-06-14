'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import ImageZone from './partials/imageZone';
import InputTags from './partials/inputTags';
import TextEditor from './partials/textEditor';

export default function BlogPost() {
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('jalan form submit');
  }
  return (
    <main className='profile-container'>
      <form onSubmit={onSubmit} className='my-20 flex flex-col gap-5'>
        <div>
          <Label
            htmlFor='title'
            className='!text-sm-semibold pb-1 text-neutral-950'
          >
            Title
          </Label>
          <Input
            id='title'
            placeholder='Enter your title'
            className='focus-visible:ring-primary-300 w-full rounded-xl border border-neutral-300 px-4 py-2.5 focus-visible:ring-2'
          />
        </div>

        <div>
          <Label
            htmlFor='content'
            className='!text-sm-semibold pb-1 text-neutral-950'
          >
            Content
          </Label>
          <TextEditor />
        </div>

        <div>
          <Label
            htmlFor='coverImage'
            className='!text-sm-semibold pb-1 text-neutral-950'
          >
            Cover Image
          </Label>
          <ImageZone value={coverImage} onChange={setCoverImage} />
        </div>

        <div>
          <Label
            htmlFor='tags'
            className='!text-sm-semibold pb-1 text-neutral-950'
          >
            Tags
          </Label>
          <InputTags />
        </div>

        <Button type='submit' className='self-end'>
          Finish
        </Button>
      </form>
    </main>
  );
}
