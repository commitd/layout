module.exports = {
  stories: ['../stories/**/*.stories.(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/preset-typescript',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    './.storybook/register.js',
  ],
}
