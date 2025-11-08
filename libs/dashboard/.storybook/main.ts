import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [react(), nxViteTsPaths()],
      css: {
        postcss: {
          plugins: [
            tailwindcss({
              config: path.resolve(__dirname, '../../tailwind.config.js'),
            }),
            autoprefixer(),
          ],
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@money-matters/auth': path.resolve(__dirname, '../../../libs/auth/src'),
          '@money-matters/ui': path.resolve(__dirname, '../../../libs/ui/src'),
          '@money-matters/dashboard': path.resolve(__dirname, '../src'),
        },
      },
    }),
};

export default config;
