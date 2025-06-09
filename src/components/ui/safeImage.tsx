'use client';

import Image, { ImageProps } from 'next/image';
import React from 'react';

const FALLBACK_IMAGE = '/images/fallback.png';
const URL_IMAGE =
  'https://truthful-simplicity-production.up.railway.app/uploads/';

// safely change image while the image original error
const SafeImage = (props: ImageProps) => {
  const { src, alt, ...rest } = props;
  const validUrl = src.toString().startsWith(URL_IMAGE);

  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setError(false);
  }, [src]);

  return error || !validUrl ? (
    // return image fallback on image original error
    <Image src={FALLBACK_IMAGE} alt={alt} {...rest} />
  ) : (
    <Image src={src} alt={alt} {...rest} onError={() => setError(true)} />
  );
};

export default SafeImage;
