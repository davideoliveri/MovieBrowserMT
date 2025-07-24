// eslint.config.js
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginReactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'; // This was the missing piece
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['dist', 'node_modules'],
  },
  // Base configs for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    ...prettierConfig,
  },
  // Config for React source files in `src`
  {
    files: ['src/**/*.{ts,tsx}'],
    // Apply both the recommended config and the new JSX runtime config
    ...pluginReactConfig,
    ...pluginReactJSXRuntime,
    languageOptions: {
      ...pluginReactConfig.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Config for Node.js files (like vite.config.ts)
  {
    files: ['vite.config.ts', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // General TypeScript config
  ...tseslint.configs.recommended
);
