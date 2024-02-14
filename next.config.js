/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },

  async redirects() {
    return [
      {
        source: '/app/category/:path*',
        destination: '/app/category/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
