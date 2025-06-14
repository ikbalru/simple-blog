'use client';

import {
  CloudUpload,
  Trash2 as RemoveIcon,
  ArrowUpToLine as ChangeImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

// --- Reusable ImageDropzone Component ---
// It is a 'controlled' component, receiving its state via props.

interface ImageDropzoneProps {
  value: File | null;
  onChange: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
  // Add imageUrl for displaying images from API in edit mode
  imageUrl?: string;
}

const MAX_SIZE_MB = 5; // Match Zod validation in page.tsx (5MB)
const ACCEPTED_FILES: Accept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

function ImageDropzone({
  value,
  onChange,
  className,
  disabled = false,
  imageUrl,
}: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Accept any file - Zod will handle validation
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
    isFocused: dropzoneFocused,
  } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILES,
    // Remove maxSize to let any size file be uploaded - Zod will handle validation
    maxFiles: 1,
    // This is key: It disables the default click-to-open behavior when a file is present.
    noClick: !!value,
    noKeyboard: true,
  });

  useEffect(() => {
    // Handle both File objects and image URLs from the API
    if (value) {
      // If we have a File object, create object URL
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (imageUrl) {
      // If we have an image URL from the API, use that directly
      setPreview(imageUrl);
    } else {
      // No image available
      setPreview(null);
    }
  }, [value, imageUrl]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the file dialog from opening on click
    onChange(null);
  };

  const handleChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    open(); // Manually open the file dialog for the "Change" button
  };

  // Update focus state when dropzone focus state changes
  useEffect(() => {
    setIsFocused(dropzoneFocused);
  }, [dropzoneFocused]);

  return (
    <div
      {...getRootProps()}
      className={`rounded-xl border-2 border-dashed bg-neutral-50 ${isDragActive || isFocused ? 'border-primary-300' : 'border-neutral-300'} ${!value ? 'cursor-pointer' : ''} ${className} transition-colors`}
    >
      <input {...getInputProps()} disabled={disabled} />
      {preview ? (
        // --- PREVIEW STATE (Gambar sudah ada) ---
        <div className='relative p-2'>
          <div className='relative mx-auto aspect-video overflow-hidden rounded-md'>
            <Image
              src={preview}
              alt={value?.name || 'Post cover image'}
              fill
              sizes='100%'
              className='object-contain'
            />
          </div>
          <div className='flex-center flex-wrap gap-3 py-3'>
            <button
              type='button'
              onClick={handleChange}
              className='text-sm-regular flex cursor-pointer items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-neutral-900 hover:bg-neutral-100'
            >
              <ChangeImageIcon className='size-5' />
              Change
            </button>
            <button
              type='button'
              onClick={handleRemove}
              className='text-sm-regular flex cursor-pointer items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-[#EE1D52] hover:bg-neutral-100'
            >
              <RemoveIcon className='size-5' />
              Remove
            </button>
          </div>
          <p className='text-xs-regular mt-1 text-center text-neutral-500'>
            PNG or JPG (max. {MAX_SIZE_MB}mb)
          </p>
        </div>
      ) : (
        // --- PLACEHOLDER STATE (Belum ada gambar) ---
        // We removed the manual onClick={open} from this div.
        // The click is now handled by getRootProps on the parent div, which respects the `noClick` option.
        <div className='flex flex-col items-center justify-center p-8 text-center'>
          <div className='rounded-md border border-neutral-300 bg-white p-2.5'>
            <CloudUpload className='size-5 text-neutral-950' />
          </div>
          <div className='mt-4 flex flex-wrap justify-center gap-1'>
            <span className='text-primary-300 text-sm font-semibold'>
              Click to upload
            </span>
            <span className='text-sm text-neutral-600'>or drag and drop</span>
          </div>
          <p className='text-xs-regular mt-1 text-neutral-500'>
            PNG or JPG (max. {MAX_SIZE_MB}mb)
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageDropzone;
