module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['prettier', 'import'],
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-const-assign': 'error',
    radix: 'error',
    'prefer-template': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
    eqeqeq: ['error', 'always'],
    semi: [2, 'always'],
    'default-case': 2,
    'template-curly-spacing': 1, // Prettier.
    'arrow-parens': 0, // Does not work with Flow generic types
    'consistent-return': 0, // Flow.
    // Prefer new line before return
    // http://eslint.org/docs/rules/newline-before-return
    'newline-before-return': 0,
    'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-return-await': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    'import/first': 0,
    'no-restricted-globals': 1,
    'no-useless-escape': 1,
    'no-unused-vars': 1,
    'import/prefer-default-export': 0,
    'global-require': 0, // Used by webpack isomorphic tools and React Native.
    quotes: ['error', 'single', { avoidEscape: true }],

    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
  },
};
