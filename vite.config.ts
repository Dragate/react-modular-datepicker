import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json',
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
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'dayjs',
        /^dayjs\/.*/,
      ],
    },
  },
});
