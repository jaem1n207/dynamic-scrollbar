/// <reference types="vitest" />

import React from '@vitejs/plugin-react';
import { dirname, relative } from 'node:path';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';

import packageJson from './package.json';
import { isDev, port, r } from './scripts/utils';

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    React(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    AutoImport({
      imports: ['react', 'ahooks'],
      dts: r('src/auto-imports.d.ts'),
    }),
    // https://github.com/antfu/unplugin-icons
    // https://github.com/unocss/unocss
    UnoCSS(),
    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`);
        html = html.replace(
          '</head>',
          '<script type="module" crossorigin src="/dist/themeSync.js"></script></head>',
        );
        return html;
      },
    },
  ],
  optimizeDeps: {
    include: ['react', 'webextension-polyfill'],
  },
};

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
    origin: `http://localhost:${port}`,
  },
  build: {
    watch: isDev ? {} : undefined,
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r('src/options/index.html'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
}));
