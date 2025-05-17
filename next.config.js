// next.config.js
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    webpackMemoryOptimizations: true,
  },
};

export default withBundle(nextConfig);