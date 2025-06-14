import { CloudUpload } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const ImageZone = () => {
  const hiddenInputRef = React.useRef(null);
  const [fileImg, setFileImg] = React.useState<File[]>([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/jpg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      setFileImg(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // Preview Image
  const thumbs = fileImg.map((img) => (
    <div key={img.name} className='relative mx-auto aspect-[16/9]'>
      <Image
        src={img.preview}
        alt={img.name}
        fill
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(img.preview);
        }}
      />
    </div>
  ));

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => fileImg.forEach((img) => URL.revokeObjectURL(img.preview));
  }, [fileImg]);

  return (
    <div className='rounded-xl border border-dashed border-neutral-400 bg-neutral-50 px-6 py-4'>
      {fileImg.length > 0 ? (
        <div>
          {thumbs}
          <div className='flex-center gap-2 pt-3'>
            <button className='text-sm-regular rounded-md border border-neutral-300 px-3 py-1.5 text-neutral-900'>
              Change
            </button>
            <button className='text-sm-regular rounded-md border border-neutral-300 px-3 py-1.5 text-neutral-900'>
              Remove
            </button>
          </div>
          <p className='text-xs-regular mx-auto w-fit pt-3 text-neutral-700'>
            PNG or JPG (max. 5mb)
          </p>
        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone' })}>
          <div className='bg-base-white mx-auto w-fit rounded-md border border-neutral-300 p-2.5'>
            <CloudUpload className='size-5 text-neutral-950' />
          </div>
          <input
            type='file'
            name='image'
            style={{ opacity: 0 }}
            ref={hiddenInputRef}
          />
          <input {...getInputProps()} />
          <div className='flex-center flex gap-1 pt-3'>
            <button
              className='text-sm-semibold text-primary-300 cursor-pointer'
              onClick={open}
            >
              Click to upload
            </button>
            <span className='text-sm-regular text-neutral-700'>
              or drag and drop
            </span>
          </div>

          <p className='text-xs-regular mx-auto w-fit pt-1 text-neutral-700'>
            PNG or JPG (max. 5mb)
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageZone;
