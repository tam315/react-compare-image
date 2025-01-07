module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [],
  framework: '@storybook/react',
  features: {
    // In V7 mode, you are responsible for configuring Babel using your .babelrc file,
    // and Storybook does not provide any default.
    // https://storybook.js.org/docs/react/configure/babel#v7-mode
    babelModeV7: true,
  },
};
