module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'error',
      {
        "printWidth": 80,
        "tabWidth": 4,
        "useTabs": true,
        "semi": true,
        "singleQuote": true,
        "trailingComma": "none",
        "bracketSpacing": true,
        "jsxBracketSameLine": true,
        "arrowParens": "always"
      },
      {
        "usePrettierrc": false
      }
    ]
  },
}
