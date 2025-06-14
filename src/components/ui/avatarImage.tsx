'use client';

import Image, { ImageProps } from 'next/image';
import React from 'react';

const FALLBACK_IMAGE = '/images/profile-dummy.jpg';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

// safely change image while the image original error
const AvatarImage = (props: ImageProps) => {
  const { src, alt, ...rest } = props;
  const [error, setError] = React.useState(false);

  const validUrl = React.useMemo(() => {
    const url = src?.toString() || '';

    if (url.startsWith('/uploads')) return BASE_URL + url;
    if (url === FALLBACK_IMAGE) return FALLBACK_IMAGE;
    return url;
  }, [src]);

  React.useEffect(() => {
    setError(false);
  }, [src]);

  return error ? (
    // return image fallback on image original error
    <Image src={FALLBACK_IMAGE} alt={alt} {...rest} />
  ) : (
    <Image src={validUrl} alt={alt} {...rest} onError={() => setError(true)} />
  );
};

export default AvatarImage;
