/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
  env: {
    REACT_BASE_API_URL_PRISMA: process.env.BASE_API_URL_PRISMA,
    REACT_BASE_API_URL:process.env.BASE_API_URL,
    REACT_BASE_API_TOKEN:process.env.API_TOKEN
  }
};

export default nextConfig;
