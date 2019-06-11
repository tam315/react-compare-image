module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['jest', 'prettier', 'react-hooks'],
  globals: {
    document: true,
    window: true,
  },
  rules: {
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
