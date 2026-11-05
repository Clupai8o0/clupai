import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Old pages from the previous site, so links out there keep landing somewhere useful.
  async redirects()
  {
    return [
      ["/services", "/"],
      ["/services/:path*", "/"],
      ["/pricing", "/start"],
      ["/free-tools", "/start"],
      ["/free-tools/:path*", "/start"],
      ["/melbourne", "/"],
      ["/melbourne/:path*", "/"],
      ["/industries", "/"],
      ["/industries/:path*", "/"],
      ["/compare", "/"],
      ["/compare/:path*", "/"],
      ["/writing", "/"],
      ["/writing/:path*", "/"],
      ["/apps", "/products"],
      ["/apps/:path*", "/products"],
      ["/work/dsec", "/work"],
      ["/work/cuts-and-shavez", "/work"],
      ["/work/thurman", "/work"],
      ["/work/farmers-intuition", "/work"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
