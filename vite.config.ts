import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  const isSsrClientBuild = process.env.VITE_BUILD_MODE === 'ssr_client';

  const ssrClientBuildOptions = {
    outDir: 'dist/client',
    ssrManifest: true,
  };

  return {
    plugins: [react(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    build: isSsrClientBuild ? ssrClientBuildOptions : { outDir: 'dist/client' },
  };
});
