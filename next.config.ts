import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep framework-generated agent instruction files out of the public repo.
  agentRules: false,
  reactCompiler: true,
  images: {
    minimumCacheTTL: 31_536_000,
  },
};

export default nextConfig;
