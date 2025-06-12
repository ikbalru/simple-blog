import Image from 'next/image';
import React from 'react';

import { Button } from './button';

type NotFoundProps = {
  title: string;
  subtitle: string;
  imageButton?: React.ReactNode;
  buttonLabel?: string;
  onClick?: () => void;
};

const NotFound = ({
  title,
  subtitle,
  imageButton,
  buttonLabel,
  onClick,
}: NotFoundProps) => {
  return (
    <div className='flex-center flex h-[65vh] flex-col'>
      <Image
        src='/icons/document-icon.svg'
        alt='post-document'
        width={118}
        height={135}
        className='pointer-events-none'
      />
      <p className='text-sm-semibold mt-6 text-neutral-950'>{title}</p>
      <p className='text-sm-regular mt-1 text-neutral-950'>{subtitle}</p>

      {buttonLabel && (
        <Button
          className='mt-6 flex h-11 w-60 cursor-pointer gap-2 md:h-12 md:w-50'
          onClick={onClick}
        >
          {imageButton}
          {buttonLabel}
        </Button>
      )}
    </div>
  );
};

export default NotFound;
