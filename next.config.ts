import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/express-delivery',
        destination: '/express-delivery',
        permanent: true,
      },
      {
        source: '/services/post-office-solutions',
        destination: '/post-office-collect-lodge',
        permanent: true,
      },
      {
        source: '/services/mailplus-api',
        destination: '/mailplus-api',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
