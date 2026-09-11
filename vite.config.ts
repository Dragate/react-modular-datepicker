import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json',
      beforeWriteFile: (filePath, content) => {
        const distDir = path.resolve(__dirname, 'dist');
        const relPath = path.relative(distDir, filePath);
        const cjsPath = path.resolve(distDir, 'cjs', relPath);
        const esPath = path.resolve(distDir, 'es', relPath.replace(/\.d\.ts$/, '.d.mts'));

        fs.mkdirSync(path.dirname(cjsPath), { recursive: true });
        fs.writeFileSync(cjsPath, content, 'utf-8');

        fs.mkdirSync(path.dirname(esPath), { recursive: true });
        fs.writeFileSync(esPath, content, 'utf-8');

        return false;
      },
      afterBuild: () => {
        const distDir = path.resolve(__dirname, 'dist');
        const entries = fs.readdirSync(distDir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.name !== 'cjs' && entry.name !== 'es' && entry.name !== 'index.css') {
            fs.rmSync(path.join(distDir, entry.name), { recursive: true, force: true });
          }
        }
      },
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: {
        index: 'src/index.ts',
        useDates: 'src/useDates.tsx',
        utils: 'src/utils.ts',
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'dayjs',
        /^dayjs\/.*/,
      ],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name]-[hash].mjs',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].js',
          chunkFileNames: '[name]-[hash].js',
        },
      ],
    },
  },
});
