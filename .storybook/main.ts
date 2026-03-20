import type { StorybookConfig } from '@storybook/angular';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (config) => {
    const rules = config.module?.rules ?? [];
    for (const rule of rules as any[]) {
      if (!rule?.use) continue;
      for (const use of rule.use as any[]) {
        if (use?.loader?.includes('sass-loader')) {
          use.options = {
            ...use.options,
            sassOptions: {
              includePaths: [path.resolve(__dirname, '../src')],
            },
          };
        }
      }
    }
    return config;
  },
};

export default config;
