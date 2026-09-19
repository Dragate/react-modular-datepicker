import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from "next";

const withMDX = createMDX();
const isDevelopment = process.env.NODE_ENV === 'development';

const config: NextConfig = {
  typedRoutes: true,
  turbopack: {
    ...(isDevelopment && {
      resolveAlias: {
        'react-modular-datepicker': '../react-modular-datepicker/src/index.ts',
        'react-modular-datepicker/dist/index.css': '../react-modular-datepicker/src/index.css',
      },
    }),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/webpack"],
      },
    },
  },
  rewrites: async () => [{
    source: '/docs/:slug*.md',
    destination: '/llms.mdx/docs/:slug*/content.md',
  }]
};

export default withMDX(config);
