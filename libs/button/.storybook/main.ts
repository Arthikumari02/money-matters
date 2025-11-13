import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
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
              config: path.resolve(__dirname, '../tailwind.config.js'),
            }),
            autoprefixer(),
          ],
        },
      },
    }),
};

export default config;
