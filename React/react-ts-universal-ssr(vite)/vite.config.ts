import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import path from 'node:path';

export default defineConfig(({mode}) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'VITE_') };

  return {
    plugins: [
      reactRefresh(),
      VitePluginHtmlEnv(),
      svgr({
        exportAsDefault: true,
        svgrOptions: {
          icon: true,
          dimensions: false,
        },
      }),
    ],
    define: {
      'process.env': process.env,
      TARGET_NODE: false,
    },
    build: {
      minify: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
