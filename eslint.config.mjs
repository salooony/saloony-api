import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import github from 'eslint-plugin-github';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', '**/*.spec.ts', '**/*.test.ts'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "class",
          format: ["PascalCase"],
        },
      ],
    },
  },
  {
    plugins: { unicorn },
    files: ['src/**/*.ts'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          multipleFileExtensions: true,
        },
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/dtos/requests/**/*.dto.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.request\\.dto$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/dtos/responses/**/.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.response\\.dto$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/usecases/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.usecase$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/entities/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.entity$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/decorators/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.decorator$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/transformers/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.transformer$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/controllers/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.controller$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/guards/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.guard$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/mappers/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.mapper$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/providers/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.provider(.interface)?$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/repositories/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.repository$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/config/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.config$',
      ],
    },
  },
  {
    plugins: { github },
    files: ['src/**/enums/**/*.ts'],
    rules: {
      'github/filenames-match-regex': [
        'error',
        '^[a-z0-9]+(?:-[a-z0-9]+)*\\.enum$',
      ],
    },
  }
);