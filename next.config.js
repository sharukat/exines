/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
      config.resolve.fallback = { fs: false };
      return config;
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            pathname: '**'
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            pathname: '**'
          },
        ],
      },
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://127.0.0.1:5328/:path*', // Proxy to Backend
          },
        ];
      },
};

module.exports = nextConfig
