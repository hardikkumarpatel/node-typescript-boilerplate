import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslintConfigPrettier,
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      globals: {
        NodeJS: true,
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
      "no-dupe-class-members": "off",
      "prefer-const": "warn",
      "no-empty-function": ["error", { allow: ["getters", "setters", "constructors"] }],
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ]
    }
  },
  {
    plugins: {
      prettier: prettierPlugin
    }
  },
  {
    ignores: [
      "src/typings/*",
      "**/build/**",
      "**/dist/**",
      "**/node_modules/",
      ".git/",
      "src/api/graphql/schema/**/*.graphql"
    ]
  }
];
