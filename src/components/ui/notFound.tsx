import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from './button';

type NotFoundProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

const NotFound = ({ title, subtitle, buttonLabel }: NotFoundProps) => {
  const router = useRouter();

  return (
    <div className='flex-center flex h-[100vh] flex-col'>
      <Image
        src='/icons/document-icon.svg'
        alt='post-document'
        width={118}
        height={135}
        className='pointer-events-none'
      />
      <p className='text-sm-semibold mt-6 text-neutral-950'>{title}</p>
      <p className='text-sm-regular mt-1 text-neutral-950'>{subtitle}</p>
      <Button
        className='mt-6 h-11 w-50 cursor-pointer md:h-12 md:w-93'
        onClick={() => {
          router.push('/');
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default NotFound;
