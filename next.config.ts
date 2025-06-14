import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'truthful-simplicity-production.up.railway.app',
        port: '',
        pathname: '/(storage|uploads)/**',
      },
    ],
  },
};

export default nextConfig;
