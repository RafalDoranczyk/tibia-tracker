import simpleImportSort from "eslint-plugin-simple-import-sort";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
      ".env*",
      "apps/*/node_modules/**",
      "packages/*/node_modules/**",
      ".turbo/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-duplicate-imports": ["error", { includeExports: true }],
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-duplicate-imports": ["error", { includeExports: true }],
    },
  },
];
