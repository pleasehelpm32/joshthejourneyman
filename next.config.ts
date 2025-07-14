/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/_next/static/media/favicon.ico",
      },
    ];
  },
};

module.exports = nextConfig;
