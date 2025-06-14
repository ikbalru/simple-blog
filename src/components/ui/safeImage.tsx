'use client';

import Image, { ImageProps } from 'next/image';
import React from 'react';

const FALLBACK_IMAGE = '/images/fallback.png';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
const IMAGE_PATHS = [`${BASE_URL}/uploads/`, `${BASE_URL}/storage/`];

/**
 * SafeImage component that handles image validation and fallback
 * Supports images from both /uploads and /storage paths
 */
const SafeImage = (props: ImageProps) => {
  const { src, alt, ...rest } = props;
  const srcString = src.toString();

  // Check if URL is from any of our valid image storage paths
  const isValidUrl = IMAGE_PATHS.some((path) => srcString.startsWith(path));

  const [error, setError] = React.useState(false);

  // Reset error state when src changes
  React.useEffect(() => {
    setError(false);
  }, [src]);

  // Show fallback image if there's an error or the URL isn't from our valid paths
  return error || !isValidUrl ? (
    <Image src={FALLBACK_IMAGE} alt={alt || 'Fallback image'} {...rest} />
  ) : (
    <Image
      src={src}
      alt={alt || 'Image'}
      {...rest}
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
