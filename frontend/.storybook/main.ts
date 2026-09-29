import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding'
  ],
  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    config.module.rules = config.module.rules.filter((rule: { test?: RegExp | string | (RegExp | string)[] }) => {
      if (!rule.test) return true;
      if (rule.test instanceof RegExp && rule.test.test('test.module.css')) {
        return false;
      }
      return true;
    });

    config.module.rules.unshift({
      test: /\.module\.css$/,
      sideEffects: true,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[name]__[local]--[hash:base64:5]',
              namedExport: false,
              auto: /\.module\.\w+$/i,
            },
          },
        },
      ],
    });

    config.module.rules.unshift({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      sideEffects: true,
      use: [
        'style-loader',
        'css-loader',
      ],
    });

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src')
      };
    }
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      },
      dynamicAlias: true
    }
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;
