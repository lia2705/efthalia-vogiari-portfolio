/* Lint: React hooks, and the import boundaries that keep one owner per layer.
   content/ is data and imports nothing; components get content through props (only App.jsx
   imports it); book/ is logic with no UI and no CSS.
   Timing belongs to CSS animations and layout to CSS, so neither requestAnimationFrame nor
   matchMedia may be called anywhere in src/. */
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'

const restrict = (patterns) => ({ 'no-restricted-imports': ['error', { patterns }] })

export default [
  { ignores: ['dist', 'node_modules', 'test-results', 'playwright-report'] },
  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: { globals: globals.browser, sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: {
      'no-restricted-globals': ['error',
        { name: 'requestAnimationFrame', message: 'Timing belongs to CSS animations.' },
        { name: 'matchMedia', message: 'Layout belongs to CSS media queries.' }],
      'no-restricted-properties': ['error',
        { object: 'window', property: 'requestAnimationFrame', message: 'Timing belongs to CSS animations.' },
        { object: 'window', property: 'matchMedia', message: 'Layout belongs to CSS media queries.' }],
    },
  },
  { files: ['*.js', '*.mjs', 'tests/**'], languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  { files: ['src/content/**'], rules: restrict([{ group: ['**'], message: 'content is data only and imports nothing' }]) },
  { files: ['src/components/**'], rules: restrict([{ group: ['**/content/*'], message: 'content reaches components through props; only App.jsx imports it' }]) },
  { files: ['src/book/**'], rules: restrict([{ group: ['**/*.jsx', '**/*.css', '**/components/*'], message: 'book/ is logic: no UI, no CSS' }]) },
]
