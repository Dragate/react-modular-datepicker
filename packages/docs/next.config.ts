import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  typedRoutes: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/webpack"],
      },
    },
  },
};

export default withMDX(config);
