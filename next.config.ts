import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 元画像が高解像度になったため、配信時に AVIF → WebP の順で変換する
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 一覧ページ /services は 2026-10-28 に廃止（CEO指示）。古いリンクはトップの事業内容の節へ
  async redirects() {
    return [{ source: "/services", destination: "/#services", permanent: true }];
  },
  // リポジトリ直下にも package-lock.json があるため、ワークスペースの根を明示する
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
