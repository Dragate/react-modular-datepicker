/// <reference types="vitest" />
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      'react-modular-datepicker': path.resolve(import.meta.dirname, './src/index.ts'),
    },
  },
  optimizeDeps: {
    include: [
      'date-fns',
      'dayjs',
      'dayjs/plugin/localeData.js',
      'dayjs/plugin/customParseFormat.js',
      'dayjs/plugin/isBetween.js',
    ],
  },
  server: {
    fs: {
      allow: ['../..'],
    },
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
      headless: true,
    },
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx', 'tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: {
        index: 'src/index.ts',
        useDates: 'src/useDates.tsx',
        utils: 'src/utils.ts',
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'dayjs',
        /^dayjs\/.*/,
      ],
      output: {
        assetFileNames: 'index.[ext]',
      },
    },
  },
});
