import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Unlink,
  Image as LucideImage,
  WrapText,
  RemoveFormatting,
  Maximize,
} from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

export default function MenuBar({ editor }: { editor: Editor | null }) {
  // hook usecallbackAddImage
  const addImage = React.useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  // hook useCallback setLink
  const setLink = React.useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } catch (error) {
      console.log(error);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const optionsHeading = [
    {
      iconText: 'Normal Text',
      value: 'p',
      command: () => editor.chain().focus().setParagraph().run(),
    },
    {
      iconText: 'Heading 1',
      value: 'h1',
      command: () => editor.chain().focus().setHeading({ level: 1 }).run(),
    },
    {
      iconText: 'Heading 2',
      value: 'h2',
      command: () => editor.chain().focus().setHeading({ level: 2 }).run(),
    },
    {
      iconText: 'Heading 3',
      value: 'h3',
      command: () => editor.chain().focus().setHeading({ level: 3 }).run(),
    },
  ];

  const optionsfontStyle = [
    {
      icon: <Bold className='size-5' />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive('bold'),
    },
    {
      icon: <Italic className='size-5' />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive('italic'),
    },
    {
      icon: <Strikethrough className='size-5' />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive('strike'),
    },
  ];

  const optionsAlign = [
    {
      icon: <AlignLeft className='size-5' />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      preesed: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter className='size-5' />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      preesed: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight className='size-5' />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      preesed: editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: <AlignJustify className='size-5' />,
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
      preesed: editor.isActive({ textAlign: 'justify' }),
    },
  ];

  const optionsList = [
    {
      icon: <List className='size-5' />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className='size-5' />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive('orderedList'),
    },
  ];

  const optionsFormat = [
    {
      icon: <WrapText className='size-5' />,
      onClick: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: <RemoveFormatting className='size-5' />,
      onClick: () => editor.commands.unsetAllMarks(),
    },
  ];

  // handleOptionsHeading aksi ketika select value berubah
  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = optionsHeading.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      console.log(selectedOption);
      selectedOption.command();
    }
  };

  // get active value from editor, untuk mengetahui value yang aktif pada cursor
  const getActiveValue = () => {
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    return 'p'; // Default Paragraph
  };

  return (
    <div className='flex items-center border-b border-neutral-300 p-2.5 md:py-3'>
      {/* Heading */}
      <select
        value={getActiveValue()}
        onChange={handleValueChange}
        className='h-8 w-30 cursor-pointer rounded-md border border-neutral-300 px-2 text-neutral-950'
      >
        {optionsHeading.map((option, index) => (
          <option key={index} value={option.value}>
            {option.iconText}
          </option>
        ))}
      </select>

      {/* Divider */}
      <div className='mx-2 h-4 w-px bg-[rgba(145,158,171,0.2)]' />

      {/* Font Style */}
      <div>
        {optionsfontStyle.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.preesed}
            onPressedChange={option.onClick}
            className='cursor-pointer text-neutral-950'
          >
            {option.icon}
          </Toggle>
        ))}
      </div>

      {/* Divider */}
      <div className='mx-2 h-4 w-px bg-[rgba(145,158,171,0.2)]' />

      {/* Order List */}
      <div>
        {optionsList.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.preesed}
            onPressedChange={option.onClick}
            className='cursor-pointer text-neutral-950'
          >
            {option.icon}
          </Toggle>
        ))}
      </div>

      {/* Divider */}
      <div className='mx-2 h-4 w-px bg-[rgba(145,158,171,0.2)]' />

      {/* Text Align */}
      <div>
        {optionsAlign.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.preesed}
            onPressedChange={option.onClick}
            className='cursor-pointer text-neutral-950'
          >
            {option.icon}
          </Toggle>
        ))}
      </div>

      {/* Divider */}
      <div className='mx-2 h-4 w-px bg-[rgba(145,158,171,0.2)]' />

      <div className='flex items-center'>
        {/* Link */}
        <Button
          variant='menu'
          size='menu'
          onClick={setLink}
          type='button'
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          <Link />
        </Button>
        {/* Unlink */}
        <Button
          variant='menu'
          size='menu'
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          type='button'
        >
          <Unlink />
        </Button>
        {/* Image */}
        <Button variant='menu' size='menu' onClick={addImage} type='button'>
          <LucideImage />
        </Button>
      </div>

      {/* Divider */}
      <div className='mx-2 h-4 w-px bg-[rgba(145,158,171,0.2)]' />

      {/* Format */}
      <div className='flex items-center'>
        {optionsFormat.map((option, index) => (
          <Button
            key={index}
            variant='menu'
            size='menu'
            onClick={option.onClick}
            type='button'
          >
            {option.icon}
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className='mx-2 h-4 w-px bg-[rgba(145,158,171,0.2)]' />

      {/* Expand */}
      <Button variant='menu' size='menu' type='button'>
        <Maximize />
      </Button>
    </div>
  );
}
