/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Allow dangerouslySetInnerHTML for chapter content
  experimental: {},
  async redirects() {
    return [
      // /read/s/ → /novel/s/ permanent 301
      {
        source: '/read/s/:slug/:chapter',
        destination: '/novel/s/:slug/:chapter',
        permanent: true,
      },
      {
        source: '/read/s/:slug',
        destination: '/novel/s/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
