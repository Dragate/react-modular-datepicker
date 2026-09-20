/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      'react-modular-datepicker': path.resolve(import.meta.dirname, './dist/index.js'),
    },
  },
  test: {
    environment: 'jsdom',
    pool: 'vmThreads',
    setupFiles: "./tests/setup.ts",
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
