import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/ReactCompareImage.tsx'],
      outDirs: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: 'src/ReactCompareImage.tsx',
      name: 'ReactCompareImage',
      fileName: 'ReactCompareImage',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
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
