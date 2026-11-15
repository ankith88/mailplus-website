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
        source: '/services/courier',
        destination: '/express-delivery',
        permanent: true,
      },
      {
        source: '/services/parcel-delivery',
        destination: '/express-delivery',
        permanent: true,
      },
      {
        source: '/services/post-office-solutions',
        destination: '/post-office-collect-lodge',
        permanent: true,
      },
      {
        source: '/services/mail-management',
        destination: '/post-office-collect-lodge',
        permanent: true,
      },
      {
        source: '/services/mailplus-api',
        destination: '/mailplus-api',
        permanent: true,
      },
      {
        source: '/services/logistics',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/#services',
        permanent: true,
      },
      {
        source: '/locations/waterloo',
        destination: '/#enquire',
        permanent: true,
      },
      {
        source: '/locations/alexandria',
        destination: '/#enquire',
        permanent: true,
      },
      {
        source: '/locations',
        destination: '/#enquire',
        permanent: true,
      },
      {
        source: '/shipmate',
        destination: '/shipmate-platform',
        permanent: true,
      },
      {
        source: '/shipmate-signup',
        destination: '/shipmate-platform/signup',
        permanent: true,
      },
      {
        source: '/claim-5-free-collections',
        destination: '/5-free-collections/claim',
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
      {
        source: '/contact',
        destination: '/',
        permanent: true,
      },
      {
        source: '/logistics',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
