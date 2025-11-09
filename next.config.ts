import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    domains: ['img.clerk.com', 'images.pexels.com']
  }
};

export default nextConfig;
