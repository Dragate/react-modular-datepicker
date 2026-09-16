import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';

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
