import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
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
      {
        source: '/shipmate',
        destination: '/shipmate-platform',
        permanent: true,
      },
      {
        source: '/surcharge',
        destination: '/surcharges',
        permanent: true,
      },
      {
        source: '/post-office-solutions',
        destination: '/post-office-collect-lodge',
        permanent: true,
      },
      {
        source: '/tracking',
        destination: 'https://track.mailplus.com.au/',
        permanent: true,
      },
      {
        source: '/terms-conditions',
        destination: '/terms',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
