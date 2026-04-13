import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      include: ['src/ReactCompareImage.tsx'],
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: 'src/ReactCompareImage.tsx',
      name: 'ReactCompareImage',
      fileName: 'ReactCompareImage',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist',
  },
})
