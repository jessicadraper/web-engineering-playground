module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended', 
    'plugin:prettier/recommended', 
    'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
