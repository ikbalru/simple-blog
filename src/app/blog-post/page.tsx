'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import ImageZone from './partials/imageZone';
import InputTags from './partials/inputTags';
import TextEditor from './partials/textEditor';

export default function BlogPost() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('jalan form submit');
  }
  return (
    <main className='profile-container'>
      <form onSubmit={onSubmit} className='space-y-5'>
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
            className='w-full rounded-xl border border-neutral-300 px-4 py-2.5'
          />
        </div>
        <TextEditor />
        <ImageZone />
        <InputTags />
      </form>
    </main>
  );
}
