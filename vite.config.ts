import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  const isSsrClientBuild = process.env.VITE_BUILD_MODE === 'ssr_client';

  const ssrClientBuildOptions = {
    outDir: 'dist/client',
    ssrManifest: true,
    rollupOptions: {
      // This tells Vite to process index.html and use entry-client.tsx as its script.
      // It correctly generates both the JS and the final index.html.
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'entry-client': path.resolve(__dirname, 'src/entry-client.tsx'),
      },
    },
  };

  return {
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    build: isSsrClientBuild ? ssrClientBuildOptions : { outDir: 'dist/client' },
  };
});
