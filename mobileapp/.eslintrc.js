module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      tsx: true, // Allows for the parsing of JSX
    },
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    '@react-native-community',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
    'import/ignore': ['react-native'],
  },
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/no-unresolved': 0,
    'react/prop-types': 0,
  },
};
