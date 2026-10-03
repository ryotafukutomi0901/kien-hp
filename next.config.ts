import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // リポジトリ直下にも package-lock.json があるため、ワークスペースの根を明示する
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
