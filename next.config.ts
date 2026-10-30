import type { NextConfig } from "next";

// GitHub Pages serves project sites at /<repo-name>/, not the domain
// root. basePath/assetPrefix only apply during the GitHub Actions build
// (GITHUB_ACTIONS=true is set automatically by the runner) so local
// `npm run dev` still works at plain localhost:3000.
const isGhPagesBuild = process.env.GITHUB_ACTIONS === "true";
const repoBasePath = "/dclassico-barbershop";

const resolvedBasePath = isGhPagesBuild ? repoBasePath : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: resolvedBasePath,
  assetPrefix: resolvedBasePath,
  // Next only rewrites basePath automatically for next/image and
  // next/link — plain <img src="/gallery/..."> tags (what this repo
  // uses) don't get it. Expose the same value as a public env var so
  // client.config.ts can prefix those paths itself at build time.
  env: {
    NEXT_PUBLIC_BASE_PATH: resolvedBasePath,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
